import type { ApiV1TeamsListTeamsData } from '~/client';

type ListArgs = {
  query?: ApiV1TeamsListTeamsData['query'];
};

export const useTeamApi = () => {
  const { TeamsService } = useApi();
  const { setTeams } = useTeamsStore();

  const getTeams = async ({ query }: ListArgs = {}) => {
    const teams = await TeamsService.apiV1TeamsListTeams({ query });

    setTeams(teams.data.items || []);

    return teams;
  };

  return {
    getTeams,
  };
};
