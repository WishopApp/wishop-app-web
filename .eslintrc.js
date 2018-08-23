module.exports = {
  extends: 'react-tools',
  env: {
    browser: true,
    node: true,
  },
  rules: {
    'space-before-function-paren': ['error', 'never'],
    'object-curly-newline': [
      'error',
      {
        consistent: true,
      },
    ],
  },
}
