import { DOMWrapper, mount } from '@vue/test-utils';
import CpMessageFeed from '@/components/CpMessageFeed.vue';
import vAutoScroll from '@/directives/vAutoScroll';
import { describe, it, expect } from 'vitest';
import { nextTick } from 'vue';

describe('vAutoScroll Directive - Streaming Content Overflow', (): void => {
  it('should automatically scroll to the bottom for streaming content overflow', async (): Promise<void> => {
    const wrapper = mount(CpMessageFeed, {
      global: {
        directives: { autoScroll: vAutoScroll }
      },
      slots: {
        default: '<p id="dynamic-text"></p>'
      }
    });

    const messageFeed: DOMWrapper<Element> = wrapper.find('#message-feed');
    const dynamicText: DOMWrapper<Element> = wrapper.find('#dynamic-text');

    for (let i: number = 0; i < 20; i++) {
      dynamicText.element.textContent += `Message ${i} `;
      await nextTick();
    }

    expect(messageFeed.element.scrollTop).toBe(
      messageFeed.element.scrollHeight - messageFeed.element.clientHeight
    );
  });

  it('should not scroll for non-overflow content in streaming scenario', async (): Promise<void> => {
    const wrapper = mount(CpMessageFeed, {
      global: {
        directives: { autoScroll: vAutoScroll }
      },
      slots: {
        default: '<p id="dynamic-text"></p>'
      }
    });

    const messageFeed: DOMWrapper<Element> = wrapper.find('#message-feed');
    const dynamicText: DOMWrapper<Element> = wrapper.find('#dynamic-text');

    for (let i = 0; i < 2; i++) {
      dynamicText.element.textContent += `Short message ${i} `;
      await nextTick();
    }

    expect(messageFeed.element.scrollTop).toBe(0);
  });

  it('should automatically scroll to the bottom for non-streaming large content', async (): Promise<void> => {
    const wrapper = mount(CpMessageFeed, {
      global: {
        directives: { autoScroll: vAutoScroll }
      },
      slots: {
        default: '<p id="static-text"></p>'
      }
    });

    const messageFeed: DOMWrapper<Element> = wrapper.find('#message-feed');
    const staticText: DOMWrapper<Element> = wrapper.find('#static-text');

    staticText.element.textContent = ' '.repeat(100000);
    await nextTick();

    expect(messageFeed.element.scrollTop).toBe(
      messageFeed.element.scrollHeight - messageFeed.element.clientHeight
    );
  });

  it('should not scroll for non-streaming small content', async (): Promise<void> => {
    const wrapper = mount(CpMessageFeed, {
      global: {
        directives: { autoScroll: vAutoScroll }
      },
      slots: {
        default: '<p id="static-text"></p>'
      }
    });

    const messageFeed: DOMWrapper<Element> = wrapper.find('#message-feed');
    const staticText: DOMWrapper<Element> = wrapper.find('#static-text');

    staticText.element.textContent = 'This is a small content.';
    await nextTick();

    expect(messageFeed.element.scrollTop).toBe(0);
  });
});
