<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';

import type { ApiV1TeamsTeamIdDomainsListDomainsData, Domain  } from '~/client';

definePageMeta({ middleware: ['logged-in'] });
useSeoMeta({ title: 'Domains' });

const defaultColumns = [{
  key: 'name',
  label: 'Name',
  sortable: true,
}, {
  key: 'url',
  label: 'URL',
  sortable: true,
}, {
  key: 'description',
  label: 'Description',
}];

const searchString = ref('');
const searchStringDebounced = refDebounced(searchString, 300);
const selected = ref<Domain[]>([]);
const selectedColumns = ref(defaultColumns);
const sort = ref({ column: 'name', direction: 'desc' as const });
const input = ref<{ input: HTMLInputElement }>();
const isNewDomainModalOpen = ref(false);

const columns = computed(() => defaultColumns.filter(column => selectedColumns.value.includes(column)));

const query = computed<ApiV1TeamsTeamIdDomainsListDomainsData['query']>(() => {
  return {
    searchField: 'name',
    searchString: searchStringDebounced.value,
    searchIgnoreCase: true,
    orderBy: sort.value.column,
    sortOrder: sort.value.direction,
  };
});

const { activeTeam } = storeToRefs(useTeamsStore());
const { getDomains } = useDomainApi();

const { data: domainData, isPending } = useQuery({
  queryKey: ['domains', activeTeam.value.id, query],
  queryFn: () => getDomains({ teamId: activeTeam.value.id, query: query.value }),
});

const domains = computed(() => domainData.value?.data.items ?? []);

function onSelect(row: Domain) {
  const index = selected.value.findIndex(item => item.id === row.id);
  if (index === -1) {
    selected.value.push(row);
  } else {
    selected.value.splice(index, 1);
  }
}

defineShortcuts({
  '/': () => {
    input.value?.input?.focus();
  },
});
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <UDashboardNavbar
        title="Domains"
        :badge="domains.length"
      >
        <template #right>
          <UInput
            ref="input"
            v-model="searchString"
            icon="i-heroicons-funnel"
            autocomplete="off"
            placeholder="Filter domains..."
            class="hidden lg:block"
            @keydown.esc="$event.target.blur()"
          >
            <template #trailing>
              <UKbd value="/" />
            </template>
          </UInput>

          <UButton
            label="New domain"
            trailing-icon="i-heroicons-plus"
            color="gray"
            @click="isNewDomainModalOpen = true"
          />
        </template>
      </UDashboardNavbar>

      <UDashboardToolbar>
        <template #right>
          <USelectMenu
            v-model="selectedColumns"
            icon="i-heroicons-adjustments-horizontal-solid"
            :options="defaultColumns"
            multiple
            class="hidden lg:block"
          >
            <template #label>
              Display
            </template>
          </USelectMenu>
        </template>
      </UDashboardToolbar>

      <!--
      <UDashboardModal
        v-model="isNewDomainModalOpen"
        title="New domain"
        description="Add a new domain to your database"
        :ui="{ width: 'sm:max-w-md' }"
      >
        ~/components/domains/DomainsForm.vue
        <DomainsForm @close="isNewDomainModalOpen = false" />
      </UDashboardModal>
      -->

      <UTable
        v-model="selected"
        v-model:sort="sort"
        :rows="domains"
        :columns="columns"
        :loading="isPending"
        sort-mode="manual"
        class="w-full"
        :ui="{ divide: 'divide-gray-200 dark:divide-gray-800' }"
        @select="onSelect"
      >
        <template #name-data="{ row }">
          <div class="flex items-center gap-3">
            <span class="font-medium text-gray-900 dark:text-white">{{ row.name }}</span>
          </div>
        </template>
      </UTable>
    </UDashboardPanel>
  </UDashboardPage>
</template>
