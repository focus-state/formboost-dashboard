export const useProjectApi = () => {
  const { ProjectsService } = useApi();
  const { setProjects } = useProjectsStore();


  const getProjects = async (teamId: string) => {
    const projects = await ProjectsService.apiV1TeamsTeamIdProjectsListProjects({ path: { team_id: teamId } });

    setProjects(projects.data.items || []);

    return projects;
  };

  return {
    getProjects,
  };
};
