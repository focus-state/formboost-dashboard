import { defineStore } from 'pinia';

import type { Domain } from '~/client';

export const useDomainsStore = defineStore('domains', () => {
  const domains = ref<Domain[]>([]);

  const setDomains = (value: Domain[]) => {
    domains.value = value;
  };

  return {
    domains,
    setDomains,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useDomainsStore, import.meta.hot));
}
