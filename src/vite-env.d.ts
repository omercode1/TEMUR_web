/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PROJECT_INQUIRY_MOCK?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
