<script setup lang="ts">
import { sub } from 'date-fns';

import type { Period, Range } from '~/types';

definePageMeta({ middleware: ['logged-in'] });
useSeoMeta({ title: 'Dashboard' });

const { isNotificationsSlideoverOpen } = useDashboard();

const _items = [[
  {
    label: 'New Project',
    icon: 'i-heroicons-paper-airplane',
    to: '/inbox',
  },
  {
    label: 'New Form',
    icon: 'i-heroicons-user-plus',
    to: '/users',
  },
]];

const range = ref<Range>({ start: sub(new Date(), { days: 14 }), end: new Date() });
const period = ref<Period>('daily');
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <UDashboardNavbar title="Home">
        <template #right>
          <UTooltip
            text="Notifications"
            :shortcuts="['N']"
          >
            <UButton
              color="gray"
              variant="ghost"
              square
              @click="isNotificationsSlideoverOpen = true"
            >
              <UChip
                color="red"
                inset
              >
                <UIcon
                  name="i-heroicons-bell"
                  class="size-5"
                />
              </UChip>
            </UButton>
          </UTooltip>
        </template>
      </UDashboardNavbar>

      <UDashboardToolbar>
        <template #left>
          <!-- ~/components/home/HomeDateRangePicker.vue -->
          <HomeDateRangePicker
            v-model="range"
            class="-ml-2.5"
          />

          <!-- ~/components/home/HomePeriodSelect.vue -->
          <HomePeriodSelect
            v-model="period"
            :range="range"
          />
        </template>
      </UDashboardToolbar>

      <UDashboardPanelContent>
        <!-- ~/components/home/HomeChart.vue -->
        <HomeChart
          :period="period"
          :range="range"
        />

        <div class="mt-8 grid gap-8 lg:grid-cols-2 lg:items-start">
          <!-- ~/components/home/HomeSales.vue -->
          <HomeSales />
          <!-- ~/components/home/HomeCountries.vue -->
          <HomeCountries />
        </div>
      </UDashboardPanelContent>
    </UDashboardPanel>
  </UDashboardPage>
</template>
