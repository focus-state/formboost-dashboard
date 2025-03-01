<script setup lang="ts">
import { z } from 'zod';
import type { FormSubmitEvent } from '#ui/types';

const emit = defineEmits(['close']);

const schema = z.object({
  name: z.string().nonempty(),
  email: z.string().email(),
});

type Schema = z.output<typeof schema>;

const state = reactive({
  name: undefined,
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
      label="Name"
      name="name"
    >
      <UInput
        v-model="state.name"
        placeholder="John Doe"
        autofocus
      />
    </UFormGroup>

    <UFormGroup
      label="Email"
      name="email"
    >
      <UInput
        v-model="state.email"
        type="email"
        placeholder="john.doe@example.com"
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
