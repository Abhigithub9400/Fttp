import { describe, it, expect, beforeEach } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import CpChatInput from '@/components/CpChatInput.vue';
import PrimeVue from 'primevue/config';
import { setActivePinia, createPinia } from 'pinia';
import { nextTick } from 'vue';

describe('CpChatInput', () => {
  let wrapper: VueWrapper<any>;

  beforeEach(() => {
    setActivePinia(createPinia());
    wrapper = mount(CpChatInput, {
      global: {
        plugins: [PrimeVue]
      }
    });
  });
  it('should render correctly', () => {
    const cpChatInput = wrapper.findComponent(CpChatInput);
    expect(cpChatInput.exists()).toBe(true);
  });

  it('should render message input field', () => {
    expect(wrapper.find('input#ai-search-input[type="text"]').exists()).toBeTruthy();
  });

  it('should render send button', () => {
    expect(wrapper.find('button[type="button"]').exists()).toBeTruthy();
  });

  it('should clear message input upon clicking send button', async () => {
    const messageInputField = wrapper.find('input#ai-search-input');

    await messageInputField.setValue('Test message');
    await wrapper.find('button[type="button"]').trigger('click');
    expect(messageInputField.attributes('value')).toBe('');
  });

  it('should clear message input field when the enter key is pressed', async () => {
    const messageInputField = wrapper.find('input#ai-search-input');
    await messageInputField.setValue('Test message');
    await messageInputField.trigger('keyup.enter');
    expect(messageInputField.attributes('value')).toBe('');
  });

  it('should display the correct icons on the send/stop button when clicked', async () => {
    // Initially the input is empty, so the send icon should be displayed
    expect(wrapper.find('img').attributes('src')).toBe('/src/assets/icons/send.svg');

    await wrapper.find('button[type="button"]').trigger('click');
    // Icon should remain as send since the input is empty
    expect(wrapper.find('img').attributes('src')).toBe('/src/assets/icons/send.svg');

    const input = wrapper.find('input#ai-search-input[type="text"]');
    // Simulate entering text in the input field
    await input.setValue('test message');

    // Simulate pressing enter key or clicking send button with non-empty input
    await wrapper.find('button[type="button"]').trigger('click');

    // Icon should now change to stop after sending
    expect(wrapper.find('img').attributes('src')).toBe('/src/assets/icons/stop.svg');

    // After the input is cleared, the icon should change back to send
    expect((input.element as HTMLInputElement).value).toBe(''); // Input field should be cleared
    expect(wrapper.find('img').attributes('src')).toBe('/src/assets/icons/stop.svg');

    // If the input is empty and the user clicks the button, the icon should remain send
    await wrapper.find('button[type="button"]').trigger('click'); // Click again with empty input
    // Icon should remain as send (since no new input is present)
    expect(wrapper.find('img').attributes('src')).toBe('/src/assets/icons/send.svg');

    // Ensure that further changes to stop icon are not permitted without new input
    await wrapper.find('button[type="button"]').trigger('click');
    // The icon must remain send, as no input has been provided
    expect(wrapper.find('img').attributes('src')).toBe('/src/assets/icons/send.svg');

    // Allow stop icon change only if new input is entered
    await input.setValue('Another message');
    await wrapper.find('button[type="button"]').trigger('click'); // Clicking should allow icon to change to stop again
    expect(wrapper.find('img').attributes('src')).toBe('/src/assets/icons/stop.svg');
  });

  it('should display the correct icons on send/stop button when enter key is pressed', async () => {
    // Same logic flow as above.
    expect(wrapper.find('img').attributes('src')).toBe('/src/assets/icons/send.svg');

    await wrapper.find('input#ai-search-input[type="text"]').trigger('keyup.enter');
    expect(wrapper.find('img').attributes('src')).toBe('/src/assets/icons/send.svg');

    const input = wrapper.find('input#ai-search-input[type="text"]');
    await input.setValue('test message');
    await wrapper.find('input#ai-search-input[type="text"]').trigger('keyup.enter');
    expect(wrapper.find('img').attributes('src')).toBe('/src/assets/icons/stop.svg');

    expect((input.element as HTMLInputElement).value).toBe('');
    expect(wrapper.find('img').attributes('src')).toBe('/src/assets/icons/stop.svg');

    await wrapper.find('input#ai-search-input[type="text"]').trigger('keyup.enter');
    expect(wrapper.find('img').attributes('src')).toBe('/src/assets/icons/send.svg');

    await wrapper.find('input#ai-search-input[type="text"]').trigger('keyup.enter');
    expect(wrapper.find('img').attributes('src')).toBe('/src/assets/icons/send.svg');

    await input.setValue('Another message');
    await wrapper.find('input#ai-search-input[type="text"]').trigger('keyup.enter');
    expect(wrapper.find('img').attributes('src')).toBe('/src/assets/icons/stop.svg');
  });

  it('should trigger the animation classes when "isTest" is updated', async () => {
    const imgElement = wrapper.find('img');

    wrapper.vm.isSent = true;
    await nextTick();

    expect(imgElement.classes()).toContain('stop');

    wrapper.vm.isSent = false;
    await nextTick();

    expect(imgElement.classes()).toContain('send');
  });
});
