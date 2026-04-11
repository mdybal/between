/// <reference types="vite/client" />

interface ImportMetaGlob {
  (globs: string | string[], options?: ImportMetaGlobOptions): Record<string, () => Promise<unknown>>
  glob: (globs: string | string[], options?: ImportMetaGlobOptions) => Promise<Record<string, unknown>>
}

interface ImportMetaGlobOptions {
  eager?: boolean
  import?: string
  exclude?: string[]
  query?: string | Record<string, string>
  preprocess?: ( importer: string ) => string
  includeSubdirs?: boolean
}
