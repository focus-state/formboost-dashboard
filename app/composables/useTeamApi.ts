export const useTeamApi = () => {
  const { TeamsService } = useApi();
  const { setTeams } = useTeamsStore();


  const getTeams = async () => {
    const teams = await TeamsService.apiV1TeamsListTeams();

    setTeams(teams.data.items || []);

    return teams;
  };

  return {
    getTeams,
  };
};
