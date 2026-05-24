/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_REDIRECT_IF_ROUTE_NOT_EXISTS: string;
  readonly VITE_TEMPLATE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<Record<string, never>, Record<string, never>, unknown>;
  export default component;
}
