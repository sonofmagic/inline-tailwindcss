import typescript from '@rollup/plugin-typescript'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import pkg from './package.json'
import { visualizer } from 'rollup-plugin-visualizer'
import { RollupOptions } from 'rollup'
// import json from '@rollup/plugin-json'
// import replace from '@rollup/plugin-replace'
// import { terser } from 'rollup-plugin-terser'
const isProd = process.env.NODE_ENV === 'production'
const isDev = process.env.NODE_ENV === 'development'
// @ts-ignore
const dependencies = pkg.dependencies as Record<string, string> | undefined

const config: RollupOptions = {
  // input: 'src/index.ts',
  input: { index: 'src/index.ts', cli: 'src/cli.ts' },
  output: [
    // {
    //   file: pkg.main,
    //   format: 'cjs',
    //   sourcemap: isDev,
    //   exports: 'auto',
    //   plugins: [
    //     isProd
    //       ? visualizer({
    //           filename: 'stats/cjs.html'
    //         })
    //       : undefined
    //   ]
    // },
    // {
    //   format: 'esm',
    //   file: pkg.module,
    //   sourcemap: isDev,
    //   plugins: [
    //     isProd
    //       ? visualizer({
    //           filename: 'stats/esm.html'
    //         })
    //       : undefined
    //   ]
    // }
    {
      dir: 'dist',
      format: 'cjs',
      sourcemap: isDev,
      exports: 'auto'
      // plugins: [isProd ? visualizer() : undefined]
    }
  ],

  plugins: [
    nodeResolve({
      preferBuiltins: true
    }),
    commonjs(),
    typescript({ tsconfig: './tsconfig.build.json', sourceMap: isDev })
  ],
  external: [...(dependencies ? Object.keys(dependencies) : [])]
}

export default config
