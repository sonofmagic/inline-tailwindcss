import args from 'args'

args.command('serve', 'Serve your static site', undefined, ['s'])

const flags = args.parse(process.argv)

if (flags.serve) {
}
