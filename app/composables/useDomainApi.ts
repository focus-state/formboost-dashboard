import type { ApiV1TeamsTeamIdDomainsListDomainsData } from '~/client';

type ListArgs = {
  teamId: ApiV1TeamsTeamIdDomainsListDomainsData['path']['team_id'];
  query?: ApiV1TeamsTeamIdDomainsListDomainsData['query'];
};

export const useDomainApi = () => {
  const { DomainsService } = useApi();
  const { setDomains } = useDomainsStore();

  const getDomains = async ({ teamId, query }: ListArgs) => {
    const domains = await DomainsService.apiV1TeamsTeamIdDomainsListDomains({
      path: { team_id: teamId },
      query,
    });

    setDomains(domains.data.items || []);

    return domains;
  };

  return {
    getDomains,
  };
};
