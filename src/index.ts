import postcss from 'postcss'
import fs from 'fs/promises'
import path from 'path'
import juice from 'juice'
import defu from 'defu'
interface UserDefinedOptions {
  // content?: string
  filepath?: string
  tailwindConfigPath?: string
}

interface InternalOptions extends Required<UserDefinedOptions> {
  html: string
}

async function getProcessor(options: InternalOptions) {
  const twConfig = require(options.tailwindConfigPath)
  const processor = postcss([
    require('autoprefixer')(),
    require('tailwindcss')({
      ...twConfig,
      content: [
        {
          extension: 'html',
          raw: options.html
        }
      ]
    })
  ])
  return processor
}

async function getStyle(options: InternalOptions) {
  const processor = await getProcessor(options)
  const res = await processor.process(
    `@tailwind base;@tailwind components;@tailwind utilities;`
  )
  return res.css
}

function resolve(...paths: string[]) {
  return path.resolve(process.cwd(), ...paths)
}

async function getOptions(
  options: UserDefinedOptions
): Promise<InternalOptions> {
  const defaultConfig: Required<UserDefinedOptions> = {
    filepath: resolve('index.html'),
    tailwindConfigPath: resolve('tailwind.config')
  }
  const opt = defu(options, defaultConfig) as InternalOptions
  const html = await fs.readFile(opt.filepath, 'utf-8')
  opt.html = html
  return opt
}

export async function getInlineHtml(options: UserDefinedOptions = {}) {
  const opt = await getOptions(options)
  const css = await getStyle(opt)
  const result = juice(`<style>${css}</style>${opt.html}`)
  return result
}
