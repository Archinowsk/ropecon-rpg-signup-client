const CleanWebpackPlugin = require('clean-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TemplateWebpackPlugin = require('html-webpack-template')
const MomentLocalesPlugin = require('moment-locales-webpack-plugin')
const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')

const appConfig = require('./config')
let config = null
const TARGET = process.env.npm_lifecycle_event

const commonConfig = {
  target: 'web',

  // Array of entry files
  entry: {
    client: [path.join(__dirname, 'src', 'index')],
  },

  // Output for compiled file
  output: {
    path: path.join(__dirname, 'build'),
    publicPath: '/',
    filename: '[name].bundle.js',
  },

  plugins: [
    new HtmlWebpackPlugin({
      // html-webpack-plugin configs
      title: appConfig.appName,
      filename: 'index.html',
      template: TemplateWebpackPlugin,
      inject: false,
      favicon: path.resolve(__dirname, 'static', 'favicon.png'),
      minify: {
        collapseWhitespace: true,
        preserveLineBreaks: true,
      },
      // html-webpack-template configs
      appMountId: 'main',
      meta: {
        'application-name': appConfig.appName,
      },
      mobile: true,
    }),
  ],

  module: {
    // Loaders to transform sources
    rules: [
      {
        // JS loaders
        test: /\.js$/,
        include: [path.resolve(__dirname, 'src')],
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
}

const devConfig = {
  mode: 'development',

  devtool: 'eval', // Use eval for best hot-loading perf

  // webpack-dev-server config
  devServer: {
    host: 'localhost',
    port: 8080,
    hot: true, // enable HMR on the server
    contentBase: path.join(__dirname, 'build'),
    historyApiFallback: true, // respond to 404s with index.html
  },

  module: {
    // Loaders to transform sources
    rules: [
      {
        // SCSS loaders
        test: /\.scss$/,
        use: [
          { loader: 'style-loader', options: { sourceMap: true } },
          { loader: 'css-loader', options: { sourceMap: true } },
          {
            loader: 'postcss-loader',
            options: { sourceMap: true, parser: 'postcss-scss' },
          },
          { loader: 'sass-loader', options: { sourceMap: true } },
        ],
        exclude: /node_modules/,
      },
    ],
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(), // Enable HMR globally
  ],
}

const prodConfig = {
  mode: 'production',

  module: {
    // Loaders to transform sources
    rules: [
      {
        // SCSS loaders
        test: /\.scss$/,
        use: ExtractTextWebpackPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader' },
            { loader: 'postcss-loader', options: { parser: 'postcss-scss' } },
            { loader: 'sass-loader' },
          ],
          publicPath: '/',
        }),
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(['build'], {
      root: path.resolve(__dirname),
      verbose: false,
      exclude: ['.keep'],
    }),
    new CopyWebpackPlugin([{ from: 'static' }]),
    // “en” is built into Moment and can’t be removed
    new MomentLocalesPlugin({
      localesToKeep: ['fi'],
    }),
    new ExtractTextWebpackPlugin('[name].bundle.css'),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$/,
      // test: /\.js$|\.css$|\.html$/,
      // threshold: 10240,
      // minRatio: 0.8
    }),
  ],

  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
}

if (TARGET === 'build' || TARGET === 'analyze') {
  config = webpackMerge(commonConfig, prodConfig)
} else if (TARGET === 'start' || TARGET === 'watch') {
  config = webpackMerge(commonConfig, devConfig)
}

module.exports = config