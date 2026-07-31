import React from "react";
import DropdownMenu from "./index";
import figma from "@figma/code-connect";

/**
 * DropdownMenu renders from an `options` array and only renders its content
 * when `anchorEl` is set — the previous mapping passed `options={[]}` and
 * `anchorEl={null}`, so the snippet described a component that renders nothing.
 *
 * FIXED: `showSearch?` is a VARIANT ("true"/"false"), not a boolean property,
 * so it's mapped with figma.enum rather than figma.boolean.
 *
 * REMOVED: `isMultiColumn`. It exists on StyleProps, but index.tsx computes its
 * own (`const isMultiColumn = "options" in (options?.[0] || {})`) and never
 * reads the prop — multi-column is driven by giving options nested `options`
 * arrays, not by passing a flag.
 *
 * NOT MAPPED (no code equivalent): `showScrollbars?`, `showChevrons?`,
 * `showApplyButtons?`, `showSectionNames?` (section headers come from options
 * having a `section`), and `section #` (a Figma authoring count).
 */
figma.connect(
  DropdownMenu,
  "https://www.figma.com/design/zedDsBDlmkLrKBTuJ4FAz7/Science-Design-System--v2-?node-id=8989%3A13218",
  {
    props: {
      search: figma.enum("showSearch?", {
        true: true,
        false: false,
      }),
      title: figma.enum("showTitle?", {
        true: figma.textContent("Title"),
        false: undefined,
      }),
      subTitle: figma.boolean("showSubtitle?", {
        true: figma.textContent("Subtitle"),
        false: undefined,
      }),
      // singleColumn -> a flat options array whose entries carry `section`
      // (sections stack vertically). multiColumn -> each entry has its OWN
      // nested `options` array (sections sit side by side). This is the only
      // structural difference between the two in code.
      options: figma.enum("sdsStyle", {
        singleColumn: [
          { name: "Option 1", section: "Section label 1" },
          { name: "Option 2", section: "Section label 1" },
          { name: "Option 3", section: "Section label 2" },
        ],
        multiColumn: [
          {
            name: "Section label 1",
            options: [{ name: "Option 1" }, { name: "Option 2" }],
          },
          {
            name: "Section label 2",
            options: [{ name: "Option 3" }, { name: "Option 4" }],
          },
        ],
      }),
    },
    example: ({ search, title, subTitle, options }) => (
      <DropdownMenu
        open
        search={search}
        title={title}
        subTitle={subTitle}
        // `anchorEl` must be a real element (e.g. from useState/useRef) — the
        // menu renders nothing while it is null.
        anchorEl={null}
        // PLACEHOLDER DATA — replace with your own. Structure is accurate;
        // option counts and text are illustrative only.
        options={options}
        onChange={() => {}}
      />
    ),
  }
);
