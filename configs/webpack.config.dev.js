require('react-hot-loader/patch')

const config = require('./webpack.config.common.js')
const path = require('path')
const webpack = require('webpack')

const configsPath = path.resolve(__dirname, '../configs')
const publicPath = path.resolve(__dirname, '../public')
const PORT = 3000

config.devtool = 'eval'
config.cache = true
config.watch = true
config.watchOptions = {
  aggregateTimeout: 100
}

config.module.rules.push({
  test: /\.tsx?$/,
  exclude: /(node_modules)/,
  use: [
    'react-hot-loader/webpack',
    'ts-loader',
  ]
})

config.module.rules.push({
  test: /\.css$/,
  use: [
    'style-loader',
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
})

config.plugins.push(
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NamedModulesPlugin()
)

config.entry.index = [
  'react-hot-loader/patch',
].concat(config.entry.index)

config.devServer = {
  host: '0.0.0.0',
  port: PORT,
  publicPath: '/',
  // cache: true,
  hot: true,
  hotOnly: true,
  inline: true,
  contentBase: publicPath,
  stats: {
    colors: true,
    publicPath: true,
    // for profiling
    chunks: false,
    timings: true,
    reasons: false
  },
  historyApiFallback: true,
}

module.exports = config
