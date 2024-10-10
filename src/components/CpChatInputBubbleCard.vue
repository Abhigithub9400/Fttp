<template>
  <div class="mt-2 flex flex-col items-end max-w-full">
    <div
      v-for="(message, index) in chatStore.messages"
      :key="index"
      class="w-full flex justify-end"
    >
      <Card
        v-if="chatStore.isBubbleCardVisible"
        class="mt-2 inline-block max-w-[80%] animate-slideInFromBottom"
      >
        <div
          class="flex items-center mb-8 p-4 bg-gradient-to-r from-pinkFrom to-pinkFrom rounded-bubble-radius h-bubble-height"
        >
          <div class="flex items-center size-titleIcon gap-2 relative w-full">
            <div class="relative flex-shrink-0">
              <img
                src="@/assets/icons/avatar.svg"
                class="w-title-icon-width h-title-icon-width object-cover"
                alt="Image"
              />
            </div>
            <div class="flex flex-col gap-2 w-full">
              <div
                class="p-2 rounded-lg text-black break-all max-w-full whitespace-normal overflow-hidden"
              >
                {{ message }}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useChatStore } from '@/stores/useChatStore';
import 'primeicons/primeicons.css';

const chatStore = useChatStore();
</script>
