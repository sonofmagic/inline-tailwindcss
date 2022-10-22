import minimist from 'minimist'
import { dev, buildAll } from './dev'
import { cwdResolve } from './util'
const argv = minimist(process.argv.slice(2))

const _map = argv._.reduce<Record<string, boolean>>((acc, cur) => {
  acc[cur] = true
  return acc
}, {})

switch (true) {
  case _map.dev: {
    dev(['*.html', 'tailwind.config.js'].map((x) => cwdResolve(x)))
    break
  }
  case _map.build: {
    buildAll()
    break
  }
  default: {
    break
  }
}
