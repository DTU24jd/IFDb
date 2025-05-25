(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/src_d26b8c._.js", {

"[project]/src/components/FavoriteButton.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
/*
  FavoriteButton omogućuje dodavanje ili uklanjanje serije iz favorita i prikazuje status bez preusmjeravanja.
  Zašto: Koristi se useEffect za dohvat trenutnog stanja favorita s backend API-ja kako bi se prikazao ispravan status tipke nakon mountanja ili promjene showId.
  Kako: handleToggleFavorite šalje POST ili DELETE zahtjev na /api/favorites ovisno o trenutnom statusu, a zatim ažurira lokalni state.
*/ __turbopack_esm__({
    "default": (()=>FavoriteButton)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_refresh__.signature();
'use client';
;
function FavoriteButton({ showId }) {
    _s();
    const [isFavorite, setIsFavorite] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // useEffect dohvaća favorite s backend API-ja kad se promijeni showId
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FavoriteButton.useEffect": ()=>{
            fetch('/api/favorites').then({
                "FavoriteButton.useEffect": (res)=>res.json()
            }["FavoriteButton.useEffect"]).then({
                "FavoriteButton.useEffect": (ids)=>setIsFavorite(ids.includes(showId))
            }["FavoriteButton.useEffect"]);
        }
    }["FavoriteButton.useEffect"], [
        showId
    ]);
    // handleToggleFavorite šalje POST ili DELETE zahtjev ovisno o statusu
    const handleToggleFavorite = async ()=>{
        setLoading(true);
        if (isFavorite) {
            await fetch('/api/favorites', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: showId
                })
            });
            setIsFavorite(false);
        } else {
            await fetch('/api/favorites', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: showId
                })
            });
            setIsFavorite(true);
        }
        setLoading(false);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: handleToggleFavorite,
        disabled: loading,
        className: `px-4 py-2 rounded font-bold transition ${isFavorite ? 'bg-red-400 text-red-900 hover:bg-red-500' : 'bg-yellow-400 text-yellow-900 hover:bg-yellow-500'}`,
        children: loading ? 'Spremanje...' : isFavorite ? 'Izbaci iz favorita' : 'Dodaj u favorite'
    }, void 0, false, {
        fileName: "[project]/src/components/FavoriteButton.tsx",
        lineNumber: 43,
        columnNumber: 5
    }, this);
}
_s(FavoriteButton, "8Dh5jaLY7Ck0+vVXhMUFJQibJSo=");
_c = FavoriteButton;
var _c;
__turbopack_refresh__.register(_c, "FavoriteButton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/shows/[id]/page.tsx [app-rsc] (ecmascript, Next.js server component, client modules)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
}}),
}]);

//# sourceMappingURL=src_d26b8c._.js.map