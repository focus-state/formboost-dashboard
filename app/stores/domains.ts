import { defineStore } from 'pinia';

import type { Domain } from '~/client';

export const useDomainsStore = defineStore('domains', () => {
  const domains = ref<Domain[]>([]);

  const setDomains = (value: Domain[]) => {
    domains.value = value;
  };

  const reset = () => {
    domains.value = [];
  };

  return {
    domains,
    setDomains,

    reset,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useDomainsStore, import.meta.hot));
}
