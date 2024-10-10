export default {
  mounted(el: HTMLElement): void {
    let isAutoScrolling: boolean = true;
    const threshold: number = 0;
    let previousScrollHeight: number = el.scrollTop;

    const scrollToBottom = (): void => {
      if (isAutoScrolling) {
        el.scrollTop = el.scrollHeight;
        //el.scrollBy({ top: el.scrollHeight, behavior: 'smooth' });
      }
    };

    const observer: MutationObserver = new MutationObserver((): void => {
      const currentScrollHeight: number = el.scrollHeight;

      if (currentScrollHeight > previousScrollHeight) {
        scrollToBottom();
        previousScrollHeight = currentScrollHeight;
      }
    });

    observer.observe(el, { childList: true, subtree: true });

    const handleUserScroll = (): void => {
      const scrollPosition: number = el.scrollTop + el.clientHeight;
      const isNearBottom: boolean = el.scrollHeight - scrollPosition <= threshold;

      if (!isNearBottom) {
        isAutoScrolling = false;

        const event: Event = new Event('scrolledUp');
        el.dispatchEvent(event);
      } else {
        isAutoScrolling = true;
      }
    };

    el.addEventListener('scroll', handleUserScroll);

    Object.defineProperty(el, 'isAutoScrolling', {
      get: () => isAutoScrolling,
      enumerable: true,
      configurable: true
    });

    el.__autoScrollObserver__ = observer;
    el.__handleUserScroll__ = handleUserScroll;
  },
  unmounted(el: HTMLElement): void {
    if (el.__autoScrollObserver__) {
      el.__autoScrollObserver__.disconnect();
      delete el.__autoScrollObserver__;
    }
    if (el.__handleUserScroll__) {
      el.removeEventListener('scroll', el.__handleUserScroll__);
      delete el.__handleUserScroll__;
    }
  }
};
