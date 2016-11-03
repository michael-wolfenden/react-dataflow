module.exports = {
  // https://github.com/babel/babel-eslint
  // needed for static calss properties
  parser: 'babel-eslint',
  extends: 'airbnb',
  plugins: [
    'react',
    'jsx-a11y',
    'import'
  ],
  rules: {
    // http://eslint.org/docs/rules/linebreak-style
    // enforces windows line endings: \r\n for CRLF.
    'linebreak-style': ['error', 'windows'],

    // http://eslint.org/docs/rules/semi
    // no semi-colons (YOLO)
    'semi': ['error', 'never'],

    // allow console logging
    // babel-plugin-transform-remove-console will strip console
    // statements out during the production build
    'no-console': 0,

    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-extraneous-dependencies.md
    // allow importing devDependencies
    'import/no-extraneous-dependencies': ['error', { 'devDependencies': true }],

    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-filename-extension.md
    'react/jsx-filename-extension': ['error', { 'extensions': ['.js'] }],
  },
  env: {
    jest: true,
  },
  settings: {
    'import/resolver': {
      'webpack': {
        'config': 'config/webpack.config.dev.js'
      }
    }
  }
};
