import svelte from 'rollup-plugin-svelte'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import pkg from './package.json'
import json from '@rollup/plugin-json'
// import nodePolyfills from 'rollup-plugin-node-polyfills'; // doesnt work as well as globals?
import nodeGlobals from 'rollup-plugin-node-globals'
import builtins from 'rollup-plugin-node-builtins'
import alias from '@rollup/plugin-alias'

const name = pkg.name
  .replace(/^(@\S+\/)?(svelte-)?(\S+)/, '$3')
  .replace(/^\w/, (m) => m.toUpperCase())
  .replace(/-\w/g, (m) => m[1].toUpperCase())

export default {
  input: './src/index.js',
  output: [
    {
      // file: pkg.module,
      dir: 'dist/es',
      format: 'es',
      interop: 'auto'
    },
    {
      file: pkg.main,
      format: 'umd',
      name,
      interop: 'auto',
      inlineDynamicImports: true
    }
  ],
  plugins: [
    alias({
      entries: [
        { find: 'node(options)', replacement: 'false' } // since mortice package.json browser field isnt being resolved
      ]
    }),
    nodeResolve({
      browser: true,
      preferBuiltins: false, // or false?
      extensions: ['.mjs', '.js', '.json', '.node', '.cjs'],
      resolveOnly: [/^(?!cluster$)/] // exclude cluster
    }),
    svelte(),
    json(),
    commonjs({
      include: [/node_modules/],
      // exclude: ['node_modules/mortice/lib/node.js'], // require not defined
      dynamicRequireTargets: [
        // include using a glob pattern (either a string or an array of strings)
        // 'node_modules/mortice/lib/*.js', // require not defined
        // '!node_modules/mortice/lib/node.js', // didnt do anything?
      ],
      transformMixedEsModules: false
      // requireReturnsDefault: "auto" // what is returned when requiring an ES module from a CommonJS file
    }),
    nodeGlobals(), // after commonjs, before builtins
    // nodePolyfills(),
    builtins()
  ]
}
