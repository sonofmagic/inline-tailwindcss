export interface UserDefinedOptions {
  // content?: string
  filepath?: string
  tailwindConfigPath?: string
  baseCss?: string
  outDir?: string
}

export interface InternalOptions extends Required<UserDefinedOptions> {
  html: string
}
