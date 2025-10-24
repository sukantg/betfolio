module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/Solana/betfolio/app/api/markets/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Solana$2f$betfolio$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Solana/betfolio/node_modules/.pnpm/next@16.0.0_@babel+core@7.28.4_@opentelemetry+api@1.9.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/server.js [app-route] (ecmascript)");
;
// Mock data for development - in production, this would fetch from Polymarket's Gamma API
const mockMarkets = [
    {
        id: "1",
        question: "Will Bitcoin reach $150k by end of 2025?",
        description: "This market resolves YES if Bitcoin (BTC) reaches or exceeds $150,000 USD at any point before December 31, 2025, 11:59 PM ET.",
        outcomes: [
            "Yes",
            "No"
        ],
        volume: 2500000,
        liquidity: 500000,
        endDate: "2025-12-31",
        category: "crypto"
    },
    {
        id: "2",
        question: "Will the Democrats win the 2026 midterm elections?",
        description: "This market resolves YES if Democrats win control of both the House and Senate in the 2026 midterm elections.",
        outcomes: [
            "Yes",
            "No"
        ],
        volume: 5000000,
        liquidity: 1000000,
        endDate: "2026-11-03",
        category: "politics"
    },
    {
        id: "3",
        question: "Will Ethereum merge to Proof of Stake succeed?",
        description: "This market resolves YES if Ethereum successfully transitions to Proof of Stake without major issues.",
        outcomes: [
            "Yes",
            "No"
        ],
        volume: 1800000,
        liquidity: 400000,
        endDate: "2025-06-30",
        category: "crypto"
    },
    {
        id: "4",
        question: "Will the Lakers win the 2025 NBA Championship?",
        description: "This market resolves YES if the Los Angeles Lakers win the 2025 NBA Championship.",
        outcomes: [
            "Yes",
            "No"
        ],
        volume: 3200000,
        liquidity: 650000,
        endDate: "2025-06-30",
        category: "sports"
    },
    {
        id: "5",
        question: "Will AI achieve AGI by 2030?",
        description: "This market resolves YES if artificial general intelligence (AGI) is achieved by December 31, 2030.",
        outcomes: [
            "Yes",
            "No"
        ],
        volume: 4500000,
        liquidity: 900000,
        endDate: "2030-12-31",
        category: "science"
    },
    {
        id: "6",
        question: "Will the next Marvel movie gross over $1B?",
        description: "This market resolves YES if the next Marvel Cinematic Universe film grosses over $1 billion worldwide.",
        outcomes: [
            "Yes",
            "No"
        ],
        volume: 1200000,
        liquidity: 250000,
        endDate: "2025-12-31",
        category: "entertainment"
    },
    {
        id: "7",
        question: "Will Trump run for president in 2028?",
        description: "This market resolves YES if Donald Trump officially announces a presidential campaign for the 2028 election.",
        outcomes: [
            "Yes",
            "No"
        ],
        volume: 6000000,
        liquidity: 1200000,
        endDate: "2028-01-01",
        category: "politics"
    },
    {
        id: "8",
        question: "Will Solana flip Ethereum by market cap?",
        description: "This market resolves YES if Solana's market capitalization exceeds Ethereum's at any point before 2026.",
        outcomes: [
            "Yes",
            "No"
        ],
        volume: 2800000,
        liquidity: 550000,
        endDate: "2025-12-31",
        category: "crypto"
    },
    {
        id: "9",
        question: "Will the Chiefs win Super Bowl LX?",
        description: "This market resolves YES if the Kansas City Chiefs win Super Bowl LX in 2026.",
        outcomes: [
            "Yes",
            "No"
        ],
        volume: 3500000,
        liquidity: 700000,
        endDate: "2026-02-08",
        category: "sports"
    }
];
async function GET() {
    // In production, fetch from Polymarket's Gamma API
    // const response = await fetch('https://gamma-api.polymarket.com/markets')
    // const data = await response.json()
    return __TURBOPACK__imported__module__$5b$project$5d2f$Solana$2f$betfolio$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$0_$40$babel$2b$core$40$7$2e$28$2e$4_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        markets: mockMarkets
    });
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__2a7ec726._.js.map