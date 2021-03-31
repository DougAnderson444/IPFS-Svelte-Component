var path = require('path')
var webpack = require('webpack')
var pkg = require('./package.json');

const mode = process.env.NODE_ENV || 'development';
const prod = mode === 'production';

const name = pkg.name
  .replace(/^(@\S+\/)?(svelte-)?(\S+)/, '$3')
  .replace(/^\w/, m => m.toUpperCase())
  .replace(/-\w/g, m => m[1].toUpperCase());

module.exports = [
  {
    name: 'es',
    experiments: { outputModule: true },
    output: {
      module: true,
      enabledLibraryTypes: ['module'],
      filename: pkg.module,
      library: name,
      libraryExport: 'default',
      libraryTarget: 'module',
      path: path.join(__dirname, ''),
    },
    entry: './src/index.js',
    mode: mode,
    resolve: {
      alias: {
        svelte: path.resolve('node_modules', 'svelte')
      },
      extensions: ['.mjs', '.js', '.svelte'],
      mainFields: ['svelte', 'browser', 'module', 'main'],
      fallback: {
        "stream": require.resolve("stream-browserify"),
        "dns": require.resolve("dns-over-http-resolver"),
        "util": require.resolve("util/"),
        "url": require.resolve("url/"),
        "assert": require.resolve("assert/")
      }
    },
    module: {
      rules: [
        {
          test: /\.svelte$/,
          exclude: /node_modules/,
          use: {
            loader: 'svelte-loader',
            options: {
              emitCss: true,
              hotReload: true
            }
          }
        },
        // {
        //   test: /\.css$/,
        //   use: [
        //     /**
        //      * MiniCssExtractPlugin doesn't support HMR.
        //      * For developing, use 'style-loader' instead.
        //      * */
        //     prod ? MiniCssExtractPlugin.loader : 'style-loader',
        //     'css-loader'
        //   ]
        // },
        // {
        //   test: /\.js$/,
        //   exclude: /node_modules/,
        //   use: {
        //     loader: 'babel-loader',
        //     options: {
        //       presets: [['@babel/preset-env', { 
        //         // "targets": "defaults", 
        //         // "targets": { "node": "current" },
        //         "targets":  { "esmodules": true },
        //         "modules": "auto"
        //     }]]
        //     }
        //   }
        // }
      ]
    }
  },
  {
    name: 'umd',
    output: {
      filename: pkg.main,
      library: name, // depends on the value of the output.libraryTarget, in 'umd' case, you need the library property to name your module
      // uniqueName: name,
      libraryExport: 'default',
      libraryTarget: 'umd',
      // umdNamedDefine: true, // names the AMD module of the UMD build
      path: path.join(__dirname, ''),
      globalObject: 'self' // self for Web-like targets
    },
    entry: './src/index.js',
    mode: mode,
    resolve: {
      alias: {
        svelte: path.resolve('node_modules', 'svelte')
      },
      extensions: ['.mjs', '.js', '.svelte'],
      mainFields: ['svelte', 'browser', 'module', 'main'],
      fallback: {
        "stream": require.resolve("stream-browserify"),
        "dns": require.resolve("dns-over-http-resolver"),
        "util": require.resolve("util/"),
        "url": require.resolve("url/"),
        "assert": require.resolve("assert/")
      }
    },
    module: {
      rules: [
        {
          test: /\.svelte$/,
          exclude: /node_modules/,
          use: {
            loader: 'svelte-loader',
            options: {
              emitCss: true,
              hotReload: true
            }
          }
        },
        // {
        //   test: /\.css$/,
        //   use: [
        //     /**
        //      * MiniCssExtractPlugin doesn't support HMR.
        //      * For developing, use 'style-loader' instead.
        //      * */
        //     prod ? MiniCssExtractPlugin.loader : 'style-loader',
        //     'css-loader'
        //   ]
        // },
        // {
        //   test: /\.js$/,
        //   exclude: /node_modules/,
        //   use: {
        //     loader: 'babel-loader',
        //     options: {
        //       presets: ['@babel/preset-env']
        //     }
        //   }
        // }
      ]
    }
  }
]
