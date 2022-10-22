import fs from 'fs/promises'
import { getOptions } from './options'
import { exist, resolve, basename } from './util'
import type { UserDefinedOptions } from './types'
import { getInlineHtml } from './inline'

export async function build(options: UserDefinedOptions = {}) {
  const opt = await getOptions(options)
  const html = await getInlineHtml(opt)
  const isExisted = await exist(opt.outDir)
  if (!isExisted) {
    await fs.mkdir(opt.outDir, { recursive: true })
  }
  await fs.writeFile(resolve(opt.outDir, basename(opt.filepath)), html, 'utf-8')
  return true
}
