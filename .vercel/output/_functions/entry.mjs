import { renderers } from './renderers.mjs';
import { c as createExports } from './chunks/entrypoint_QtfR9n77.mjs';
import { manifest } from './manifest_CVZmBvIu.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/books/add.astro.mjs');
const _page2 = () => import('./pages/books/_isbn_.astro.mjs');
const _page3 = () => import('./pages/books.astro.mjs');
const _page4 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/books/add.astro", _page1],
    ["src/pages/books/[isbn].astro", _page2],
    ["src/pages/books.astro", _page3],
    ["src/pages/index.astro", _page4]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "86ac47db-5a10-452e-bbd3-59ec3e783a24",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };
