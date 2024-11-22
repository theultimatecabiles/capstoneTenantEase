import process from 'node:process';globalThis._importMeta_={url:import.meta.url,env:process.env};import { mkdirSync } from 'node:fs';
import { Server } from 'node:http';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { parentPort, threadId } from 'node:worker_threads';
import { getRequestHeader, splitCookiesString, setResponseStatus, setResponseHeader, send, getRequestHeaders, defineEventHandler, handleCacheHeaders, createEvent, fetchWithEvent, isEvent, eventHandler, setHeaders, sendRedirect, proxyRequest, createApp, createRouter as createRouter$1, toNodeListener, lazyEventHandler, getResponseStatus, setResponseHeaders, createError, getRouterParam, getQuery as getQuery$1, readBody, getHeaders, getResponseStatusText } from 'file://C:/Users/reyan/OneDrive/Desktop/CAPSTONE/client/node_modules/.pnpm/h3@1.13.0/node_modules/h3/dist/index.mjs';
import { PrismaClient } from 'file://C:/Users/reyan/OneDrive/Desktop/CAPSTONE/client/node_modules/.pnpm/@prisma+client@5.22.0_prisma@5.22.0/node_modules/@prisma/client/default.js';
import bcrypt from 'file://C:/Users/reyan/OneDrive/Desktop/CAPSTONE/client/node_modules/.pnpm/bcryptjs@2.4.3/node_modules/bcryptjs/index.js';
import jwt from 'file://C:/Users/reyan/OneDrive/Desktop/CAPSTONE/client/node_modules/.pnpm/jsonwebtoken@8.5.1/node_modules/jsonwebtoken/index.js';
import multer from 'file://C:/Users/reyan/OneDrive/Desktop/CAPSTONE/client/node_modules/.pnpm/multer@1.4.5-lts.1/node_modules/multer/index.js';
import path from 'path';
import fs from 'fs';
import nodemailer from 'file://C:/Users/reyan/OneDrive/Desktop/CAPSTONE/client/node_modules/.pnpm/nodemailer@6.9.16/node_modules/nodemailer/lib/nodemailer.js';
import { getRequestDependencies, getPreloadLinks, getPrefetchLinks, createRenderer } from 'file://C:/Users/reyan/OneDrive/Desktop/CAPSTONE/client/node_modules/.pnpm/vue-bundle-renderer@2.1.1/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import { stringify, uneval } from 'file://C:/Users/reyan/OneDrive/Desktop/CAPSTONE/client/node_modules/.pnpm/devalue@5.1.1/node_modules/devalue/index.js';
import destr from 'file://C:/Users/reyan/OneDrive/Desktop/CAPSTONE/client/node_modules/.pnpm/destr@2.0.3/node_modules/destr/dist/index.mjs';
import { withQuery, joinURL, withTrailingSlash, parseURL, withoutBase, getQuery, joinRelativeURL } from 'file://C:/Users/reyan/OneDrive/Desktop/CAPSTONE/client/node_modules/.pnpm/ufo@1.5.4/node_modules/ufo/dist/index.mjs';
import { renderToString } from 'file://C:/Users/reyan/OneDrive/Desktop/CAPSTONE/client/node_modules/.pnpm/vue@3.5.13_typescript@5.6.3/node_modules/vue/server-renderer/index.mjs';
import { propsToString, renderSSRHead } from 'file://C:/Users/reyan/OneDrive/Desktop/CAPSTONE/client/node_modules/.pnpm/@unhead+ssr@1.11.11/node_modules/@unhead/ssr/dist/index.mjs';
import { createServerHead as createServerHead$1, CapoPlugin } from 'file://C:/Users/reyan/OneDrive/Desktop/CAPSTONE/client/node_modules/.pnpm/unhead@1.11.11/node_modules/unhead/dist/index.mjs';
import { klona } from 'file://C:/Users/reyan/OneDrive/Desktop/CAPSTONE/client/node_modules/.pnpm/klona@2.0.6/node_modules/klona/dist/index.mjs';
import defu, { defuFn } from 'file://C:/Users/reyan/OneDrive/Desktop/CAPSTONE/client/node_modules/.pnpm/defu@6.1.4/node_modules/defu/dist/defu.mjs';
import { snakeCase } from 'file://C:/Users/reyan/OneDrive/Desktop/CAPSTONE/client/node_modules/.pnpm/scule@1.3.0/node_modules/scule/dist/index.mjs';
import { createHooks } from 'file://C:/Users/reyan/OneDrive/Desktop/CAPSTONE/client/node_modules/.pnpm/hookable@5.5.3/node_modules/hookable/dist/index.mjs';
import { createFetch as createFetch$1, Headers as Headers$1 } from 'file://C:/Users/reyan/OneDrive/Desktop/CAPSTONE/client/node_modules/.pnpm/ofetch@1.4.1/node_modules/ofetch/dist/node.mjs';
import { createCall, createFetch } from 'file://C:/Users/reyan/OneDrive/Desktop/CAPSTONE/client/node_modules/.pnpm/unenv@1.10.0/node_modules/unenv/runtime/fetch/index.mjs';
import { AsyncLocalStorage } from 'node:async_hooks';
import { consola } from 'file://C:/Users/reyan/OneDrive/Desktop/CAPSTONE/client/node_modules/.pnpm/consola@3.2.3/node_modules/consola/dist/index.mjs';
import { getContext } from 'file://C:/Users/reyan/OneDrive/Desktop/CAPSTONE/client/node_modules/.pnpm/unctx@2.3.1/node_modules/unctx/dist/index.mjs';
import { captureRawStackTrace, parseRawStackTrace } from 'file://C:/Users/reyan/OneDrive/Desktop/CAPSTONE/client/node_modules/.pnpm/errx@0.1.0/node_modules/errx/dist/index.js';
import { isVNode, version, unref } from 'file://C:/Users/reyan/OneDrive/Desktop/CAPSTONE/client/node_modules/.pnpm/vue@3.5.13_typescript@5.6.3/node_modules/vue/index.mjs';
import { hash } from 'file://C:/Users/reyan/OneDrive/Desktop/CAPSTONE/client/node_modules/.pnpm/ohash@1.1.4/node_modules/ohash/dist/index.mjs';
import { createStorage, prefixStorage } from 'file://C:/Users/reyan/OneDrive/Desktop/CAPSTONE/client/node_modules/.pnpm/unstorage@1.13.1_ioredis@5.4.1/node_modules/unstorage/dist/index.mjs';
import unstorage_47drivers_47fs from 'file://C:/Users/reyan/OneDrive/Desktop/CAPSTONE/client/node_modules/.pnpm/unstorage@1.13.1_ioredis@5.4.1/node_modules/unstorage/drivers/fs.mjs';
import { toRouteMatcher, createRouter } from 'file://C:/Users/reyan/OneDrive/Desktop/CAPSTONE/client/node_modules/.pnpm/radix3@1.1.2/node_modules/radix3/dist/index.mjs';
import { defineHeadPlugin } from 'file://C:/Users/reyan/OneDrive/Desktop/CAPSTONE/client/node_modules/.pnpm/@unhead+shared@1.11.11/node_modules/@unhead/shared/dist/index.mjs';

function hasReqHeader(event, name, includes) {
  const value = getRequestHeader(event, name);
  return value && typeof value === "string" && value.toLowerCase().includes(includes);
}
function isJsonRequest(event) {
  if (hasReqHeader(event, "accept", "text/html")) {
    return false;
  }
  return hasReqHeader(event, "accept", "application/json") || hasReqHeader(event, "user-agent", "curl/") || hasReqHeader(event, "user-agent", "httpie/") || hasReqHeader(event, "sec-fetch-mode", "cors") || event.path.startsWith("/api/") || event.path.endsWith(".json");
}
function normalizeError(error, isDev) {
  const cwd = typeof process.cwd === "function" ? process.cwd() : "/";
  const stack = (error.unhandled || error.fatal) ? [] : (error.stack || "").split("\n").splice(1).filter((line) => line.includes("at ")).map((line) => {
    const text = line.replace(cwd + "/", "./").replace("webpack:/", "").replace("file://", "").trim();
    return {
      text,
      internal: line.includes("node_modules") && !line.includes(".cache") || line.includes("internal") || line.includes("new Promise")
    };
  });
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage ?? (statusCode === 404 ? "Not Found" : "");
  const message = error.unhandled ? "internal server error" : error.message || error.toString();
  return {
    stack,
    statusCode,
    statusMessage,
    message
  };
}
function _captureError(error, type) {
  console.error(`[nitro] [${type}]`, error);
  useNitroApp().captureError(error, { tags: [type] });
}
function trapUnhandledNodeErrors() {
  process.on(
    "unhandledRejection",
    (error) => _captureError(error, "unhandledRejection")
  );
  process.on(
    "uncaughtException",
    (error) => _captureError(error, "uncaughtException")
  );
}
function joinHeaders(value) {
  return Array.isArray(value) ? value.join(", ") : String(value);
}
function normalizeFetchResponse(response) {
  if (!response.headers.has("set-cookie")) {
    return response;
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: normalizeCookieHeaders(response.headers)
  });
}
function normalizeCookieHeader(header = "") {
  return splitCookiesString(joinHeaders(header));
}
function normalizeCookieHeaders(headers) {
  const outgoingHeaders = new Headers();
  for (const [name, header] of headers) {
    if (name === "set-cookie") {
      for (const cookie of normalizeCookieHeader(header)) {
        outgoingHeaders.append("set-cookie", cookie);
      }
    } else {
      outgoingHeaders.set(name, joinHeaders(header));
    }
  }
  return outgoingHeaders;
}

const errorHandler = (async function errorhandler(error, event) {
  const { stack, statusCode, statusMessage, message } = normalizeError(error);
  const errorObject = {
    url: event.path,
    statusCode,
    statusMessage,
    message,
    stack: statusCode !== 404 ? `<pre>${stack.map((i) => `<span class="stack${i.internal ? " internal" : ""}">${i.text}</span>`).join("\n")}</pre>` : "",
    // TODO: check and validate error.data for serialisation into query
    data: error.data
  };
  if (error.unhandled || error.fatal) {
    const tags = [
      "[nuxt]",
      "[request error]",
      error.unhandled && "[unhandled]",
      error.fatal && "[fatal]",
      Number(errorObject.statusCode) !== 200 && `[${errorObject.statusCode}]`
    ].filter(Boolean).join(" ");
    console.error(tags, (error.message || error.toString() || "internal server error") + "\n" + stack.map((l) => "  " + l.text).join("  \n"));
  }
  if (event.handled) {
    return;
  }
  setResponseStatus(event, errorObject.statusCode !== 200 && errorObject.statusCode || 500, errorObject.statusMessage);
  if (isJsonRequest(event)) {
    setResponseHeader(event, "Content-Type", "application/json");
    return send(event, JSON.stringify(errorObject));
  }
  const reqHeaders = getRequestHeaders(event);
  const isRenderingError = event.path.startsWith("/__nuxt_error") || !!reqHeaders["x-nuxt-error"];
  const res = isRenderingError ? null : await useNitroApp().localFetch(
    withQuery(joinURL(useRuntimeConfig(event).app.baseURL, "/__nuxt_error"), errorObject),
    {
      headers: { ...reqHeaders, "x-nuxt-error": "true" },
      redirect: "manual"
    }
  ).catch(() => null);
  if (!res) {
    const { template } = await Promise.resolve().then(function () { return errorDev; }) ;
    {
      errorObject.description = errorObject.message;
    }
    if (event.handled) {
      return;
    }
    setResponseHeader(event, "Content-Type", "text/html;charset=UTF-8");
    return send(event, template(errorObject));
  }
  const html = await res.text();
  if (event.handled) {
    return;
  }
  for (const [header, value] of res.headers.entries()) {
    setResponseHeader(event, header, value);
  }
  setResponseStatus(event, res.status && res.status !== 200 ? res.status : void 0, res.statusText);
  return send(event, html);
});

const script = `
if (!window.__NUXT_DEVTOOLS_TIME_METRIC__) {
  Object.defineProperty(window, '__NUXT_DEVTOOLS_TIME_METRIC__', {
    value: {},
    enumerable: false,
    configurable: true,
  })
}
window.__NUXT_DEVTOOLS_TIME_METRIC__.appInit = Date.now()
`;

const _i259glEabP = (function(nitro) {
  nitro.hooks.hook("render:html", (htmlContext) => {
    htmlContext.head.push(`<script>${script}<\/script>`);
  });
});

const rootDir = "C:/Users/reyan/OneDrive/Desktop/CAPSTONE/client";

const appHead = {"meta":[{"name":"viewport","content":"width=device-width, initial-scale=1"},{"charset":"utf-8"}],"link":[],"style":[],"script":[],"noscript":[]};

const appRootTag = "div";

const appRootAttrs = {"id":"__nuxt"};

const appTeleportTag = "div";

const appTeleportAttrs = {"id":"teleports"};

const appId = "nuxt-app";

const devReducers = {
  VNode: (data) => isVNode(data) ? { type: data.type, props: data.props } : void 0,
  URL: (data) => data instanceof URL ? data.toString() : void 0
};
const asyncContext = getContext("nuxt-dev", { asyncContext: true, AsyncLocalStorage });
const _NeIAisYwjP = (nitroApp) => {
  const handler = nitroApp.h3App.handler;
  nitroApp.h3App.handler = (event) => {
    return asyncContext.callAsync({ logs: [], event }, () => handler(event));
  };
  onConsoleLog((_log) => {
    const ctx = asyncContext.tryUse();
    if (!ctx) {
      return;
    }
    const rawStack = captureRawStackTrace();
    if (!rawStack || rawStack.includes("runtime/vite-node.mjs")) {
      return;
    }
    const trace = [];
    let filename = "";
    for (const entry of parseRawStackTrace(rawStack)) {
      if (entry.source === globalThis._importMeta_.url) {
        continue;
      }
      if (EXCLUDE_TRACE_RE.test(entry.source)) {
        continue;
      }
      filename ||= entry.source.replace(withTrailingSlash(rootDir), "");
      trace.push({
        ...entry,
        source: entry.source.startsWith("file://") ? entry.source.replace("file://", "") : entry.source
      });
    }
    const log = {
      ..._log,
      // Pass along filename to allow the client to display more info about where log comes from
      filename,
      // Clean up file names in stack trace
      stack: trace
    };
    ctx.logs.push(log);
  });
  nitroApp.hooks.hook("afterResponse", () => {
    const ctx = asyncContext.tryUse();
    if (!ctx) {
      return;
    }
    return nitroApp.hooks.callHook("dev:ssr-logs", { logs: ctx.logs, path: ctx.event.path });
  });
  nitroApp.hooks.hook("render:html", (htmlContext) => {
    const ctx = asyncContext.tryUse();
    if (!ctx) {
      return;
    }
    try {
      const reducers = Object.assign(/* @__PURE__ */ Object.create(null), devReducers, ctx.event.context._payloadReducers);
      htmlContext.bodyAppend.unshift(`<script type="application/json" data-nuxt-logs="${appId}">${stringify(ctx.logs, reducers)}<\/script>`);
    } catch (e) {
      const shortError = e instanceof Error && "toString" in e ? ` Received \`${e.toString()}\`.` : "";
      console.warn(`[nuxt] Failed to stringify dev server logs.${shortError} You can define your own reducer/reviver for rich types following the instructions in https://nuxt.com/docs/api/composables/use-nuxt-app#payload.`);
    }
  });
};
const EXCLUDE_TRACE_RE = /\/node_modules\/(?:.*\/)?(?:nuxt|nuxt-nightly|nuxt-edge|nuxt3|consola|@vue)\/|core\/runtime\/nitro/;
function onConsoleLog(callback) {
  consola.addReporter({
    log(logObj) {
      callback(logObj);
    }
  });
  consola.wrapConsole();
}

const plugins = [
  _i259glEabP,
_NeIAisYwjP
];

const _lazy_shNhRb = () => Promise.resolve().then(function () { return amenities$1; });
const _lazy_iGDm3k = () => Promise.resolve().then(function () { return auth$1; });
const _lazy_eeSsuf = () => Promise.resolve().then(function () { return booking_post$1; });
const _lazy_5vdB6H = () => Promise.resolve().then(function () { return approve$1; });
const _lazy_zW9PDe = () => Promise.resolve().then(function () { return checkFirstPayment$1; });
const _lazy_tIjgCY = () => Promise.resolve().then(function () { return getActiveBookings$1; });
const _lazy_a3DTHq = () => Promise.resolve().then(function () { return getHostBooking$1; });
const _lazy_K2mgrp = () => Promise.resolve().then(function () { return getLatestPaymentDue$1; });
const _lazy_z6iObN = () => Promise.resolve().then(function () { return getPaymentByBookingId$1; });
const _lazy_hsrBMd = () => Promise.resolve().then(function () { return getPayments$1; });
const _lazy_o1re7x = () => Promise.resolve().then(function () { return getUserBooking$1; });
const _lazy_Q2n8af = () => Promise.resolve().then(function () { return getUserListings$1; });
const _lazy_roCLCK = () => Promise.resolve().then(function () { return guestTypes$1; });
const _lazy_BELuZj = () => Promise.resolve().then(function () { return _listingId__get$3; });
const _lazy_YUVFdT = () => Promise.resolve().then(function () { return _listingId__get$1; });
const _lazy_b8Ospo = () => Promise.resolve().then(function () { return listings_get$1; });
const _lazy_yEOaV6 = () => Promise.resolve().then(function () { return listings_post$1; });
const _lazy_TK3v0Z = () => Promise.resolve().then(function () { return logout$1; });
const _lazy_8P8VHu = () => Promise.resolve().then(function () { return multerMiddleware; });
const _lazy_iqyYiU = () => Promise.resolve().then(function () { return notification_post$1; });
const _lazy_eIpIK0 = () => Promise.resolve().then(function () { return notifications_get$1; });
const _lazy_MEH76d = () => Promise.resolve().then(function () { return placeTypes$1; });
const _lazy_LZBetq = () => Promise.resolve().then(function () { return processPayment$1; });
const _lazy_MeNHom = () => Promise.resolve().then(function () { return updatelisting$1; });
const _lazy_OfIB0i = () => Promise.resolve().then(function () { return _userId__get$1; });
const _lazy_N60n4A = () => Promise.resolve().then(function () { return verifyEmail$1; });
const _lazy_gex9XZ = () => Promise.resolve().then(function () { return renderer$1; });

const handlers = [
  { route: '/api/amenities', handler: _lazy_shNhRb, lazy: true, middleware: false, method: undefined },
  { route: '/api/auth', handler: _lazy_iGDm3k, lazy: true, middleware: false, method: undefined },
  { route: '/api/booking', handler: _lazy_eeSsuf, lazy: true, middleware: false, method: "post" },
  { route: '/api/booking/approve', handler: _lazy_5vdB6H, lazy: true, middleware: false, method: undefined },
  { route: '/api/checkFirstPayment', handler: _lazy_zW9PDe, lazy: true, middleware: false, method: undefined },
  { route: '/api/getActiveBookings', handler: _lazy_tIjgCY, lazy: true, middleware: false, method: undefined },
  { route: '/api/getHostBooking', handler: _lazy_a3DTHq, lazy: true, middleware: false, method: undefined },
  { route: '/api/getLatestPaymentDue', handler: _lazy_K2mgrp, lazy: true, middleware: false, method: undefined },
  { route: '/api/getPaymentByBookingId', handler: _lazy_z6iObN, lazy: true, middleware: false, method: undefined },
  { route: '/api/getPayments', handler: _lazy_hsrBMd, lazy: true, middleware: false, method: undefined },
  { route: '/api/getUserBooking', handler: _lazy_o1re7x, lazy: true, middleware: false, method: undefined },
  { route: '/api/getUserListings', handler: _lazy_Q2n8af, lazy: true, middleware: false, method: undefined },
  { route: '/api/guestTypes', handler: _lazy_roCLCK, lazy: true, middleware: false, method: undefined },
  { route: '/api/hostlistingview/:listingId', handler: _lazy_BELuZj, lazy: true, middleware: false, method: "get" },
  { route: '/api/listing/:listingId', handler: _lazy_YUVFdT, lazy: true, middleware: false, method: "get" },
  { route: '/api/listings', handler: _lazy_b8Ospo, lazy: true, middleware: false, method: "get" },
  { route: '/api/listings', handler: _lazy_yEOaV6, lazy: true, middleware: false, method: "post" },
  { route: '/api/logout', handler: _lazy_TK3v0Z, lazy: true, middleware: false, method: undefined },
  { route: '/api/multerMiddleware', handler: _lazy_8P8VHu, lazy: true, middleware: false, method: undefined },
  { route: '/api/notification', handler: _lazy_iqyYiU, lazy: true, middleware: false, method: "post" },
  { route: '/api/notifications', handler: _lazy_eIpIK0, lazy: true, middleware: false, method: "get" },
  { route: '/api/placeTypes', handler: _lazy_MEH76d, lazy: true, middleware: false, method: undefined },
  { route: '/api/processPayment', handler: _lazy_LZBetq, lazy: true, middleware: false, method: undefined },
  { route: '/api/updatelisting', handler: _lazy_MeNHom, lazy: true, middleware: false, method: undefined },
  { route: '/api/user/:userId', handler: _lazy_OfIB0i, lazy: true, middleware: false, method: "get" },
  { route: '/api/verifyEmail', handler: _lazy_N60n4A, lazy: true, middleware: false, method: undefined },
  { route: '/__nuxt_error', handler: _lazy_gex9XZ, lazy: true, middleware: false, method: undefined },
  { route: '/**', handler: _lazy_gex9XZ, lazy: true, middleware: false, method: undefined }
];

const serverAssets = [{"baseName":"server","dir":"C:/Users/reyan/OneDrive/Desktop/CAPSTONE/client/server/assets"}];

const assets = createStorage();

for (const asset of serverAssets) {
  assets.mount(asset.baseName, unstorage_47drivers_47fs({ base: asset.dir, ignore: (asset?.ignore || []) }));
}

const storage$1 = createStorage({});

storage$1.mount('/assets', assets);

storage$1.mount('root', unstorage_47drivers_47fs({"driver":"fs","readOnly":true,"base":"C:\\Users\\reyan\\OneDrive\\Desktop\\CAPSTONE\\client","ignore":["**/node_modules/**","**/.git/**"]}));
storage$1.mount('src', unstorage_47drivers_47fs({"driver":"fs","readOnly":true,"base":"C:\\Users\\reyan\\OneDrive\\Desktop\\CAPSTONE\\client\\server","ignore":["**/node_modules/**","**/.git/**"]}));
storage$1.mount('build', unstorage_47drivers_47fs({"driver":"fs","readOnly":false,"base":"C:\\Users\\reyan\\OneDrive\\Desktop\\CAPSTONE\\client\\.nuxt","ignore":["**/node_modules/**","**/.git/**"]}));
storage$1.mount('cache', unstorage_47drivers_47fs({"driver":"fs","readOnly":false,"base":"C:\\Users\\reyan\\OneDrive\\Desktop\\CAPSTONE\\client\\.nuxt\\cache","ignore":["**/node_modules/**","**/.git/**"]}));
storage$1.mount('data', unstorage_47drivers_47fs({"driver":"fs","base":"C:\\Users\\reyan\\OneDrive\\Desktop\\CAPSTONE\\client\\.data\\kv","ignore":["**/node_modules/**","**/.git/**"]}));

function useStorage(base = "") {
  return base ? prefixStorage(storage$1, base) : storage$1;
}

