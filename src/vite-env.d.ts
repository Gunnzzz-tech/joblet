// src/vite-env.d.ts
/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_XML_FEED_URL: string
    // Add other VITE_* variables here if you have them
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }