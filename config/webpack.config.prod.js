const webpack = require('webpack')
const autoprefixer = require('autoprefixer')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const AddManifestToIndexTemplatePlugin = require('./add-manifest-to-index-template-webpack-plugin')

const { paths, autoprefixerConfig } = require('./shared')

const pluginOptions = {
  // fail build if any eslint errors or warnings
  eslint: {
    failOnWarning: true,
    failOnError: true,
  },
  // we use PostCSS for autoprefixing only.
  postcss: [
    autoprefixer(autoprefixerConfig),
  ],
}

const webpackConfig = {

  entry: {
    app: paths.appIndexJs,
  },

  output: {
    // the build folder.
    path: paths.appDist,
    // generated JS file names (with nested folders).
    filename: 'assets/js/[name].[chunkhash:8].js',
    chunkFilename: '[chunkhash:8].js',
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
      // process css with postcss
      {
        test: /\.css$/,
        include: paths.appSrc,
        loader: ExtractTextPlugin.extract({
          loader: ['css', 'postcss'],
          // the css will reference images at 'assets/media/'
          // however relative to the css file, the images are
          // actually located at '../../assets/media/' hence
          // we prepend '../../'
          publicPath: '../../',
        }),
      },
      // process js with babel
      {
        test: /\.js$/,
        include: paths.appSrc,
        loader: 'babel',
      },
      // "file" loader makes sure those assets get served by WebpackDevServer.
      // When you `import` an asset, you get its (virtual) filename.
      // In production, they would get copied to the `dist` folder.
      {
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        include: paths.appSrc,
        loader: 'file',
        query: {
          name: 'assets/media/[name].[hash:8].[ext]',
        },
      },
    ],
  },

  plugins: [

    // remove dist directory
    new CleanWebpackPlugin(paths.appDist, {
      root: paths.appRoot,
    }),

    // generate deterministic chunk hashes based on file contents
    new webpack.HashedModuleIdsPlugin(),

    // extract vendor chunk
    // https://jeremygayed.com/dynamic-vendor-bundling-in-webpack-528993e48aab#.jrtpk3y9z
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: ({ resource }) => /node_modules/.test(resource),
    }),

    // generate a 'manifest' chunk to be inlined in the HTML template
    new webpack.optimize.CommonsChunkPlugin('manifest'),

    // inject manifest bundle from above into the index html template
    // prevents changes in app bundle changing the hash of the vendor
    // bundle and vice versa.
    // https://github.com/webpack/webpack/issues/1315
    new AddManifestToIndexTemplatePlugin(),

    // inject references to the generated bundles (both js and css) into
    // the index html template, minify and copy to dist folder
    new HtmlWebpackPlugin({
      excludeChunks: ['manifest'],
      template: paths.appHtml,
      inject: true,
      minify: {
        removeComments: false,
        collapseWhitespace: true,
      },
    }),

    // extract cs into a bundle
    // note: this won't work without ExtractTextPlugin.extract(..) in `loaders`.
    new ExtractTextPlugin('assets/css/[name].[contenthash:8].css'),

    // copy public => dist
    new CopyWebpackPlugin([{
      from: paths.appPublic,
      to: paths.appDist,
    }]),

    // set plugin options
    new webpack.LoaderOptionsPlugin({ options: pluginOptions }),
  ],
}

module.exports = webpackConfig

