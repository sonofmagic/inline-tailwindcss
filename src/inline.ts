import juice from 'juice'
import type { InternalOptions } from './types'
import { getProcessor } from './postcss'
async function getStyle(options: InternalOptions) {
  const processor = await getProcessor(options)
  const res = await processor.process(options.baseCss, {
    from: undefined,
    map: false
  })
  return res.css
}

export async function getInlineHtml(options: InternalOptions) {
  const css = await getStyle(options)
  const result = juice(`<style>${css}</style>${options.html}`)
  return result
}
