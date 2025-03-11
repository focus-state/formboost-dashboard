<script setup lang="ts">
import { useMutation } from '@tanstack/vue-query';

const { isHelpSlideoverOpen } = useDashboard();
const { isDashboardSearchModalOpen } = useUIState();
const { metaSymbol } = useShortcuts();

const { user } = useUserStore();

const splitName = computed(() => user?.name?.split(' '));
const avatarText = computed(() => {
  if (!splitName.value) {
    return null;
  }

  if (splitName.value.length >= 2) {
    return `${splitName.value[0].charAt(0)}${splitName.value[1].charAt(0)}`;
  } else if (splitName.value.length === 1) {
    return splitName.value[0].charAt(0);
  } else {
    return null;
  }
});

const { logOut: logOutFunc } = useAuthApi();

const { mutateAsync: logOut } = useMutation({
  mutationFn: () => {
    return logOutFunc();
  },
  async onSuccess() {
    await navigateTo('/login');
  },
});

const items = computed(() => [
  [{
    slot: 'account',
    label: '',
    disabled: true,
  }],
  [
    {
      label: 'Settings',
      icon: 'i-heroicons-cog-8-tooth',
      to: '/settings',
    },
    {
      label: 'Command menu',
      icon: 'i-heroicons-command-line',
      shortcuts: [metaSymbol.value, 'K'],
      click: () => {
        isDashboardSearchModalOpen.value = true;
      },
    },
    {
      label: 'Help & Support',
      icon: 'i-heroicons-question-mark-circle',
      shortcuts: ['?'],
      click: () => isHelpSlideoverOpen.value = true,
    },
    {
      label: 'Log out',
      icon: 'i-heroicons-arrow-right-start-on-rectangle-solid',
      click: logOut,
    },
  ],
]);
</script>

<template>
  <UDropdown
    mode="hover"
    :items="items"
    :ui="{ width: 'w-full', item: { disabled: 'cursor-text select-text' } }"
    :popper="{ strategy: 'absolute', placement: 'top' }"
    class="w-full"
  >
    <template #default="{ open }">
      <UButton
        color="gray"
        variant="ghost"
        class="w-full"
        :label="user?.name || 'User'"
        :class="[open && 'bg-gray-50 dark:bg-gray-800']"
      >
        <template
          v-if="avatarText"
          #leading
        >
          <!-- TODO: use actual avatar (not currently supported) -->
          <UAvatar
            :text="avatarText"
            size="2xs"
          />
        </template>

        <template #trailing>
          <UIcon
            name="i-heroicons-ellipsis-vertical"
            class="ml-auto size-5"
          />
        </template>
      </UButton>
    </template>

    <template #account>
      <div class="text-left">
        <p>
          Signed in as
        </p>
        <p
          v-if="user?.email"
          class="truncate font-medium text-gray-900 dark:text-white"
        >
          {{  user.email }}
        </p>
      </div>
    </template>
  </UDropdown>
</template>