function defaultCacheOptions() {
  return {
    name: "_",
    base: "/cache",
    swr: true,
    maxAge: 1
  };
}
function defineCachedFunction(fn, opts = {}) {
  opts = { ...defaultCacheOptions(), ...opts };
  const pending = {};
  const group = opts.group || "nitro/functions";
  const name = opts.name || fn.name || "_";
  const integrity = opts.integrity || hash([fn, opts]);
  const validate = opts.validate || ((entry) => entry.value !== void 0);
  async function get(key, resolver, shouldInvalidateCache, event) {
    const cacheKey = [opts.base, group, name, key + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
    let entry = await useStorage().getItem(cacheKey).catch((error) => {
      console.error(`[nitro] [cache] Cache read error.`, error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }) || {};
    if (typeof entry !== "object") {
      entry = {};
      const error = new Error("Malformed data read from cache.");
      console.error("[nitro] [cache]", error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }
    const ttl = (opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = shouldInvalidateCache || entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl || validate(entry) === false;
    const _resolve = async () => {
      const isPending = pending[key];
      if (!isPending) {
        if (entry.value !== void 0 && (opts.staleMaxAge || 0) >= 0 && opts.swr === false) {
          entry.value = void 0;
          entry.integrity = void 0;
          entry.mtime = void 0;
          entry.expires = void 0;
        }
        pending[key] = Promise.resolve(resolver());
      }
      try {
        entry.value = await pending[key];
      } catch (error) {
        if (!isPending) {
          delete pending[key];
        }
        throw error;
      }
      if (!isPending) {
        entry.mtime = Date.now();
        entry.integrity = integrity;
        delete pending[key];
        if (validate(entry) !== false) {
          let setOpts;
          if (opts.maxAge && !opts.swr) {
            setOpts = { ttl: opts.maxAge };
          }
          const promise = useStorage().setItem(cacheKey, entry, setOpts).catch((error) => {
            console.error(`[nitro] [cache] Cache write error.`, error);
            useNitroApp().captureError(error, { event, tags: ["cache"] });
          });
          if (event?.waitUntil) {
            event.waitUntil(promise);
          }
        }
      }
    };
    const _resolvePromise = expired ? _resolve() : Promise.resolve();
    if (entry.value === void 0) {
      await _resolvePromise;
    } else if (expired && event && event.waitUntil) {
      event.waitUntil(_resolvePromise);
    }
    if (opts.swr && validate(entry) !== false) {
      _resolvePromise.catch((error) => {
        console.error(`[nitro] [cache] SWR handler error.`, error);
        useNitroApp().captureError(error, { event, tags: ["cache"] });
      });
      return entry;
    }
    return _resolvePromise.then(() => entry);
  }
  return async (...args) => {
    const shouldBypassCache = await opts.shouldBypassCache?.(...args);
    if (shouldBypassCache) {
      return fn(...args);
    }
    const key = await (opts.getKey || getKey)(...args);
    const shouldInvalidateCache = await opts.shouldInvalidateCache?.(...args);
    const entry = await get(
      key,
      () => fn(...args),
      shouldInvalidateCache,
      args[0] && isEvent(args[0]) ? args[0] : void 0
    );
    let value = entry.value;
    if (opts.transform) {
      value = await opts.transform(entry, ...args) || value;
    }
    return value;
  };
}
function cachedFunction(fn, opts = {}) {
  return defineCachedFunction(fn, opts);
}
function getKey(...args) {
  return args.length > 0 ? hash(args, {}) : "";
}
function escapeKey(key) {
  return String(key).replace(/\W/g, "");
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions()) {
  const variableHeaderNames = (opts.varies || []).filter(Boolean).map((h) => h.toLowerCase()).sort();
  const _opts = {
    ...opts,
    getKey: async (event) => {
      const customKey = await opts.getKey?.(event);
      if (customKey) {
        return escapeKey(customKey);
      }
      const _path = event.node.req.originalUrl || event.node.req.url || event.path;
      let _pathname;
      try {
        _pathname = escapeKey(decodeURI(parseURL(_path).pathname)).slice(0, 16) || "index";
      } catch {
        _pathname = "-";
      }
      const _hashedPath = `${_pathname}.${hash(_path)}`;
      const _headers = variableHeaderNames.map((header) => [header, event.node.req.headers[header]]).map(([name, value]) => `${escapeKey(name)}.${hash(value)}`);
      return [_hashedPath, ..._headers].join(":");
    },
    validate: (entry) => {
      if (!entry.value) {
        return false;
      }
      if (entry.value.code >= 400) {
        return false;
      }
      if (entry.value.body === void 0) {
        return false;
      }
      if (entry.value.headers.etag === "undefined" || entry.value.headers["last-modified"] === "undefined") {
        return false;
      }
      return true;
    },
    group: opts.group || "nitro/handlers",
    integrity: opts.integrity || hash([handler, opts])
  };
  const _cachedHandler = cachedFunction(
    async (incomingEvent) => {
      const variableHeaders = {};
      for (const header of variableHeaderNames) {
        const value = incomingEvent.node.req.headers[header];
        if (value !== void 0) {
          variableHeaders[header] = value;
        }
      }
      const reqProxy = cloneWithProxy(incomingEvent.node.req, {
        headers: variableHeaders
      });
      const resHeaders = {};
      let _resSendBody;
      const resProxy = cloneWithProxy(incomingEvent.node.res, {
        statusCode: 200,
        writableEnded: false,
        writableFinished: false,
        headersSent: false,
        closed: false,
        getHeader(name) {
          return resHeaders[name];
        },
        setHeader(name, value) {
          resHeaders[name] = value;
          return this;
        },
        getHeaderNames() {
          return Object.keys(resHeaders);
        },
        hasHeader(name) {
          return name in resHeaders;
        },
        removeHeader(name) {
          delete resHeaders[name];
        },
        getHeaders() {
          return resHeaders;
        },
        end(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        write(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2(void 0);
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return true;
        },
        writeHead(statusCode, headers2) {
          this.statusCode = statusCode;
          if (headers2) {
            if (Array.isArray(headers2) || typeof headers2 === "string") {
              throw new TypeError("Raw headers  is not supported.");
            }
            for (const header in headers2) {
              const value = headers2[header];
              if (value !== void 0) {
                this.setHeader(
                  header,
                  value
                );
              }
            }
          }
          return this;
        }
      });
      const event = createEvent(reqProxy, resProxy);
      event.fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: useNitroApp().localFetch
      });
      event.$fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: globalThis.$fetch
      });
      event.context = incomingEvent.context;
      event.context.cache = {
        options: _opts
      };
      const body = await handler(event) || _resSendBody;
      const headers = event.node.res.getHeaders();
      headers.etag = String(
        headers.Etag || headers.etag || `W/"${hash(body)}"`
      );
      headers["last-modified"] = String(
        headers["Last-Modified"] || headers["last-modified"] || (/* @__PURE__ */ new Date()).toUTCString()
      );
      const cacheControl = [];
      if (opts.swr) {
        if (opts.maxAge) {
          cacheControl.push(`s-maxage=${opts.maxAge}`);
        }
        if (opts.staleMaxAge) {
          cacheControl.push(`stale-while-revalidate=${opts.staleMaxAge}`);
        } else {
          cacheControl.push("stale-while-revalidate");
        }
      } else if (opts.maxAge) {
        cacheControl.push(`max-age=${opts.maxAge}`);
      }
      if (cacheControl.length > 0) {
        headers["cache-control"] = cacheControl.join(", ");
      }
      const cacheEntry = {
        code: event.node.res.statusCode,
        headers,
        body
      };
      return cacheEntry;
    },
    _opts
  );
  return defineEventHandler(async (event) => {
    if (opts.headersOnly) {
      if (handleCacheHeaders(event, { maxAge: opts.maxAge })) {
        return;
      }
      return handler(event);
    }
    const response = await _cachedHandler(
      event
    );
    if (event.node.res.headersSent || event.node.res.writableEnded) {
      return response.body;
    }
    if (handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers["last-modified"]),
      etag: response.headers.etag,
      maxAge: opts.maxAge
    })) {
      return;
    }
    event.node.res.statusCode = response.code;
    for (const name in response.headers) {
      const value = response.headers[name];
      if (name === "set-cookie") {
        event.node.res.appendHeader(
          name,
          splitCookiesString(value)
        );
      } else {
        if (value !== void 0) {
          event.node.res.setHeader(name, value);
        }
      }
    }
    return response.body;
  });
}
function cloneWithProxy(obj, overrides) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      if (property in overrides) {
        return overrides[property];
      }
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      if (property in overrides) {
        overrides[property] = value;
        return true;
      }
      return Reflect.set(target, property, value, receiver);
    }
  });
}
const cachedEventHandler = defineCachedEventHandler;

const inlineAppConfig = {
  "nuxt": {}
};



const appConfig = defuFn(inlineAppConfig);

function getEnv(key, opts) {
  const envKey = snakeCase(key).toUpperCase();
  return destr(
    process.env[opts.prefix + envKey] ?? process.env[opts.altPrefix + envKey]
  );
}
function _isObject(input) {
  return typeof input === "object" && !Array.isArray(input);
}
function applyEnv(obj, opts, parentKey = "") {
  for (const key in obj) {
    const subKey = parentKey ? `${parentKey}_${key}` : key;
    const envValue = getEnv(subKey, opts);
    if (_isObject(obj[key])) {
      if (_isObject(envValue)) {
        obj[key] = { ...obj[key], ...envValue };
        applyEnv(obj[key], opts, subKey);
      } else if (envValue === void 0) {
        applyEnv(obj[key], opts, subKey);
      } else {
        obj[key] = envValue ?? obj[key];
      }
    } else {
      obj[key] = envValue ?? obj[key];
    }
    if (opts.envExpansion && typeof obj[key] === "string") {
      obj[key] = _expandFromEnv(obj[key]);
    }
  }
  return obj;
}
const envExpandRx = /{{(.*?)}}/g;
function _expandFromEnv(value) {
  return value.replace(envExpandRx, (match, key) => {
    return process.env[key] || match;
  });
}

const _inlineRuntimeConfig = {
  "app": {
    "baseURL": "/",
    "buildId": "dev",
    "buildAssetsDir": "/_nuxt/",
    "cdnURL": ""
  },
  "nitro": {
    "envPrefix": "NUXT_",
    "routeRules": {
      "/__nuxt_error": {
        "cache": false
      },
      "/_nuxt/builds/meta/**": {
        "headers": {
          "cache-control": "public, max-age=31536000, immutable"
        }
      },
      "/_nuxt/builds/**": {
        "headers": {
          "cache-control": "public, max-age=1, immutable"
        }
      }
    }
  },
  "public": {}
};
const envOptions = {
  prefix: "NITRO_",
  altPrefix: _inlineRuntimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? "_",
  envExpansion: _inlineRuntimeConfig.nitro.envExpansion ?? process.env.NITRO_ENV_EXPANSION ?? false
};
const _sharedRuntimeConfig = _deepFreeze(
  applyEnv(klona(_inlineRuntimeConfig), envOptions)
);
function useRuntimeConfig(event) {
  if (!event) {
    return _sharedRuntimeConfig;
  }
  if (event.context.nitro.runtimeConfig) {
    return event.context.nitro.runtimeConfig;
  }
  const runtimeConfig = klona(_inlineRuntimeConfig);
  applyEnv(runtimeConfig, envOptions);
  event.context.nitro.runtimeConfig = runtimeConfig;
  return runtimeConfig;
}
_deepFreeze(klona(appConfig));
function _deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      _deepFreeze(value);
    }
  }
  return Object.freeze(object);
}
new Proxy(/* @__PURE__ */ Object.create(null), {
  get: (_, prop) => {
    console.warn(
      "Please use `useRuntimeConfig()` instead of accessing config directly."
    );
    const runtimeConfig = useRuntimeConfig();
    if (prop in runtimeConfig) {
      return runtimeConfig[prop];
    }
    return void 0;
  }
});

const config = useRuntimeConfig();
const _routeRulesMatcher = toRouteMatcher(
  createRouter({ routes: config.nitro.routeRules })
);
function createRouteRulesHandler(ctx) {
  return eventHandler((event) => {
    const routeRules = getRouteRules(event);
    if (routeRules.headers) {
      setHeaders(event, routeRules.headers);
    }
    if (routeRules.redirect) {
      let target = routeRules.redirect.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.redirect._redirectStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery(event.path);
        target = withQuery(target, query);
      }
      return sendRedirect(event, target, routeRules.redirect.statusCode);
    }
    if (routeRules.proxy) {
      let target = routeRules.proxy.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.proxy._proxyStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery(event.path);
        target = withQuery(target, query);
      }
      return proxyRequest(event, target, {
        fetch: ctx.localFetch,
        ...routeRules.proxy
      });
    }
  });
}
function getRouteRules(event) {
  event.context._nitro = event.context._nitro || {};
  if (!event.context._nitro.routeRules) {
    event.context._nitro.routeRules = getRouteRulesForPath(
      withoutBase(event.path.split("?")[0], useRuntimeConfig().app.baseURL)
    );
  }
  return event.context._nitro.routeRules;
}
function getRouteRulesForPath(path) {
  return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
}

