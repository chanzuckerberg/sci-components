import "@testing-library/jest-dom";
import "../../intersectionObserverMock";

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  constructor(private callback: ResizeObserverCallback) {}

  observe() {}

  unobserve() {}

  disconnect() {}
};
