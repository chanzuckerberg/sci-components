import React from "react";
import CellBasic from "./index";
import figma from "@figma/code-connect";

figma.connect(
  CellBasic,
  "https://www.figma.com/design/zedDsBDlmkLrKBTuJ4FAz7/Science-Design-System--v2-?node-id=9021%3A26589",
  {
    props: {
      // Required content, read live from the Primary layer.
      primaryText: figma.textContent("Primary"),
      // Secondary/Tertiary layers exist ONLY in beside/none variants — the "below"
      // slot is mutually exclusive with them (mirrors the code: slotBottom renders
      // only when there's no secondary/tertiary text). Gate on componentSlotPosition
      // so we never read the absent layers on "below" (which errors); the
      // show*Text? boolean still controls visibility within beside/none.
      secondaryText: figma.enum("componentSlotPosition", {
        beside: figma.boolean("showSecondaryText?", {
          true: figma.textContent("Secondary"),
          false: undefined,
        }),
        none: figma.boolean("showSecondaryText?", {
          true: figma.textContent("Secondary"),
          false: undefined,
        }),
      }),
      tertiaryText: figma.enum("componentSlotPosition", {
        beside: figma.boolean("showTertiaryText?", {
          true: figma.textContent("Tertiary"),
          false: undefined,
        }),
        none: figma.boolean("showTertiaryText?", {
          true: figma.textContent("Tertiary"),
          false: undefined,
        }),
      }),
      horizontalAlign: figma.enum("horizontalAlignment", {
        left: "left",
        right: "right",
      }),
      verticalAlign: figma.enum("verticalAlignment", {
        top: "top",
        center: "center",
        bottom: "bottom",
      }),
      // textWrap? is a VARIANT ("true"/"false"), not a boolean -> figma.enum.
      // Maps to shouldTextWrap (code default true).
      shouldTextWrap: figma.enum("textWrap?", {
        true: true,
        false: false,
      }),
      // componentSlotPosition selects which slot the swapped content fills.
      // "none" falls through to undefined for both, dropping them.
      primaryTextComponentSlotRight: figma.enum("componentSlotPosition", {
        beside: figma.instance("↪️ slotContent"),
      }),
      primaryTextComponentSlotBottom: figma.enum("componentSlotPosition", {
        below: figma.instance("↪️ slotContent"),
      }),
      // Intentionally removed:
      // - `icon`: auto-gen mapped it to slotContent, but icon is a specific SVG
      //   prop, not the general component slot. Different concept.
      // - `iconVerticalAlign`: double-mapped from verticalAlignment (same variant
      //   as verticalAlign). Only relevant with an icon present; dropped.
    },
    example: ({
      primaryText,
      secondaryText,
      tertiaryText,
      horizontalAlign,
      verticalAlign,
      shouldTextWrap,
      primaryTextComponentSlotRight,
      primaryTextComponentSlotBottom,
    }) => (
      <CellBasic
        primaryText={primaryText}
        secondaryText={secondaryText}
        tertiaryText={tertiaryText}
        horizontalAlign={horizontalAlign}
        verticalAlign={verticalAlign}
        shouldTextWrap={shouldTextWrap}
        primaryTextComponentSlotRight={primaryTextComponentSlotRight}
        primaryTextComponentSlotBottom={primaryTextComponentSlotBottom}
      />
    ),
  }
);
