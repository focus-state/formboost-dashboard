<script lang="ts" setup>
import { isValidUuid4 } from '~/utils/uuid';

definePageMeta({
  validate: async ({ params }) => {
    const id = getSingleParamValue(params.id);
    return isValidUuid4(id);
  },
});

const route = useRoute();
const id = getSingleParamValue(route.params.id);
</script>

<template>
  <div>
    Project ID: {{ id }}
  </div>
</template>
