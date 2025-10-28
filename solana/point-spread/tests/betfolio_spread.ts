import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { BetfolioSpread } from "../target/types/betfolio_spread";
import { expect } from "chai";
import { PublicKey, SystemProgram, Keypair, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { BN } from "@coral-xyz/anchor";

describe("betfolio_spread", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.BetfolioSpread as Program<BetfolioSpread>;
  
  let admin: Keypair;
  let oracle: Keypair;
  let bettor1: Keypair;
  let bettor2: Keypair;
  let configPDA: PublicKey;
  let marketPDA: PublicKey;
  let marketVaultPDA: PublicKey;
  let bet1PDA: PublicKey;
  let bet2PDA: PublicKey;
  let feeVaultPDA: PublicKey;
  
  const homeTeam = "Lakers";
  const awayTeam = "Warriors";
  const spreadBps = -750; // Lakers -7.5
  const favoriteIsHome = true;
  const maxExposure = new BN(10 * LAMPORTS_PER_SOL);
  const stake1 = new BN(1 * LAMPORTS_PER_SOL);
  const stake2 = new BN(2 * LAMPORTS_PER_SOL);
  const marketId = new BN(1);

  before(async () => {
    admin = Keypair.generate();
    oracle = Keypair.generate();
    bettor1 = Keypair.generate();
    bettor2 = Keypair.generate();

    // Fund all accounts
    await provider.connection.confirmTransaction(
      await provider.connection.requestAirdrop(admin.publicKey, 100 * LAMPORTS_PER_SOL)
    );
    await provider.connection.confirmTransaction(
      await provider.connection.requestAirdrop(oracle.publicKey, 100 * LAMPORTS_PER_SOL)
    );
    await provider.connection.confirmTransaction(
      await provider.connection.requestAirdrop(bettor1.publicKey, 100 * LAMPORTS_PER_SOL)
    );
    await provider.connection.confirmTransaction(
      await provider.connection.requestAirdrop(bettor2.publicKey, 100 * LAMPORTS_PER_SOL)
    );

    // Derive PDAs
    [configPDA] = PublicKey.findProgramAddressSync(
      [Buffer.from("config"), admin.publicKey.toBuffer()],
      program.programId
    );

    [marketPDA] = PublicKey.findProgramAddressSync(
      [Buffer.from("market"), oracle.publicKey.toBuffer(), marketId.toArrayLike(Buffer, 'le', 8)],
      program.programId
    );

    [marketVaultPDA] = PublicKey.findProgramAddressSync(
      [Buffer.from("vault"), marketPDA.toBuffer()],
      program.programId
    );

    [bet1PDA] = PublicKey.findProgramAddressSync(
      [Buffer.from("bet"), bettor1.publicKey.toBuffer(), marketPDA.toBuffer()],
      program.programId
    );

    [bet2PDA] = PublicKey.findProgramAddressSync(
      [Buffer.from("bet"), bettor2.publicKey.toBuffer(), marketPDA.toBuffer()],
      program.programId
    );

    [feeVaultPDA] = PublicKey.findProgramAddressSync(
      [Buffer.from("fee_vault")],
      program.programId
    );
  });

  it("Initialize Global Config", async () => {
    const feeBps = 250; // 2.5%
    
    await program.methods
      .initializeGlobal(feeBps)
      .accountsPartial({
        config: configPDA,
        admin: admin.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .signers([admin])
      .rpc();

    const config = await program.account.globalConfig.fetch(configPDA);
    expect(config.admin.toBase58()).to.equal(admin.publicKey.toBase58());
    expect(config.feeBps).to.equal(feeBps);
    expect(config.paused).to.be.false;
  });

  it("Create Market", async () => {
    const lockTime = new BN(Math.floor(Date.now() / 1000) + 3600); // 1 hour from now

    await program.methods
      .createMarket(
        homeTeam,
        awayTeam,
        spreadBps,
        favoriteIsHome,
        lockTime,
        maxExposure,
        marketId
      )
      .accountsPartial({
        market: marketPDA,
        marketVault: marketVaultPDA,
        authority: oracle.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .signers([oracle])
      .rpc();

    const market = await program.account.market.fetch(marketPDA);
    expect(market.authority.toBase58()).to.equal(oracle.publicKey.toBase58());
    expect(market.spreadBps).to.equal(spreadBps);
    expect(market.favoriteIsHome).to.equal(favoriteIsHome);
    expect(market.settled).to.be.false;
    expect(Number(market.totalHandleLamports)).to.equal(0);
    expect(Number(market.marketId)).to.equal(Number(marketId));
  });

  it("Place Bet on Favorite", async () => {
    const side = 0; // Favorite (Lakers)

    await program.methods
      .placeBet(side, stake1)
      .accountsPartial({
        bet: bet1PDA,
        market: marketPDA,
        marketVault: marketVaultPDA,
        config: configPDA,
        bettor: bettor1.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .signers([bettor1])
      .rpc();

    const bet = await program.account.bet.fetch(bet1PDA);
    expect(bet.bettor.toBase58()).to.equal(bettor1.publicKey.toBase58());
    expect(bet.side).to.equal(side);
    expect(Number(bet.stakeLamports)).to.equal(Number(stake1));
    expect(bet.claimed).to.be.false;

    const market = await program.account.market.fetch(marketPDA);
    expect(Number(market.totalHandleLamports)).to.equal(Number(stake1));
    expect(Number(market.favoritePoolLamports)).to.equal(Number(stake1));
    expect(Number(market.underdogPoolLamports)).to.equal(0);
  });

  it("Place Bet on Underdog", async () => {
    const side = 1; // Underdog (Warriors)

    await program.methods
      .placeBet(side, stake2)
      .accountsPartial({
        bet: bet2PDA,
        market: marketPDA,
        marketVault: marketVaultPDA,
        config: configPDA,
        bettor: bettor2.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .signers([bettor2])
      .rpc();

    const bet = await program.account.bet.fetch(bet2PDA);
    expect(bet.bettor.toBase58()).to.equal(bettor2.publicKey.toBase58());
    expect(bet.side).to.equal(side);
    expect(Number(bet.stakeLamports)).to.equal(Number(stake2));

    const market = await program.account.market.fetch(marketPDA);
    expect(Number(market.totalHandleLamports)).to.equal(Number(stake1.add(stake2)));
    expect(Number(market.favoritePoolLamports)).to.equal(Number(stake1));
    expect(Number(market.underdogPoolLamports)).to.equal(Number(stake2));
  });

  it("Favorite Wins - Post Result and Settle", async () => {
    const homeScore = 105; // Lakers
    const awayScore = 95;  // Warriors (10 point margin > 7.5 spread)

    await program.methods
      .postResultAndSettle(homeScore, awayScore)
      .accountsPartial({
        market: marketPDA,
        oracle: oracle.publicKey,
      })
      .signers([oracle])
      .rpc();

    const market = await program.account.market.fetch(marketPDA);
    expect(market.settled).to.be.true;
    expect(market.homeScore).to.equal(homeScore);
    expect(market.awayScore).to.equal(awayScore);
  });

  it("Winner Claims Payout", async () => {
    const bettor1Before = await provider.connection.getBalance(bettor1.publicKey);
    
    await program.methods
      .claim()
      .accountsPartial({
        bet: bet1PDA,
        market: marketPDA,
        marketVault: marketVaultPDA,
        config: configPDA,
        bettor: bettor1.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .signers([bettor1])
      .rpc();

    const bettor1After = await provider.connection.getBalance(bettor1.publicKey);
    const bet = await program.account.bet.fetch(bet1PDA);
    
    expect(bet.claimed).to.be.true;
    expect(bettor1After).to.be.greaterThan(bettor1Before);
    
    // Winner should get more than their original stake (minus fees)
    const payout = bettor1After - bettor1Before;
    const maxTxFee = 20000;
    expect(payout).to.be.greaterThan(Number(stake1) - maxTxFee);
  });

  it("Loser Cannot Claim", async () => {
    try {
      await program.methods
        .claim()
        .accountsPartial({
          bet: bet2PDA,
          market: marketPDA,
          marketVault: marketVaultPDA,
          config: configPDA,
          bettor: bettor2.publicKey,
          systemProgram: SystemProgram.programId,
        })
        .signers([bettor2])
        .rpc();
      
      expect.fail("Should have thrown error for losing bet");
    } catch (error) {
      expect(error.message).to.include("NothingToClaim");
    }
  });

  it("Test Push Case", async () => {
    // Create new market with whole-point spread
    const homeTeam2 = "Bulls";
    const awayTeam2 = "Knicks";
    const spreadBps2 = -700; // Bulls -7.0 (whole point)
    const marketId2 = new BN(2);
    
    const [market2PDA] = PublicKey.findProgramAddressSync(
      [Buffer.from("market"), oracle.publicKey.toBuffer(), marketId2.toArrayLike(Buffer, 'le', 8)],
      program.programId
    );

    const [marketVault2PDA] = PublicKey.findProgramAddressSync(
      [Buffer.from("vault"), market2PDA.toBuffer()],
      program.programId
    );

    const [bet3PDA] = PublicKey.findProgramAddressSync(
      [Buffer.from("bet"), bettor1.publicKey.toBuffer(), market2PDA.toBuffer()],
      program.programId
    );

    const lockTime = new BN(Math.floor(Date.now() / 1000) + 3600);

    // Create market
    await program.methods
      .createMarket(
        homeTeam2,
        awayTeam2,
        spreadBps2,
        true,
        lockTime,
        maxExposure,
        marketId2
      )
      .accountsPartial({
        market: market2PDA,
        marketVault: marketVault2PDA,
        authority: oracle.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .signers([oracle])
      .rpc();

    // Place bet
    await program.methods
      .placeBet(0, stake1) // Bet on favorite
      .accountsPartial({
        bet: bet3PDA,
        market: market2PDA,
        marketVault: marketVault2PDA,
        config: configPDA,
        bettor: bettor1.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .signers([bettor1])
      .rpc();

    // Post result with exact spread (push)
    const homeScore2 = 84;
    const awayScore2 = 77; // 7 point margin = exactly 7.0 spread

    await program.methods
      .postResultAndSettle(homeScore2, awayScore2)
      .accountsPartial({
        market: market2PDA,
        oracle: oracle.publicKey,
      })
      .signers([oracle])
      .rpc();

    // Claim refund
    const bettor1Before = await provider.connection.getBalance(bettor1.publicKey);
    
    await program.methods
      .claim()
      .accountsPartial({
        bet: bet3PDA,
        market: market2PDA,
        marketVault: marketVault2PDA,
        config: configPDA,
        bettor: bettor1.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .signers([bettor1])
      .rpc();

    const bettor1After = await provider.connection.getBalance(bettor1.publicKey);
    const payout = bettor1After - bettor1Before;
    
    // Should get full refund on push (minus tx fees)
    const maxTxFee = 20000;
    expect(payout).to.be.greaterThanOrEqual(Number(stake1) - maxTxFee);
    expect(payout).to.be.lessThanOrEqual(Number(stake1));
  });

  it("Cannot Bet After Lock Time", async () => {
    const homeTeam3 = "Celtics";
    const awayTeam3 = "Heat";
    const pastLockTime = new BN(Math.floor(Date.now() / 1000) - 3600); // 1 hour ago
    const marketId3 = new BN(3);

    const [market3PDA] = PublicKey.findProgramAddressSync(
      [Buffer.from("market"), oracle.publicKey.toBuffer(), marketId3.toArrayLike(Buffer, 'le', 8)],
      program.programId
    );

    const [marketVault3PDA] = PublicKey.findProgramAddressSync(
      [Buffer.from("vault"), market3PDA.toBuffer()],
      program.programId
    );

    // Create market with past lock time
    await program.methods
      .createMarket(
        homeTeam3,
        awayTeam3,
        -300,
        true,
        pastLockTime,
        maxExposure,
        marketId3
      )
      .accountsPartial({
        market: market3PDA,
        marketVault: marketVault3PDA,
        authority: oracle.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .signers([oracle])
      .rpc();

    const [bet4PDA] = PublicKey.findProgramAddressSync(
      [Buffer.from("bet"), bettor1.publicKey.toBuffer(), market3PDA.toBuffer()],
      program.programId
    );

    try {
      await program.methods
        .placeBet(0, stake1)
        .accountsPartial({
          bet: bet4PDA,
          market: market3PDA,
          marketVault: marketVault3PDA,
          config: configPDA,
          bettor: bettor1.publicKey,
          systemProgram: SystemProgram.programId,
        })
        .signers([bettor1])
        .rpc();
      
      expect.fail("Should have thrown error for betting after lock time");
    } catch (error) {
      expect(error.message).to.include("AfterLockTime");
    }
  });

  it("Admin Can Pause Betting", async () => {
    await program.methods
      .pause(true)
      .accountsPartial({
        config: configPDA,
        admin: admin.publicKey,
      })
      .signers([admin])
      .rpc();

    const config = await program.account.globalConfig.fetch(configPDA);
    expect(config.paused).to.be.true;
  });
});
