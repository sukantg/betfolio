#!/usr/bin/env bash
set -euo pipefail
solana-test-validator -r --slots-per-epoch 64 &
PID=0
echo "validator pid: "

trap 'kill ' EXIT

sleep 3
solana airdrop 10
anchor build
