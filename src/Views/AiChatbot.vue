<script setup lang="ts">
import { useChatStore } from '@/stores/useChatStore';
import CpBaseCard from '@/components/CpBaseCard.vue';
import CpChatInput from '@/components/CpChatInput.vue';
import CpResponseItemDisplayCard from '@/components/CpResponseItemDisplayCard.vue';
import CpMessageBanner from '@/components/CpMessageBanner.vue';
import CpMessageFeed from '@/components/CpMessageFeed.vue';
import CpChatInputBubbleCard from '@/components/CpChatInputBubbleCard.vue';
import { onMounted } from 'vue';
import { useChatStream } from '@/composables/useChatStream';

const message =
  'Torem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet ';
const title = 'My Zillertal AI';
const { streamData, isStreaming, fetchStream, stopStream } = useChatStream();

const handleQuery = async (query: string) => {
  await fetchStream(query);
};
const chatStore = useChatStore();

onMounted(() => {
  // Customized Intro if any can be passed as an argument to the addIntro function.
  chatStore.addIntro();
});
</script>

<template>
  <div>
    <CpBaseCard is-visible title="MyZilletralAI">
      <template #content>
        <CpMessageFeed>
          <!-- All components shall be injected inside "CpMessageFeed" here for the scroll to work upon overflow -->
          <CpMessageBanner :title="title" :message="message">
            <CpResponseItemDisplayCard />
            <CpChatInputBubbleCard :messages="chatStore.messages" />
          </CpMessageBanner>
        </CpMessageFeed>
        <div class="h-fit-content">
          <!--This div is reserved for injecting the CHAT-INPUT component to prevent the problem arising from content overflow-->
          <CpChatInput @query="handleQuery" :streaming="isStreaming" :stopStream="stopStream"></CpChatInput>
        </div>
      </template>
    </CpBaseCard>
  </div>
</template>
