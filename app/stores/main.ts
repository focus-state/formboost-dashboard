import { defineStore } from 'pinia';

export const useMainStore = defineStore('Main', () => {

  /**
   * Reset stores that should be cleared when the user is no longer
   * authenticated.
   */
  const resetProtectedStores = () => {
    [
      useAuthStore(),
      useDomainsStore(),
      useFormsStore(),
      useProjectsStore(),
      useTeamsStore(),
      useUserStore(),
    ].forEach(store => store.reset());
  };

  return {
    resetProtectedStores,
  };
});
