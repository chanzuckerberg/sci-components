import React from "react";
import NavigationJumpTo from "./index";
import figma from "@figma/code-connect";

/**
 * NavigationJumpTo renders entirely from its `items` array — the previous
 * mapping passed `items={[]}`, so the snippet showed an empty component.
 *
 * NOTHING in this component's Figma maps to a code prop:
 *   - `quantity` (2–7 navItems) and the `show Nth subNav` booleans are Figma
 *     authoring conveniences; in code, item and sub-item counts come from the
 *     length/shape of `items`.
 *   - `activeNav` / `hoveredNav` are visual states; the component derives the
 *     active item from scroll position (useInView), not from a prop.
 *
 * So the whole value of this mapping is communicating the `items` shape.
 * Each item needs an `elementRef` pointing at the section it scrolls to —
 * in real usage that's a ref from useRef(), shown here as a placeholder.
 */
figma.connect(
  NavigationJumpTo,
  "https://www.figma.com/design/zedDsBDlmkLrKBTuJ4FAz7/Science-Design-System--v2-?node-id=8938%3A9938",
  {
    props: {},
    example: () => (
      <NavigationJumpTo
        // PLACEHOLDER DATA — replace with your own. Structure is accurate;
        // item counts and text are illustrative only. Each `elementRef` should
        // be a real ref (e.g. from useRef) pointing at the target section.
        items={[
          {
            elementRef: { current: null },
            title: "Nav item 1",
          },
          {
            elementRef: { current: null },
            subItems: [
              { elementRef: { current: null }, title: "Sub item 1" },
              { elementRef: { current: null }, title: "Sub item 2" },
            ],
            title: "Nav item 2",
          },
          {
            elementRef: { current: null },
            title: "Nav item 3",
          },
        ]}
      />
    ),
  }
);
