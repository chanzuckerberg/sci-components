/// <reference types="vitest/globals" />

// Augments Vitest's `expect` with `@testing-library/jest-dom` matchers
// (e.g. `toBeInTheDocument`) for type-checking test files.
import "@testing-library/jest-dom/vitest";
