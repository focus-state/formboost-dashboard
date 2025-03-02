<script setup lang="ts">
import { z } from 'zod';

import type { FormSubmitEvent } from '#ui/types';

const emit = defineEmits(['close']);

const schema = z.object({
  email: z.string().email(),
  role: z.enum(['admin', 'member']),
});

type Schema = z.output<typeof schema>;

const state = reactive({
  role: 'member',
  email: undefined,
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  // Do something with data
  console.log(event.data);

  emit('close');
}
</script>

<template>
  <UForm
    :schema="schema"
    :validate-on="['submit']"
    :state="state"
    class="space-y-4"
    @submit="onSubmit"
  >
    <UFormGroup
      label="Email"
      name="email"
    >
      <UInput
        v-model="state.email"
        type="email"
        placeholder="john.doe@example.com"
        autofocus
      />
    </UFormGroup>

    <UFormGroup
      label="Role"
      name="role"
    >
      <USelectMenu
        v-model="state.role"
        :options="['member', 'owner']"
        :ui-menu="{ select: 'capitalize', option: { base: 'capitalize' } }"
      />
    </UFormGroup>

    <div class="flex justify-end gap-3">
      <UButton
        label="Cancel"
        color="gray"
        variant="ghost"
        @click="emit('close')"
      />
      <UButton
        type="submit"
        label="Save"
        color="black"
      />
    </div>
  </UForm>
</template>
