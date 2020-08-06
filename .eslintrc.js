module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
    semi: ['error', 'never'],
    'import/prefer-default-export': 'off',
    'indent': 'off',
    '@typescript-eslint/indent': ['error', 2],
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
  },
}
