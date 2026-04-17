import '@testing-library/jest-dom/vitest';
import { afterEach } from 'vitest';

const storage = new Map<string, string>();

const localStorageStub = {
  getItem: (key: string) => storage.get(key) ?? null,
  setItem: (key: string, value: string) => {
    storage.set(key, String(value));
  },
  removeItem: (key: string) => {
    storage.delete(key);
  },
  clear: () => {
    storage.clear();
  },
};

if (typeof globalThis.localStorage === 'undefined' || typeof globalThis.localStorage?.getItem !== 'function') {
  Object.defineProperty(globalThis, 'localStorage', {
    value: localStorageStub,
    configurable: true,
  });
}

afterEach(() => {
  globalThis.localStorage.clear();
});

class IntersectionObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}

if (typeof globalThis.IntersectionObserver === 'undefined') {
  Object.defineProperty(globalThis, 'IntersectionObserver', {
    value: IntersectionObserverStub,
    configurable: true,
  });
}

const canvasContextStub = {
  fillRect: () => {},
  fillText: () => {},
  setTransform: () => {},
  clearRect: () => {},
  beginPath: () => {},
  moveTo: () => {},
  lineTo: () => {},
  stroke: () => {},
  save: () => {},
  restore: () => {},
  scale: () => {},
  fillStyle: '#000000',
  font: '16px monospace',
  textBaseline: 'top' as const,
};

Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
  value: () => canvasContextStub,
});
