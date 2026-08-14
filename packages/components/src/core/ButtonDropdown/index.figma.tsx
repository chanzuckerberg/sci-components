import React from "react";
import ButtonDropdown from "./index";
import figma from "@figma/code-connect";

/**
 * ButtonDropdown wraps Button. Its props are Button's minus `destructive`
 * (sdsType is only primary/secondary).
 *
 * Icons:
 *   - The CaretDown (Figma `IconDropdown`) is the intrinsic dropdown chevron,
 *     hardcoded by the component as its endIcon — NOT mapped, not swappable.
 *   - The leading icon (left of the label) IS consumer-controlled via
 *     `startIcon`. It's present when labelContent includes an icon. The glyph
 *     swap isn't bubbled up from the nested Icon, so a representative name is
 *     hardcoded (engineers swap it) — same limitation as Icon elsewhere.
 *
 * NOT MAPPED: `screenWidth` (responsive preview, no code prop).
 */
figma.connect(
  ButtonDropdown,
  "https://www.figma.com/design/zedDsBDlmkLrKBTuJ4FAz7/Science-Design-System--v2-?node-id=20132-14801",
  {
    props: {
      sdsType: figma.enum("sdsType", {
        primary: "primary",
        secondary: "secondary",
      }),
      sdsStyle: figma.enum("sdsStyle", {
        solid: "solid",
        outline: "outline",
        minimal: "minimal",
      }),
      backgroundAppearance: figma.enum("backgroundAppearance", {
        matchBackground: "matchBackground",
        dark: "dark",
      }),
      size: figma.enum("size", {
        s: "small",
        m: "medium",
        l: "large",
      }),
      disabled: figma.enum("state", {
        disabled: true,
      }),
      // Leading icon: present when labelContent includes an icon. Hardcoded
      // representative glyph (swap per use); CaretDown is intrinsic and unmapped.
      startIcon: figma.enum("labelContent", {
        "text + icon": "DownloadSimple",
        icon: "DownloadSimple",
        text: undefined,
      }),
      // Label: omitted for the icon-only variant.
      children: figma.enum("labelContent", {
        text: figma.textContent("Label"),
        "text + icon": figma.textContent("Label"),
        icon: undefined,
      }),
    },
    example: ({ sdsType, sdsStyle, backgroundAppearance, size, disabled, startIcon, children }) => (
      <ButtonDropdown
        sdsType={sdsType}
        sdsStyle={sdsStyle}
        backgroundAppearance={backgroundAppearance}
        size={size}
        disabled={disabled}
        // PLACEHOLDER ICON — this is NOT the icon used in the design. Code Connect
        // cannot read Figma instance swaps, so replace it with the icon actually
        // shown on this instance of the component in Figma.
        startIcon={startIcon}
        onClick={() => {}}
      >
        {children}
      </ButtonDropdown>
    ),
  }
);
