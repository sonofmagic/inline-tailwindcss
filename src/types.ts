export interface UserDefinedOptions {
  // content?: string
  filepath?: string
  tailwindConfigPath?: string
  baseCss?: string
  outDir?: string
  write?: boolean
}

export interface InternalOptions extends Required<UserDefinedOptions> {
  html: string
}
