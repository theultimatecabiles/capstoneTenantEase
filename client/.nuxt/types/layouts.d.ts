import type { ComputedRef, MaybeRef } from 'vue'
export type LayoutKey = string
declare module "../../node_modules/.pnpm/nuxt@3.14.159_@parcel+watcher@2.5.0_@types+node@22.9.0_ioredis@5.4.1_magicast@0.3.5_rollup@4._us6y7is2fwu2rszzqhbaabsbhu/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: MaybeRef<LayoutKey | false> | ComputedRef<LayoutKey | false>
  }
}