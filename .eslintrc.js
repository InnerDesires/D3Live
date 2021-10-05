module.exports = {
  'parser': 'babel-eslint',
  'env': {
    'browser': true,
    'es6': true
  },
  "globals": {
    "mstrmojo": true,
    "mstrApp": true,
  },
  'extends': 'airbnb-base',
  'rules': {
    'arrow-parens': [2, 'as-needed', {
      requireForBlockBody: false,
    }],
    'max-len': [2, { code: 120, ignoreStrings: true, ignoreTemplateLiterals: true }],
    'no-plusplus': 0,
    'import/prefer-default-export': 0,
    'prefer-destructuring': 0,
    'import/no-default-export': 0,
    'object-shorthand': 0,
    'no-restricted-syntax': 1,
    'no-labels': 1,
    'no-unused-vars': 1,
    'func-names': [1, 'as-needed'],
    'object-curly-newline': [2, { multiline: true }],
    'no-underscore-dangle': [2, { allowAfterThis: true }],
    'radix': [2, 'as-needed'],
  },
};
