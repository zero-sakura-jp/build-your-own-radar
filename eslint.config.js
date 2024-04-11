import jest from 'eslint-plugin-jest'
import cypress from 'eslint-plugin-cypress'

import globals from 'globals'

export default [
  {
    languageOptions: {
      node
      globals: {
        jest: true,
      },
    },
  },
]

module.exports = {
  env: {
    node: true,
    es2021: true,
    jest: true,
    'cypress/globals': true,
  },
  extends: ['eslint:recommended', 'prettier', 'plugin:jest/recommended'],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'cypress/no-assigning-return-values': 'error',
    'cypress/no-unnecessary-waiting': 'error',
    'cypress/assertion-before-screenshot': 'warn',
    'cypress/no-force': 'warn',
    'cypress/no-async-tests': 'error',
    'cypress/no-pause': 'error',
    'jest/no-disabled-tests': 'warn',
    'jest/no-focused-tests': 'error',
    'jest/no-identical-title': 'off',
    'jest/prefer-to-have-length': 'warn',
    'jest/valid-expect': 'error',
    'jest/expect-expect': 'off',
  },
  globals: {
    jest: true,
  },
  plugins: [jest, cypress],
  ignorePatterns: [
    'node_modules/',
    'bower_components',
    'dist/',
    'coverage/',
    '*.swa',
    '*.swp',
    '*.swo',
    '.idea/',
    '.vscode/',
    '.DS_Store',
    'spec/end_to_end_tests/reports/,',
    'cypress/',
    '.nyc_output',
    '.private.notes',
  ],
}
