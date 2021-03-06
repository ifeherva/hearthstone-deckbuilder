const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')

const buildPath = path.join(__dirname, 'build')

module.exports = ({ build = false, dev = false }) => ({
  entry: ['babel-polyfill', 'whatwg-fetch', './src/index.js'],
  output: {
    filename: dev ? '[name].[hash].js' : `[name].[chunkhash].js`,
    path: buildPath,
    pathinfo: dev,
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js']
  },
  devtool: build ? 'source-map' : 'eval-source-map',
  devServer: {
    historyApiFallback: {
      index: '/index.html',
      disableDotRule: true
    },
    contentBase: path.resolve('static'),
    overlay: false,
    port: 1234
  },
  plugins: [
    dev
      ? new webpack.NamedModulesPlugin()
      : new webpack.HashedModuleIdsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': `'${build ? 'production' : 'development'}'`
    }),
    !dev &&
      new CopyWebpackPlugin(
        [{ from: path.resolve('static'), to: path.join(buildPath) }],
        { copyUnmodified: true }
      ),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.join(__dirname, 'src', 'index.html'),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    })
  ].filter(value => value),
  module: {
    strictExportPresence: true,
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [path.join(__dirname, 'src'), path.join(__dirname, 'data')]
      },
      { test: /\.(png|jpg|gif)$/, loader: 'file-loader' },
      { test: /\.json$/, loader: 'json-loader' }
    ]
  }
})
