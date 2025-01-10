/// <reference types="vite/client" />

declare const __VERSION__: string;

interface ImportMetaEnv {
  readonly VITE_WORLD_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
