import oxlint from 'eslint-plugin-oxlint';
import parserTs from '@typescript-eslint/parser';
import stylisticTs from '@stylistic/eslint-plugin-ts';
import tailwind from 'eslint-plugin-tailwindcss';

import withNuxt from './.nuxt/eslint.config.mjs';

const ignores = [
  '.output/',
  '.data/',
  '.nuxt/',
  '.nitro/',
  '.cache/',
  'dist/',
  'node_modules/',
  'logs/',
  '*.log',
  '.DS_Store',
  '.fleet',
  '.idea',
  '.env',
  '.env.*',
  '!.env.example',
  '.history',
  '.netlify',
  'public/',
  'app/client/',
];

export default withNuxt(
  ...tailwind.configs['flat/recommended'],
  {
    ignores,
    rules: {
      'tailwindcss/no-custom-classname': 'off',
    },
  },
).prepend(
  stylisticTs.configs['all'],
  {
    ignores,
    rules: {
      '@stylistic/ts/brace-style': ['error', '1tbs'],
      '@stylistic/ts/comma-dangle': ['error', 'always-multiline'],
      '@stylistic/ts/comma-spacing': ['error', { before: false, after: true }],
      '@stylistic/ts/keyword-spacing': ['error', { before: true, after: true }],
      '@stylistic/ts/indent': ['error', 2, { SwitchCase: 1 }],
      '@stylistic/ts/no-extra-parens': 'off',
      '@stylistic/ts/object-curly-spacing': ['error', 'always'],
      '@stylistic/ts/object-property-newline': ['error', { allowAllPropertiesOnSameLine: true }],
      '@stylistic/ts/quote-props': ['error', 'as-needed'],
      '@stylistic/ts/quotes': ['error', 'single', { avoidEscape: true }],
      '@stylistic/ts/semi': ['error', 'always'],
      '@stylistic/ts/space-before-function-paren': ['error', {
        anonymous: 'never',
        named: 'never',
        asyncArrow: 'always',
      }],
      '@stylistic/ts/space-infix-ops': 'error',
    },
  },
).append(
  {
    ignores,
    languageOptions: {
      parserOptions: {
        parser: parserTs,
        project: './tsconfig.json',
      },
    },
    plugins: {
      '@stylistic/ts': stylisticTs,
    },
    rules: {
      'no-undef': 'off', // off because of nuxt's global import system
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'object-shorthand': 'error',
      'sort-imports': ['error', {
        ignoreCase: false,
        ignoreDeclarationSort: false,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
        allowSeparatedGroups: true,
      }],
      'import/order': ['error', {
        'newlines-between': 'ignore',
      }],

      // typescript
      '@typescript-eslint/no-non-null-assertion': 'off',

      // vue specific
      'vue/html-indent': ['error', 2, {
        attribute: 1,
        baseIndent: 1,
        closeBracket: 0,
        alignAttributesVertically: true,
        ignores: [],
      }],
      'vue/html-closing-bracket-newline': ['error', {
        singleline: 'never',
        multiline: 'always',
      }],
      'vue/comma-dangle': ['error', 'always-multiline'],
      'vue/max-len': ['error', {
        code: 120,
        tabWidth: 2,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreUrls: true,
        ignoreHTMLAttributeValues: true,
        ignoreHTMLTextContents: true,
      }],
      'vue/max-attributes-per-line': ['error', {
        singleline: 1,
        multiline: 1,
      }],
      'vue/html-self-closing': ['error', {
        html: {
          void: 'never',
          normal: 'always',
          component: 'always',
        },
        svg: 'always',
        math: 'always',
      }],
      'vue/no-v-html': ['off'],
      'vue/script-indent': ['error', 2, { baseIndent: 0, switchCase: 1 }],
      'vue/first-attribute-linebreak': ['error', {
        singleline: 'beside',
        multiline: 'below',
      }],
      'vue/no-reserved-props': ['error', {
        vueVersion: 3,
      }],
      'vue/multi-word-component-names': 'off',
      'vue/space-infix-ops': 'error',
      'vue/no-unused-vars': 'error',
      'vue/component-api-style': ['error',
        ['script-setup'],
      ],
      'vue/block-order': ['error', {
        order: [['script', 'template'], 'style'],
      }],
      'vue/no-multiple-template-root': 'error',
    },
  },
).append(
  // should always come last
  oxlint.configs['flat/recommended'],
  { ignores },
);
