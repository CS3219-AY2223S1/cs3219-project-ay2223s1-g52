module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
    mocha: true,
  },
  extends: ['airbnb-base', 'prettier', 'plugin:node/recommended'],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
    'no-unused-vars': 'warn',
    'no-console': 'off',
    'func-names': 'off',
    'no-plusplus': 'off',
    'no-process-exit': 'off',
    'class-methods-use-this': 'off',
    'consistent-return': 'off',
    'node/no-unsupported-features/es-syntax': 'off',
    'no-underscore-dangle': 'warn',
    'object-shorthand': 'warn',
    'no-restricted-syntax': 'off',
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'node/no-unpublished-require': [
      'error',
      {
        allowModules: ['chai', 'chai-http'],
      },
    ],
  },
}
