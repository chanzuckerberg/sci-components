import React from "react";
import Icon from "./index";
import figma from "@figma/code-connect";

/**
 * Icon mapping (hand-authored).
 *
 * `sdsSize` maps 1:1 from the Figma `size` variant.
 *
 * THE GLYPH CAN'T BE MAPPED. Figma models the icon choice as an instance-swap;
 * the code takes a string name (`sdsIcon`). Code Connect has no way to read
 * which component an instance was swapped to and turn it into a string, so
 * `sdsIcon` is hardcoded and the snippet shows the same glyph regardless of
 * what the designer picked. The inline comment in the example communicates
 * this to engineers — and propagates into any parent that composes Icon.
 *
 * `color` and `shade` are not exposed as Figma properties on this component,
 * so they're left to code defaults / the consumer.
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
      <Icon
        // PLACEHOLDER ICON — this is NOT the icon used in the design. Code Connect
        // cannot read Figma instance swaps, so replace it with the icon actually
        // shown on this instance of the component in Figma.
        sdsIcon="DownloadSimple"
        sdsSize={sdsSize}
      />
    ),
  }
);