function createNitroApp() {
  const config = useRuntimeConfig();
  const hooks = createHooks();
  const captureError = (error, context = {}) => {
    const promise = hooks.callHookParallel("error", error, context).catch((error_) => {
      console.error("Error while capturing another error", error_);
    });
    if (context.event && isEvent(context.event)) {
      const errors = context.event.context.nitro?.errors;
      if (errors) {
        errors.push({ error, context });
      }
      if (context.event.waitUntil) {
        context.event.waitUntil(promise);
      }
    }
  };
  const h3App = createApp({
    debug: destr(true),
    onError: (error, event) => {
      captureError(error, { event, tags: ["request"] });
      return errorHandler(error, event);
    },
    onRequest: async (event) => {
      await nitroApp$1.hooks.callHook("request", event).catch((error) => {
        captureError(error, { event, tags: ["request"] });
      });
    },
    onBeforeResponse: async (event, response) => {
      await nitroApp$1.hooks.callHook("beforeResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    },
    onAfterResponse: async (event, response) => {
      await nitroApp$1.hooks.callHook("afterResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    }
  });
  const router = createRouter$1({
    preemptive: true
  });
  const localCall = createCall(toNodeListener(h3App));
  const _localFetch = createFetch(localCall, globalThis.fetch);
  const localFetch = (input, init) => _localFetch(input, init).then(
    (response) => normalizeFetchResponse(response)
  );
  const $fetch = createFetch$1({
    fetch: localFetch,
    Headers: Headers$1,
    defaults: { baseURL: config.app.baseURL }
  });
  globalThis.$fetch = $fetch;
  h3App.use(createRouteRulesHandler({ localFetch }));
  h3App.use(
    eventHandler((event) => {
      event.context.nitro = event.context.nitro || { errors: [] };
      const envContext = event.node.req?.__unenv__;
      if (envContext) {
        Object.assign(event.context, envContext);
      }
      event.fetch = (req, init) => fetchWithEvent(event, req, init, { fetch: localFetch });
      event.$fetch = (req, init) => fetchWithEvent(event, req, init, {
        fetch: $fetch
      });
      event.waitUntil = (promise) => {
        if (!event.context.nitro._waitUntilPromises) {
          event.context.nitro._waitUntilPromises = [];
        }
        event.context.nitro._waitUntilPromises.push(promise);
        if (envContext?.waitUntil) {
          envContext.waitUntil(promise);
        }
      };
      event.captureError = (error, context) => {
        captureError(error, { event, ...context });
      };
    })
  );
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(
        /\/+/g,
        "/"
      );
      h3App.use(middlewareBase, handler);
    } else {
      const routeRules = getRouteRulesForPath(
        h.route.replace(/:\w+|\*\*/g, "_")
      );
      if (routeRules.cache) {
        handler = cachedEventHandler(handler, {
          group: "nitro/routes",
          ...routeRules.cache
        });
      }
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router.handler);
  const app = {
    hooks,
    h3App,
    router,
    localCall,
    localFetch,
    captureError
  };
  return app;
}
function runNitroPlugins(nitroApp2) {
  for (const plugin of plugins) {
    try {
      plugin(nitroApp2);
    } catch (error) {
      nitroApp2.captureError(error, { tags: ["plugin"] });
      throw error;
    }
  }
}
const nitroApp$1 = createNitroApp();
function useNitroApp() {
  return nitroApp$1;
}
runNitroPlugins(nitroApp$1);

function defineRenderHandler(render) {
  const runtimeConfig = useRuntimeConfig();
  return eventHandler(async (event) => {
    const nitroApp = useNitroApp();
    const ctx = { event, render, response: void 0 };
    await nitroApp.hooks.callHook("render:before", ctx);
    if (!ctx.response) {
      if (event.path === `${runtimeConfig.app.baseURL}favicon.ico`) {
        setResponseHeader(event, "Content-Type", "image/x-icon");
        return send(
          event,
          "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
        );
      }
      ctx.response = await ctx.render(event);
      if (!ctx.response) {
        const _currentStatus = getResponseStatus(event);
        setResponseStatus(event, _currentStatus === 200 ? 500 : _currentStatus);
        return send(
          event,
          "No response returned from render handler: " + event.path
        );
      }
    }
    await nitroApp.hooks.callHook("render:response", ctx.response, ctx);
    if (ctx.response.headers) {
      setResponseHeaders(event, ctx.response.headers);
    }
    if (ctx.response.statusCode || ctx.response.statusMessage) {
      setResponseStatus(
        event,
        ctx.response.statusCode,
        ctx.response.statusMessage
      );
    }
    return ctx.response.body;
  });
}

const r=Object.create(null),i=e=>globalThis.process?.env||globalThis._importMeta_.env||globalThis.Deno?.env.toObject()||globalThis.__env__||(e?r:globalThis),s=new Proxy(r,{get(e,o){return i()[o]??r[o]},has(e,o){const E=i();return o in E||o in r},set(e,o,E){const b=i(!0);return b[o]=E,!0},deleteProperty(e,o){if(!o)return !1;const E=i(!0);return delete E[o],!0},ownKeys(){const e=i(!0);return Object.keys(e)}}),t=typeof process<"u"&&process.env&&"development"||"",B=[["APPVEYOR"],["AWS_AMPLIFY","AWS_APP_ID",{ci:!0}],["AZURE_PIPELINES","SYSTEM_TEAMFOUNDATIONCOLLECTIONURI"],["AZURE_STATIC","INPUT_AZURE_STATIC_WEB_APPS_API_TOKEN"],["APPCIRCLE","AC_APPCIRCLE"],["BAMBOO","bamboo_planKey"],["BITBUCKET","BITBUCKET_COMMIT"],["BITRISE","BITRISE_IO"],["BUDDY","BUDDY_WORKSPACE_ID"],["BUILDKITE"],["CIRCLE","CIRCLECI"],["CIRRUS","CIRRUS_CI"],["CLOUDFLARE_PAGES","CF_PAGES",{ci:!0}],["CODEBUILD","CODEBUILD_BUILD_ARN"],["CODEFRESH","CF_BUILD_ID"],["DRONE"],["DRONE","DRONE_BUILD_EVENT"],["DSARI"],["GITHUB_ACTIONS"],["GITLAB","GITLAB_CI"],["GITLAB","CI_MERGE_REQUEST_ID"],["GOCD","GO_PIPELINE_LABEL"],["LAYERCI"],["HUDSON","HUDSON_URL"],["JENKINS","JENKINS_URL"],["MAGNUM"],["NETLIFY"],["NETLIFY","NETLIFY_LOCAL",{ci:!1}],["NEVERCODE"],["RENDER"],["SAIL","SAILCI"],["SEMAPHORE"],["SCREWDRIVER"],["SHIPPABLE"],["SOLANO","TDDIUM"],["STRIDER"],["TEAMCITY","TEAMCITY_VERSION"],["TRAVIS"],["VERCEL","NOW_BUILDER"],["VERCEL","VERCEL",{ci:!1}],["VERCEL","VERCEL_ENV",{ci:!1}],["APPCENTER","APPCENTER_BUILD_ID"],["CODESANDBOX","CODESANDBOX_SSE",{ci:!1}],["STACKBLITZ"],["STORMKIT"],["CLEAVR"],["ZEABUR"],["CODESPHERE","CODESPHERE_APP_ID",{ci:!0}],["RAILWAY","RAILWAY_PROJECT_ID"],["RAILWAY","RAILWAY_SERVICE_ID"],["DENO-DEPLOY","DENO_DEPLOYMENT_ID"],["FIREBASE_APP_HOSTING","FIREBASE_APP_HOSTING",{ci:!0}]];function p(){if(globalThis.process?.env)for(const e of B){const o=e[1]||e[0];if(globalThis.process?.env[o])return {name:e[0].toLowerCase(),...e[2]}}return globalThis.process?.env?.SHELL==="/bin/jsh"&&globalThis.process?.versions?.webcontainer?{name:"stackblitz",ci:!1}:{name:"",ci:!1}}const l=p(),d=l.name;function n(e){return e?e!=="false":!1}const I=globalThis.process?.platform||"",T=n(s.CI)||l.ci!==!1,R=n(globalThis.process?.stdout&&globalThis.process?.stdout.isTTY);n(s.DEBUG);const A=t==="test"||n(s.TEST);n(s.MINIMAL)||T||A||!R;const _=/^win/i.test(I);!n(s.NO_COLOR)&&(n(s.FORCE_COLOR)||(R||_)&&s.TERM!=="dumb"||T);const C=(globalThis.process?.versions?.node||"").replace(/^v/,"")||null;Number(C?.split(".")[0])||null;const y=globalThis.process||Object.create(null),c={versions:{}};new Proxy(y,{get(e,o){if(o==="env")return s;if(o in e)return e[o];if(o in c)return c[o]}});const L=globalThis.process?.release?.name==="node",a=!!globalThis.Bun||!!globalThis.process?.versions?.bun,D=!!globalThis.Deno,O=!!globalThis.fastly,S=!!globalThis.Netlify,N=!!globalThis.EdgeRuntime,P=globalThis.navigator?.userAgent==="Cloudflare-Workers",F=[[S,"netlify"],[N,"edge-light"],[P,"workerd"],[O,"fastly"],[D,"deno"],[a,"bun"],[L,"node"]];function G(){const e=F.find(o=>o[0]);if(e)return {name:e[1]}}const u=G();u?.name||"";

const scheduledTasks = false;

const tasks = {
  
};

const __runningTasks__ = {};
async function runTask(name, {
  payload = {},
  context = {}
} = {}) {
  if (__runningTasks__[name]) {
    return __runningTasks__[name];
  }
  if (!(name in tasks)) {
    throw createError({
      message: `Task \`${name}\` is not available!`,
      statusCode: 404
    });
  }
  if (!tasks[name].resolve) {
    throw createError({
      message: `Task \`${name}\` is not implemented!`,
      statusCode: 501
    });
  }
  const handler = await tasks[name].resolve();
  const taskEvent = { name, payload, context };
  __runningTasks__[name] = handler.run(taskEvent);
  try {
    const res = await __runningTasks__[name];
    return res;
  } finally {
    delete __runningTasks__[name];
  }
}

const nitroApp = useNitroApp();
const server = new Server(toNodeListener(nitroApp.h3App));
function getAddress() {
  if (d === "stackblitz" || process.env.NITRO_NO_UNIX_SOCKET || process.versions.bun) {
    return 0;
  }
  const socketName = `worker-${process.pid}-${threadId}.sock`;
  if (_) {
    return join(String.raw`\\.\pipe\nitro`, socketName);
  }
  const socketDir = join(tmpdir(), "nitro");
  mkdirSync(socketDir, { recursive: true });
  return join(socketDir, socketName);
}
const listenAddress = getAddress();
server.listen(listenAddress, () => {
  const _address = server.address();
  parentPort?.postMessage({
    event: "listen",
    address: typeof _address === "string" ? { socketPath: _address } : { host: "localhost", port: _address?.port }
  });
});
nitroApp.router.get(
  "/_nitro/tasks",
  defineEventHandler(async (event) => {
    const _tasks = await Promise.all(
      Object.entries(tasks).map(async ([name, task]) => {
        const _task = await task.resolve?.();
        return [name, { description: _task?.meta?.description }];
      })
    );
    return {
      tasks: Object.fromEntries(_tasks),
      scheduledTasks
    };
  })
);
nitroApp.router.use(
  "/_nitro/tasks/:name",
  defineEventHandler(async (event) => {
    const name = getRouterParam(event, "name");
    const payload = {
      ...getQuery$1(event),
      ...await readBody(event).then((r) => r?.payload).catch(() => ({}))
    };
    return await runTask(name, { payload });
  })
);
trapUnhandledNodeErrors();
async function onShutdown(signal) {
  await nitroApp.hooks.callHook("close");
}
parentPort?.on("message", async (msg) => {
  if (msg && msg.event === "shutdown") {
    await onShutdown();
    parentPort?.postMessage({ event: "exit" });
  }
});

const _messages = { "appName": "Nuxt", "version": "", "statusCode": 500, "statusMessage": "Server error", "description": "An error occurred in the application and the page could not be served. If you are the application owner, check your server logs for details.", "stack": "" };
const template$1 = (messages) => {
  messages = { ..._messages, ...messages };
  return '<!DOCTYPE html><html lang="en"><head><title>' + messages.statusCode + " - " + messages.statusMessage + " | " + messages.appName + `</title><meta charset="utf-8"><meta content="width=device-width,initial-scale=1.0,minimum-scale=1.0" name="viewport"><style>.spotlight{background:linear-gradient(45deg,#00dc82,#36e4da 50%,#0047e1);bottom:-40vh;filter:blur(30vh);height:60vh;opacity:.8}*,:after,:before{border-color:var(--un-default-border-color,#e5e7eb);border-style:solid;border-width:0;box-sizing:border-box}:after,:before{--un-content:""}html{line-height:1.5;-webkit-text-size-adjust:100%;font-family:ui-sans-serif,system-ui,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;font-feature-settings:normal;font-variation-settings:normal;-moz-tab-size:4;tab-size:4;-webkit-tap-highlight-color:transparent}body{line-height:inherit;margin:0}h1{font-size:inherit;font-weight:inherit}pre{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;font-feature-settings:normal;font-size:1em;font-variation-settings:normal}h1,p,pre{margin:0}*,:after,:before{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-pan-x: ;--un-pan-y: ;--un-pinch-zoom: ;--un-scroll-snap-strictness:proximity;--un-ordinal: ;--un-slashed-zero: ;--un-numeric-figure: ;--un-numeric-spacing: ;--un-numeric-fraction: ;--un-border-spacing-x:0;--un-border-spacing-y:0;--un-ring-offset-shadow:0 0 transparent;--un-ring-shadow:0 0 transparent;--un-shadow-inset: ;--un-shadow:0 0 transparent;--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:rgba(147,197,253,.5);--un-blur: ;--un-brightness: ;--un-contrast: ;--un-drop-shadow: ;--un-grayscale: ;--un-hue-rotate: ;--un-invert: ;--un-saturate: ;--un-sepia: ;--un-backdrop-blur: ;--un-backdrop-brightness: ;--un-backdrop-contrast: ;--un-backdrop-grayscale: ;--un-backdrop-hue-rotate: ;--un-backdrop-invert: ;--un-backdrop-opacity: ;--un-backdrop-saturate: ;--un-backdrop-sepia: }.fixed{position:fixed}.left-0{left:0}.right-0{right:0}.z-10{z-index:10}.mb-6{margin-bottom:1.5rem}.mb-8{margin-bottom:2rem}.h-auto{height:auto}.min-h-screen{min-height:100vh}.flex{display:flex}.flex-1{flex:1 1 0%}.flex-col{flex-direction:column}.overflow-y-auto{overflow-y:auto}.rounded-t-md{border-top-left-radius:.375rem;border-top-right-radius:.375rem}.bg-black\\/5{background-color:#0000000d}.bg-white{--un-bg-opacity:1;background-color:rgb(255 255 255/var(--un-bg-opacity))}.p-8{padding:2rem}.px-10{padding-left:2.5rem;padding-right:2.5rem}.pt-14{padding-top:3.5rem}.text-6xl{font-size:3.75rem;line-height:1}.text-xl{font-size:1.25rem;line-height:1.75rem}.text-black{--un-text-opacity:1;color:rgb(0 0 0/var(--un-text-opacity))}.font-light{font-weight:300}.font-medium{font-weight:500}.leading-tight{line-height:1.25}.font-sans{font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji}.antialiased{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}@media (prefers-color-scheme:dark){.dark\\:bg-black{--un-bg-opacity:1;background-color:rgb(0 0 0/var(--un-bg-opacity))}.dark\\:bg-white\\/10{background-color:#ffffff1a}.dark\\:text-white{--un-text-opacity:1;color:rgb(255 255 255/var(--un-text-opacity))}}@media (min-width:640px){.sm\\:text-2xl{font-size:1.5rem;line-height:2rem}.sm\\:text-8xl{font-size:6rem;line-height:1}}</style><script>!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver((e=>{for(const o of e)if("childList"===o.type)for(const e of o.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&r(e)})).observe(document,{childList:!0,subtree:!0})}function r(e){if(e.ep)return;e.ep=!0;const r=function(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),"use-credentials"===e.crossOrigin?r.credentials="include":"anonymous"===e.crossOrigin?r.credentials="omit":r.credentials="same-origin",r}(e);fetch(e.href,r)}}();<\/script></head><body class="antialiased bg-white dark:bg-black dark:text-white flex flex-col font-sans min-h-screen pt-14 px-10 text-black"><div class="fixed left-0 right-0 spotlight"></div><h1 class="font-medium mb-6 sm:text-8xl text-6xl">` + messages.statusCode + '</h1><p class="font-light leading-tight mb-8 sm:text-2xl text-xl">' + messages.description + '</p><div class="bg-black/5 bg-white dark:bg-white/10 flex-1 h-auto overflow-y-auto rounded-t-md"><pre class="font-light leading-tight p-8 text-xl z-10">' + messages.stack + "</pre></div></body></html>";
};

const errorDev = /*#__PURE__*/Object.freeze({
  __proto__: null,
  template: template$1
});

const prisma$o = new PrismaClient();
const amenities = defineEventHandler(async (event) => {
  try {
    const amenities = await prisma$o.amenity.findMany();
    return amenities;
  } catch (error) {
    console.error("Error fetching amenities:", error);
    event.res.statusCode = 500;
    return { error: "Error fetching amenities" };
  }
});

const amenities$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: amenities
});

const prisma$n = new PrismaClient();
const SECRET_KEY = process.env.SECRET_KEY;
const REGISTER_SECRET_KEY$1 = process.env.REGISTER_SECRET_KEY;
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadDirProfilePic = path.join(process.cwd(), "public", "images", "profilePictures");
      const uploadDirDocument = path.join(process.cwd(), "public", "images", "documentPictures");
      if (!fs.existsSync(uploadDirProfilePic)) {
        fs.mkdirSync(uploadDirProfilePic, { recursive: true });
      }
      if (!fs.existsSync(uploadDirDocument)) {
        fs.mkdirSync(uploadDirDocument, { recursive: true });
      }
      if (file.fieldname === "profilePic") {
        cb(null, uploadDirProfilePic);
      } else if (file.fieldname === "document") {
        cb(null, uploadDirDocument);
      } else {
        cb(new Error("Invalid file field name"));
      }
    },
    filename: (req, file, cb) => {
      const sanitizedFilename = file.originalname.replace(/[^a-z0-9.]/gi, "_").toLowerCase();
      cb(null, sanitizedFilename);
    }
  })
});
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASSWORD
  }
});
const sendVerificationEmail = (email, token) => {
  const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;
  const mailOptions = {
    from: EMAIL_USER,
    to: email,
    subject: "Email Verification",
    text: `Click the link to verify your email: ${verificationUrl}`
  };
  return transporter.sendMail(mailOptions);
};
const auth = defineEventHandler(async (event) => {
  const { method } = event.req;
  if (method === "POST") {
    return new Promise((resolve, reject) => {
      upload.any()(event.req, event.res, async (err) => {
        if (err) return reject({ message: err.message });
        try {
          const body = event.req.body;
          const files = event.req.files || [];
          if (body.action === "login") {
            const user = await prisma$n.user.findUnique({ where: { email: body.email } });
            if (!user || !await bcrypt.compare(body.password, user.password)) {
              throw new Error("Invalid email or password");
            }
            if (!user.verified) {
              throw new Error("Email is not verified");
            }
            const token = jwt.sign({ userId: user.userId }, SECRET_KEY, { expiresIn: "1h" });
            return resolve({ token, userId: user.userId, roleId: user.roleId });
          }
          if (body.action === "register") {
            if (body.password !== body.confirmPassword) {
              throw new Error("Passwords do not match");
            }
            const existingUser = await prisma$n.user.findUnique({ where: { email: body.email } });
            if (existingUser) {
              throw new Error("Email already exists");
            }
            const hashedPassword = await bcrypt.hash(body.password, 10);
            const profilePic = files.find((file) => file.fieldname === "profilePic");
            const profilePicUrl = profilePic ? `/images/profilePictures/${profilePic.filename}` : null;
            const document = files.find((file) => file.fieldname === "document");
            const documentUrl = document ? `/images/documentPictures/${document.filename}` : null;
            if (!["1", "2"].includes(body.roleId)) {
              throw new Error("Invalid role");
            }
            const user = await prisma$n.user.create({
              data: {
                name: body.name,
                email: body.email,
                password: hashedPassword,
                phone: body.phone,
                profilePic: profilePicUrl,
                document: documentUrl,
                // Save the document URL
                roleId: parseInt(body.roleId),
                verified: false
                // Mark the user as not verified
              }
            });
            const emailVerificationToken = jwt.sign({ userId: user.userId }, REGISTER_SECRET_KEY$1, { expiresIn: "1h" });
            await prisma$n.user.update({
              where: { userId: user.userId },
              data: { verificationToken: emailVerificationToken }
              // Set verification token
            });
            await sendVerificationEmail(user.email, emailVerificationToken);
            return resolve({ message: "Registration successful. Please check your email to verify your account." });
          }
          throw new Error("Invalid action");
        } catch (error) {
          return reject({ message: error.message });
        }
      });
    });
  }
  throw new Error("Invalid method");
});

