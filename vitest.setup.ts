import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  constructor(private callback: ResizeObserverCallback) {}

  observe() {}

  unobserve() {}

  disconnect() {}
};

// Mock IntersectionObserver
class IntersectionObserver {
  observe = vi.fn();

  disconnect = vi.fn();

  unobserve = vi.fn();
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
