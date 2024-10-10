import {
  animatePlaceholder,
  onAnimationEnd,
  PLACEHOLDERS as DEFAULT_PLACEHOLDERS
} from '@/helpers/animatedDynamicPlaceholder';
import type { DirectiveBinding } from 'vue';

export default {
  mounted(el: HTMLInputElement, binding: DirectiveBinding): void {
    const placeholders = binding.value.length > 0 ? binding.value : DEFAULT_PLACEHOLDERS;
    const initialPlaceholder = placeholders[0];

    const handleAnimationEnd = (placeholder: string, inputNode: HTMLInputElement): void => {
      onAnimationEnd(placeholder, inputNode, placeholders);
    };
    animatePlaceholder(el, initialPlaceholder, handleAnimationEnd);
  }
};
