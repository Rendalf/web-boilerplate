const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const NODE_ENV = process.env.NODE_ENV || 'development'
console.log('process.env.NODE_ENV', NODE_ENV)

const IS_PRODUCTION = NODE_ENV === 'production'

const publicPath = path.resolve(__dirname, '../public')
const srcPath = path.resolve(__dirname, '../src')
const htmlTemplatesPath = path.resolve(srcPath, 'templates', 'index.js')

module.exports = {
  entry: {
    index: ['./src/index.tsx'],
    // TODO research how to make based on `node_modules` in path
    vendor: ['babel-polyfill', './src/vendor.ts']
  },

  output: {
    path: publicPath,
    filename: '[name].js'
  },

  resolve: {
    modules: [
      srcPath,
      'node_modules'
    ],
    extensions: ['.js', '.json', '.ts', '.tsx']
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        loader: 'source-map-loader'
      },
      {
        test: [/\.jpg$/, /\.gif$/, /\.png$/],
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: 'url-loader?name=[path][name].[ext]',
            options: {
              limit: 10000,
              mimetype: 'application/font-woff'
            }
          }
        ]
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader'
      }
    ]
  },

  stats: {
    children: false,
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({ name: ['index', 'vendor'] }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new HtmlWebpackPlugin({
      template: path.resolve(srcPath, 'templates', 'index.js'),
      filename: 'index.html',
      hash: IS_PRODUCTION,
      siteTitle: 'Hello World!',
      // https://github.com/kangax/html-minifier#options-quick-reference
      minify: IS_PRODUCTION
        ? {
          collapseWhitespace: true,
          minifyJS: true,
        } : false,
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
    }),
  ],
}
