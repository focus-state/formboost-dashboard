import { defineStore } from 'pinia';

import type { User } from '~/client';

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null);

  const setUser = (value: User) => {
    user.value = value;
  };

  return {
    user,
    setUser,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}
