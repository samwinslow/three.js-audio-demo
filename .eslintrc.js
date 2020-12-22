module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/@typescript-eslint',
    'eslint-config-prettier'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    indent: ['warning', 2],
    'linebreak-style': ['error', 'unix'],
    quotes: ['warning', 'single'],
    semi: ['warning', 'never'],
    'class-methods-use-this': 1,
    'no-empty': 1,
    'no-fallthrough': 1,
    'no-nested-ternary': 1,
    'no-param-reassign': 1,
    'no-restricted-globals': 1,
    'no-restricted-properties': 1,
    'no-shadow': 1,
    'no-underscore-dangle': 1,
    'no-unsafe-finally': 1,
    'prefer-const': 1,
    'prefer-promise-reject-errors': 1,
  },
}
