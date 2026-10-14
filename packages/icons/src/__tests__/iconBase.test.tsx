import IconBase from "@phosphor-icons/react/dist/lib/IconBase";

/**
 * A guard on the one deep import this package makes.
 *
 * `createSdsIcon` builds on `IconBase` from `@phosphor-icons/react/dist/lib/IconBase`
 * rather than from the package root, which is a barrel of ~1,500 icons, or from
 * `@phosphor-icons/react/lib`, which Phosphor documents but does not ship: that
 * entry points at `dist/lib/index.es.js`, and only the `.d.ts` beside it exists.
 * TypeScript therefore accepts the broken specifier and the failure surfaces at
 * bundle time, so a type test would not catch it.
 *
 * If a Phosphor upgrade moves this file, this fails at import and says why,
 * instead of the package shipping icons that cannot resolve.
 */
describe("the IconBase import path", () => {
  it("still resolves to a component", () => {
    expect(IconBase).toBeDefined();
    expect(typeof IconBase).not.toBe("string");
  });
});
