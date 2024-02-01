// Mock IntersectionObserver
class IntersectionObserver {
  observe = jest.fn();

  disconnect = jest.fn();

  unobserve = jest.fn();
}

Object.defineProperty(window, "IntersectionObserver", {
  configurable: true,
  value: IntersectionObserver,
  writable: true,
});

Object.defineProperty(global, "IntersectionObserver", {
  configurable: true,
  value: IntersectionObserver,
  writable: true,
});
