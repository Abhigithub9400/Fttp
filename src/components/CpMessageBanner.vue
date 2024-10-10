<template>
  <div class="flex flex-col gap-2 my-5">
    <div class="flex items-center size-titleIcon gap-2 relative">
      <img
        src="@/assets/icons/zillertalLogo.svg"
        class="w-title-icon-width h-title-icon-width object-cover"
        alt="Image"
      />
      <h2 class="text-tiny font-extra-bold">{{ title }}</h2>
    </div>
    <div v-if="message" class="text-left text-small font-light">
      {{ message }}
    </div>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue';

interface MessageBanner {
  title: string;
  message: string;
}

const props = defineProps<MessageBanner>();

const message = ref(props.message);
const title = ref(props.title);
</script>
