import React from "react";
import Icon from "./index";
import figma from "@figma/code-connect";

/**
 * Icon mapping (hand-authored).
 *
 * `sdsSize` maps 1:1 from the Figma `size` variant.
 *
 * THE GLYPH CAN'T BE MAPPED DYNAMICALLY. Figma models the icon choice as an
 * instance-swap (`↪️ icon`); the code takes a string name (`sdsIcon`). Code
 * Connect has no bridge from an instance-swap to a string enum, so `sdsIcon` is
 * hardcoded to a representative value. Engineers swap it for the icon they need
 * (valid names come from IconNameToSizes / ./map).
 *
 * Consequence for parents: when Button/Tag/etc. compose this Icon via
 * figma.children/instance, the rendered snippet shows the placeholder glyph
 * name, not the designer's actual choice — size and structure are correct, but
 * the specific icon name must be swapped by hand.
 *
 * `color` and `shade` are not exposed as Figma properties on this component, so
 * they're left to code defaults / the consumer.
 */
figma.connect(
  Icon,
  "https://www.figma.com/design/zedDsBDlmkLrKBTuJ4FAz7/Science-Design-System--v2-?node-id=21813-18779",
  {
    props: {
      sdsSize: figma.enum("size", {
        xxs: "xxs",
        xs: "xs",
        s: "s",
        l: "l",
        xl: "xl",
      }),
    },
    example: ({ sdsSize }) => (
      <Icon sdsIcon="DownloadSimple" sdsSize={sdsSize} />
    ),
  }
);
