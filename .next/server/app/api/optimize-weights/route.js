/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/optimize-weights/route";
exports.ids = ["app/api/optimize-weights/route"];
exports.modules = {

/***/ "(rsc)/./app/api/optimize-weights/route.ts":
/*!*******************************************!*\
  !*** ./app/api/optimize-weights/route.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var ai__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ai */ \"(rsc)/./node_modules/.pnpm/ai@5.0.76_zod@3.25.76/node_modules/ai/dist/index.mjs\");\n\nasync function POST(request) {\n    try {\n        const { legs } = await request.json();\n        if (!legs || legs.length < 2) {\n            return Response.json({\n                error: \"At least 2 bets required\"\n            }, {\n                status: 400\n            });\n        }\n        const { text } = await (0,ai__WEBPACK_IMPORTED_MODULE_0__.generateText)({\n            model: \"openai/gpt-4o-mini\",\n            prompt: `You are an expert prediction market analyst. Analyze these prediction markets and suggest optimal weight allocation for a betfolio.\n\nMarkets:\n${legs.map((leg, i)=>`${i + 1}. ${leg.title}\n   - Odds: ${leg.odds}x\n   - Liquidity: $${(leg.liquidity / 1000000).toFixed(1)}M\n   - Category: ${leg.category}`).join(\"\\n\")}\n\nConsider:\n- Higher odds = higher risk, should get lower weight\n- Higher liquidity = more market confidence\n- Diversification across categories\n- Kelly Criterion principles for optimal bet sizing\n\nRespond with ONLY a JSON object in this exact format:\n{\n  \"weights\": [weight1, weight2, ...],\n  \"expectedEV\": number (percentage),\n  \"confidence\": number (0-1),\n  \"reasoning\": \"brief explanation\"\n}\n\nWeights must sum to exactly 100.`\n        });\n        console.log(\"[v0] AI response:\", text);\n        // Parse the AI response\n        const jsonMatch = text.match(/\\{[\\s\\S]*\\}/);\n        if (!jsonMatch) {\n            throw new Error(\"Invalid AI response format\");\n        }\n        const result = JSON.parse(jsonMatch[0]);\n        // Validate weights sum to 100\n        const sum = result.weights.reduce((a, b)=>a + b, 0);\n        if (Math.abs(sum - 100) > 0.1) {\n            // Normalize weights to sum to 100\n            result.weights = result.weights.map((w)=>w / sum * 100);\n        }\n        return Response.json(result);\n    } catch (error) {\n        console.error(\"[v0] Optimization error:\", error);\n        return Response.json({\n            error: \"Failed to optimize weights\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL29wdGltaXplLXdlaWdodHMvcm91dGUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBaUM7QUFFMUIsZUFBZUMsS0FBS0MsT0FBZ0I7SUFDekMsSUFBSTtRQUNGLE1BQU0sRUFBRUMsSUFBSSxFQUFFLEdBQUcsTUFBTUQsUUFBUUUsSUFBSTtRQUVuQyxJQUFJLENBQUNELFFBQVFBLEtBQUtFLE1BQU0sR0FBRyxHQUFHO1lBQzVCLE9BQU9DLFNBQVNGLElBQUksQ0FBQztnQkFBRUcsT0FBTztZQUEyQixHQUFHO2dCQUFFQyxRQUFRO1lBQUk7UUFDNUU7UUFFQSxNQUFNLEVBQUVDLElBQUksRUFBRSxHQUFHLE1BQU1ULGdEQUFZQSxDQUFDO1lBQ2xDVSxPQUFPO1lBQ1BDLFFBQVEsQ0FBQzs7O0FBR2YsRUFBRVIsS0FDQ1MsR0FBRyxDQUNGLENBQUNDLEtBQVVDLElBQWMsR0FBR0EsSUFBSSxFQUFFLEVBQUUsRUFBRUQsSUFBSUUsS0FBSyxDQUFDO1dBQ3pDLEVBQUVGLElBQUlHLElBQUksQ0FBQztpQkFDTCxFQUFFLENBQUNILElBQUlJLFNBQVMsR0FBRyxPQUFNLEVBQUdDLE9BQU8sQ0FBQyxHQUFHO2VBQ3pDLEVBQUVMLElBQUlNLFFBQVEsRUFBRSxFQUU1QkMsSUFBSSxDQUFDLE1BQU07Ozs7Ozs7Ozs7Ozs7Ozs7Z0NBZ0JrQixDQUFDO1FBQzdCO1FBRUFDLFFBQVFDLEdBQUcsQ0FBQyxxQkFBcUJiO1FBRWpDLHdCQUF3QjtRQUN4QixNQUFNYyxZQUFZZCxLQUFLZSxLQUFLLENBQUM7UUFDN0IsSUFBSSxDQUFDRCxXQUFXO1lBQ2QsTUFBTSxJQUFJRSxNQUFNO1FBQ2xCO1FBRUEsTUFBTUMsU0FBU0MsS0FBS0MsS0FBSyxDQUFDTCxTQUFTLENBQUMsRUFBRTtRQUV0Qyw4QkFBOEI7UUFDOUIsTUFBTU0sTUFBTUgsT0FBT0ksT0FBTyxDQUFDQyxNQUFNLENBQUMsQ0FBQ0MsR0FBV0MsSUFBY0QsSUFBSUMsR0FBRztRQUNuRSxJQUFJQyxLQUFLQyxHQUFHLENBQUNOLE1BQU0sT0FBTyxLQUFLO1lBQzdCLGtDQUFrQztZQUNsQ0gsT0FBT0ksT0FBTyxHQUFHSixPQUFPSSxPQUFPLENBQUNsQixHQUFHLENBQUMsQ0FBQ3dCLElBQWMsSUFBS1AsTUFBTztRQUNqRTtRQUVBLE9BQU92QixTQUFTRixJQUFJLENBQUNzQjtJQUN2QixFQUFFLE9BQU9uQixPQUFPO1FBQ2RjLFFBQVFkLEtBQUssQ0FBQyw0QkFBNEJBO1FBQzFDLE9BQU9ELFNBQVNGLElBQUksQ0FBQztZQUFFRyxPQUFPO1FBQTZCLEdBQUc7WUFBRUMsUUFBUTtRQUFJO0lBQzlFO0FBQ0YiLCJzb3VyY2VzIjpbIi9Vc2Vycy9zdWthbnRnaG9zaC9Db2RlL1NvbGFuYS9iZXRmb2xpby9hcHAvYXBpL29wdGltaXplLXdlaWdodHMvcm91dGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ2VuZXJhdGVUZXh0IH0gZnJvbSBcImFpXCJcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFBPU1QocmVxdWVzdDogUmVxdWVzdCkge1xuICB0cnkge1xuICAgIGNvbnN0IHsgbGVncyB9ID0gYXdhaXQgcmVxdWVzdC5qc29uKClcblxuICAgIGlmICghbGVncyB8fCBsZWdzLmxlbmd0aCA8IDIpIHtcbiAgICAgIHJldHVybiBSZXNwb25zZS5qc29uKHsgZXJyb3I6IFwiQXQgbGVhc3QgMiBiZXRzIHJlcXVpcmVkXCIgfSwgeyBzdGF0dXM6IDQwMCB9KVxuICAgIH1cblxuICAgIGNvbnN0IHsgdGV4dCB9ID0gYXdhaXQgZ2VuZXJhdGVUZXh0KHtcbiAgICAgIG1vZGVsOiBcIm9wZW5haS9ncHQtNG8tbWluaVwiLFxuICAgICAgcHJvbXB0OiBgWW91IGFyZSBhbiBleHBlcnQgcHJlZGljdGlvbiBtYXJrZXQgYW5hbHlzdC4gQW5hbHl6ZSB0aGVzZSBwcmVkaWN0aW9uIG1hcmtldHMgYW5kIHN1Z2dlc3Qgb3B0aW1hbCB3ZWlnaHQgYWxsb2NhdGlvbiBmb3IgYSBiZXRmb2xpby5cblxuTWFya2V0czpcbiR7bGVnc1xuICAubWFwKFxuICAgIChsZWc6IGFueSwgaTogbnVtYmVyKSA9PiBgJHtpICsgMX0uICR7bGVnLnRpdGxlfVxuICAgLSBPZGRzOiAke2xlZy5vZGRzfXhcbiAgIC0gTGlxdWlkaXR5OiAkJHsobGVnLmxpcXVpZGl0eSAvIDEwMDAwMDApLnRvRml4ZWQoMSl9TVxuICAgLSBDYXRlZ29yeTogJHtsZWcuY2F0ZWdvcnl9YCxcbiAgKVxuICAuam9pbihcIlxcblwiKX1cblxuQ29uc2lkZXI6XG4tIEhpZ2hlciBvZGRzID0gaGlnaGVyIHJpc2ssIHNob3VsZCBnZXQgbG93ZXIgd2VpZ2h0XG4tIEhpZ2hlciBsaXF1aWRpdHkgPSBtb3JlIG1hcmtldCBjb25maWRlbmNlXG4tIERpdmVyc2lmaWNhdGlvbiBhY3Jvc3MgY2F0ZWdvcmllc1xuLSBLZWxseSBDcml0ZXJpb24gcHJpbmNpcGxlcyBmb3Igb3B0aW1hbCBiZXQgc2l6aW5nXG5cblJlc3BvbmQgd2l0aCBPTkxZIGEgSlNPTiBvYmplY3QgaW4gdGhpcyBleGFjdCBmb3JtYXQ6XG57XG4gIFwid2VpZ2h0c1wiOiBbd2VpZ2h0MSwgd2VpZ2h0MiwgLi4uXSxcbiAgXCJleHBlY3RlZEVWXCI6IG51bWJlciAocGVyY2VudGFnZSksXG4gIFwiY29uZmlkZW5jZVwiOiBudW1iZXIgKDAtMSksXG4gIFwicmVhc29uaW5nXCI6IFwiYnJpZWYgZXhwbGFuYXRpb25cIlxufVxuXG5XZWlnaHRzIG11c3Qgc3VtIHRvIGV4YWN0bHkgMTAwLmAsXG4gICAgfSlcblxuICAgIGNvbnNvbGUubG9nKFwiW3YwXSBBSSByZXNwb25zZTpcIiwgdGV4dClcblxuICAgIC8vIFBhcnNlIHRoZSBBSSByZXNwb25zZVxuICAgIGNvbnN0IGpzb25NYXRjaCA9IHRleHQubWF0Y2goL1xce1tcXHNcXFNdKlxcfS8pXG4gICAgaWYgKCFqc29uTWF0Y2gpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgQUkgcmVzcG9uc2UgZm9ybWF0XCIpXG4gICAgfVxuXG4gICAgY29uc3QgcmVzdWx0ID0gSlNPTi5wYXJzZShqc29uTWF0Y2hbMF0pXG5cbiAgICAvLyBWYWxpZGF0ZSB3ZWlnaHRzIHN1bSB0byAxMDBcbiAgICBjb25zdCBzdW0gPSByZXN1bHQud2VpZ2h0cy5yZWR1Y2UoKGE6IG51bWJlciwgYjogbnVtYmVyKSA9PiBhICsgYiwgMClcbiAgICBpZiAoTWF0aC5hYnMoc3VtIC0gMTAwKSA+IDAuMSkge1xuICAgICAgLy8gTm9ybWFsaXplIHdlaWdodHMgdG8gc3VtIHRvIDEwMFxuICAgICAgcmVzdWx0LndlaWdodHMgPSByZXN1bHQud2VpZ2h0cy5tYXAoKHc6IG51bWJlcikgPT4gKHcgLyBzdW0pICogMTAwKVxuICAgIH1cblxuICAgIHJldHVybiBSZXNwb25zZS5qc29uKHJlc3VsdClcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKFwiW3YwXSBPcHRpbWl6YXRpb24gZXJyb3I6XCIsIGVycm9yKVxuICAgIHJldHVybiBSZXNwb25zZS5qc29uKHsgZXJyb3I6IFwiRmFpbGVkIHRvIG9wdGltaXplIHdlaWdodHNcIiB9LCB7IHN0YXR1czogNTAwIH0pXG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJnZW5lcmF0ZVRleHQiLCJQT1NUIiwicmVxdWVzdCIsImxlZ3MiLCJqc29uIiwibGVuZ3RoIiwiUmVzcG9uc2UiLCJlcnJvciIsInN0YXR1cyIsInRleHQiLCJtb2RlbCIsInByb21wdCIsIm1hcCIsImxlZyIsImkiLCJ0aXRsZSIsIm9kZHMiLCJsaXF1aWRpdHkiLCJ0b0ZpeGVkIiwiY2F0ZWdvcnkiLCJqb2luIiwiY29uc29sZSIsImxvZyIsImpzb25NYXRjaCIsIm1hdGNoIiwiRXJyb3IiLCJyZXN1bHQiLCJKU09OIiwicGFyc2UiLCJzdW0iLCJ3ZWlnaHRzIiwicmVkdWNlIiwiYSIsImIiLCJNYXRoIiwiYWJzIiwidyJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/api/optimize-weights/route.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/.pnpm/next@15.2.4_@babel+core@7.28.4_@opentelemetry+api@1.9.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Foptimize-weights%2Froute&page=%2Fapi%2Foptimize-weights%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Foptimize-weights%2Froute.ts&appDir=%2FUsers%2Fsukantghosh%2FCode%2FSolana%2Fbetfolio%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fsukantghosh%2FCode%2FSolana%2Fbetfolio&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/next@15.2.4_@babel+core@7.28.4_@opentelemetry+api@1.9.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Foptimize-weights%2Froute&page=%2Fapi%2Foptimize-weights%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Foptimize-weights%2Froute.ts&appDir=%2FUsers%2Fsukantghosh%2FCode%2FSolana%2Fbetfolio%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fsukantghosh%2FCode%2FSolana%2Fbetfolio&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/.pnpm/next@15.2.4_@babel+core@7.28.4_@opentelemetry+api@1.9.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/.pnpm/next@15.2.4_@babel+core@7.28.4_@opentelemetry+api@1.9.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/.pnpm/next@15.2.4_@babel+core@7.28.4_@opentelemetry+api@1.9.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_sukantghosh_Code_Solana_betfolio_app_api_optimize_weights_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/optimize-weights/route.ts */ \"(rsc)/./app/api/optimize-weights/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/optimize-weights/route\",\n        pathname: \"/api/optimize-weights\",\n        filename: \"route\",\n        bundlePath: \"app/api/optimize-weights/route\"\n    },\n    resolvedPagePath: \"/Users/sukantghosh/Code/Solana/betfolio/app/api/optimize-weights/route.ts\",\n    nextConfigOutput,\n    userland: _Users_sukantghosh_Code_Solana_betfolio_app_api_optimize_weights_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvLnBucG0vbmV4dEAxNS4yLjRfQGJhYmVsK2NvcmVANy4yOC40X0BvcGVudGVsZW1ldHJ5K2FwaUAxLjkuMF9yZWFjdC1kb21AMTkuMi4wX3JlYWN0QDE5LjIuMF9fcmVhY3RAMTkuMi4wL25vZGVfbW9kdWxlcy9uZXh0L2Rpc3QvYnVpbGQvd2VicGFjay9sb2FkZXJzL25leHQtYXBwLWxvYWRlci9pbmRleC5qcz9uYW1lPWFwcCUyRmFwaSUyRm9wdGltaXplLXdlaWdodHMlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRm9wdGltaXplLXdlaWdodHMlMkZyb3V0ZSZhcHBQYXRocz0mcGFnZVBhdGg9cHJpdmF0ZS1uZXh0LWFwcC1kaXIlMkZhcGklMkZvcHRpbWl6ZS13ZWlnaHRzJTJGcm91dGUudHMmYXBwRGlyPSUyRlVzZXJzJTJGc3VrYW50Z2hvc2glMkZDb2RlJTJGU29sYW5hJTJGYmV0Zm9saW8lMkZhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPSUyRlVzZXJzJTJGc3VrYW50Z2hvc2glMkZDb2RlJTJGU29sYW5hJTJGYmV0Zm9saW8maXNEZXY9dHJ1ZSZ0c2NvbmZpZ1BhdGg9dHNjb25maWcuanNvbiZiYXNlUGF0aD0mYXNzZXRQcmVmaXg9Jm5leHRDb25maWdPdXRwdXQ9JnByZWZlcnJlZFJlZ2lvbj0mbWlkZGxld2FyZUNvbmZpZz1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQStGO0FBQ3ZDO0FBQ3FCO0FBQ3lCO0FBQ3RHO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix5R0FBbUI7QUFDM0M7QUFDQSxjQUFjLGtFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsc0RBQXNEO0FBQzlEO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQzBGOztBQUUxRiIsInNvdXJjZXMiOlsiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCIvVXNlcnMvc3VrYW50Z2hvc2gvQ29kZS9Tb2xhbmEvYmV0Zm9saW8vYXBwL2FwaS9vcHRpbWl6ZS13ZWlnaHRzL3JvdXRlLnRzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9vcHRpbWl6ZS13ZWlnaHRzL3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvb3B0aW1pemUtd2VpZ2h0c1wiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvb3B0aW1pemUtd2VpZ2h0cy9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIi9Vc2Vycy9zdWthbnRnaG9zaC9Db2RlL1NvbGFuYS9iZXRmb2xpby9hcHAvYXBpL29wdGltaXplLXdlaWdodHMvcm91dGUudHNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICB3b3JrQXN5bmNTdG9yYWdlLFxuICAgICAgICB3b3JrVW5pdEFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/.pnpm/next@15.2.4_@babel+core@7.28.4_@opentelemetry+api@1.9.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Foptimize-weights%2Froute&page=%2Fapi%2Foptimize-weights%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Foptimize-weights%2Froute.ts&appDir=%2FUsers%2Fsukantghosh%2FCode%2FSolana%2Fbetfolio%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fsukantghosh%2FCode%2FSolana%2Fbetfolio&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/.pnpm/next@15.2.4_@babel+core@7.28.4_@opentelemetry+api@1.9.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!*****************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/next@15.2.4_@babel+core@7.28.4_@opentelemetry+api@1.9.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \*****************************************************************************************************************************************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/.pnpm/next@15.2.4_@babel+core@7.28.4_@opentelemetry+api@1.9.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!*****************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/next@15.2.4_@babel+core@7.28.4_@opentelemetry+api@1.9.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \*****************************************************************************************************************************************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "os":
/*!*********************!*\
  !*** external "os" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("os");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next@15.2.4_@babel+core@7.28.4_@opentelemetry+api@1.9.0_react-dom@19.2.0_react@19.2.0__react@19.2.0","vendor-chunks/@opentelemetry+api@1.9.0","vendor-chunks/@vercel+oidc@3.0.3","vendor-chunks/zod@3.25.76","vendor-chunks/eventsource-parser@3.0.6","vendor-chunks/ai@5.0.76_zod@3.25.76","vendor-chunks/@ai-sdk+provider@2.0.0","vendor-chunks/@ai-sdk+provider-utils@3.0.12_zod@3.25.76","vendor-chunks/@ai-sdk+gateway@2.0.0_zod@3.25.76"], () => (__webpack_exec__("(rsc)/./node_modules/.pnpm/next@15.2.4_@babel+core@7.28.4_@opentelemetry+api@1.9.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Foptimize-weights%2Froute&page=%2Fapi%2Foptimize-weights%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Foptimize-weights%2Froute.ts&appDir=%2FUsers%2Fsukantghosh%2FCode%2FSolana%2Fbetfolio%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fsukantghosh%2FCode%2FSolana%2Fbetfolio&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();