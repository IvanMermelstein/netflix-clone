module.exports = {
  'env': {
    'browser': true,
    'es2021': true 
  },
  'extends': [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'next/core-web-vitals'
  ],
  'overrides': [
  ],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module' 
  },
  'plugins': [
    '@typescript-eslint'
  ],
  'rules': {
    'indent': [
      'error',
      2
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'always'
    ],
    'object-curly-spacing': [
      'error',
      'always'
    ],
    'object-curly-newline': ['error', { 'minProperties': 2 }],
    'object-property-newline': [
      'error',
      { 'allowAllPropertiesOnSameLine': false }
    ],
    'comma-spacing': ['error', {
      'before': false,
      'after': true 
    }],
    'no-multiple-empty-lines': ['error', { 'max': 1 }]
  } 
};
