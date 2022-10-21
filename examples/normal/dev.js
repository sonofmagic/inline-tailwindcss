const { getInlineHtml } = require('../..')
const fs = require('fs/promises')

async function main() {
  const html = await getInlineHtml()
  await fs.writeFile('dist/index.html', html, 'utf-8')
}
main()