const auth$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: auth
});

const prisma$m = new PrismaClient();
const booking_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  console.log(body);
  try {
    const listing = await prisma$m.listing.findUnique({
      where: {
        listingId: parseInt(body.listingId, 10)
      },
      select: {
        userId: true
        // The userId field refers to the host (the one who added the listing)
      }
    });
    if (!listing) {
      throw createError({ statusCode: 404, message: "Listing not found" });
    }
    const newBooking = await prisma$m.booking.create({
      data: {
        hostId: listing.userId,
        // The user who added the listing is the host
        bookerId: parseInt(body.userId, 10),
        // The user who made the booking is the booker
        listingId: parseInt(body.listingId, 10),
        bookingDate: new Date(body.bookingDate),
        statusId: parseInt(body.statusId, 10)
      }
    });
    await prisma$m.bookingHistory.create({
      data: {
        bookingId: newBooking.bookingId,
        statusId: newBooking.statusId
      }
    });
    return { success: true, booking: newBooking };
  } catch (error) {
    console.error("Error creating booking:", error);
    throw createError({ statusCode: 500, message: "Error creating booking" });
  }
});

const booking_post$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: booking_post
});

const prisma$l = new PrismaClient();
const approve = defineEventHandler(async (event) => {
  try {
    const { bookingId } = await readBody(event);
    const updatedBooking = await prisma$l.booking.update({
      where: { bookingId },
      // Use bookingId as the primary key
      data: { statusId: 2 }
      // Assuming 2 is the ID for "approved" status
    });
    await prisma$l.notification.create({
      data: {
        hostId: updatedBooking.hostId,
        // Provide the hostId
        bookerId: updatedBooking.bookerId,
        // Use bookerId from the updated booking
        listingId: updatedBooking.listingId,
        // Provide the listingId
        content: "Your booking has been approved. Please proceed with the payment.",
        type: "bookingApproved"
      }
    });
    return { success: true, message: "Booking approved and booker notified." };
  } catch (error) {
    console.error("Error approving booking:", error);
    return { success: false, message: "Failed to approve booking." };
  }
});

const approve$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: approve
});

const prisma$k = new PrismaClient();
const checkFirstPayment = defineEventHandler(async (event) => {
  try {
    const { bookingId } = getQuery$1(event);
    if (!bookingId) {
      return { success: false, message: "Booking ID is required." };
    }
    const paymentExists = await prisma$k.payment.findFirst({
      where: { bookingId: parseInt(bookingId) }
    });
    return { success: true, isFirstPayment: !paymentExists };
  } catch (error) {
    console.error("Error checking first payment:", error);
    return { success: false, message: "Failed to check payment status." };
  }
});

const checkFirstPayment$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: checkFirstPayment
});

const prisma$j = new PrismaClient();
const getActiveBookings = defineEventHandler(async (event) => {
  const userId = getHeaders(event)["user-id"] || getQuery$1(event).userId;
  if (!userId) {
    return { statusCode: 400, message: "User ID is required." };
  }
  try {
    const bookings = await prisma$j.booking.findMany({
      where: {
        hostId: parseInt(userId, 10),
        // Filter by the host ID
        statusId: 2
        // Filter by active status
      },
      include: {
        listing: {
          include: {
            images: true
            // Include images related to the listing
          }
        },
        booker: true,
        // Include the user who made the booking (booker)
        status: true
        // Include booking status
      }
    });
    return { bookings };
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return { statusCode: 500, message: "Internal server error" };
  }
});

const getActiveBookings$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: getActiveBookings
});

const prisma$i = new PrismaClient();
const getHostBooking = defineEventHandler(async (event) => {
  const userId = getHeaders(event)["user-id"] || getQuery$1(event).userId;
  if (!userId) {
    return { statusCode: 400, message: "User ID is required." };
  }
  try {
    const bookings = await prisma$i.booking.findMany({
      where: {
        hostId: parseInt(userId, 10),
        // Filter by the host ID
        statusId: 1
        // Filter by active status
      },
      include: {
        listing: {
          include: {
            images: true
            // Include images related to the listing
          }
        },
        booker: true,
        // Include the user who made the booking (booker)
        status: true
        // Include booking status
      }
    });
    return { bookings };
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return { statusCode: 500, message: "Internal server error" };
  }
});

