import { renderers } from './renderers.mjs';
import { s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_CvSoi7hX.mjs';
import { manifest } from './manifest_CPHrPvsB.mjs';
import { createExports } from '@astrojs/netlify/ssr-function.js';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/services/battery-delivery.astro.mjs');
const _page1 = () => import('./pages/services/commercial-truck-tires.astro.mjs');
const _page2 = () => import('./pages/services/fuel-delivery.astro.mjs');
const _page3 = () => import('./pages/services/heavy-equipment-tires.astro.mjs');
const _page4 = () => import('./pages/services/jump-starts.astro.mjs');
const _page5 = () => import('./pages/services/lockout-service.astro.mjs');
const _page6 = () => import('./pages/services/tire-pressure.astro.mjs');
const _page7 = () => import('./pages/services/tire-repair.astro.mjs');
const _page8 = () => import('./pages/thank-you.astro.mjs');
const _page9 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["src/pages/services/battery-delivery.astro", _page0],
    ["src/pages/services/commercial-truck-tires.astro", _page1],
    ["src/pages/services/fuel-delivery.astro", _page2],
    ["src/pages/services/heavy-equipment-tires.astro", _page3],
    ["src/pages/services/jump-starts.astro", _page4],
    ["src/pages/services/lockout-service.astro", _page5],
    ["src/pages/services/tire-pressure.astro", _page6],
    ["src/pages/services/tire-repair.astro", _page7],
    ["src/pages/thank-you.astro", _page8],
    ["src/pages/index.astro", _page9]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "70ff2f7c-9356-4789-9b09-445b814beb44"
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };
