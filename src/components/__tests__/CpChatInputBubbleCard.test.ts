import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import Card from 'primevue/card';
import CpChatInputBubbleCard from '@/components/CpChatInputBubbleCard.vue';

describe('CpChatInputBubbleCard', () => {
  let wrapper: any;
  let chatStore: any;

  beforeEach(() => {
    setActivePinia(createPinia());
    const useChatStore = () => ({
      messages: [''],
      isBubbleCardVisible: true
    });

    chatStore = useChatStore();

    wrapper = mount(CpChatInputBubbleCard, {
      global: {
        plugins: [createPinia()],
        components: { Card },
        provide: {
          chatStore
        }
      }
    });
  });

  it('renders the chat bubble correctly', () => {
    expect(wrapper.find('div.flex').exists()).toBe(true);
  });

  it('displays the message inside the chat bubble', () => {
    const bubble = wrapper.findComponent({ name: 'CpChatInputBubbleCard' });
    expect(bubble.exists()).toBe(true);
    expect(bubble.text()).toBe(chatStore.messages[0]);
    console.log(bubble.html());
  });

  it('renders the Card component', () => {
    const card = wrapper.findComponent(Card);
    expect(card.exists()).toBe(false);
  });

  it('hides the bubble card when isBubbleCardVisible is false', async () => {
    chatStore.isBubbleCardVisible = false;
    await wrapper.vm.$nextTick();
    expect(wrapper.findComponent(Card).exists()).toBe(false);
  });
});
