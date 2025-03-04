import { defineStore } from 'pinia';

import type { Form } from '~/client';

export const useFormsStore = defineStore('forms', () => {
  const forms = ref<Form[]>([]);

  return {
    forms,
  };
});
