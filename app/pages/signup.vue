<script setup lang="ts">
definePageMeta({
  layout: 'auth',
});

useSeoMeta({
  title: 'Sign up',
});

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

interface State {
  name?: string;
  email?: string;
  password?: string;
  password2?: string;
}

const validate = (state: State) => {
  const errors = [];
  if (!state.email) errors.push({ path: 'email', message: 'Email is required' });
  if (!state.password) errors.push({ path: 'password', message: 'Password is required' });
  if (!state.password2) errors.push({ path: 'password2', message: 'Password confirmation is required' });
  if (state.password !== state.password2) errors.push({ path: 'password2', message: 'Passwords do not match' });
  return errors;
};

function onSubmit(data: State) {
  console.log('Submitted', data);
}
</script>

<template>
  <UCard class="max-w-sm w-full bg-white/75 dark:bg-white/5 backdrop-blur">
    <UAuthForm
      :fields="fields"
      :validate="validate"
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
