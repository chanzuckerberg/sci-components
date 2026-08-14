import React from "react";
import Tabs, { Tab } from "./index";
import figma from "@figma/code-connect";

/**
 * Tabs renders Tab children — the previous mapping had no children and only
 * `underlined`, so the snippet showed an empty tab bar.
 *
 * FIXED: `showUnderline?` is a VARIANT ("true"/"false"), not a boolean
 * property, so it's mapped with figma.enum rather than figma.boolean.
 *
 * ADDED: `size` -> `sdsSize`, and `activeTab` -> the selected tab index
 * (`value`), so the snippet reflects which tab the design has selected.
 *
 * NOT MAPPED:
 *   - `tab #` (2–5): a Figma authoring count; tab count is how many <Tab>
 *     children you render.
 *   - `hoveredTab`: interaction state, no code prop.
 *   - `disabled?`: applies to the Figma composition as a whole; in code
 *     `disabled` belongs on individual <Tab> elements.
 */
figma.connect(
  Tabs,
  "https://www.figma.com/design/zedDsBDlmkLrKBTuJ4FAz7/Science-Design-System--v2-?node-id=9088%3A17404",
  {
    props: {
      underlined: figma.enum("showUnderline?", {
        true: true,
        false: false,
      }),
      sdsSize: figma.enum("size", {
        s: "small",
        l: "large",
      }),
      value: figma.enum("activeTab", {
        first: 0,
        second: 1,
        third: 2,
        fourth: 3,
        fifth: 4,
      }),
    },
    example: ({ underlined, sdsSize, value }) => (
      <Tabs
        underlined={underlined}
        sdsSize={sdsSize}
        value={value}
        onChange={() => {}}
      >
        {/* PLACEHOLDER CONTENT — replace with your own tabs. Tab counts and
            labels are illustrative; `count` is optional. */}
        <Tab label="Tab 1" value={0} />
        <Tab label="Tab 2" value={1} />
        <Tab label="Tab 3" value={2} />
      </Tabs>
    ),
  }
);
