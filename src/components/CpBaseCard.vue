<script setup lang="ts">
import Card from 'primevue/card';
defineProps({
  isVisible: {
    type: Boolean,
    default: false,
    required: true
  }
});
</script>
<template>
  <Card
    v-if="isVisible"
    pt:body:class="background-color rounded-xl !gap-0"
    pt:content:class="flex flex-col h-[32rem]"
    pt:root:class="mx-5 my-5"
  >
    <template #content>
      <slot name="content"></slot>
    </template>
  </Card>
</template>
