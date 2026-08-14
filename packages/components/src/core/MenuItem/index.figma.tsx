import React from "react";
import MenuItem from "./index";
import figma from "@figma/code-connect";

/**
 * MenuItem has NINE separate Figma component sets (all named "MenuItem" so
 * parent components can nest any of them into the same slot). They map to one
 * code component whose props express every combination:
 *
 *   Action row       -> sdsType="action" + `showIcon?` boolean gating `icon`.
 *                       The glyph swap happens on the nested Icon and is NOT
 *                       bubbled up, so `icon` uses a hardcoded representative
 *                       value (engineers swap it) — same limitation as Icon.
 *   Single-select    -> default (no sdsType, no isMultiSelect); no icon.
 *   Multi-select     -> isMultiSelect + sdsStyle (indeterminate); no consumer
 *                       icon (the check/dash is drawn internally by the code).
 *   Content style    -> `column` slot (count and details both use it; the code
 *                       doesn't distinguish them — only the content differs).
 *   sdsStage=selected -> `selected`; state=disabled -> `disabled`.
 *
 * Code Connect's parser requires explicit `key: value` props (no shorthand) and
 * no external variable references, so the shared mappings are written out fully.
 */

// ---------- ACTION ----------
// These three carry a `showIcon?` boolean toggling the leading icon.

// action, standard
figma.connect(
  MenuItem,
  "https://www.figma.com/design/zedDsBDlmkLrKBTuJ4FAz7/Science-Design-System--v2-?node-id=16953-37419",
  {
    props: {
      selected: figma.enum("sdsStage", { selected: true }),
      disabled: figma.enum("state", { disabled: true }),
      icon: figma.boolean("showIcon?", { true: "TagSimple", false: undefined }),
    },
    example: ({ selected, disabled, icon }) => (
      <MenuItem
        sdsType="action"
        selected={selected}
        disabled={disabled}
        // PLACEHOLDER ICON — this is NOT the icon used in the design. Code Connect
        // cannot read Figma instance swaps, so replace it with the icon actually
        // shown on this instance of the component in Figma.
        icon={icon}
      >
        Menu item
      </MenuItem>
    ),
  }
);

// action, count
figma.connect(
  MenuItem,
  "https://www.figma.com/design/zedDsBDlmkLrKBTuJ4FAz7/Science-Design-System--v2-?node-id=16953-37436",
  {
    props: {
      selected: figma.enum("sdsStage", { selected: true }),
      disabled: figma.enum("state", { disabled: true }),
      icon: figma.boolean("showIcon?", { true: "TagSimple", false: undefined }),
      column: figma.textContent("Count"),
    },
    example: ({ selected, disabled, icon, column }) => (
      <MenuItem
        sdsType="action"
        selected={selected}
        disabled={disabled}
        // PLACEHOLDER ICON — this is NOT the icon used in the design. Code Connect
        // cannot read Figma instance swaps, so replace it with the icon actually
        // shown on this instance of the component in Figma.
        icon={icon}
        column={column}
      >
        Menu item
      </MenuItem>
    ),
  }
);

// action, details
figma.connect(
  MenuItem,
  "https://www.figma.com/design/zedDsBDlmkLrKBTuJ4FAz7/Science-Design-System--v2-?node-id=16953-37461",
  {
    props: {
      selected: figma.enum("sdsStage", { selected: true }),
      disabled: figma.enum("state", { disabled: true }),
      icon: figma.boolean("showIcon?", { true: "TagSimple", false: undefined }),
      column: figma.textContent("Details"),
    },
    example: ({ selected, disabled, icon, column }) => (
      <MenuItem
        sdsType="action"
        selected={selected}
        disabled={disabled}
        // PLACEHOLDER ICON — this is NOT the icon used in the design. Code Connect
        // cannot read Figma instance swaps, so replace it with the icon actually
        // shown on this instance of the component in Figma.
        icon={icon}
        column={column}
      >
        Menu item
      </MenuItem>
    ),
  }
);

