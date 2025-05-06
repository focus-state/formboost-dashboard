<script setup lang="ts">
import { z } from 'zod';

import type { FormSubmitEvent } from '#ui/types';

definePageMeta({ layout: 'auth' });
useSeoMeta({ title: 'Sign up' });

const fields = [{
  name: 'name',
  type: 'text',
  label: 'Name',
  placeholder: 'Enter your name',
}, {
  name: 'email',
  type: 'email',
  label: 'Email',
  placeholder: 'Enter your email',
}, {
  name: 'password',
  label: 'Password',
  type: 'password',
  placeholder: 'Enter your password',
}, {
  name: 'password2',
  label: 'Password Confirmation',
  type: 'password',
  placeholder: 'Confirm your password',
}];

const schema = z.object({
  name: z.string().nonempty(),
  email: z.string().email(),
  password: z.string(),
  password2: z.string().min(8),
}).refine((data) => (data.password && !data.password2) || (!data.password && data.password2), {
  message: 'Passwords don\'t match.', path: ['password2'],
});

type Schema = z.output<typeof schema>;

function onSubmit(event: FormSubmitEvent<Schema>) {
  console.log('Submitted', event.data);
}
</script>

<template>
  <UCard class="w-full max-w-sm bg-white/75 backdrop-blur dark:bg-white/5">
    <UAuthForm
      :fields="fields"
      :schema="schema"
      align="top"
      title="Create an account"
      :ui="{ base: 'text-center', footer: 'text-center' }"
      :submit-button="{ label: 'Create account' }"
      @submit="onSubmit"
    >
      <template #description>
        Already have an account? <NuxtLink
          to="/login"
          class="text-primary font-medium"
        >Login</NuxtLink>.
      </template>

      <template #footer>
        By signing up, you agree to our <NuxtLink
          to="/"
          class="text-primary font-medium"
        >Terms of Service</NuxtLink>.
      </template>
    </UAuthForm>
  </UCard>
</template>
