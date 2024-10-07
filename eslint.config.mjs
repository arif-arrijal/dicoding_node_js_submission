import globals from 'globals';
import pluginJs from '@eslint/js';
import googleConfig from 'eslint-config-google';

export default [
  googleConfig,
  {
    rules: {
      'valid-jsdoc': 'off',
      'require-jsdoc': 'off',
    },
  },
  {
    files: ['**/*.js'], languageOptions: {sourceType: 'commonjs'},
  },
  {
    languageOptions: {globals: globals.browser},
  },
  pluginJs.configs.recommended,
];
