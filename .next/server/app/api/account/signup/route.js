"use strict";
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
exports.id = "app/api/account/signup/route";
exports.ids = ["app/api/account/signup/route"];
exports.modules = {

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ "punycode":
/*!***************************!*\
  !*** external "punycode" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("punycode");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("stream");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("url");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("zlib");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Faccount%2Fsignup%2Froute&page=%2Fapi%2Faccount%2Fsignup%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Faccount%2Fsignup%2Froute.ts&appDir=%2FUsers%2Felliott%2FLibrary%2FCloudStorage%2FOneDrive-Personal%2FDesktop%2FViewport%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Felliott%2FLibrary%2FCloudStorage%2FOneDrive-Personal%2FDesktop%2FViewport&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Faccount%2Fsignup%2Froute&page=%2Fapi%2Faccount%2Fsignup%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Faccount%2Fsignup%2Froute.ts&appDir=%2FUsers%2Felliott%2FLibrary%2FCloudStorage%2FOneDrive-Personal%2FDesktop%2FViewport%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Felliott%2FLibrary%2FCloudStorage%2FOneDrive-Personal%2FDesktop%2FViewport&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_elliott_Library_CloudStorage_OneDrive_Personal_Desktop_Viewport_app_api_account_signup_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/account/signup/route.ts */ \"(rsc)/./app/api/account/signup/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/account/signup/route\",\n        pathname: \"/api/account/signup\",\n        filename: \"route\",\n        bundlePath: \"app/api/account/signup/route\"\n    },\n    resolvedPagePath: \"/Users/elliott/Library/CloudStorage/OneDrive-Personal/Desktop/Viewport/app/api/account/signup/route.ts\",\n    nextConfigOutput,\n    userland: _Users_elliott_Library_CloudStorage_OneDrive_Personal_Desktop_Viewport_app_api_account_signup_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/account/signup/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZhY2NvdW50JTJGc2lnbnVwJTJGcm91dGUmcGFnZT0lMkZhcGklMkZhY2NvdW50JTJGc2lnbnVwJTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGYWNjb3VudCUyRnNpZ251cCUyRnJvdXRlLnRzJmFwcERpcj0lMkZVc2VycyUyRmVsbGlvdHQlMkZMaWJyYXJ5JTJGQ2xvdWRTdG9yYWdlJTJGT25lRHJpdmUtUGVyc29uYWwlMkZEZXNrdG9wJTJGVmlld3BvcnQlMkZhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPSUyRlVzZXJzJTJGZWxsaW90dCUyRkxpYnJhcnklMkZDbG91ZFN0b3JhZ2UlMkZPbmVEcml2ZS1QZXJzb25hbCUyRkRlc2t0b3AlMkZWaWV3cG9ydCZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQXNHO0FBQ3ZDO0FBQ2M7QUFDc0Q7QUFDbkk7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGdIQUFtQjtBQUMzQztBQUNBLGNBQWMseUVBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxpRUFBaUU7QUFDekU7QUFDQTtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUN1SDs7QUFFdkgiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly92aWV3cG9ydC8/YjhkYSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvZnV0dXJlL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvZnV0dXJlL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCIvVXNlcnMvZWxsaW90dC9MaWJyYXJ5L0Nsb3VkU3RvcmFnZS9PbmVEcml2ZS1QZXJzb25hbC9EZXNrdG9wL1ZpZXdwb3J0L2FwcC9hcGkvYWNjb3VudC9zaWdudXAvcm91dGUudHNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL2FjY291bnQvc2lnbnVwL3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvYWNjb3VudC9zaWdudXBcIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL2FjY291bnQvc2lnbnVwL3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiL1VzZXJzL2VsbGlvdHQvTGlicmFyeS9DbG91ZFN0b3JhZ2UvT25lRHJpdmUtUGVyc29uYWwvRGVza3RvcC9WaWV3cG9ydC9hcHAvYXBpL2FjY291bnQvc2lnbnVwL3JvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgcmVxdWVzdEFzeW5jU3RvcmFnZSwgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuY29uc3Qgb3JpZ2luYWxQYXRobmFtZSA9IFwiL2FwaS9hY2NvdW50L3NpZ251cC9yb3V0ZVwiO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICBzZXJ2ZXJIb29rcyxcbiAgICAgICAgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBvcmlnaW5hbFBhdGhuYW1lLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Faccount%2Fsignup%2Froute&page=%2Fapi%2Faccount%2Fsignup%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Faccount%2Fsignup%2Froute.ts&appDir=%2FUsers%2Felliott%2FLibrary%2FCloudStorage%2FOneDrive-Personal%2FDesktop%2FViewport%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Felliott%2FLibrary%2FCloudStorage%2FOneDrive-Personal%2FDesktop%2FViewport&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./app/api/account/signup/route.ts":
/*!*****************************************!*\
  !*** ./app/api/account/signup/route.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_supabaseServer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../lib/supabaseServer */ \"(rsc)/./lib/supabaseServer.ts\");\n\n\nfunction makeSlug(text) {\n    return text.toLowerCase().trim().replace(/[’'\"]/g, \"\").replace(/[^a-z0-9]+/g, \"-\").replace(/^-+|-+$/g, \"\").slice(0, 60);\n}\nasync function POST(req) {\n    try {\n        const { email, password, name, display_name, role = \"individual\" } = await req.json();\n        if (!email || !password) return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Email and password required\"\n        }, {\n            status: 400\n        });\n        const svc = (0,_lib_supabaseServer__WEBPACK_IMPORTED_MODULE_1__.createServiceClient)();\n        // create auth user\n        const { data: userData, error: userErr } = await svc.auth.admin.createUser({\n            email,\n            password,\n            email_confirm: true,\n            user_metadata: {\n                name,\n                display_name\n            }\n        });\n        if (userErr) throw userErr;\n        const userId = userData.user.id;\n        const safeName = name || email.split(\"@\")[0];\n        const safeDisplay = display_name || safeName;\n        const slug = makeSlug(safeDisplay);\n        // insert account row\n        const { data: acc, error: accErr } = await svc.from(\"accounts\").insert({\n            id: userId,\n            name: safeName,\n            display_name: safeDisplay,\n            slug,\n            role,\n            verified: true\n        }).select().single();\n        if (accErr) throw accErr;\n        // add membership\n        await svc.from(\"accounts_members\").insert({\n            account_id: userId,\n            user_id: userId,\n            role: \"owner\"\n        });\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            ok: true,\n            account: acc,\n            userId\n        }, {\n            status: 201\n        });\n    } catch (err) {\n        console.error(\"signup error:\", err);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: err.message || String(err)\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2FjY291bnQvc2lnbnVwL3JvdXRlLnRzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUEyQztBQUMwQjtBQUdyRSxTQUFTRSxTQUFTQyxJQUFZO0lBQzVCLE9BQU9BLEtBQ0pDLFdBQVcsR0FDWEMsSUFBSSxHQUNKQyxPQUFPLENBQUMsVUFBVSxJQUNsQkEsT0FBTyxDQUFDLGVBQWUsS0FDdkJBLE9BQU8sQ0FBQyxZQUFZLElBQ3BCQyxLQUFLLENBQUMsR0FBRztBQUNkO0FBRU8sZUFBZUMsS0FBS0MsR0FBWTtJQUNyQyxJQUFJO1FBQ0YsTUFBTSxFQUFFQyxLQUFLLEVBQUVDLFFBQVEsRUFBRUMsSUFBSSxFQUFFQyxZQUFZLEVBQUVDLE9BQU8sWUFBWSxFQUFFLEdBQUcsTUFBTUwsSUFBSU0sSUFBSTtRQUVuRixJQUFJLENBQUNMLFNBQVMsQ0FBQ0MsVUFDYixPQUFPWCxxREFBWUEsQ0FBQ2UsSUFBSSxDQUFDO1lBQUVDLE9BQU87UUFBOEIsR0FBRztZQUFFQyxRQUFRO1FBQUk7UUFFbkYsTUFBTUMsTUFBTWpCLHdFQUFtQkE7UUFFL0IsbUJBQW1CO1FBQ25CLE1BQU0sRUFBRWtCLE1BQU1DLFFBQVEsRUFBRUosT0FBT0ssT0FBTyxFQUFFLEdBQUcsTUFBTUgsSUFBSUksSUFBSSxDQUFDQyxLQUFLLENBQUNDLFVBQVUsQ0FBQztZQUN6RWQ7WUFDQUM7WUFDQWMsZUFBZTtZQUNmQyxlQUFlO2dCQUFFZDtnQkFBTUM7WUFBYTtRQUN0QztRQUNBLElBQUlRLFNBQVMsTUFBTUE7UUFFbkIsTUFBTU0sU0FBU1AsU0FBU1EsSUFBSSxDQUFDQyxFQUFFO1FBQy9CLE1BQU1DLFdBQVdsQixRQUFRRixNQUFNcUIsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFO1FBQzVDLE1BQU1DLGNBQWNuQixnQkFBZ0JpQjtRQUNwQyxNQUFNRyxPQUFPL0IsU0FBUzhCO1FBRXRCLHFCQUFxQjtRQUNyQixNQUFNLEVBQUViLE1BQU1lLEdBQUcsRUFBRWxCLE9BQU9tQixNQUFNLEVBQUUsR0FBRyxNQUFNakIsSUFDeENrQixJQUFJLENBQUMsWUFDTEMsTUFBTSxDQUFDO1lBQ05SLElBQUlGO1lBQ0pmLE1BQU1rQjtZQUNOakIsY0FBY21CO1lBQ2RDO1lBQ0FuQjtZQUNBd0IsVUFBVTtRQUNaLEdBQ0NDLE1BQU0sR0FDTkMsTUFBTTtRQUNULElBQUlMLFFBQVEsTUFBTUE7UUFFbEIsaUJBQWlCO1FBQ2pCLE1BQU1qQixJQUFJa0IsSUFBSSxDQUFDLG9CQUFvQkMsTUFBTSxDQUFDO1lBQ3hDSSxZQUFZZDtZQUNaZSxTQUFTZjtZQUNUYixNQUFNO1FBQ1I7UUFFQSxPQUFPZCxxREFBWUEsQ0FBQ2UsSUFBSSxDQUFDO1lBQUU0QixJQUFJO1lBQU1DLFNBQVNWO1lBQUtQO1FBQU8sR0FBRztZQUFFVixRQUFRO1FBQUk7SUFDN0UsRUFBRSxPQUFPNEIsS0FBVTtRQUNqQkMsUUFBUTlCLEtBQUssQ0FBQyxpQkFBaUI2QjtRQUMvQixPQUFPN0MscURBQVlBLENBQUNlLElBQUksQ0FBQztZQUFFQyxPQUFPNkIsSUFBSUUsT0FBTyxJQUFJQyxPQUFPSDtRQUFLLEdBQUc7WUFBRTVCLFFBQVE7UUFBSTtJQUNoRjtBQUNGIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdmlld3BvcnQvLi9hcHAvYXBpL2FjY291bnQvc2lnbnVwL3JvdXRlLnRzPzA1Y2YiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dFJlc3BvbnNlIH0gZnJvbSBcIm5leHQvc2VydmVyXCI7XG5pbXBvcnQgeyBjcmVhdGVTZXJ2aWNlQ2xpZW50IH0gZnJvbSBcIi4uLy4uLy4uLy4uL2xpYi9zdXBhYmFzZVNlcnZlclwiO1xuaW1wb3J0IGNyeXB0byBmcm9tIFwiY3J5cHRvXCI7XG5cbmZ1bmN0aW9uIG1ha2VTbHVnKHRleHQ6IHN0cmluZykge1xuICByZXR1cm4gdGV4dFxuICAgIC50b0xvd2VyQ2FzZSgpXG4gICAgLnRyaW0oKVxuICAgIC5yZXBsYWNlKC9b4oCZJ1wiXS9nLCBcIlwiKVxuICAgIC5yZXBsYWNlKC9bXmEtejAtOV0rL2csIFwiLVwiKVxuICAgIC5yZXBsYWNlKC9eLSt8LSskL2csIFwiXCIpXG4gICAgLnNsaWNlKDAsIDYwKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFBPU1QocmVxOiBSZXF1ZXN0KSB7XG4gIHRyeSB7XG4gICAgY29uc3QgeyBlbWFpbCwgcGFzc3dvcmQsIG5hbWUsIGRpc3BsYXlfbmFtZSwgcm9sZSA9IFwiaW5kaXZpZHVhbFwiIH0gPSBhd2FpdCByZXEuanNvbigpO1xuXG4gICAgaWYgKCFlbWFpbCB8fCAhcGFzc3dvcmQpXG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogXCJFbWFpbCBhbmQgcGFzc3dvcmQgcmVxdWlyZWRcIiB9LCB7IHN0YXR1czogNDAwIH0pO1xuXG4gICAgY29uc3Qgc3ZjID0gY3JlYXRlU2VydmljZUNsaWVudCgpO1xuXG4gICAgLy8gY3JlYXRlIGF1dGggdXNlclxuICAgIGNvbnN0IHsgZGF0YTogdXNlckRhdGEsIGVycm9yOiB1c2VyRXJyIH0gPSBhd2FpdCBzdmMuYXV0aC5hZG1pbi5jcmVhdGVVc2VyKHtcbiAgICAgIGVtYWlsLFxuICAgICAgcGFzc3dvcmQsXG4gICAgICBlbWFpbF9jb25maXJtOiB0cnVlLFxuICAgICAgdXNlcl9tZXRhZGF0YTogeyBuYW1lLCBkaXNwbGF5X25hbWUgfSxcbiAgICB9KTtcbiAgICBpZiAodXNlckVycikgdGhyb3cgdXNlckVycjtcblxuICAgIGNvbnN0IHVzZXJJZCA9IHVzZXJEYXRhLnVzZXIuaWQ7XG4gICAgY29uc3Qgc2FmZU5hbWUgPSBuYW1lIHx8IGVtYWlsLnNwbGl0KFwiQFwiKVswXTtcbiAgICBjb25zdCBzYWZlRGlzcGxheSA9IGRpc3BsYXlfbmFtZSB8fCBzYWZlTmFtZTtcbiAgICBjb25zdCBzbHVnID0gbWFrZVNsdWcoc2FmZURpc3BsYXkpO1xuXG4gICAgLy8gaW5zZXJ0IGFjY291bnQgcm93XG4gICAgY29uc3QgeyBkYXRhOiBhY2MsIGVycm9yOiBhY2NFcnIgfSA9IGF3YWl0IHN2Y1xuICAgICAgLmZyb20oXCJhY2NvdW50c1wiKVxuICAgICAgLmluc2VydCh7XG4gICAgICAgIGlkOiB1c2VySWQsXG4gICAgICAgIG5hbWU6IHNhZmVOYW1lLFxuICAgICAgICBkaXNwbGF5X25hbWU6IHNhZmVEaXNwbGF5LFxuICAgICAgICBzbHVnLFxuICAgICAgICByb2xlLFxuICAgICAgICB2ZXJpZmllZDogdHJ1ZSxcbiAgICAgIH0pXG4gICAgICAuc2VsZWN0KClcbiAgICAgIC5zaW5nbGUoKTtcbiAgICBpZiAoYWNjRXJyKSB0aHJvdyBhY2NFcnI7XG5cbiAgICAvLyBhZGQgbWVtYmVyc2hpcFxuICAgIGF3YWl0IHN2Yy5mcm9tKFwiYWNjb3VudHNfbWVtYmVyc1wiKS5pbnNlcnQoe1xuICAgICAgYWNjb3VudF9pZDogdXNlcklkLFxuICAgICAgdXNlcl9pZDogdXNlcklkLFxuICAgICAgcm9sZTogXCJvd25lclwiLFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgb2s6IHRydWUsIGFjY291bnQ6IGFjYywgdXNlcklkIH0sIHsgc3RhdHVzOiAyMDEgfSk7XG4gIH0gY2F0Y2ggKGVycjogYW55KSB7XG4gICAgY29uc29sZS5lcnJvcihcInNpZ251cCBlcnJvcjpcIiwgZXJyKTtcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogZXJyLm1lc3NhZ2UgfHwgU3RyaW5nKGVycikgfSwgeyBzdGF0dXM6IDUwMCB9KTtcbiAgfVxufSJdLCJuYW1lcyI6WyJOZXh0UmVzcG9uc2UiLCJjcmVhdGVTZXJ2aWNlQ2xpZW50IiwibWFrZVNsdWciLCJ0ZXh0IiwidG9Mb3dlckNhc2UiLCJ0cmltIiwicmVwbGFjZSIsInNsaWNlIiwiUE9TVCIsInJlcSIsImVtYWlsIiwicGFzc3dvcmQiLCJuYW1lIiwiZGlzcGxheV9uYW1lIiwicm9sZSIsImpzb24iLCJlcnJvciIsInN0YXR1cyIsInN2YyIsImRhdGEiLCJ1c2VyRGF0YSIsInVzZXJFcnIiLCJhdXRoIiwiYWRtaW4iLCJjcmVhdGVVc2VyIiwiZW1haWxfY29uZmlybSIsInVzZXJfbWV0YWRhdGEiLCJ1c2VySWQiLCJ1c2VyIiwiaWQiLCJzYWZlTmFtZSIsInNwbGl0Iiwic2FmZURpc3BsYXkiLCJzbHVnIiwiYWNjIiwiYWNjRXJyIiwiZnJvbSIsImluc2VydCIsInZlcmlmaWVkIiwic2VsZWN0Iiwic2luZ2xlIiwiYWNjb3VudF9pZCIsInVzZXJfaWQiLCJvayIsImFjY291bnQiLCJlcnIiLCJjb25zb2xlIiwibWVzc2FnZSIsIlN0cmluZyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/account/signup/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/supabaseServer.ts":
/*!*******************************!*\
  !*** ./lib/supabaseServer.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createServiceClient: () => (/* binding */ createServiceClient)\n/* harmony export */ });\n/* harmony import */ var _supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @supabase/supabase-js */ \"(rsc)/./node_modules/@supabase/supabase-js/dist/module/index.js\");\n\nfunction createServiceClient() {\n    const url = \"https://autjeqfggpqmppjavisr.supabase.co\";\n    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;\n    if (!url || !key) throw new Error(\"Missing Supabase env vars\");\n    return (0,_supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__.createClient)(url, key, {\n        auth: {\n            persistSession: false\n        }\n    });\n} // // lib/supabaseServer.ts\n // import { createClient } from \"@supabase/supabase-js\";\n // export function createServiceClient() {\n //   const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;\n //   const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;\n //   if (!supabaseUrl || !serviceKey) throw new Error(\"Missing Supabase env vars\");\n //   return createClient(supabaseUrl, serviceKey, { auth: { persistSession: false } });\n // }\n // import { createClient } from \"@supabase/supabase-js\";\n // export function createServiceClient() {\n //   if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {\n //     throw new Error(\"Missing SUPABASE env vars\");\n //   }\n //   return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {\n //     auth: { persistSession: false },\n //   });\n // }\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvc3VwYWJhc2VTZXJ2ZXIudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBcUQ7QUFFOUMsU0FBU0M7SUFDZCxNQUFNQyxNQUFNQywwQ0FBb0M7SUFDaEQsTUFBTUcsTUFBTUgsUUFBUUMsR0FBRyxDQUFDRyx5QkFBeUI7SUFDakQsSUFBSSxDQUFDTCxPQUFPLENBQUNJLEtBQUssTUFBTSxJQUFJRSxNQUFNO0lBQ2xDLE9BQU9SLG1FQUFZQSxDQUFDRSxLQUFLSSxLQUFLO1FBQUVHLE1BQU07WUFBRUMsZ0JBQWdCO1FBQU07SUFBRTtBQUNsRSxFQUVBLDJCQUEyQjtDQUMzQix3REFBd0Q7Q0FDeEQsMENBQTBDO0NBQzFDLDhEQUE4RDtDQUM5RCw4REFBOEQ7Q0FDOUQsbUZBQW1GO0NBQ25GLHVGQUF1RjtDQUN2RixJQUFJO0NBRUosd0RBQXdEO0NBRXhELDBDQUEwQztDQUMxQywyRkFBMkY7Q0FDM0Ysb0RBQW9EO0NBQ3BELE1BQU07Q0FDTix1R0FBdUc7Q0FDdkcsdUNBQXVDO0NBQ3ZDLFFBQVE7Q0FDUixJQUFJIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdmlld3BvcnQvLi9saWIvc3VwYWJhc2VTZXJ2ZXIudHM/Yzc4YyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjcmVhdGVDbGllbnQgfSBmcm9tIFwiQHN1cGFiYXNlL3N1cGFiYXNlLWpzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTZXJ2aWNlQ2xpZW50KCkge1xuICBjb25zdCB1cmwgPSBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19TVVBBQkFTRV9VUkw7XG4gIGNvbnN0IGtleSA9IHByb2Nlc3MuZW52LlNVUEFCQVNFX1NFUlZJQ0VfUk9MRV9LRVk7XG4gIGlmICghdXJsIHx8ICFrZXkpIHRocm93IG5ldyBFcnJvcihcIk1pc3NpbmcgU3VwYWJhc2UgZW52IHZhcnNcIik7XG4gIHJldHVybiBjcmVhdGVDbGllbnQodXJsLCBrZXksIHsgYXV0aDogeyBwZXJzaXN0U2Vzc2lvbjogZmFsc2UgfSB9KTtcbn1cblxuLy8gLy8gbGliL3N1cGFiYXNlU2VydmVyLnRzXG4vLyBpbXBvcnQgeyBjcmVhdGVDbGllbnQgfSBmcm9tIFwiQHN1cGFiYXNlL3N1cGFiYXNlLWpzXCI7XG4vLyBleHBvcnQgZnVuY3Rpb24gY3JlYXRlU2VydmljZUNsaWVudCgpIHtcbi8vICAgY29uc3Qgc3VwYWJhc2VVcmwgPSBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19TVVBBQkFTRV9VUkw7XG4vLyAgIGNvbnN0IHNlcnZpY2VLZXkgPSBwcm9jZXNzLmVudi5TVVBBQkFTRV9TRVJWSUNFX1JPTEVfS0VZO1xuLy8gICBpZiAoIXN1cGFiYXNlVXJsIHx8ICFzZXJ2aWNlS2V5KSB0aHJvdyBuZXcgRXJyb3IoXCJNaXNzaW5nIFN1cGFiYXNlIGVudiB2YXJzXCIpO1xuLy8gICByZXR1cm4gY3JlYXRlQ2xpZW50KHN1cGFiYXNlVXJsLCBzZXJ2aWNlS2V5LCB7IGF1dGg6IHsgcGVyc2lzdFNlc3Npb246IGZhbHNlIH0gfSk7XG4vLyB9XG5cbi8vIGltcG9ydCB7IGNyZWF0ZUNsaWVudCB9IGZyb20gXCJAc3VwYWJhc2Uvc3VwYWJhc2UtanNcIjtcblxuLy8gZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNlcnZpY2VDbGllbnQoKSB7XG4vLyAgIGlmICghcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfU1VQQUJBU0VfVVJMIHx8ICFwcm9jZXNzLmVudi5TVVBBQkFTRV9TRVJWSUNFX1JPTEVfS0VZKSB7XG4vLyAgICAgdGhyb3cgbmV3IEVycm9yKFwiTWlzc2luZyBTVVBBQkFTRSBlbnYgdmFyc1wiKTtcbi8vICAgfVxuLy8gICByZXR1cm4gY3JlYXRlQ2xpZW50KHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX1NVUEFCQVNFX1VSTCwgcHJvY2Vzcy5lbnYuU1VQQUJBU0VfU0VSVklDRV9ST0xFX0tFWSwge1xuLy8gICAgIGF1dGg6IHsgcGVyc2lzdFNlc3Npb246IGZhbHNlIH0sXG4vLyAgIH0pO1xuLy8gfSJdLCJuYW1lcyI6WyJjcmVhdGVDbGllbnQiLCJjcmVhdGVTZXJ2aWNlQ2xpZW50IiwidXJsIiwicHJvY2VzcyIsImVudiIsIk5FWFRfUFVCTElDX1NVUEFCQVNFX1VSTCIsImtleSIsIlNVUEFCQVNFX1NFUlZJQ0VfUk9MRV9LRVkiLCJFcnJvciIsImF1dGgiLCJwZXJzaXN0U2Vzc2lvbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./lib/supabaseServer.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@supabase","vendor-chunks/tr46","vendor-chunks/whatwg-url","vendor-chunks/webidl-conversions"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Faccount%2Fsignup%2Froute&page=%2Fapi%2Faccount%2Fsignup%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Faccount%2Fsignup%2Froute.ts&appDir=%2FUsers%2Felliott%2FLibrary%2FCloudStorage%2FOneDrive-Personal%2FDesktop%2FViewport%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Felliott%2FLibrary%2FCloudStorage%2FOneDrive-Personal%2FDesktop%2FViewport&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();