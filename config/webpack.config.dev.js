const { HotModuleReplacementPlugin, LoaderOptionsPlugin } = require('webpack')
const autoprefixer = require('autoprefixer')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { paths, autoprefixerConfig } = require('./shared')

const pluginOptions = {
  // we use PostCSS for autoprefixing only.
  postcss: [
    autoprefixer(autoprefixerConfig),
  ],
}

const webpackConfig = {

  entry: [
    // Include an alternative client for WebpackDevServer. A client's job is to
    // connect to WebpackDevServer by a socket and get notified about changes.
    // When you save a file, the client will either apply hot updates (in case
    // of CSS changes), or refresh the page (in case of JS changes). When you
    // make a syntax error, this client will display a syntax error overlay.
    require.resolve('react-dev-utils/webpackHotDevClient'),

    // Our app
    paths.appIndexJs,
  ],

  devServer: {
    // only display errors
    stats: 'errors-only',
  },

  resolve: {
    // set root resolver to app directory.
    // this allows using absolute paths for imports starting from
    // the app folder instead of relative paths
    // ie import { } from dir/dir/dir vs
    // ie import { } from ../../../
    modules: [
      'node_modules',
      paths.appSrc,
    ],
  },

  module: {
    rules: [
      // first, run the linter before babel processes the js
      {
        enforce: 'pre',
        test: /\.js$/,
        include: paths.appSrc,
        loader: 'eslint',
      },
      // process css with postcss and inject into the page
      {
        test: /\.css$/,
        include: paths.appSrc,
        loader: 'style!css!postcss',
      },
      // process js with babel
      {
        test: /\.js$/,
        include: paths.appSrc,
        loader: 'babel?cacheDirectory',
      },
      // "file" loader makes sure those assets get served by WebpackDevServer.
      // When you `import` an asset, you get its (virtual) filename.
      // In production, they would get copied to the `dist` folder.
      {
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        include: paths.appSrc,
        loader: 'file',
      },
    ],
  },

  plugins: [
    // This is necessary to emit hot updates (currently CSS only):
    new HotModuleReplacementPlugin(),

    // inject references to the generated js bundle inot the index html template
    new HtmlWebpackPlugin({
      template: paths.appHtml,
      inject: true,
    }),

    // set plugin options
    new LoaderOptionsPlugin({ options: pluginOptions }),
  ],
}

module.exports = webpackConfig

