import juice from 'juice'
import type { InternalOptions, UserDefinedOptions } from './types'
import { getProcessor } from './postcss'
import fs from 'fs/promises'
import { getOptions } from './options'
import { exist, resolve, basename } from './util'

async function getStyle(options: InternalOptions) {
  const processor = await getProcessor(options)
  const res = await processor.process(options.baseCss, {
    from: undefined,
    map: false
  })
  return res.css
}

async function getInlineHtml(options: InternalOptions) {
  const css = await getStyle(options)
  const result = juice(
    `<style>${css}</style>${options.html}`,
    options.juiceOptions
  )
  return result
}

export async function build(options: UserDefinedOptions = {}) {
  const opt = await getOptions(options)
  const html = await getInlineHtml(opt)
  if (opt.write) {
    const isExisted = await exist(opt.outDir)
    if (!isExisted) {
      await fs.mkdir(opt.outDir, { recursive: true })
    }
    await fs.writeFile(
      resolve(opt.outDir, basename(opt.filepath)),
      html,
      'utf-8'
    )
  }

  return html
}
