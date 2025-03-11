import { defineStore } from 'pinia';

import type { Form } from '~/client';

export const useFormsStore = defineStore('forms', () => {
  const forms = ref<Form[]>([]);

  const setForms = (value: Form[]) => {
    forms.value = value;
  };

  const reset = () => {
    forms.value = [];
  };

  return {
    forms,
    setForms,

    reset,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useFormsStore, import.meta.hot));
}
