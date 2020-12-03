import svelte from 'rollup-plugin-svelte';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs'
import pkg from './package.json';
import json from '@rollup/plugin-json';
// import nodePolyfills from 'rollup-plugin-node-polyfills'; // doesnt work as well as globals?
import nodeGlobals from 'rollup-plugin-node-globals';
import builtins from 'rollup-plugin-node-builtins';

const name = pkg.name
	.replace(/^(@\S+\/)?(svelte-)?(\S+)/, '$3')
	.replace(/^\w/, m => m.toUpperCase())
	.replace(/-\w/g, m => m[1].toUpperCase());

export default {
	input: './src/index.js',
	output: [
		{ 
			file: pkg.module, 
			'format': 'es',
			interop: 'auto'
		},
		{ 
			file: pkg.main, 
			'format': 'umd', 
			name,
			interop: 'auto'
		}
	],
	plugins: [
		nodeResolve({
			browser: true,
			preferBuiltins: false, // or false?
			extensions: ['.mjs', '.js', '.json', '.node', '.cjs']
		}),		
		svelte(),
		json(),
		commonjs({
			include: [/node_modules/],
			// dynamicRequireTargets: [
			// 	// include using a glob pattern (either a string or an array of strings)
			// 	'node_modules/lodash.js',
			// 	'node_modules/lodash.merge/*'
			// ],
			transformMixedEsModules: true,
			// requireReturnsDefault: "auto" // what is returned when requiring an ES module from a CommonJS file
		}),
		nodeGlobals(), // after commonjs, before builtins
		// nodePolyfills(),
		builtins()
	]
};
