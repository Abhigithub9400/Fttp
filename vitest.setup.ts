import { vi } from 'vitest';

vi.mock('some-library', () => {
  return {
    someMethod: vi.fn()
  };
});
