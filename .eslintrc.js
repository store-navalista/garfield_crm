module.exports = {
   env: {
      browser: true,
      es2021: true
   },
   extends: [
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:@typescript-eslint/eslint-recommended',
      'plugin:@typescript-eslint/recommended'
   ],
   globals: {
      window: true,
      console: true
   },
   overrides: [],
   parser: '@typescript-eslint/parser',
   parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module'
   },
   plugins: ['react', '@typescript-eslint'],
   rules: {
      'react/prop-types': 'off'
   }
}
