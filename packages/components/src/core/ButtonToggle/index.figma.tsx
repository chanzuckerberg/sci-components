import React from "react";
import ButtonToggle from "./index";
import figma from "@figma/code-connect";

/**
 * ButtonToggle wraps Button and adds a toggle state. Key mappings:
 *   - Figma `state=on` -> code `sdsStage="on"` (the toggle-on state); other
 *     states are interaction-only except `disabled`.
 *   - `startIcon` is required on this component. The glyph swap isn't bubbled
 *     up, so a representative name is hardcoded (engineers swap it) — same
 *     limitation as Icon. Presence follows iconPosition.
 *
 * NOT MAPPED: `screenWidth` (responsive preview, no code prop).
 */
figma.connect(
  ButtonToggle,
  "https://www.figma.com/design/zedDsBDlmkLrKBTuJ4FAz7/Science-Design-System--v2-?node-id=20162-19845",
  {
    props: {
      sdsType: figma.enum("sdsType", {
        primary: "primary",
        secondary: "secondary",
      }),
      sdsStyle: figma.enum("sdsStyle", {
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
      // Figma `state` -> toggle state + disabled; hover/pressed/default omitted.
      sdsStage: figma.enum("state", {
        on: "on",
      }),
      disabled: figma.enum("state", {
        disabled: true,
      }),
      children: figma.enum("labelContent", {
        text: figma.textContent("Label"),
        "text + icon": figma.textContent("Label"),
        icon: undefined,
      }),
    },
    example: ({ sdsType, sdsStyle, backgroundAppearance, size, sdsStage, disabled, children }) => (
      <ButtonToggle
        sdsType={sdsType}
        sdsStyle={sdsStyle}
        backgroundAppearance={backgroundAppearance}
        size={size}
        sdsStage={sdsStage}
        disabled={disabled}
        startIcon="DownloadSimple"
        onClick={() => {}}
      >
        {children}
      </ButtonToggle>
    ),
  }
);
