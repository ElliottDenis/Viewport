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
exports.id = "app/api/upload-url/route";
exports.ids = ["app/api/upload-url/route"];
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

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fupload-url%2Froute&page=%2Fapi%2Fupload-url%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fupload-url%2Froute.ts&appDir=%2FUsers%2Felliott%2FLibrary%2FCloudStorage%2FOneDrive-Personal%2FDesktop%2FViewport%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Felliott%2FLibrary%2FCloudStorage%2FOneDrive-Personal%2FDesktop%2FViewport&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fupload-url%2Froute&page=%2Fapi%2Fupload-url%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fupload-url%2Froute.ts&appDir=%2FUsers%2Felliott%2FLibrary%2FCloudStorage%2FOneDrive-Personal%2FDesktop%2FViewport%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Felliott%2FLibrary%2FCloudStorage%2FOneDrive-Personal%2FDesktop%2FViewport&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_elliott_Library_CloudStorage_OneDrive_Personal_Desktop_Viewport_app_api_upload_url_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/upload-url/route.ts */ \"(rsc)/./app/api/upload-url/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/upload-url/route\",\n        pathname: \"/api/upload-url\",\n        filename: \"route\",\n        bundlePath: \"app/api/upload-url/route\"\n    },\n    resolvedPagePath: \"/Users/elliott/Library/CloudStorage/OneDrive-Personal/Desktop/Viewport/app/api/upload-url/route.ts\",\n    nextConfigOutput,\n    userland: _Users_elliott_Library_CloudStorage_OneDrive_Personal_Desktop_Viewport_app_api_upload_url_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/upload-url/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZ1cGxvYWQtdXJsJTJGcm91dGUmcGFnZT0lMkZhcGklMkZ1cGxvYWQtdXJsJTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGdXBsb2FkLXVybCUyRnJvdXRlLnRzJmFwcERpcj0lMkZVc2VycyUyRmVsbGlvdHQlMkZMaWJyYXJ5JTJGQ2xvdWRTdG9yYWdlJTJGT25lRHJpdmUtUGVyc29uYWwlMkZEZXNrdG9wJTJGVmlld3BvcnQlMkZhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPSUyRlVzZXJzJTJGZWxsaW90dCUyRkxpYnJhcnklMkZDbG91ZFN0b3JhZ2UlMkZPbmVEcml2ZS1QZXJzb25hbCUyRkRlc2t0b3AlMkZWaWV3cG9ydCZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQXNHO0FBQ3ZDO0FBQ2M7QUFDa0Q7QUFDL0g7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGdIQUFtQjtBQUMzQztBQUNBLGNBQWMseUVBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxpRUFBaUU7QUFDekU7QUFDQTtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUN1SDs7QUFFdkgiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly92aWV3cG9ydC8/YWQ5NCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvZnV0dXJlL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvZnV0dXJlL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCIvVXNlcnMvZWxsaW90dC9MaWJyYXJ5L0Nsb3VkU3RvcmFnZS9PbmVEcml2ZS1QZXJzb25hbC9EZXNrdG9wL1ZpZXdwb3J0L2FwcC9hcGkvdXBsb2FkLXVybC9yb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvdXBsb2FkLXVybC9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL3VwbG9hZC11cmxcIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL3VwbG9hZC11cmwvcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCIvVXNlcnMvZWxsaW90dC9MaWJyYXJ5L0Nsb3VkU3RvcmFnZS9PbmVEcml2ZS1QZXJzb25hbC9EZXNrdG9wL1ZpZXdwb3J0L2FwcC9hcGkvdXBsb2FkLXVybC9yb3V0ZS50c1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmNvbnN0IG9yaWdpbmFsUGF0aG5hbWUgPSBcIi9hcGkvdXBsb2FkLXVybC9yb3V0ZVwiO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICBzZXJ2ZXJIb29rcyxcbiAgICAgICAgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBvcmlnaW5hbFBhdGhuYW1lLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fupload-url%2Froute&page=%2Fapi%2Fupload-url%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fupload-url%2Froute.ts&appDir=%2FUsers%2Felliott%2FLibrary%2FCloudStorage%2FOneDrive-Personal%2FDesktop%2FViewport%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Felliott%2FLibrary%2FCloudStorage%2FOneDrive-Personal%2FDesktop%2FViewport&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./app/api/upload-url/route.ts":
/*!*************************************!*\
  !*** ./app/api/upload-url/route.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_supabaseServer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../lib/supabaseServer */ \"(rsc)/./lib/supabaseServer.ts\");\n// app/api/upload-url/route.ts\n\n\nasync function POST(req) {\n    try {\n        const body = await req.json().catch(()=>({}));\n        const path = body?.path;\n        const expires = body?.expires ?? 120; // seconds\n        if (!path) return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"missing path\"\n        }, {\n            status: 400\n        });\n        const svc = (0,_lib_supabaseServer__WEBPACK_IMPORTED_MODULE_1__.createServiceClient)();\n        const bucket = process.env.STORAGE_BUCKET || \"locker\";\n        const { data, error } = await svc.storage.from(bucket).createSignedUploadUrl(path, expires);\n        if (error) {\n            console.error(\"createSignedUploadUrl error\", error);\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: error.message || \"create signed upload url failed\"\n            }, {\n                status: 500\n            });\n        }\n        // normalize field name for client convenience\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            signedUploadUrl: data?.signedUploadUrl || data?.signedUrl || data?.signedUploadUrl\n        }, {\n            status: 200\n        });\n    } catch (err) {\n        console.error(\"upload-url unexpected error\", err);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: String(err)\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL3VwbG9hZC11cmwvcm91dGUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsOEJBQThCO0FBQ2E7QUFDdUI7QUFFM0QsZUFBZUUsS0FBS0MsR0FBWTtJQUNyQyxJQUFJO1FBQ0YsTUFBTUMsT0FBTyxNQUFNRCxJQUFJRSxJQUFJLEdBQUdDLEtBQUssQ0FBQyxJQUFPLEVBQUM7UUFDNUMsTUFBTUMsT0FBT0gsTUFBTUc7UUFDbkIsTUFBTUMsVUFBVUosTUFBTUksV0FBVyxLQUFLLFVBQVU7UUFFaEQsSUFBSSxDQUFDRCxNQUFNLE9BQU9QLHFEQUFZQSxDQUFDSyxJQUFJLENBQUM7WUFBRUksT0FBTztRQUFlLEdBQUc7WUFBRUMsUUFBUTtRQUFJO1FBRTdFLE1BQU1DLE1BQU1WLHdFQUFtQkE7UUFDL0IsTUFBTVcsU0FBU0MsUUFBUUMsR0FBRyxDQUFDQyxjQUFjLElBQUk7UUFFN0MsTUFBTSxFQUFFQyxJQUFJLEVBQUVQLEtBQUssRUFBRSxHQUFHLE1BQU1FLElBQUlNLE9BQU8sQ0FBQ0MsSUFBSSxDQUFDTixRQUFRTyxxQkFBcUIsQ0FBQ1osTUFBTUM7UUFFbkYsSUFBSUMsT0FBTztZQUNUVyxRQUFRWCxLQUFLLENBQUMsK0JBQStCQTtZQUM3QyxPQUFPVCxxREFBWUEsQ0FBQ0ssSUFBSSxDQUFDO2dCQUFFSSxPQUFPQSxNQUFNWSxPQUFPLElBQUk7WUFBa0MsR0FBRztnQkFBRVgsUUFBUTtZQUFJO1FBQ3hHO1FBRUEsOENBQThDO1FBQzlDLE9BQU9WLHFEQUFZQSxDQUFDSyxJQUFJLENBQUM7WUFBRWlCLGlCQUFpQixNQUFlQSxtQkFBb0JOLE1BQWNPLGFBQWNQLE1BQWNNO1FBQWdCLEdBQUc7WUFBRVosUUFBUTtRQUFJO0lBQzVKLEVBQUUsT0FBT2MsS0FBUztRQUNoQkosUUFBUVgsS0FBSyxDQUFDLCtCQUErQmU7UUFDN0MsT0FBT3hCLHFEQUFZQSxDQUFDSyxJQUFJLENBQUM7WUFBRUksT0FBT2dCLE9BQU9EO1FBQUssR0FBRztZQUFFZCxRQUFRO1FBQUk7SUFDakU7QUFDRiIsInNvdXJjZXMiOlsid2VicGFjazovL3ZpZXdwb3J0Ly4vYXBwL2FwaS91cGxvYWQtdXJsL3JvdXRlLnRzPzQxMTAiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gYXBwL2FwaS91cGxvYWQtdXJsL3JvdXRlLnRzXG5pbXBvcnQgeyBOZXh0UmVzcG9uc2UgfSBmcm9tIFwibmV4dC9zZXJ2ZXJcIjtcbmltcG9ydCB7IGNyZWF0ZVNlcnZpY2VDbGllbnQgfSBmcm9tIFwiLi4vLi4vLi4vbGliL3N1cGFiYXNlU2VydmVyXCI7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBQT1NUKHJlcTogUmVxdWVzdCkge1xuICB0cnkge1xuICAgIGNvbnN0IGJvZHkgPSBhd2FpdCByZXEuanNvbigpLmNhdGNoKCgpID0+ICh7fSkpO1xuICAgIGNvbnN0IHBhdGggPSBib2R5Py5wYXRoO1xuICAgIGNvbnN0IGV4cGlyZXMgPSBib2R5Py5leHBpcmVzID8/IDEyMDsgLy8gc2Vjb25kc1xuXG4gICAgaWYgKCFwYXRoKSByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogXCJtaXNzaW5nIHBhdGhcIiB9LCB7IHN0YXR1czogNDAwIH0pO1xuXG4gICAgY29uc3Qgc3ZjID0gY3JlYXRlU2VydmljZUNsaWVudCgpO1xuICAgIGNvbnN0IGJ1Y2tldCA9IHByb2Nlc3MuZW52LlNUT1JBR0VfQlVDS0VUIHx8IFwibG9ja2VyXCI7XG5cbiAgICBjb25zdCB7IGRhdGEsIGVycm9yIH0gPSBhd2FpdCBzdmMuc3RvcmFnZS5mcm9tKGJ1Y2tldCkuY3JlYXRlU2lnbmVkVXBsb2FkVXJsKHBhdGgsIGV4cGlyZXMpO1xuXG4gICAgaWYgKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiY3JlYXRlU2lnbmVkVXBsb2FkVXJsIGVycm9yXCIsIGVycm9yKTtcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiBlcnJvci5tZXNzYWdlIHx8IFwiY3JlYXRlIHNpZ25lZCB1cGxvYWQgdXJsIGZhaWxlZFwiIH0sIHsgc3RhdHVzOiA1MDAgfSk7XG4gICAgfVxuXG4gICAgLy8gbm9ybWFsaXplIGZpZWxkIG5hbWUgZm9yIGNsaWVudCBjb252ZW5pZW5jZVxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IHNpZ25lZFVwbG9hZFVybDogKGRhdGEgYXMgYW55KT8uc2lnbmVkVXBsb2FkVXJsIHx8IChkYXRhIGFzIGFueSk/LnNpZ25lZFVybCB8fCAoZGF0YSBhcyBhbnkpPy5zaWduZWRVcGxvYWRVcmwgfSwgeyBzdGF0dXM6IDIwMCB9KTtcbiAgfSBjYXRjaCAoZXJyOmFueSkge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJ1cGxvYWQtdXJsIHVuZXhwZWN0ZWQgZXJyb3JcIiwgZXJyKTtcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogU3RyaW5nKGVycikgfSwgeyBzdGF0dXM6IDUwMCB9KTtcbiAgfVxufSJdLCJuYW1lcyI6WyJOZXh0UmVzcG9uc2UiLCJjcmVhdGVTZXJ2aWNlQ2xpZW50IiwiUE9TVCIsInJlcSIsImJvZHkiLCJqc29uIiwiY2F0Y2giLCJwYXRoIiwiZXhwaXJlcyIsImVycm9yIiwic3RhdHVzIiwic3ZjIiwiYnVja2V0IiwicHJvY2VzcyIsImVudiIsIlNUT1JBR0VfQlVDS0VUIiwiZGF0YSIsInN0b3JhZ2UiLCJmcm9tIiwiY3JlYXRlU2lnbmVkVXBsb2FkVXJsIiwiY29uc29sZSIsIm1lc3NhZ2UiLCJzaWduZWRVcGxvYWRVcmwiLCJzaWduZWRVcmwiLCJlcnIiLCJTdHJpbmciXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/api/upload-url/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/supabaseServer.ts":
