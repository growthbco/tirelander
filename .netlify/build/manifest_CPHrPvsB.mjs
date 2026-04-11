import '@astrojs/internal-helpers/path';
import '@astrojs/internal-helpers/remote';
import 'piccolore';
import { N as NOOP_MIDDLEWARE_HEADER, g as decodeKey } from './chunks/astro/server_zcBE9Wbl.mjs';
import 'clsx';
import 'es-module-lexer';
import 'html-escaper';

const NOOP_MIDDLEWARE_FN = async (_ctx, next) => {
  const response = await next();
  response.headers.set(NOOP_MIDDLEWARE_HEADER, "true");
  return response;
};

const codeToStatusMap = {
  // Implemented from IANA HTTP Status Code Registry
  // https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  PAYMENT_REQUIRED: 402,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  NOT_ACCEPTABLE: 406,
  PROXY_AUTHENTICATION_REQUIRED: 407,
  REQUEST_TIMEOUT: 408,
  CONFLICT: 409,
  GONE: 410,
  LENGTH_REQUIRED: 411,
  PRECONDITION_FAILED: 412,
  CONTENT_TOO_LARGE: 413,
  URI_TOO_LONG: 414,
  UNSUPPORTED_MEDIA_TYPE: 415,
  RANGE_NOT_SATISFIABLE: 416,
  EXPECTATION_FAILED: 417,
  MISDIRECTED_REQUEST: 421,
  UNPROCESSABLE_CONTENT: 422,
  LOCKED: 423,
  FAILED_DEPENDENCY: 424,
  TOO_EARLY: 425,
  UPGRADE_REQUIRED: 426,
  PRECONDITION_REQUIRED: 428,
  TOO_MANY_REQUESTS: 429,
  REQUEST_HEADER_FIELDS_TOO_LARGE: 431,
  UNAVAILABLE_FOR_LEGAL_REASONS: 451,
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
  HTTP_VERSION_NOT_SUPPORTED: 505,
  VARIANT_ALSO_NEGOTIATES: 506,
  INSUFFICIENT_STORAGE: 507,
  LOOP_DETECTED: 508,
  NETWORK_AUTHENTICATION_REQUIRED: 511
};
Object.entries(codeToStatusMap).reduce(
  // reverse the key-value pairs
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {}
);

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///Users/garysanchez/Desktop/1Cursor%20Projects/Tire%20Morency/","cacheDir":"file:///Users/garysanchez/Desktop/1Cursor%20Projects/Tire%20Morency/node_modules/.astro/","outDir":"file:///Users/garysanchez/Desktop/1Cursor%20Projects/Tire%20Morency/dist/","srcDir":"file:///Users/garysanchez/Desktop/1Cursor%20Projects/Tire%20Morency/src/","publicDir":"file:///Users/garysanchez/Desktop/1Cursor%20Projects/Tire%20Morency/public/","buildClientDir":"file:///Users/garysanchez/Desktop/1Cursor%20Projects/Tire%20Morency/dist/","buildServerDir":"file:///Users/garysanchez/Desktop/1Cursor%20Projects/Tire%20Morency/.netlify/build/","adapterName":"@astrojs/netlify","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"services/battery-delivery/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/services/battery-delivery","isIndex":false,"type":"page","pattern":"^\\/services\\/battery-delivery\\/?$","segments":[[{"content":"services","dynamic":false,"spread":false}],[{"content":"battery-delivery","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/services/battery-delivery.astro","pathname":"/services/battery-delivery","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"services/commercial-truck-tires/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/services/commercial-truck-tires","isIndex":false,"type":"page","pattern":"^\\/services\\/commercial-truck-tires\\/?$","segments":[[{"content":"services","dynamic":false,"spread":false}],[{"content":"commercial-truck-tires","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/services/commercial-truck-tires.astro","pathname":"/services/commercial-truck-tires","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"services/fuel-delivery/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/services/fuel-delivery","isIndex":false,"type":"page","pattern":"^\\/services\\/fuel-delivery\\/?$","segments":[[{"content":"services","dynamic":false,"spread":false}],[{"content":"fuel-delivery","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/services/fuel-delivery.astro","pathname":"/services/fuel-delivery","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"services/heavy-equipment-tires/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/services/heavy-equipment-tires","isIndex":false,"type":"page","pattern":"^\\/services\\/heavy-equipment-tires\\/?$","segments":[[{"content":"services","dynamic":false,"spread":false}],[{"content":"heavy-equipment-tires","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/services/heavy-equipment-tires.astro","pathname":"/services/heavy-equipment-tires","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"services/jump-starts/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/services/jump-starts","isIndex":false,"type":"page","pattern":"^\\/services\\/jump-starts\\/?$","segments":[[{"content":"services","dynamic":false,"spread":false}],[{"content":"jump-starts","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/services/jump-starts.astro","pathname":"/services/jump-starts","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"services/lockout-service/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/services/lockout-service","isIndex":false,"type":"page","pattern":"^\\/services\\/lockout-service\\/?$","segments":[[{"content":"services","dynamic":false,"spread":false}],[{"content":"lockout-service","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/services/lockout-service.astro","pathname":"/services/lockout-service","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"services/tire-pressure/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/services/tire-pressure","isIndex":false,"type":"page","pattern":"^\\/services\\/tire-pressure\\/?$","segments":[[{"content":"services","dynamic":false,"spread":false}],[{"content":"tire-pressure","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/services/tire-pressure.astro","pathname":"/services/tire-pressure","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"services/tire-repair/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/services/tire-repair","isIndex":false,"type":"page","pattern":"^\\/services\\/tire-repair\\/?$","segments":[[{"content":"services","dynamic":false,"spread":false}],[{"content":"tire-repair","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/services/tire-repair.astro","pathname":"/services/tire-repair","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"thank-you/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/thank-you","isIndex":false,"type":"page","pattern":"^\\/thank-you\\/?$","segments":[[{"content":"thank-you","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/thank-you.astro","pathname":"/thank-you","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/garysanchez/Desktop/1Cursor Projects/Tire Morency/src/pages/services/battery-delivery.astro",{"propagation":"none","containsHead":true}],["/Users/garysanchez/Desktop/1Cursor Projects/Tire Morency/src/pages/services/commercial-truck-tires.astro",{"propagation":"none","containsHead":true}],["/Users/garysanchez/Desktop/1Cursor Projects/Tire Morency/src/pages/services/fuel-delivery.astro",{"propagation":"none","containsHead":true}],["/Users/garysanchez/Desktop/1Cursor Projects/Tire Morency/src/pages/services/heavy-equipment-tires.astro",{"propagation":"none","containsHead":true}],["/Users/garysanchez/Desktop/1Cursor Projects/Tire Morency/src/pages/services/jump-starts.astro",{"propagation":"none","containsHead":true}],["/Users/garysanchez/Desktop/1Cursor Projects/Tire Morency/src/pages/services/lockout-service.astro",{"propagation":"none","containsHead":true}],["/Users/garysanchez/Desktop/1Cursor Projects/Tire Morency/src/pages/services/tire-pressure.astro",{"propagation":"none","containsHead":true}],["/Users/garysanchez/Desktop/1Cursor Projects/Tire Morency/src/pages/services/tire-repair.astro",{"propagation":"none","containsHead":true}],["/Users/garysanchez/Desktop/1Cursor Projects/Tire Morency/src/pages/index.astro",{"propagation":"none","containsHead":true}],["/Users/garysanchez/Desktop/1Cursor Projects/Tire Morency/src/pages/thank-you.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000virtual:astro:actions/noop-entrypoint":"noop-entrypoint.mjs","\u0000@astro-page:src/pages/services/battery-delivery@_@astro":"pages/services/battery-delivery.astro.mjs","\u0000@astro-page:src/pages/services/commercial-truck-tires@_@astro":"pages/services/commercial-truck-tires.astro.mjs","\u0000@astro-page:src/pages/services/fuel-delivery@_@astro":"pages/services/fuel-delivery.astro.mjs","\u0000@astro-page:src/pages/services/heavy-equipment-tires@_@astro":"pages/services/heavy-equipment-tires.astro.mjs","\u0000@astro-page:src/pages/services/jump-starts@_@astro":"pages/services/jump-starts.astro.mjs","\u0000@astro-page:src/pages/services/lockout-service@_@astro":"pages/services/lockout-service.astro.mjs","\u0000@astro-page:src/pages/services/tire-pressure@_@astro":"pages/services/tire-pressure.astro.mjs","\u0000@astro-page:src/pages/services/tire-repair@_@astro":"pages/services/tire-repair.astro.mjs","\u0000@astro-page:src/pages/thank-you@_@astro":"pages/thank-you.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_CPHrPvsB.mjs","/Users/garysanchez/Desktop/1Cursor Projects/Tire Morency/node_modules/unstorage/drivers/netlify-blobs.mjs":"chunks/netlify-blobs_DM36vZAS.mjs","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/services/battery-delivery/index.html","/services/commercial-truck-tires/index.html","/services/fuel-delivery/index.html","/services/heavy-equipment-tires/index.html","/services/jump-starts/index.html","/services/lockout-service/index.html","/services/tire-pressure/index.html","/services/tire-repair/index.html","/thank-you/index.html","/index.html"],"buildFormat":"directory","checkOrigin":true,"allowedDomains":[],"actionBodySizeLimit":1048576,"serverIslandNameMap":[],"key":"nOc7FRDWoEDKzq1YasXr9VZoGizx3nDzhfV7IA5TuOs=","sessionConfig":{"driver":"netlify-blobs","options":{"name":"astro-sessions","consistency":"strong"}}});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = () => import('./chunks/netlify-blobs_DM36vZAS.mjs');

export { manifest };
