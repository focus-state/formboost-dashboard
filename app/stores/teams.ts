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

  return {
    teams,
    setTeams,

    activeTeam,
    setActiveTeam,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTeamsStore, import.meta.hot));
}
