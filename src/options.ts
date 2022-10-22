import fs from 'fs/promises'
import defu from 'defu'
import { cwdResolve } from './util'
import type { InternalOptions, UserDefinedOptions } from './types'

export async function getOptions(
  options: UserDefinedOptions
): Promise<InternalOptions> {
  const defaultConfig: Required<UserDefinedOptions> = {
    filepath: cwdResolve('index.html'),
    tailwindConfigPath: cwdResolve('tailwind.config'),
    baseCss: `@tailwind utilities;`,
    outDir: cwdResolve('dist')
  }
  const opt = defu(options, defaultConfig) as InternalOptions
  try {
    await fs.access(opt.filepath)
    const html = await fs.readFile(opt.filepath, 'utf-8')
    opt.html = html
  } catch (error) {
    console.warn(`File not existed: ${opt.filepath}`)
  }

  return opt
}