/*!*******************************!*\
  !*** ./lib/supabaseServer.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createServiceClient: () => (/* binding */ createServiceClient)\n/* harmony export */ });\n/* harmony import */ var _supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @supabase/supabase-js */ \"(rsc)/./node_modules/@supabase/supabase-js/dist/module/index.js\");\n// lib/supabaseServer.ts\n\nfunction createServiceClient() {\n    const supabaseUrl = \"https://autjeqfggpqmppjavisr.supabase.co\";\n    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;\n    if (!supabaseUrl || !serviceKey) throw new Error(\"Missing Supabase env vars\");\n    return (0,_supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__.createClient)(supabaseUrl, serviceKey, {\n        auth: {\n            persistSession: false\n        }\n    });\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvc3VwYWJhc2VTZXJ2ZXIudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSx3QkFBd0I7QUFDNkI7QUFDOUMsU0FBU0M7SUFDZCxNQUFNQyxjQUFjQywwQ0FBb0M7SUFDeEQsTUFBTUcsYUFBYUgsUUFBUUMsR0FBRyxDQUFDRyx5QkFBeUI7SUFDeEQsSUFBSSxDQUFDTCxlQUFlLENBQUNJLFlBQVksTUFBTSxJQUFJRSxNQUFNO0lBQ2pELE9BQU9SLG1FQUFZQSxDQUFDRSxhQUFhSSxZQUFZO1FBQUVHLE1BQU07WUFBRUMsZ0JBQWdCO1FBQU07SUFBRTtBQUNqRiIsInNvdXJjZXMiOlsid2VicGFjazovL3ZpZXdwb3J0Ly4vbGliL3N1cGFiYXNlU2VydmVyLnRzP2M3OGMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gbGliL3N1cGFiYXNlU2VydmVyLnRzXG5pbXBvcnQgeyBjcmVhdGVDbGllbnQgfSBmcm9tIFwiQHN1cGFiYXNlL3N1cGFiYXNlLWpzXCI7XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2VydmljZUNsaWVudCgpIHtcbiAgY29uc3Qgc3VwYWJhc2VVcmwgPSBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19TVVBBQkFTRV9VUkw7XG4gIGNvbnN0IHNlcnZpY2VLZXkgPSBwcm9jZXNzLmVudi5TVVBBQkFTRV9TRVJWSUNFX1JPTEVfS0VZO1xuICBpZiAoIXN1cGFiYXNlVXJsIHx8ICFzZXJ2aWNlS2V5KSB0aHJvdyBuZXcgRXJyb3IoXCJNaXNzaW5nIFN1cGFiYXNlIGVudiB2YXJzXCIpO1xuICByZXR1cm4gY3JlYXRlQ2xpZW50KHN1cGFiYXNlVXJsLCBzZXJ2aWNlS2V5LCB7IGF1dGg6IHsgcGVyc2lzdFNlc3Npb246IGZhbHNlIH0gfSk7XG59Il0sIm5hbWVzIjpbImNyZWF0ZUNsaWVudCIsImNyZWF0ZVNlcnZpY2VDbGllbnQiLCJzdXBhYmFzZVVybCIsInByb2Nlc3MiLCJlbnYiLCJORVhUX1BVQkxJQ19TVVBBQkFTRV9VUkwiLCJzZXJ2aWNlS2V5IiwiU1VQQUJBU0VfU0VSVklDRV9ST0xFX0tFWSIsIkVycm9yIiwiYXV0aCIsInBlcnNpc3RTZXNzaW9uIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./lib/supabaseServer.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@supabase","vendor-chunks/tr46","vendor-chunks/whatwg-url","vendor-chunks/webidl-conversions"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fupload-url%2Froute&page=%2Fapi%2Fupload-url%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fupload-url%2Froute.ts&appDir=%2FUsers%2Felliott%2FLibrary%2FCloudStorage%2FOneDrive-Personal%2FDesktop%2FViewport%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Felliott%2FLibrary%2FCloudStorage%2FOneDrive-Personal%2FDesktop%2FViewport&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();