import fs from 'fs/promises'
import defu from 'defu'
import { cwdResolve, exist } from './util'
import type { InternalOptions, UserDefinedOptions } from './types'

export async function getOptions(
  options: UserDefinedOptions
): Promise<InternalOptions> {
  const defaultConfig: Required<UserDefinedOptions> = {
    filepath: cwdResolve('index.html'),
    tailwindConfigPath: cwdResolve('tailwind.config'),
    baseCss: `@tailwind utilities;`,
    outDir: cwdResolve('dist'),
    write: true
  }
  const opt = defu(options, defaultConfig) as InternalOptions

  const isExisted = await exist(opt.filepath)
  if (isExisted) {
    const html = await fs.readFile(opt.filepath, 'utf-8')
    opt.html = html
  } else {
    console.warn(`File not existed: ${opt.filepath}`)
  }

  return opt
}
