<script setup lang="ts">
const route = useRoute();
const { isHelpSlideoverOpen } = useDashboard();

const links = [
  {
    id: 'home',
    label: 'Dashboard',
    icon: 'i-heroicons-home',
    to: '/',
    tooltip: {
      text: 'Home',
      shortcuts: ['G', 'H'],
    },
  },
  {
    id: 'inbox',
    label: 'Inbox',
    icon: 'i-heroicons-inbox',
    to: '/inbox',
    badge: '4',
    tooltip: {
      text: 'Inbox',
      shortcuts: ['G', 'I'],
    },
  },
  {
    id: 'users',
    label: 'Users',
    icon: 'i-heroicons-user-group',
    to: '/users',
    tooltip: {
      text: 'Users',
      shortcuts: ['G', 'U'],
    },
  },
  {
    id: 'domains',
    label: 'Domains',
    icon: 'i-heroicons-user-group',
    to: '/domains',
    tooltip: {
      text: 'Domains',
      shortcuts: ['G', 'D'],
    },
  },
];

const footerLinks = [
  {
    label: 'New Project',
    icon: 'i-heroicons-plus',
    to: '/settings/members',
  },
  {
    label: 'Documentation',
    icon: 'i-heroicons-book-open',
    to: 'https://ui.nuxt.com/pro/getting-started',
    target: '_blank',

  },
  {
    label: 'Help & Support',
    icon: 'i-heroicons-question-mark-circle',
    click: () => isHelpSlideoverOpen.value = true,
  }];

const groups = [{
  key: 'links',
  label: 'Go to',
  commands: links.map(link => ({ ...link, shortcuts: link.tooltip?.shortcuts })),
}, {
  key: 'code',
  label: 'Code',
  commands: [{
    id: 'source',
    label: 'View page source',
    icon: 'i-simple-icons-github',
    click: () => {
      window.open(`https://github.com/nuxt-ui-pro/dashboard/blob/v1/pages${route.path === '/' ? '/index' : route.path}.vue`, '_blank');
    },
  }],
}];

const { projects: allProjects } = storeToRefs(useProjectsStore());
const projects = computed(() => allProjects.value.map((p) => ({
  id: p.id,
  label: p.name,
  to: `/projects/${p.id}`,
  icon: 'i-heroicons-folder',
  // TODO: get from API or require clicking into project (the latter is easiest, less busy)
  // children: [
  //   {
  //     label: 'Form 1',
  //     badge: '4',
  //     to: `/projects/${p.id}/form/1`,
  //   },
  //   {
  //     label: 'Form 2',
  //     to: `/projects/${p.id}/form/2`,
  //   },
  //   {
  //     label: 'Form 3',
  //     to: `/projects/${p.id}/form/3`,
  //   },
  //   {
  //     label: 'Settings',
  //     to: '/settings/notifications',
  //     icon: 'i-heroicons-cog-8-tooth',
  //   }],
})));
</script>

<template>
  <UDashboardLayout>
    <UDashboardPanel
      :width="250"
      :resizable="{ min: 200, max: 300 }"
      collapsible
    >
      <UDashboardNavbar
        class="!border-transparent"
        :ui="{ left: 'flex-1' }"
      >
        <template #left>
          <TeamsDropdown />
        </template>
      </UDashboardNavbar>

      <UDashboardSidebar>
        <template #header>
          <UDashboardSearchButton />
        </template>

        <UDashboardSidebarLinks :links="links" />

        <UDivider />

        <UDashboardSidebarLinks :links="[{ label: 'Projects', draggable: true, children: projects, collapsible: false }]" />

        <div class="flex-1" />

        <UDashboardSidebarLinks :links="footerLinks" />

        <UDivider class="sticky bottom-0" />

        <template #footer>
          <!-- ~/components/UserDropdown.vue -->
          <UserDropdown />
        </template>
      </UDashboardSidebar>
    </UDashboardPanel>

    <slot />

    <!-- ~/components/HelpSlideover.vue -->
    <HelpSlideover />
    <!-- ~/components/NotificationsSlideover.vue -->
    <NotificationsSlideover />

    <ClientOnly>
      <LazyUDashboardSearch :groups="groups" />
    </ClientOnly>
  </UDashboardLayout>
</template>