const getHostBooking$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: getHostBooking
});

const prisma$h = new PrismaClient();
const getLatestPaymentDue = defineEventHandler(async (event) => {
  try {
    const { bookingId } = getQuery$1(event);
    if (!bookingId) {
      return { success: false, message: "Booking ID is required." };
    }
    const latestPayment = await prisma$h.payment.findFirst({
      where: { bookingId: parseInt(bookingId) },
      orderBy: { paymentId: "desc" }
    });
    if (!latestPayment) {
      return { success: false, message: "No payment details found for the given booking ID." };
    }
    const { nextPaymentDue } = latestPayment;
    return { success: true, nextPaymentDue };
  } catch (error) {
    console.error("Error fetching latest payment due date:", error);
    return { success: false, message: "Failed to fetch latest payment due date." };
  }
});

const getLatestPaymentDue$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: getLatestPaymentDue
});

const prisma$g = new PrismaClient();
const getPaymentByBookingId = defineEventHandler(async (event) => {
  try {
    const { bookingId } = getQuery$1(event);
    if (!bookingId) {
      return { success: false, message: "Booking ID is required." };
    }
    const latestPayment = await prisma$g.payment.findFirst({
      where: { bookingId: parseInt(bookingId) },
      orderBy: { paymentId: "desc" },
      include: {
        paymentMethod: true,
        status: true
      }
    });
    if (!latestPayment) {
      return { success: false, message: "No payment details found for the given booking ID." };
    }
    const { amount, nextPaymentDue } = latestPayment;
    return { success: true, latestPayment: { ...latestPayment, amount, nextPaymentDue } };
  } catch (error) {
    console.error("Error fetching payment details:", error);
    return { success: false, message: "Failed to fetch payment details." };
  }
});

const getPaymentByBookingId$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: getPaymentByBookingId
});

const prisma$f = new PrismaClient();
const getPayments = defineEventHandler(async (event) => {
  const { userId, type } = getQuery$1(event);
  if (!userId || !type) {
    return { success: false, message: "User ID and type are required." };
  }
  try {
    let payments;
    if (type === "host") {
      payments = await prisma$f.payment.findMany({
        where: {
          booking: {
            listing: {
              userId: parseInt(userId, 10)
            }
          }
        },
        include: {
          status: true,
          booking: {
            include: {
              booker: true,
              listing: true
            }
          }
        }
      });
    } else if (type === "user") {
      payments = await prisma$f.payment.findMany({
        where: {
          booking: {
            bookerId: parseInt(userId, 10)
          }
        },
        include: {
          status: true,
          booking: {
            include: {
              listing: {
                include: {
                  user: true
                }
              }
            }
          }
        }
      });
    } else {
      return { success: false, message: "Invalid type specified." };
    }
    return { success: true, payments };
  } catch (error) {
    console.error("Error fetching payments:", error);
    return { success: false, message: "An error occurred while fetching payments." };
  } finally {
    await prisma$f.$disconnect();
  }
});

const getPayments$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: getPayments
});

const prisma$e = new PrismaClient();
const getUserBooking = defineEventHandler(async (event) => {
  const userId = getQuery$1(event).userId;
  if (!userId) {
    return { statusCode: 400, message: "User ID is required." };
  }
  try {
    const bookings = await prisma$e.booking.findMany({
      where: {
        bookerId: parseInt(userId)
      },
      include: {
        listing: {
          include: {
            images: true
            // Include images if needed
          }
        },
        status: true
        // Include booking status
      }
    });
    return { bookings };
  } catch (error) {
    console.error("Error fetching user bookings:", error);
    return { statusCode: 500, message: "Internal server error" };
  }
});

const getUserBooking$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: getUserBooking
});

const prisma$d = new PrismaClient();
const getUserListings = defineEventHandler(async (event) => {
  const userId = event.req.headers["x-user-id"];
  if (!userId) {
    return {
      statusCode: 401,
      body: { message: "Unauthorized: User ID is required" }
    };
  }
  try {
    const listings = await prisma$d.listing.findMany({
      where: { userId: parseInt(userId) },
      include: {
        images: true
        // Ensure images are included
      }
    });
    return listings;
  } catch (error) {
    console.error("Error fetching user listings:", error);
    return {
      statusCode: 500,
      body: { message: "Failed to fetch user listings" }
    };
  }
});

const getUserListings$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: getUserListings
});

const prisma$c = new PrismaClient();
const guestTypes = defineEventHandler(async (event) => {
  try {
    const guestTypes = await prisma$c.guestType.findMany();
    return guestTypes;
  } catch (error) {
    console.error("Error fetching guest types:", error);
    event.res.statusCode = 500;
    return { error: "Error fetching guest types" };
  }
});

const guestTypes$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: guestTypes
});

const prisma$b = new PrismaClient();
const _listingId__get$2 = defineEventHandler(async (event) => {
  var _a, _b;
  try {
    const listingId = event.context.params.listingId;
    const listing = await prisma$b.listing.findUnique({
      where: { listingId: parseInt(listingId) },
      // Ensure listingId is a number
      select: {
        listingId: true,
        title: true,
        description: true,
        price: true,
        address: true,
        guests: true,
        bedrooms: true,
        beds: true,
        bathrooms: true,
        latitude: true,
        longitude: true,
        createdAt: true,
        updatedAt: true,
        placeType: {
          select: { placeTypeName: true }
        },
        guestType: {
          select: { guestTypeName: true }
        },
        images: {
          select: { imageUrl: true }
        },
        amenities: {
          select: {
            amenity: {
              select: { amenityName: true, iconClass: true, color: true }
            }
          }
        }
      }
    });
    if (!listing) {
      event.res.statusCode = 404;
      return { error: "Listing not found" };
    }
    const flattenedListing = {
      ...listing,
      placeType: ((_a = listing.placeType) == null ? void 0 : _a.placeTypeName) || "Unknown",
      guestType: ((_b = listing.guestType) == null ? void 0 : _b.guestTypeName) || "Unknown",
      images: listing.images.map((image) => ({ imageUrl: image.imageUrl })) || [],
      amenities: listing.amenities.map((item) => ({
        name: item.amenity.amenityName,
        iconClass: item.amenity.iconClass,
        color: item.amenity.color
      })) || []
    };
    return flattenedListing;
  } catch (error) {
    console.error("Error fetching listing:", error);
    event.res.statusCode = 500;
    return { error: "Error fetching listing" };
  }
});

const _listingId__get$3 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: _listingId__get$2
});

const prisma$a = new PrismaClient();
const _listingId__get = defineEventHandler(async (event) => {
  var _a, _b;
  try {
    const listingId = getRouterParam(event, "listingId");
    if (!listingId) {
      return { statusCode: 400, body: { error: "Listing ID is required" } };
    }
    const listing = await prisma$a.listing.findUnique({
      where: { listingId: parseInt(listingId, 10) },
      include: {
        user: {
          select: {
            userId: true,
            name: true,
            email: true,
            profilePic: true
          }
        },
        placeType: true,
        guestType: true,
        images: {
          select: {
            imageUrl: true
          }
        },
        amenities: {
          include: {
            amenity: {
              select: {
                amenityName: true,
                iconClass: true,
                color: true
              }
            }
          }
        }
      }
    });
    if (!listing) {
      return { statusCode: 404, body: { error: "Listing not found" } };
    }
    const flattenedListing = {
      id: listing.id,
      title: listing.title,
      address: listing.address,
      description: listing.description,
      price: listing.price,
      guests: listing.guests,
      bedrooms: listing.bedrooms,
      beds: listing.beds,
      bathrooms: listing.bathrooms,
      latitude: listing.latitude,
      longitude: listing.longitude,
      placeType: ((_a = listing.placeType) == null ? void 0 : _a.placeTypeName) || "Unknown",
      guestType: ((_b = listing.guestType) == null ? void 0 : _b.guestTypeName) || "Unknown",
      images: listing.images.map((image) => ({ imageUrl: image.imageUrl })),
      amenities: listing.amenities.map((item) => ({
        name: item.amenity.amenityName,
        iconClass: item.amenity.iconClass,
        color: item.amenity.color
      })),
      user: listing.user ? {
        userId: listing.user.userId,
        name: listing.user.name,
        email: listing.user.email,
        profilePic: listing.user.profilePic
      } : null
    };
    return { statusCode: 200, body: { listing: flattenedListing } };
  } catch (error) {
    console.error("Error fetching listing:", error);
    return { statusCode: 500, body: { error: "Error fetching listing" } };
  }
});

const _listingId__get$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: _listingId__get
});

const prisma$9 = new PrismaClient();
const listings_get = defineEventHandler(async (event) => {
  try {
    const listings = await prisma$9.listing.findMany({
      select: {
        listingId: true,
        title: true,
        description: true,
        price: true,
        address: true,
        guests: true,
        bedrooms: true,
        beds: true,
        bathrooms: true,
        latitude: true,
        longitude: true,
        createdAt: true,
        updatedAt: true,
        userId: true,
        // Include userId in the selection
        placeType: {
          select: {
            placeTypeName: true
          }
        },
        guestType: {
          select: {
            guestTypeName: true
          }
        },
        images: {
          select: {
            imageUrl: true
          }
        },
        amenities: {
          select: {
            amenity: {
              select: {
                amenityName: true,
                iconClass: true,
                color: true
              }
            }
          }
        }
      }
    });
    const flattenedListings = listings.map((listing) => {
      var _a, _b;
      return {
        ...listing,
        placeType: ((_a = listing.placeType) == null ? void 0 : _a.placeTypeName) || "Unknown",
        guestType: ((_b = listing.guestType) == null ? void 0 : _b.guestTypeName) || "Unknown",
        amenities: listing.amenities.map((item) => ({
          name: item.amenity.amenityName,
          iconClass: item.amenity.iconClass,
          color: item.amenity.color
        })) || []
      };
    });
    return flattenedListings;
  } catch (error) {
    console.error("Error fetching listings:", error);
    event.res.statusCode = 500;
    event.res.end(JSON.stringify({ error: "Error fetching listings" }));
  }
});

const listings_get$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: listings_get
});

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "public/images/listingpictures");
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const uploadMiddleware = multer({ storage });

const multerMiddleware = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: uploadMiddleware
});

const prisma$8 = new PrismaClient();
const listings_post = defineEventHandler(async (event) => {
  await new Promise((resolve, reject) => {
    uploadMiddleware.array("images")(event.req, event.res, (err) => {
      if (err) {
        console.error("Multer error:", err);
        event.res.statusCode = 500;
        event.res.end(JSON.stringify({ error: "File upload error" }));
        return reject(err);
      }
      resolve();
    });
  });
  try {
    const body = event.req.body;
    const files = event.req.files || [];
    if (!Array.isArray(files)) {
      event.res.statusCode = 500;
      event.res.end(JSON.stringify({ error: "Invalid file data" }));
      return;
    }
    const imageUrls = files.map((file) => ({
      imageUrl: `/images/listingpictures/${file.filename}`
      // Path to save in the database
    }));
    const amenitiesIds = body.amenities ? body.amenities.split(",").map((id) => parseInt(id, 10)) : [];
    const listing = {
      title: body.title,
      description: body.description,
      address: body.address,
      price: parseFloat(body.price),
      placeTypeId: parseInt(body.placeTypeId, 10),
      guestTypeId: parseInt(body.guestTypeId, 10),
      guests: parseInt(body.guests, 10),
      bedrooms: parseInt(body.bedrooms, 10),
      beds: parseInt(body.beds, 10),
      bathrooms: parseInt(body.bathrooms, 10),
      latitude: parseFloat(body.latitude),
      longitude: parseFloat(body.longitude),
      userId: parseInt(body.userId, 10)
    };
    const newListing = await prisma$8.listing.create({ data: listing });
    await prisma$8.image.createMany({
      data: imageUrls.map((url) => ({
        listingId: newListing.listingId,
        imageUrl: url.imageUrl
      }))
    });
    await prisma$8.listingAmenity.createMany({
      data: amenitiesIds.map((amenityId) => ({
        listingId: newListing.listingId,
        amenityId
      }))
    });
    event.res.statusCode = 200;
    event.res.end(JSON.stringify({ message: "Listing added successfully" }));
  } catch (error) {
    console.error("Error adding listing:", error);
    event.res.statusCode = 500;
    event.res.end(JSON.stringify({ error: "Error adding listing" }));
  }
});

const listings_post$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: listings_post
});

