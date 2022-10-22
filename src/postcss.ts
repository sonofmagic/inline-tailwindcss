import postcss from 'postcss'
import type { InternalOptions } from './types'

export async function getProcessor(options: InternalOptions) {
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
