const { resolve } = require('path')

const appRoot = resolve(__dirname, '../')
const appSrc = resolve(appRoot, 'src')
const appDist = resolve(appRoot, 'dist')
const appPublic = resolve(appRoot, 'public')
const appIndexJs = resolve(appSrc, 'index.js')
const appHtml = resolve(appPublic, 'index.html')

module.exports = {
  paths: {
    appRoot,
    appSrc,
    appDist,
    appPublic,
    appIndexJs,
    appHtml,
  },
  autoprefixerConfig: {
    browsers: [
      '>1%',
      'last 4 versions',
      'Firefox ESR',
      // React doesn't support IE8 anyway
      'not ie < 9',
    ],
  },
}