const prisma$7 = new PrismaClient();
const logout = eventHandler(async (event) => {
  if (event.node.req.method === "POST") {
    try {
      const body = await event.request.json();
      if (body.token) {
        await prisma$7.blacklistedToken.create({
          data: {
            token: body.token
          }
        });
      }
      return {
        statusCode: 200,
        body: { message: "Logged out successfully" }
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: { error: "Internal Server Error" }
      };
    }
  } else {
    return {
      statusCode: 405,
      body: { error: `Method ${event.node.req.method} Not Allowed` }
    };
  }
});

const logout$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: logout
});

const prisma$6 = new PrismaClient();
const notification_post = defineEventHandler(async (event) => {
  try {
    const { hostId, bookerId, listingId, content, type } = await readBody(event);
    if (!hostId || !bookerId || !listingId || !content) {
      throw createError({
        statusCode: 400,
        message: "Host ID, Booker ID, Listing ID, and content are required"
      });
    }
    const newNotification = await prisma$6.notification.create({
      data: {
        hostId: parseInt(hostId, 10),
        bookerId: parseInt(bookerId, 10),
        listingId: parseInt(listingId, 10),
        content,
        type
        // dateCreated is handled automatically by Prisma's @default(now())
      }
    });
    return newNotification;
  } catch (error) {
    console.error("Error creating notification:", error);
    throw createError({
      statusCode: 500,
      message: "Error creating notification"
    });
  }
});

const notification_post$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: notification_post
});

const prisma$5 = new PrismaClient();
const notifications_get = defineEventHandler(async (event) => {
  try {
    const { userId } = getQuery$1(event);
    if (!userId) {
      throw new Error("User ID is required");
    }
    const notifications = await prisma$5.notification.findMany({
      where: {
        OR: [
          {
            bookerId: parseInt(userId, 10),
            type: "bookingApproved",
            type: "PaymentDue"
            // Notification for booker
          },
          {
            hostId: parseInt(userId, 10),
            type: "newBookingRequest"
            // Notification for host
          }
        ]
      },
      orderBy: {
        dateCreated: "desc"
      },
      select: {
        notificationId: true,
        content: true,
        dateCreated: true,
        type: true
      }
    });
    return notifications;
  } catch (error) {
    console.error("Error fetching notifications:", error);
    event.res.statusCode = 500;
    return { error: "Error fetching notifications" };
  }
});

const notifications_get$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: notifications_get
});

const prisma$4 = new PrismaClient();
const placeTypes = defineEventHandler(async (event) => {
  try {
    const placeTypes = await prisma$4.placeType.findMany();
    return placeTypes;
  } catch (error) {
    console.error("Error fetching place types:", error);
    event.res.statusCode = 500;
    return { error: "Error fetching place types" };
  }
});

const placeTypes$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: placeTypes
});

const prisma$3 = new PrismaClient();
const DEFAULT_PAYMENT_METHOD_ID = 1;
const DEFAULT_STATUS_ID = 1;
const processPayment = defineEventHandler(async (event) => {
  try {
    const { bookingId, amount, nextPaymentDue } = await readBody(event);
    const paymentMethodId = DEFAULT_PAYMENT_METHOD_ID;
    const statusId = DEFAULT_STATUS_ID;
    const paymentMethod = await prisma$3.paymentMethod.findUnique({
      where: { methodId: paymentMethodId }
    });
    if (!paymentMethod) {
      return { success: false, message: "Invalid payment method." };
    }
    const paymentStatus = await prisma$3.paymentStatus.findUnique({
      where: { statusId }
    });
    if (!paymentStatus) {
      return { success: false, message: "Invalid payment status." };
    }
    const payment = await prisma$3.payment.create({
      data: {
        bookingId,
        amount,
        paymentDate: /* @__PURE__ */ new Date(),
        paymentMethodId,
        statusId,
        nextPaymentDue: new Date(nextPaymentDue)
        // Ensure the date is correctly formatted
      }
    });
    return { success: true, message: "Payment processed successfully.", payment };
  } catch (error) {
    console.error("Error processing payment:", error);
    return { success: false, message: "Failed to process payment." };
  }
});

const processPayment$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: processPayment
});

const prisma$2 = new PrismaClient();
const updatelisting = defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { listingId, title, address, price, guests, bedrooms, beds, bathrooms, amenities, images } = body;
    const updatedListing = await prisma$2.listing.update({
      where: { id: listingId },
      data: {
        title,
        address,
        price,
        guests,
        bedrooms,
        beds,
        bathrooms,
        amenities: {
          set: amenities.map((amenity) => ({ name: amenity }))
        },
        images: {
          set: images.map((imageUrl) => ({ imageUrl }))
        }
      }
    });
    return updatedListing;
  } catch (error) {
    console.error("Error updating listing:", error);
    event.res.statusCode = 500;
    return { error: "Error updating listing" };
  }
});

const updatelisting$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: updatelisting
});

const prisma$1 = new PrismaClient();
const _userId__get = defineEventHandler(async (event) => {
  try {
    const userId = getRouterParam(event, "userId");
    if (!userId) {
      return { statusCode: 400, body: { error: "User ID is required" } };
    }
    const user = await prisma$1.user.findUnique({
      where: { userId: parseInt(userId, 10) },
      select: {
        userId: true,
        // Use "userId" as specified in the schema
        name: true,
        email: true,
        phone: true,
        roleId: true,
        profilePic: true,
        document: true,
        dateJoined: true,
        role: {
          select: {
            roleName: true
          }
        }
      }
    });
    if (!user) {
      return { statusCode: 404, body: { error: "User not found" } };
    }
    return { statusCode: 200, body: user };
  } catch (error) {
    console.error("Error fetching user:", error);
    return { statusCode: 500, body: { error: "Error fetching user details" } };
  }
});

const _userId__get$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: _userId__get
});

const prisma = new PrismaClient();
const REGISTER_SECRET_KEY = process.env.REGISTER_SECRET_KEY;
const verifyEmail = defineEventHandler(async (event) => {
  const { token } = getQuery$1(event);
  try {
    const decoded = jwt.verify(token, REGISTER_SECRET_KEY);
    const user = await prisma.user.findUnique({ where: { userId: decoded.userId } });
    if (!user) {
      throw new Error("User not found");
    }
    if (user.verified) {
      return { message: "Your account is already verified. you will be auto directed to the home page. PLEASE WAIT." };
    }
    await prisma.user.update({
      where: { userId: decoded.userId },
      data: { verified: true, verificationToken: null }
    });
    return { message: "Email verified successfully. you will be auto directed to the home page. PLEASE WAIT." };
  } catch (error) {
    return { message: "Verification failed. The token may be invalid or expired." };
  }
});

const verifyEmail$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: verifyEmail
});

const Vue3 = version[0] === "3";

function resolveUnref(r) {
  return typeof r === "function" ? r() : unref(r);
}
function resolveUnrefHeadInput(ref) {
  if (ref instanceof Promise || ref instanceof Date || ref instanceof RegExp)
    return ref;
  const root = resolveUnref(ref);
  if (!ref || !root)
    return root;
  if (Array.isArray(root))
    return root.map((r) => resolveUnrefHeadInput(r));
  if (typeof root === "object") {
    const resolved = {};
    for (const k in root) {
      if (!Object.prototype.hasOwnProperty.call(root, k)) {
        continue;
      }
      if (k === "titleTemplate" || k[0] === "o" && k[1] === "n") {
        resolved[k] = unref(root[k]);
        continue;
      }
      resolved[k] = resolveUnrefHeadInput(root[k]);
    }
    return resolved;
  }
  return root;
}

const VueReactivityPlugin = defineHeadPlugin({
  hooks: {
    "entries:resolve": (ctx) => {
      for (const entry of ctx.entries)
        entry.resolvedInput = resolveUnrefHeadInput(entry.input);
    }
  }
});

const headSymbol = "usehead";
function vueInstall(head) {
  const plugin = {
    install(app) {
      if (Vue3) {
        app.config.globalProperties.$unhead = head;
        app.config.globalProperties.$head = head;
        app.provide(headSymbol, head);
      }
    }
  };
  return plugin.install;
}
function createServerHead(options = {}) {
  const head = createServerHead$1(options);
  head.use(VueReactivityPlugin);
  head.install = vueInstall(head);
  return head;
}

const unheadPlugins = true ? [CapoPlugin({ track: true })] : [];

const renderSSRHeadOptions = {"omitLineBreaks":false};

function buildAssetsDir() {
  return useRuntimeConfig().app.buildAssetsDir;
}
function buildAssetsURL(...path) {
  return joinRelativeURL(publicAssetsURL(), buildAssetsDir(), ...path);
}
function publicAssetsURL(...path) {
  const app = useRuntimeConfig().app;
  const publicBase = app.cdnURL || app.baseURL;
  return path.length ? joinRelativeURL(publicBase, ...path) : publicBase;
}

