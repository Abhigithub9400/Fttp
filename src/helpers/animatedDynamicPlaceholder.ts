interface IOnAnimationEnd {
  (placeholder: string, inputNode: HTMLInputElement): void;
}

const DELAY_AFTER_ANIMATION: number = 1500;
const PLACEHOLDERS: string[] = [
  'This is an animated placeholder',
  'Search for green hoodie',
  'Search for our latest items',
  'Find your favorite movie'
];

const getRandomDelayBetween = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1) + min);

const setPlaceholder = (inputNode: HTMLInputElement, placeholder: string): void => {
  inputNode.setAttribute('placeholder', placeholder);
};

const animateLetters = (
  currentLetters: string[],
  remainingLetters: string[],
  inputNode: HTMLInputElement,
  onAnimationEnd: IOnAnimationEnd
) => {
  if (!remainingLetters.length) {
    return (
      typeof onAnimationEnd === 'function' && onAnimationEnd(currentLetters.join(''), inputNode)
    );
  }

  currentLetters.push(remainingLetters.shift() ?? '');

  setTimeout(
    (): void => {
      setPlaceholder(inputNode, currentLetters.join(''));
      animateLetters(currentLetters, remainingLetters, inputNode, onAnimationEnd);
    },
    getRandomDelayBetween(50, 90)
  );
};

const animatePlaceholder = (
  inputNode: HTMLInputElement,
  placeholder: string,
  onAnimationEnd: IOnAnimationEnd
): void => {
  animateLetters([], placeholder.split(''), inputNode, onAnimationEnd);
};

const onAnimationEnd = (
  placeholder: string,
  inputNode: HTMLInputElement,
  placeholders: string[] = PLACEHOLDERS
): void => {
  setTimeout((): void => {
    let newPlaceholder: string;

    do {
      newPlaceholder = placeholders[Math.floor(Math.random() * placeholders.length)];
    } while (placeholder === newPlaceholder);

    animatePlaceholder(
      inputNode,
      newPlaceholder,
      (placeholder: string, inputNode: HTMLInputElement) =>
        onAnimationEnd(placeholder, inputNode, placeholders)
    );
  }, DELAY_AFTER_ANIMATION);
};

/*window.addEventListener('load', () => {
  const searchBar: HTMLInputElement | null = document.getElementById('ai-search-input')
  // If we want multiple different placeholders, we pass our callback
  animatePlaceholder(searchBar, PLACEHOLDERS[0], onAnimationEnd)
})*/

export { animatePlaceholder, onAnimationEnd, PLACEHOLDERS };
