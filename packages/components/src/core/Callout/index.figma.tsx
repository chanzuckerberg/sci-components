import React from "react";
import Callout from "./index";
import figma from "@figma/code-connect";

figma.connect(
  Callout,
  "https://www.figma.com/design/zedDsBDlmkLrKBTuJ4FAz7/Science-Design-System--v2-?node-id=8760%3A16015",
  {
    props: {
      // REMOVED: `icon` was mapped to the content slot (↪️ slotContent). The icon
      // is intent-driven in code (getIcon() derives it from intent), so it is
      // not mapped here at all.
      intent: figma.enum("intent", {
        info: "info",
        negative: "negative",
        notice: "notice",
        positive: "positive",
      }),
      sdsStage: figma.enum("sdsStage", {
        closed: "closed",
        open: "open",
      }),
      // FIXED (inversion): `showTitle?` (Figma) and `hideTitle` (code) are
      // opposites. Mapping straight through inverted the meaning, so the
      // boolean is flipped here. Revert if the code expects it un-inverted.
      hideTitle: figma.boolean("showTitle?", {
        true: false,
        false: true,
      }),
      // The designer content slot maps to `extraContent` (NOT icon).
      extraContent: figma.instance("↪️ slotContent"),
      sdsStyle: figma.enum("sdsStyle", {
        persistent: "persistent",
        expandable: "expandable",
        dismissible: "dismissible",
      }),
    },
    example: (props) => (
      <Callout
        intent={props.intent}
        sdsStage={props.sdsStage}
        hideTitle={props.hideTitle}
        extraContent={props.extraContent}
        sdsStyle={props.sdsStyle}
      />
    ),
  }
);
