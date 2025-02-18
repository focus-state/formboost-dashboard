// @ts-check
import stylistic from '@stylistic/eslint-plugin';
import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt(
  {
    files: ['**/*.js', '**/*.ts', '**/*.vue'],
    plugins: {
      '@stylistic': stylistic,
    },
  },
);
