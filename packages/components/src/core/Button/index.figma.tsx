import React from "react";
import Button from "./index";
import figma from "@figma/code-connect";

/**
 * Button mapping (hand-authored).
 *
 * Icon composition (Icon is connected):
 *   - iconPosition left / right / left+right  -> startIcon / endIcon, rendered
 *     from the nested IconLeft / IconRight instances via figma.children.
 *   - labelContent = icon (icon-only)         -> the nested Icon instance is
 *     passed as `children` (matches the code's isIconOnlyChild handling).
 *   The "–" (no-icon) iconPosition option is intentionally left unmapped, so it
 *   resolves to undefined — this also sidesteps the en-dash-vs-hyphen matching
 *   trap in that variant's name.
 *
 * KNOWN LIMITATION: composed icons render Icon's snippet with its hardcoded
 * placeholder glyph ("DownloadSimple"), not the designer's chosen icon — an
 * inherent consequence of Figma's instance-swap vs the code's string `sdsIcon`.
 *
 * NOT MAPPED: `screenWidth` (wide/narrow) — responsive-preview variant, no code
 * prop; responsiveness is handled via CSS breakpoints.
 */
figma.connect(
  Button,
  "https://www.figma.com/design/zedDsBDlmkLrKBTuJ4FAz7/Science-Design-System--v2-?node-id=20062-18447",
  {
    props: {
      sdsType: figma.enum("sdsType", {
        primary: "primary",
        secondary: "secondary",
        destructive: "destructive",
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
      backgroundOnHover: figma.enum("backgroundOnHover", {
        true: true,
        false: false,
        "-": undefined,
      }),

      // Icon slots: rendered from the nested Icon instances, gated by position.
      startIcon: figma.enum("iconPosition", {
        left: figma.children("IconLeft"),
        "left + right": figma.children("IconLeft"),
      }),
      endIcon: figma.enum("iconPosition", {
        right: figma.children("IconRight"),
        "left + right": figma.children("IconRight"),
      }),

      // children: label text, except the icon-only variant passes the Icon.
      children: figma.enum("labelContent", {
        text: figma.textContent("Label"),
        "text + icon": figma.textContent("Label"),
        icon: figma.children("Icon"),
      }),
    },
    example: ({
      sdsType,
      sdsStyle,
      size,
      disabled,
      backgroundOnHover,
      backgroundAppearance,
      startIcon,
      endIcon,
      children,
    }) => (
      <Button
        sdsType={sdsType}
        sdsStyle={sdsStyle}
        size={size}
        disabled={disabled}
        backgroundOnHover={backgroundOnHover}
        backgroundAppearance={backgroundAppearance}
        startIcon={startIcon}
        endIcon={endIcon}
        onClick={() => {}}
      >
        {children}
      </Button>
    ),
  }
);
