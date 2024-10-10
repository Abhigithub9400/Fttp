export {};

declare global {
  interface HTMLElement {
    __autoScrollObserver__?: MutationObserver;
    __handleUserScroll__?: EventListenerOrEventListenerObject;
  }
}
