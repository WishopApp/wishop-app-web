module.exports = {
  extends: 'react-tools',
  env: {
    browser: true,
    node: true,
  },
  rules: {
    'linebreak-style': ['error', 'windows'],
    'space-before-function-paren': ['error', 'never'],
    'object-curly-newline': [
      'error',
      {
        consistent: true,
      },
    ],
  },
}
