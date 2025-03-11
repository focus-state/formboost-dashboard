import type { ApiV1TeamsTeamIdProjectsListProjectsData } from '~/client';

type ListArgs = {
  teamId: ApiV1TeamsTeamIdProjectsListProjectsData['path']['team_id'];
  query?: ApiV1TeamsTeamIdProjectsListProjectsData['query'];
};

export const useProjectApi = () => {
  const { ProjectsService } = useApi();
  const { setProjects } = useProjectsStore();

  const getProjects = async ({ teamId, query }: ListArgs) => {
    const projects = await ProjectsService.apiV1TeamsTeamIdProjectsListProjects({
      path: { team_id: teamId },
      query,
    });

    setProjects(projects.data.items || []);

    return projects;
  };

  return {
    getProjects,
  };
};
