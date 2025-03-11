import { defineStore } from 'pinia';

import type { Team } from '~/client';

export const useTeamsStore = defineStore('teams', () => {
  const teams = ref<Team[]>([]);
  const activeTeam = ref<Team | null>(null);

  const setTeams = (value: Team[]) => {
    teams.value = value;
  };

  const setActiveTeam = (value: Team | null) => {
    activeTeam.value = value;
  };

  const reset = () => {
    teams.value = [];
    activeTeam.value = null;
  };

  return {
    teams,
    setTeams,

    activeTeam,
    setActiveTeam,

    reset,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTeamsStore, import.meta.hot));
}
