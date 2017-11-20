const webpack = require('webpack')
const path = require('path')
const config = require('./webpack.config.common.js')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const configsPath = path.resolve(__dirname, '../configs')

const CHUNKS = ['index.js', 'vendor.js', 'style.css']
const CHUNK_FILES = CHUNKS.reduce((files, chunkFile) => {
  const chunkFiles = [chunkFile]
  chunkFiles.push(...chunkFiles.reduce((result, fileName) => result.concat(`${ fileName }.map`), []))

  files.push(...chunkFiles)
  return files
}, [])

config.devtool = 'source-map'

config.module.rules.push({
  test: /\.tsx?$/,
  exclude: /(node_modules)/,
  loader: 'ts-loader'
})

config.module.rules.push({
  test: /\.css$/,
  use: ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: [
      {
        loader: 'css-loader',
        options: {
          modules: true,
          importLoaders: 1,
          localIdentName: '[name]__[local]__[hash:base64:5]'
        }
      },
      {
        loader: 'postcss-loader',
        options: {
          config: {
            path: path.resolve(configsPath, 'postcss.config.js'),
          },
        },
      }
    ]
  }),
})

const uglifyCommonConfig = {
  sourceMap: true,
  compress: {
    warnings: false,
    drop_console: true,
    unsafe: true
  },
}

config.plugins.push(
  new ExtractTextPlugin('style.css'),
  new webpack.LoaderOptionsPlugin({
    minimize: true
  }),
  new webpack.optimize.UglifyJsPlugin(Object.assign({}, uglifyCommonConfig, {
    test: /index.js/i,
    mangle: {
      keep_fnames: true,
    }
  })),
  new webpack.optimize.UglifyJsPlugin(Object.assign({}, uglifyCommonConfig, {
    test: /vendor.js/i,
  })),
  new CleanWebpackPlugin([
    'index.html',
    ...CHUNK_FILES,
  ], {
    root: config.output.path,
  })
)

module.exports = config
