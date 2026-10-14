import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

const originalGetContext = HTMLCanvasElement.prototype.getContext;

/**
 * Mock the 2D canvas context.
 *
 * jsdom implements no canvas, so `getContext()` prints "Not implemented:
 * HTMLCanvasElement's getContext() method" and returns null. ECharts' renderer
 * (zrender) asks for a 2D context only to measure text, and because it caches
 * the context by truthiness it re-asks on every measurement while it keeps
 * getting null — hence several notices per chart test.
 *
 * jsdom does no layout, so text metrics are fictional either way; the stub just
 * has to satisfy the two members zrender touches, a settable `font` and
 * `measureText`. Requests for any other context (WebGL, which Mol* would want)
 * are left to jsdom so a genuinely unsupported capability still surfaces.
 */
function create2dContextStub() {
  return {
    font: "10px sans-serif",

    measureText(this: { font: string }, text: string) {
      const fontSize = Number(/(\d+(?:\.\d+)?)px/.exec(this.font)?.[1]) || 10;

      // Average sans-serif advance width is roughly half the em size.
      return { width: String(text ?? "").length * fontSize * 0.5 };
    },
  };
}

HTMLCanvasElement.prototype.getContext = function getContext(
  this: HTMLCanvasElement,
  contextId: string,
  ...rest: unknown[]
) {
  if (contextId !== "2d") {
    return (
      originalGetContext as unknown as (
        this: HTMLCanvasElement,
        id: string,
        ...args: unknown[]
      ) => unknown
    ).call(this, contextId, ...rest);
  }

  return create2dContextStub();
} as typeof HTMLCanvasElement.prototype.getContext;

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
