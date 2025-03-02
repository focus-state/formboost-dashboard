import { acceptHMRUpdate, defineStore } from 'pinia';

export const useAuthStore = defineStore('Auth', () => {
  const loggedIn = ref(false);

  const setLoggedIn = (value: boolean) => loggedIn.value = value;

  const reset = () => loggedIn.value = false;

  return {
    loggedIn,
    setLoggedIn,

    reset,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
