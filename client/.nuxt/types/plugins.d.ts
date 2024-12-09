// Generated by Nuxt'
import type { Plugin } from '#app'

type Decorate<T extends Record<string, any>> = { [K in keyof T as K extends string ? `$${K}` : never]: T[K] }

type InjectionType<A extends Plugin> = A extends {default: Plugin<infer T>} ? Decorate<T> : unknown

type NuxtAppInjections = 
  InjectionType<typeof import("../../node_modules/.pnpm/nuxt@3.14.1592_@parcel+watcher@2.5.0_@types+node@22.10.1_ioredis@5.4.1_magicast@0.3.5_rollup@_ci4gpr7yumfjwqvvbbtddk7pn4/node_modules/nuxt/dist/app/plugins/revive-payload.client.js")> &
  InjectionType<typeof import("../../node_modules/.pnpm/nuxt@3.14.1592_@parcel+watcher@2.5.0_@types+node@22.10.1_ioredis@5.4.1_magicast@0.3.5_rollup@_ci4gpr7yumfjwqvvbbtddk7pn4/node_modules/nuxt/dist/head/runtime/plugins/unhead.js")> &
  InjectionType<typeof import("../../node_modules/.pnpm/nuxt@3.14.1592_@parcel+watcher@2.5.0_@types+node@22.10.1_ioredis@5.4.1_magicast@0.3.5_rollup@_ci4gpr7yumfjwqvvbbtddk7pn4/node_modules/nuxt/dist/pages/runtime/plugins/router.js")> &
  InjectionType<typeof import("../../node_modules/.pnpm/nuxt@3.14.1592_@parcel+watcher@2.5.0_@types+node@22.10.1_ioredis@5.4.1_magicast@0.3.5_rollup@_ci4gpr7yumfjwqvvbbtddk7pn4/node_modules/nuxt/dist/app/plugins/navigation-repaint.client.js")> &
  InjectionType<typeof import("../../node_modules/.pnpm/nuxt@3.14.1592_@parcel+watcher@2.5.0_@types+node@22.10.1_ioredis@5.4.1_magicast@0.3.5_rollup@_ci4gpr7yumfjwqvvbbtddk7pn4/node_modules/nuxt/dist/app/plugins/check-outdated-build.client.js")> &
  InjectionType<typeof import("../../node_modules/.pnpm/nuxt@3.14.1592_@parcel+watcher@2.5.0_@types+node@22.10.1_ioredis@5.4.1_magicast@0.3.5_rollup@_ci4gpr7yumfjwqvvbbtddk7pn4/node_modules/nuxt/dist/app/plugins/revive-payload.server.js")> &
  InjectionType<typeof import("../../node_modules/.pnpm/nuxt@3.14.1592_@parcel+watcher@2.5.0_@types+node@22.10.1_ioredis@5.4.1_magicast@0.3.5_rollup@_ci4gpr7yumfjwqvvbbtddk7pn4/node_modules/nuxt/dist/app/plugins/chunk-reload.client.js")> &
  InjectionType<typeof import("../../node_modules/.pnpm/nuxt@3.14.1592_@parcel+watcher@2.5.0_@types+node@22.10.1_ioredis@5.4.1_magicast@0.3.5_rollup@_ci4gpr7yumfjwqvvbbtddk7pn4/node_modules/nuxt/dist/pages/runtime/plugins/prefetch.client.js")> &
  InjectionType<typeof import("../../node_modules/.pnpm/nuxt@3.14.1592_@parcel+watcher@2.5.0_@types+node@22.10.1_ioredis@5.4.1_magicast@0.3.5_rollup@_ci4gpr7yumfjwqvvbbtddk7pn4/node_modules/nuxt/dist/pages/runtime/plugins/check-if-page-unused.js")> &
  InjectionType<typeof import("../../node_modules/.pnpm/@nuxt+devtools@1.6.3_rollup@4.28.1_vite@5.4.11_@types+node@22.10.1_terser@5.37.0__vue@3.5.13_typescript@5.6.3_/node_modules/@nuxt/devtools/dist/runtime/plugins/devtools.server.js")> &
  InjectionType<typeof import("../../node_modules/.pnpm/@nuxt+devtools@1.6.3_rollup@4.28.1_vite@5.4.11_@types+node@22.10.1_terser@5.37.0__vue@3.5.13_typescript@5.6.3_/node_modules/@nuxt/devtools/dist/runtime/plugins/devtools.client.js")> &
  InjectionType<typeof import("../../node_modules/.pnpm/nuxt@3.14.1592_@parcel+watcher@2.5.0_@types+node@22.10.1_ioredis@5.4.1_magicast@0.3.5_rollup@_ci4gpr7yumfjwqvvbbtddk7pn4/node_modules/nuxt/dist/app/plugins/dev-server-logs.js")> &
  InjectionType<typeof import("../../node_modules/.pnpm/nuxt@3.14.1592_@parcel+watcher@2.5.0_@types+node@22.10.1_ioredis@5.4.1_magicast@0.3.5_rollup@_ci4gpr7yumfjwqvvbbtddk7pn4/node_modules/nuxt/dist/app/plugins/check-if-layout-used.js")> &
  InjectionType<typeof import("../../plugins/leaflet.client.js")>

declare module '#app' {
  interface NuxtApp extends NuxtAppInjections { }

  interface NuxtAppLiterals {
    pluginName: 'nuxt:revive-payload:client' | 'nuxt:head' | 'nuxt:router' | 'nuxt:revive-payload:server' | 'nuxt:chunk-reload' | 'nuxt:global-components' | 'nuxt:prefetch' | 'nuxt:checkIfPageUnused' | 'nuxt:checkIfLayoutUsed'
  }
}

declare module 'vue' {
  interface ComponentCustomProperties extends NuxtAppInjections { }
}

export { }
