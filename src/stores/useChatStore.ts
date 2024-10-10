import { defineStore } from 'pinia';
import { ref } from 'vue';

type Feeds = {
  intro?: {
    title: string;
    message: string;
  };
  query?: {
    content: string;
  };
  response?: {
    header: string;
    content: object | null;
    footer: string | '';
  };
};

export const useChatStore = defineStore('chat', () => {
  // feeds is the reactive variable where we are going to store all the responses and queries
  // feeds is an array of objects holding the shape of the type 'Feeds' declared above
  // Store all the message feeds in this variable here.
  const feeds = ref<Feeds[]>([]); // this is where all the content belonging to the message feed should be stored.

  const messages = ref<string[]>([]); // **
  const isBubbleCardVisible = ref(false);
  const isResponseInProgress = ref(false);

  const addMessage = (message: string) => {
    messages.value.push(message);
    isBubbleCardVisible.value = true;
  };
  const hideBubbleCard = () => {
    isBubbleCardVisible.value = true;
  };

  const addIntro = (introContent?: Partial<Feeds['intro']>) => {
    feeds.value.push({
      intro: {
        title: 'MyZillertalAi',
        message: 'Welcome to MyZillertalAi',
        ...introContent
      }
    });
  };

  const addQuery = (queryContent: string) => {
    feeds.value.push({
      query: { content: queryContent },
      response: { header: '', content: {}, footer: '' }
    });
    isResponseInProgress.value = true;
  };

  const updateResponse = (responseContent: Partial<Feeds['response']>) => {
    const lastEntry = feeds.value[feeds.value.length - 1];
    if (lastEntry && lastEntry.response) {
      lastEntry.response = {
        ...lastEntry.response,
        ...responseContent
      };
    }
  };

  const markResponseComplete = () => {
    isResponseInProgress.value = false;
  };

  return {
    messages,
    isBubbleCardVisible,
    isResponseInProgress,
    feeds,
    addMessage,
    hideBubbleCard,
    addIntro,
    addQuery,
    updateResponse,
    markResponseComplete
  };
});
