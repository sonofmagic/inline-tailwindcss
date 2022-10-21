const postcss = require('postcss')
const fs = require('fs')
const path = require('path')
const twConfig = require('./tailwind.config')
const app = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8')
const juice = require('juice')
const processor = postcss([
  require('autoprefixer')(),
  require('tailwindcss')({
    ...twConfig,
    content: [
      {
        extension: 'html',
        raw: app
      }
    ]
  })
])

async function getStyle() {
  const res = await processor.process(
    `@tailwind base;@tailwind components;@tailwind utilities;`
  )
  return res.css
}

async function getInlineHtml() {
  const css = await getStyle()
  const result = juice(`<style>${css}</style>${app}`)
  return result
}

getInlineHtml()
