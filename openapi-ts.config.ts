import { defineConfig, defaultPlugins } from '@hey-api/openapi-ts';

export default defineConfig({
  input: 'backend-schema/schema.json',
  output: 'src/client',
  plugins: [
    ...defaultPlugins,
    '@hey-api/client-axios', {
      asClass: true,
      name: '@hey-api/sdk',
    },
    '@tanstack/vue-query',
  ],
});
