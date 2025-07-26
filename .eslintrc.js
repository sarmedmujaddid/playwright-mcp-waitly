module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'playwright'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:playwright/recommended',
    'prettier'
  ],
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'warn',
    '@typescript-eslint/no-explicit-any': 'error',
    'playwright/no-conditional-in-test': 'error',
    'playwright/no-force-option': 'warn',
    'playwright/prefer-web-first-assertions': 'warn'
  },
  env: {
    node: true,
    es2022: true
  }
};
