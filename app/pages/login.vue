<script setup lang="ts">
import { useMutation } from '@tanstack/vue-query';
import { z } from 'zod';

import type { ApiV1AccessLoginLoginData } from '~/client';

definePageMeta({
  layout: 'auth',
});

useSeoMeta({
  title: 'Login',
});

const { logIn } = useAuthApi();
const { getTeams } = useTeamApi();
const { teams } = storeToRefs(useTeamsStore());
const { getProjects } = useProjectApi();

const { isPending, error, mutateAsync } = useMutation({
  mutationFn: (data: ApiV1AccessLoginLoginData['body']) => {
    return logIn(data);
  },
  async onSuccess() {
    await getTeams();

    if (teams.value.length) {
      await getProjects({ teamId: teams.value[0].id });
    }

    await navigateTo('/');
  },
});

const fields = [{
  name: 'email',
  type: 'email',
  label: 'Email',
  placeholder: 'Enter your email',
}, {
  name: 'password',
  label: 'Password',
  type: 'password',
  placeholder: 'Enter your password',
}];

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type Schema = z.output<typeof schema>;

async function onSubmit(data: Schema) {
  try {
    await mutateAsync({ username: data.email, password: data.password });
  } catch {
    // swallow error
  }
}

const errorDetail = computed(() => error.value?.response?.data?.detail);
</script>

<template>
  <UCard class="w-full max-w-sm bg-white/75 backdrop-blur dark:bg-white/5">
    <UAuthForm
      :fields="fields"
      :schema="schema"
      title="Login"
      :loading="isPending"
      align="top"
      icon="i-heroicons-user-circle"
      :ui="{ base: 'text-center', footer: 'text-center' }"
      :submit-button="{ trailingIcon: 'i-heroicons-arrow-right-20-solid' }"
      @submit="onSubmit"
    >
      <template #description>
        Don't have an account? <NuxtLink
          to="/signup"
          class="text-primary font-medium"
        >Sign up</NuxtLink>.

        <div
          v-if="error && errorDetail"
          class="mt-2 text-red-500 dark:text-red-400"
        >
          {{ errorDetail }}
        </div>
      </template>

      <template #password-hint>
        <NuxtLink
          to="/"
          class="text-primary font-medium"
        >Forgot password?</NuxtLink>
      </template>

      <template #footer>
        By signing in, you agree to our <NuxtLink
          to="/"
          class="text-primary font-medium"
        >Terms of Service</NuxtLink>.
      </template>
    </UAuthForm>
  </UCard>
</template>
