<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import vAnimatedPlaceholder from '@/directives/vAnimatedPlaceholder';
import { useChatStore } from '@/stores/useChatStore';

import sendIcon from '@/assets/icons/send.svg';
import stopIcon from '@/assets/icons/stop.svg';

const placeholders = ref<string[]>(['This is a test placeholder', 'This is yet another test placeholder']);

const query = ref<string>('');
const chatStore = useChatStore();
const isSent = ref<boolean>(false);

const props = defineProps({
  streaming: {
    type: Boolean,
    required: true,
    default: false
  },
  stopStream: {
    type: Function,
    required: true
  }
});

watch(
  () => props.streaming,
  (newVal) => {
    isSent.value = newVal;
  }
);

const inputButton = computed(() => {
  return {
    name: props.streaming ? 'stop' : 'send',
    ariaLabel: props.streaming ? 'stop button' : 'send button',
    icon: props.streaming ? stopIcon : sendIcon,
    altIcon: props.streaming ? 'stop icon' : 'send icon',
    animation: props.streaming ? 'stop' : 'send'
  };
});

const handleEvent = (buttonName: string): void => {
  if (buttonName === 'stop') {
    props.stopStream();
    isSent.value = false;
    query.value = '';
    return;
  }

  const trimmedQuery = query.value.trim();
  if (trimmedQuery) {
    chatStore.addMessage(query.value); // **
    chatStore.addQuery(query.value); // **
    emit('query', query.value);
    query.value = '';
    isSent.value = !isSent.value;
  }
};

const emit = defineEmits(['query']);
</script>

<template>
  <div class="flex w-100 relative h-14">
    <InputText
      id="ai-search-input"
      class="flex-1 !pr-14 !border-disabledGray"
      v-animated-placeholder="placeholders"
      v-model="query"
      @keyup.enter="handleEvent(inputButton.name)"
      autocomplete="off"
      aria-label="Search input field"
    ></InputText>
    <Button
      unstyled
      class="absolute right-0 h-full w-14 flex justify-center items-center"
      :aria-label="inputButton.ariaLabel"
      @click="handleEvent(inputButton.name)"
    >
      <img :src="inputButton.icon" width="36" height="36" :alt="inputButton.altIcon" :class="inputButton.animation" />
    </Button>
  </div>
</template>

<style scoped lang="css">
.send {
  animation: send 1s ease;
}

.stop {
  animation: stop 1s ease;
}

@keyframes send {
  0% {
    transform: rotateZ(0deg);
  }
  100% {
    transform: rotateZ(360deg);
  }
}

@keyframes stop {
  0% {
    transform: rotateZ(0deg);
  }
  100% {
    transform: rotateZ(360deg);
  }
}
</style>
