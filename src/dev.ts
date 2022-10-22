import chokidar from 'chokidar'
import { build } from './exports'
import { readdir, resolve } from './util'
export function dev(paths: string | string[]) {
  chokidar.watch(paths).on('all', async (event, filepath) => {
    console.log(event, filepath)
    if (/\.html?$/.test(filepath)) {
      await build({
        filepath
      })
    }
  })
}

export async function buildAll(dirpath: string = process.cwd()) {
  const filenames = await readdir(dirpath)
  for (let i = 0; i < filenames.length; i++) {
    const filename = filenames[i]
    if (/\.html?$/.test(filename)) {
      await build({
        filepath: resolve(dirpath, filename)
      })
    }
  }
}

export { build }
