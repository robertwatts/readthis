import 'kleur/colors';
import { g as decodeKey } from './chunks/astro/server_DO4NAuY_.mjs';
import 'clsx';
import 'cookie';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_DwKJahX7.mjs';
import 'es-module-lexer';

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

const manifest = deserializeManifest({"hrefRoot":"file:///home/runner/work/readthis/readthis/","cacheDir":"file:///home/runner/work/readthis/readthis/node_modules/.astro/","outDir":"file:///home/runner/work/readthis/readthis/dist/","srcDir":"file:///home/runner/work/readthis/readthis/src/","publicDir":"file:///home/runner/work/readthis/readthis/public/","buildClientDir":"file:///home/runner/work/readthis/readthis/dist/client/","buildServerDir":"file:///home/runner/work/readthis/readthis/dist/server/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/books.kDTVPhQN.css"}],"routeData":{"route":"/books/add","isIndex":false,"type":"page","pattern":"^\\/books\\/add\\/?$","segments":[[{"content":"books","dynamic":false,"spread":false}],[{"content":"add","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/books/add.astro","pathname":"/books/add","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/books.kDTVPhQN.css"}],"routeData":{"route":"/books/[isbn]","isIndex":false,"type":"page","pattern":"^\\/books\\/([^/]+?)\\/?$","segments":[[{"content":"books","dynamic":false,"spread":false}],[{"content":"isbn","dynamic":true,"spread":false}]],"params":["isbn"],"component":"src/pages/books/[isbn].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/books.kDTVPhQN.css"}],"routeData":{"route":"/books","isIndex":false,"type":"page","pattern":"^\\/books\\/?$","segments":[[{"content":"books","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/books.astro","pathname":"/books","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/books.kDTVPhQN.css"},{"type":"inline","content":"#background[data-astro-cid-23t3we56]{position:fixed;top:0;left:0;width:100%;height:100%;z-index:-1;filter:blur(100px)}#container[data-astro-cid-23t3we56]{font-family:Inter,Roboto,Helvetica Neue,Arial Nova,Nimbus Sans,Arial,sans-serif;height:100%}main[data-astro-cid-23t3we56]{height:100%;display:flex;justify-content:center}#hero[data-astro-cid-23t3we56]{display:flex;align-items:start;flex-direction:column;justify-content:center;padding:16px}h1[data-astro-cid-23t3we56]{font-size:22px;margin-top:.25em}#links[data-astro-cid-23t3we56]{display:flex;gap:16px}#links[data-astro-cid-23t3we56] a[data-astro-cid-23t3we56]{display:flex;align-items:center;padding:10px 12px;color:#111827;text-decoration:none;transition:color .2s}#links[data-astro-cid-23t3we56] a[data-astro-cid-23t3we56]:hover{color:#4e5056}#links[data-astro-cid-23t3we56] a[data-astro-cid-23t3we56] svg[data-astro-cid-23t3we56]{height:1em;margin-left:8px}#links[data-astro-cid-23t3we56] a[data-astro-cid-23t3we56].button{color:#fff;background:linear-gradient(83.21deg,#3245ff,#bc52ee);box-shadow:inset 0 0 0 1px #ffffff1f,inset 0 -2px #0000003d;border-radius:10px}#links[data-astro-cid-23t3we56] a[data-astro-cid-23t3we56].button:hover{color:#e6e6e6;box-shadow:none}h2[data-astro-cid-23t3we56]{margin:0 0 1em;font-weight:400;color:#111827;font-size:20px}p[data-astro-cid-23t3we56]{color:#4b5563;font-size:16px;line-height:24px;letter-spacing:-.006em;margin:0}.box[data-astro-cid-23t3we56]{padding:16px;background:#fff;border-radius:16px;border:1px solid white}#news[data-astro-cid-23t3we56]{position:absolute;bottom:16px;right:16px;max-width:300px;text-decoration:none;transition:background .2s;-webkit-backdrop-filter:blur(50px);backdrop-filter:blur(50px)}#news[data-astro-cid-23t3we56]:hover{background:#ffffff8c}@media screen and (max-height: 368px){#news[data-astro-cid-23t3we56]{display:none}}@media screen and (max-width: 768px){#container[data-astro-cid-23t3we56]{display:flex;flex-direction:column}#hero[data-astro-cid-23t3we56]{display:block;padding-top:10%}#links[data-astro-cid-23t3we56]{flex-wrap:wrap}#links[data-astro-cid-23t3we56] a[data-astro-cid-23t3we56].button{padding:14px 18px}#news[data-astro-cid-23t3we56]{right:16px;left:16px;bottom:2.5rem;max-width:100%}h1[data-astro-cid-23t3we56]{line-height:1.5}}\n"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/home/runner/work/readthis/readthis/src/pages/books.astro",{"propagation":"none","containsHead":true}],["/home/runner/work/readthis/readthis/src/pages/books/[isbn].astro",{"propagation":"none","containsHead":true}],["/home/runner/work/readthis/readthis/src/pages/books/add.astro",{"propagation":"none","containsHead":true}],["/home/runner/work/readthis/readthis/src/pages/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:src/pages/books/[isbn]@_@astro":"pages/books/_isbn_.astro.mjs","\u0000@astro-page:src/pages/books@_@astro":"pages/books.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-page:src/pages/books/add@_@astro":"pages/books/add.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","/home/runner/work/readthis/readthis/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_YaCQz727.mjs","\u0000@astrojs-manifest":"manifest_CVZmBvIu.mjs","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/astro.Dm8K3lV8.svg","/_astro/background.BPKAcmfN.svg","/_astro/books.kDTVPhQN.css","/favicon.svg"],"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[],"key":"MaQYbvtmuqIG1Iiq5w/W5knXXCNUTtbA+LipFBGvWqs="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
