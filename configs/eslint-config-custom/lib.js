const prettier = require('../prettier')

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  processor: 'disable/disable',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['@typescript-eslint', 'disable'],
  overrides: [
    {
      files: ['**/*.test.*', '**/*.tsx'],
    },
  ],
  rules: {
    'react/jsx-key': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
      },
    ],
    'explicit-module-boundary-types': 'off',

    'prettier/prettier': ['error', prettier],
  },
  ignorePatterns: ['**/build', '**/dist', '**/node_modules'],
}
