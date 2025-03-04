<script setup lang="ts">
const teamsStore = useTeamsStore();
const { activeTeam, teams } = storeToRefs(teamsStore);
const { setActiveTeam } = teamsStore;

const teamItems = computed(() => {
  return teams.value.map((t) => ({
    label: t.name,
    click: () => {
      setActiveTeam(t);
    },
  }));
});

onMounted(() => {
  if (teams.value.length) {
    setActiveTeam(teams.value[0]);
  }
});

const actions = [{
  label: 'Create team',
  icon: 'i-heroicons-plus-circle',
}, {
  label: 'Manage teams',
  icon: 'i-heroicons-cog-8-tooth',
}];
</script>

<template>
  <UDropdown
    v-if="activeTeam"
    v-slot="{ open }"
    mode="hover"
    :items="[teamItems, actions]"
    class="w-full"
    :ui="{ width: 'w-full' }"
    :popper="{ strategy: 'absolute' }"
  >
    <UButton
      color="gray"
      variant="ghost"
      :class="[open && 'bg-gray-50 dark:bg-gray-800']"
      class="w-full"
    >
      <UAvatar
        size="2xs"
        :text="activeTeam.name[0]"
      />

      <span class="truncate font-semibold text-gray-900 dark:text-white">{{ activeTeam.name }}</span>
    </UButton>
  </UDropdown>
</template>
