import chokidar from 'chokidar'
import { build } from './exports'

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
