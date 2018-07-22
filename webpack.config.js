const CleanWebpackPlugin = require('clean-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TemplateWebpackPlugin = require('html-webpack-template')
const MomentLocalesPlugin = require('moment-locales-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const Dotenv = require('dotenv-webpack')
const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')

const appConfig = require('./src/config')
let config = null
const TARGET = process.env.npm_lifecycle_event

const stats = {
  // assets: false,
  // children: false,
  // chunks: false,
  // hash: false,
  modules: false,
  // publicPath: false,
  // timings: false,
  // version: false,
  // warnings: true,
}

const commonConfig = {
  target: 'web',

  // Array of entry files
  entry: {
    oldbrowser: [path.join(__dirname, 'src', 'oldbrowser')],
    client: [path.join(__dirname, 'src', 'index')],
  },

  // Output for compiled file
  output: {
    path: path.join(__dirname, 'build'),
    publicPath: '/',
    filename: '[name].bundle.js',
  },

  resolve: {
    /*
    alias: {
      '': path.resolve(__dirname, 'src'),
    },
    */
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    extensions: ['.js', '.scss'],
  },

  plugins: [
    new HtmlWebpackPlugin({
      // html-webpack-plugin configs
      title: appConfig.appName,
      filename: 'index.html',
      template: TemplateWebpackPlugin,
      inject: false,
      favicon: path.resolve(__dirname, 'assets', 'favicon.png'),
      minify: {
        collapseWhitespace: true,
        preserveLineBreaks: true,
      },
      // html-webpack-template configs
      appMountIds: ['outdated', 'main'],
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
    stats,
  },

  module: {
    // Loaders to transform sources
    rules: [
      {
        // SCSS loaders
        test: /\.scss$/,
        use: [
          { loader: 'style-loader', options: { sourceMap: true } },
          {
            loader: 'css-loader',
            options: { importLoaders: 2, sourceMap: true },
          },
          {
            loader: 'postcss-loader',
            options: { sourceMap: true },
          },
          { loader: 'sass-loader', options: { sourceMap: true } },
        ],
      },
    ],
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(), // Enable HMR globally
  ],
}

const prodConfig = {
  mode: 'production',

  stats,

  module: {
    // Loaders to transform sources
    rules: [
      {
        // SCSS loaders
        test: /\.scss$/,
        use: ExtractTextWebpackPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: { importLoaders: 2 },
            },
            { loader: 'postcss-loader' },
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
    new CopyWebpackPlugin([{ from: 'assets' }]),
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

const prodEnv = {
  plugins: [
    new Dotenv({
      path: './.prod.env', // Path to .env file (this is the default)
    }),
  ],

  optimization: {
    minimizer: [
      new UglifyJSPlugin({
        uglifyOptions: {
          compress: {
            drop_console: true,
          },
          output: {
            comments: false,
          },
        },
      }),
    ],
  },
}

const stagingEnv = {
  plugins: [
    new Dotenv({
      path: './.staging.env', // Path to .env file (this is the default)
    }),
  ],
}

if (TARGET === 'build' || TARGET === 'analyze') {
  config = webpackMerge(commonConfig, prodConfig, prodEnv)
} else if (TARGET === 'build-staging') {
  config = webpackMerge(commonConfig, prodConfig, stagingEnv)
} else if (TARGET === 'start' || TARGET === 'watch') {
  config = webpackMerge(commonConfig, devConfig)
}

module.exports = config
