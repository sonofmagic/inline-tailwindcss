export interface UserDefinedOptions {
  /**
   * @description html file abs path
   */
  filepath?: string
  /**
   * @description tailwind config path
   * @default `process.cwd() + tailwind.config.js`
   */
  tailwindConfigPath?: string
  /**
   * @description base tailwindcss
   * @default `@tailwind utilities;`
   */
  baseCss?: string
  /**
   * @description out put dir
   * @default 'dist''
   */
  outDir?: string
  /**
   * @description if write to disk
   * @default true
   */
  write?: boolean
}

export interface InternalOptions extends Required<UserDefinedOptions> {
  html: string
}