// ---------- SINGLE-SELECT ----------
// Default MenuItem: no sdsType, no icon.

// single-select, standard
figma.connect(
  MenuItem,
  "https://www.figma.com/design/zedDsBDlmkLrKBTuJ4FAz7/Science-Design-System--v2-?node-id=4162-45463",
  {
    props: {
      selected: figma.enum("sdsStage", { selected: true }),
      disabled: figma.enum("state", { disabled: true }),
    },
    example: ({ selected, disabled }) => (
      <MenuItem selected={selected} disabled={disabled}>
        Menu item
      </MenuItem>
    ),
  }
);

// single-select, count
figma.connect(
  MenuItem,
  "https://www.figma.com/design/zedDsBDlmkLrKBTuJ4FAz7/Science-Design-System--v2-?node-id=4162-45468",
  {
    props: {
      selected: figma.enum("sdsStage", { selected: true }),
      disabled: figma.enum("state", { disabled: true }),
      column: figma.textContent("Count"),
    },
    example: ({ selected, disabled, column }) => (
      <MenuItem selected={selected} disabled={disabled} column={column}>
        Menu item
      </MenuItem>
    ),
  }
);

// single-select, details
figma.connect(
  MenuItem,
  "https://www.figma.com/design/zedDsBDlmkLrKBTuJ4FAz7/Science-Design-System--v2-?node-id=4162-45473",
  {
    props: {
      selected: figma.enum("sdsStage", { selected: true }),
      disabled: figma.enum("state", { disabled: true }),
      column: figma.textContent("Details"),
    },
    example: ({ selected, disabled, column }) => (
      <MenuItem selected={selected} disabled={disabled} column={column}>
        Menu item
      </MenuItem>
    ),
  }
);

// ---------- MULTI-SELECT ----------
// isMultiSelect + sdsStyle. The check/dash icon is drawn internally by the
// component, so there is NO consumer `icon` prop here.

// multi-select, standard
figma.connect(
  MenuItem,
  "https://www.figma.com/design/zedDsBDlmkLrKBTuJ4FAz7/Science-Design-System--v2-?node-id=4162-45478",
  {
    props: {
      selected: figma.enum("sdsStage", { selected: true }),
      disabled: figma.enum("state", { disabled: true }),
      sdsStyle: figma.enum("sdsStage", { indeterminate: "indeterminate" }),
    },
    example: ({ selected, disabled, sdsStyle }) => (
      <MenuItem isMultiSelect sdsStyle={sdsStyle} selected={selected} disabled={disabled}>
        Menu item
      </MenuItem>
    ),
  }
);

// multi-select, count
figma.connect(
  MenuItem,
  "https://www.figma.com/design/zedDsBDlmkLrKBTuJ4FAz7/Science-Design-System--v2-?node-id=4162-45483",
  {
    props: {
      selected: figma.enum("sdsStage", { selected: true }),
      disabled: figma.enum("state", { disabled: true }),
      sdsStyle: figma.enum("sdsStage", { indeterminate: "indeterminate" }),
      column: figma.textContent("Count"),
    },
    example: ({ selected, disabled, sdsStyle, column }) => (
      <MenuItem isMultiSelect sdsStyle={sdsStyle} selected={selected} disabled={disabled} column={column}>
        Menu item
      </MenuItem>
    ),
  }
);

// multi-select, details
figma.connect(
  MenuItem,
  "https://www.figma.com/design/zedDsBDlmkLrKBTuJ4FAz7/Science-Design-System--v2-?node-id=4162-45488",
  {
    props: {
      selected: figma.enum("sdsStage", { selected: true }),
      disabled: figma.enum("state", { disabled: true }),
      sdsStyle: figma.enum("sdsStage", { indeterminate: "indeterminate" }),
      column: figma.textContent("Details"),
    },
    example: ({ selected, disabled, sdsStyle, column }) => (
      <MenuItem isMultiSelect sdsStyle={sdsStyle} selected={selected} disabled={disabled} column={column}>
        Menu item
      </MenuItem>
    ),
  }
);