globalThis.__buildAssetsURL = buildAssetsURL;
globalThis.__publicAssetsURL = publicAssetsURL;
const getClientManifest = () => import('file://C:/Users/reyan/OneDrive/Desktop/CAPSTONE/client/.nuxt/dist/server/client.manifest.mjs').then((r) => r.default || r).then((r) => typeof r === "function" ? r() : r);
const getServerEntry = () => import('file://C:/Users/reyan/OneDrive/Desktop/CAPSTONE/client/.nuxt/dist/server/server.mjs').then((r) => r.default || r);
const getSSRStyles = lazyCachedFunction(() => Promise.resolve().then(function () { return styles$1; }).then((r) => r.default || r));
const getSSRRenderer = lazyCachedFunction(async () => {
  const manifest = await getClientManifest();
  if (!manifest) {
    throw new Error("client.manifest is not available");
  }
  const createSSRApp = await getServerEntry();
  if (!createSSRApp) {
    throw new Error("Server bundle is not available");
  }
  const options = {
    manifest,
    renderToString: renderToString$1,
    buildAssetsURL
  };
  const renderer = createRenderer(createSSRApp, options);
  async function renderToString$1(input, context) {
    const html = await renderToString(input, context);
    if (process.env.NUXT_VITE_NODE_OPTIONS) {
      renderer.rendererContext.updateManifest(await getClientManifest());
    }
    return APP_ROOT_OPEN_TAG + html + APP_ROOT_CLOSE_TAG;
  }
  return renderer;
});
const getSPARenderer = lazyCachedFunction(async () => {
  const manifest = await getClientManifest();
  const spaTemplate = await Promise.resolve().then(function () { return _virtual__spaTemplate; }).then((r) => r.template).catch(() => "").then((r) => APP_ROOT_OPEN_TAG + r + APP_ROOT_CLOSE_TAG);
  const options = {
    manifest,
    renderToString: () => spaTemplate,
    buildAssetsURL
  };
  const renderer = createRenderer(() => () => {
  }, options);
  const result = await renderer.renderToString({});
  const renderToString = (ssrContext) => {
    const config = useRuntimeConfig(ssrContext.event);
    ssrContext.modules = ssrContext.modules || /* @__PURE__ */ new Set();
    ssrContext.payload.serverRendered = false;
    ssrContext.config = {
      public: config.public,
      app: config.app
    };
    return Promise.resolve(result);
  };
  return {
    rendererContext: renderer.rendererContext,
    renderToString
  };
});
const ISLAND_SUFFIX_RE = /\.json(\?.*)?$/;
async function getIslandContext(event) {
  let url = event.path || "";
  const componentParts = url.substring("/__nuxt_island".length + 1).replace(ISLAND_SUFFIX_RE, "").split("_");
  const hashId = componentParts.length > 1 ? componentParts.pop() : void 0;
  const componentName = componentParts.join("_");
  const context = event.method === "GET" ? getQuery$1(event) : await readBody(event);
  const ctx = {
    url: "/",
    ...context,
    id: hashId,
    name: componentName,
    props: destr(context.props) || {},
    slots: {},
    components: {}
  };
  return ctx;
}
const HAS_APP_TELEPORTS = !!(appTeleportAttrs.id);
const APP_TELEPORT_OPEN_TAG = HAS_APP_TELEPORTS ? `<${appTeleportTag}${propsToString(appTeleportAttrs)}>` : "";
const APP_TELEPORT_CLOSE_TAG = HAS_APP_TELEPORTS ? `</${appTeleportTag}>` : "";
const APP_ROOT_OPEN_TAG = `<${appRootTag}${propsToString(appRootAttrs)}>`;
const APP_ROOT_CLOSE_TAG = `</${appRootTag}>`;
const PAYLOAD_URL_RE = /\/_payload.json(\?.*)?$/ ;
const ROOT_NODE_REGEX = new RegExp(`^<${appRootTag}[^>]*>([\\s\\S]*)<\\/${appRootTag}>$`);
const renderer = defineRenderHandler(async (event) => {
  const nitroApp = useNitroApp();
  const ssrError = event.path.startsWith("/__nuxt_error") ? getQuery$1(event) : null;
  if (ssrError && ssrError.statusCode) {
    ssrError.statusCode = Number.parseInt(ssrError.statusCode);
  }
  if (ssrError && !("__unenv__" in event.node.req)) {
    throw createError({
      statusCode: 404,
      statusMessage: "Page Not Found: /__nuxt_error"
    });
  }
  const isRenderingIsland = event.path.startsWith("/__nuxt_island");
  const islandContext = isRenderingIsland ? await getIslandContext(event) : void 0;
  let url = ssrError?.url || islandContext?.url || event.path;
  const isRenderingPayload = PAYLOAD_URL_RE.test(url) && !isRenderingIsland;
  if (isRenderingPayload) {
    url = url.substring(0, url.lastIndexOf("/")) || "/";
    event._path = url;
    event.node.req.url = url;
  }
  const routeOptions = getRouteRules(event);
  const head = createServerHead({
    plugins: unheadPlugins
  });
  const headEntryOptions = { mode: "server" };
  if (!isRenderingIsland) {
    head.push(appHead, headEntryOptions);
  }
  const ssrContext = {
    url,
    event,
    runtimeConfig: useRuntimeConfig(event),
    noSSR: event.context.nuxt?.noSSR || routeOptions.ssr === false && !isRenderingIsland || (false),
    head,
    error: !!ssrError,
    nuxt: void 0,
    /* NuxtApp */
    payload: ssrError ? { error: ssrError } : {},
    _payloadReducers: /* @__PURE__ */ Object.create(null),
    modules: /* @__PURE__ */ new Set(),
    islandContext
  };
  const renderer = ssrContext.noSSR ? await getSPARenderer() : await getSSRRenderer();
  const _rendered = await renderer.renderToString(ssrContext).catch(async (error) => {
    if (ssrContext._renderResponse && error.message === "skipping render") {
      return {};
    }
    const _err = !ssrError && ssrContext.payload?.error || error;
    await ssrContext.nuxt?.hooks.callHook("app:error", _err);
    throw _err;
  });
  await ssrContext.nuxt?.hooks.callHook("app:rendered", { ssrContext, renderResult: _rendered });
  if (ssrContext._renderResponse) {
    return ssrContext._renderResponse;
  }
  if (ssrContext.payload?.error && !ssrError) {
    throw ssrContext.payload.error;
  }
  if (isRenderingPayload) {
    const response2 = renderPayloadResponse(ssrContext);
    return response2;
  }
  const inlinedStyles = isRenderingIsland ? await renderInlineStyles(ssrContext.modules ?? []) : [];
  const NO_SCRIPTS = routeOptions.experimentalNoScripts;
  const { styles, scripts } = getRequestDependencies(ssrContext, renderer.rendererContext);
  if (inlinedStyles.length) {
    head.push({ style: inlinedStyles });
  }
  if (!isRenderingIsland || true) {
    const link = [];
    for (const resource of Object.values(styles)) {
      if ("inline" in getQuery(resource.file)) {
        continue;
      }
      if (!isRenderingIsland || resource.file.includes("scoped") && !resource.file.includes("pages/")) {
        link.push({ rel: "stylesheet", href: renderer.rendererContext.buildAssetsURL(resource.file), crossorigin: "" });
      }
    }
    if (link.length) {
      head.push({ link }, headEntryOptions);
    }
  }
  if (!NO_SCRIPTS && !isRenderingIsland) {
    head.push({
      link: getPreloadLinks(ssrContext, renderer.rendererContext)
    }, headEntryOptions);
    head.push({
      link: getPrefetchLinks(ssrContext, renderer.rendererContext)
    }, headEntryOptions);
    head.push({
      script: renderPayloadJsonScript({ ssrContext, data: ssrContext.payload }) 
    }, {
      ...headEntryOptions,
      // this should come before another end of body scripts
      tagPosition: "bodyClose",
      tagPriority: "high"
    });
  }
  if (!routeOptions.experimentalNoScripts && !isRenderingIsland) {
    head.push({
      script: Object.values(scripts).map((resource) => ({
        type: resource.module ? "module" : null,
        src: renderer.rendererContext.buildAssetsURL(resource.file),
        defer: resource.module ? null : true,
        // if we are rendering script tag payloads that import an async payload
        // we need to ensure this resolves before executing the Nuxt entry
        tagPosition: "head",
        crossorigin: ""
      }))
    }, headEntryOptions);
  }
  const { headTags, bodyTags, bodyTagsOpen, htmlAttrs, bodyAttrs } = await renderSSRHead(head, renderSSRHeadOptions);
  const htmlContext = {
    island: isRenderingIsland,
    htmlAttrs: htmlAttrs ? [htmlAttrs] : [],
    head: normalizeChunks([headTags]),
    bodyAttrs: bodyAttrs ? [bodyAttrs] : [],
    bodyPrepend: normalizeChunks([bodyTagsOpen, ssrContext.teleports?.body]),
    body: [
      replaceIslandTeleports(ssrContext, _rendered.html) ,
      APP_TELEPORT_OPEN_TAG + (HAS_APP_TELEPORTS ? joinTags([ssrContext.teleports?.[`#${appTeleportAttrs.id}`]]) : "") + APP_TELEPORT_CLOSE_TAG
    ],
    bodyAppend: [bodyTags]
  };
  await nitroApp.hooks.callHook("render:html", htmlContext, { event });
  if (isRenderingIsland && islandContext) {
    const islandHead = {};
    for (const entry of head.headEntries()) {
      for (const [key, value] of Object.entries(resolveUnrefHeadInput(entry.input))) {
        const currentValue = islandHead[key];
        if (Array.isArray(currentValue)) {
          currentValue.push(...value);
        }
        islandHead[key] = value;
      }
    }
    islandHead.link = islandHead.link || [];
    islandHead.style = islandHead.style || [];
    const islandResponse = {
      id: islandContext.id,
      head: islandHead,
      html: getServerComponentHTML(htmlContext.body),
      components: getClientIslandResponse(ssrContext),
      slots: getSlotIslandResponse(ssrContext)
    };
    await nitroApp.hooks.callHook("render:island", islandResponse, { event, islandContext });
    const response2 = {
      body: JSON.stringify(islandResponse, null, 2),
      statusCode: getResponseStatus(event),
      statusMessage: getResponseStatusText(event),
      headers: {
        "content-type": "application/json;charset=utf-8",
        "x-powered-by": "Nuxt"
      }
    };
    return response2;
  }
  const response = {
    body: renderHTMLDocument(htmlContext),
    statusCode: getResponseStatus(event),
    statusMessage: getResponseStatusText(event),
    headers: {
      "content-type": "text/html;charset=utf-8",
      "x-powered-by": "Nuxt"
    }
  };
  return response;
});
function lazyCachedFunction(fn) {
  let res = null;
  return () => {
    if (res === null) {
      res = fn().catch((err) => {
        res = null;
        throw err;
      });
    }
    return res;
  };
}
function normalizeChunks(chunks) {
  return chunks.filter(Boolean).map((i) => i.trim());
}
function joinTags(tags) {
  return tags.join("");
}
function joinAttrs(chunks) {
  if (chunks.length === 0) {
    return "";
  }
  return " " + chunks.join(" ");
}
function renderHTMLDocument(html) {
  return `<!DOCTYPE html><html${joinAttrs(html.htmlAttrs)}><head>${joinTags(html.head)}</head><body${joinAttrs(html.bodyAttrs)}>${joinTags(html.bodyPrepend)}${joinTags(html.body)}${joinTags(html.bodyAppend)}</body></html>`;
}
async function renderInlineStyles(usedModules) {
  const styleMap = await getSSRStyles();
  const inlinedStyles = /* @__PURE__ */ new Set();
  for (const mod of usedModules) {
    if (mod in styleMap && styleMap[mod]) {
      for (const style of await styleMap[mod]()) {
        inlinedStyles.add(style);
      }
    }
  }
  return Array.from(inlinedStyles).map((style) => ({ innerHTML: style }));
}
function renderPayloadResponse(ssrContext) {
  return {
    body: stringify(splitPayload(ssrContext).payload, ssrContext._payloadReducers) ,
    statusCode: getResponseStatus(ssrContext.event),
    statusMessage: getResponseStatusText(ssrContext.event),
    headers: {
      "content-type": "application/json;charset=utf-8" ,
      "x-powered-by": "Nuxt"
    }
  };
}
function renderPayloadJsonScript(opts) {
  const contents = opts.data ? stringify(opts.data, opts.ssrContext._payloadReducers) : "";
  const payload = {
    "type": "application/json",
    "innerHTML": contents,
    "data-nuxt-data": appId,
    "data-ssr": !(opts.ssrContext.noSSR)
  };
  {
    payload.id = "__NUXT_DATA__";
  }
  if (opts.src) {
    payload["data-src"] = opts.src;
  }
  const config = uneval(opts.ssrContext.config);
  return [
    payload,
    {
      innerHTML: `window.__NUXT__={};window.__NUXT__.config=${config}`
    }
  ];
}
function splitPayload(ssrContext) {
  const { data, prerenderedAt, ...initial } = ssrContext.payload;
  return {
    initial: { ...initial, prerenderedAt },
    payload: { data, prerenderedAt }
  };
}
function getServerComponentHTML(body) {
  const match = body[0].match(ROOT_NODE_REGEX);
  return match?.[1] || body[0];
}
const SSR_SLOT_TELEPORT_MARKER = /^uid=([^;]*);slot=(.*)$/;
const SSR_CLIENT_TELEPORT_MARKER = /^uid=([^;]*);client=(.*)$/;
const SSR_CLIENT_SLOT_MARKER = /^island-slot=[^;]*;(.*)$/;
function getSlotIslandResponse(ssrContext) {
  if (!ssrContext.islandContext || !Object.keys(ssrContext.islandContext.slots).length) {
    return void 0;
  }
  const response = {};
  for (const [name, slot] of Object.entries(ssrContext.islandContext.slots)) {
    response[name] = {
      ...slot,
      fallback: ssrContext.teleports?.[`island-fallback=${name}`]
    };
  }
  return response;
}
function getClientIslandResponse(ssrContext) {
  if (!ssrContext.islandContext || !Object.keys(ssrContext.islandContext.components).length) {
    return void 0;
  }
  const response = {};
  for (const [clientUid, component] of Object.entries(ssrContext.islandContext.components)) {
    const html = ssrContext.teleports?.[clientUid]?.replaceAll("<!--teleport start anchor-->", "") || "";
    response[clientUid] = {
      ...component,
      html,
      slots: getComponentSlotTeleport(ssrContext.teleports ?? {})
    };
  }
  return response;
}
function getComponentSlotTeleport(teleports) {
  const entries = Object.entries(teleports);
  const slots = {};
  for (const [key, value] of entries) {
    const match = key.match(SSR_CLIENT_SLOT_MARKER);
    if (match) {
      const [, slot] = match;
      if (!slot) {
        continue;
      }
      slots[slot] = value;
    }
  }
  return slots;
}
function replaceIslandTeleports(ssrContext, html) {
  const { teleports, islandContext } = ssrContext;
  if (islandContext || !teleports) {
    return html;
  }
  for (const key in teleports) {
    const matchClientComp = key.match(SSR_CLIENT_TELEPORT_MARKER);
    if (matchClientComp) {
      const [, uid, clientId] = matchClientComp;
      if (!uid || !clientId) {
        continue;
      }
      html = html.replace(new RegExp(` data-island-uid="${uid}" data-island-component="${clientId}"[^>]*>`), (full) => {
        return full + teleports[key];
      });
      continue;
    }
    const matchSlot = key.match(SSR_SLOT_TELEPORT_MARKER);
    if (matchSlot) {
      const [, uid, slot] = matchSlot;
      if (!uid || !slot) {
        continue;
      }
      html = html.replace(new RegExp(` data-island-uid="${uid}" data-island-slot="${slot}"[^>]*>`), (full) => {
        return full + teleports[key];
      });
    }
  }
  return html;
}

const renderer$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: renderer
});

const styles = {};

const styles$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: styles
});

const template = "";

const _virtual__spaTemplate = /*#__PURE__*/Object.freeze({
  __proto__: null,
  template: template
});
//# sourceMappingURL=index.mjs.map
