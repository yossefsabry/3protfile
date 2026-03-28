import '@testing-library/jest-dom/vitest';

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
