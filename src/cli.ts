import minimist from 'minimist'
import { dev } from './dev'
import { cwdResolve } from './util'
const argv = minimist(process.argv.slice(2))

const _ = argv._

if (_.includes('dev')) {
  dev(['*.html', 'tailwind.config.js'].map((x) => cwdResolve(x)))
}
