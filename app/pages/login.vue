<script setup lang="ts">
import { useMutation } from '@tanstack/vue-query';
import type { ApiV1AccessLoginLoginData } from '~/client';

definePageMeta({
  layout: 'auth',
});

useSeoMeta({
  title: 'Login',
});

const { AccessService } = useApi();

const { isPending, isError, error, isSuccess, mutate, data: loginData } = useMutation({
  mutationFn: (data: Omit<ApiV1AccessLoginLoginData, 'url'>) => {
    return AccessService.apiV1AccessLoginLogin(data);
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

interface State {
  email?: string;
  password?: string;
}

const validate = (state: State) => {
  const errors = [];
  if (!state.email) errors.push({ path: 'email', message: 'Email is required' });
  if (!state.password) errors.push({ path: 'password', message: 'Password is required' });
  return errors;
};

async function onSubmit(state: State) {
  mutate({ body: { username: state.email, password: state.password } });
}
</script>

<template>
  <UCard class="max-w-sm w-full bg-white/75 dark:bg-white/5 backdrop-blur">
    <p>isPending: {{ isPending }}</p>
    <p>isError: {{ isError }}</p>
    <p>error: {{ error }}</p>
    <p>isSuccess: {{ isSuccess }}</p>
    <p>data: {{ loginData }}</p>

    <UAuthForm
      :fields="fields"
      :validate="validate"
      title="Login"
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
