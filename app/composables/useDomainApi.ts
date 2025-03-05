import type { ApiV1TeamsTeamIdDomainsListDomainsData } from '~/client';

export const useDomainApi = () => {
  const { DomainsService } = useApi();
  const { setDomains } = useDomainsStore();

  const getDomains = async ({ teamId, query }: { teamId: string; query?: ApiV1TeamsTeamIdDomainsListDomainsData['query'] }) => {
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
