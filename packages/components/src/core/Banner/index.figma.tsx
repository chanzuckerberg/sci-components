import React from "react";
import Banner from "./index";
import figma from "@figma/code-connect";

figma.connect(
  Banner,
  "https://www.figma.com/design/zedDsBDlmkLrKBTuJ4FAz7/Science-Design-System--v2-?node-id=8715%3A15398",
  {
    props: {
      // REMOVED: the old `icon` mapping read `state (x icon)` — an interaction
      // state on the close (X) icon — and emitted a random glyph. The leading
      // icon is intent-driven in code (iconItem() derives it from `intent`), and
      // the X is intrinsic, so `icon` is intentionally not mapped.
      //
      // `dismissible` (default true) controls whether the X renders. Mapped.
      // `dismissed` (the controlled "is closed" state) is intentionally NOT
      // mapped — setting it would render nothing.
      dismissible: figma.boolean("dismissible?"),
      intent: figma.enum("intent", {
        accent: "accent",
        info: "info",
        negative: "negative",
        notice: "notice",
        positive: "positive",
      }),
      sdsType: figma.enum("sdsType", {
        primary: "primary",
        secondary: "secondary",
      }),
      textChild: figma.textContent("textChild"),
    },
    example: (props) => (
      <Banner
        dismissible={props.dismissible}
        intent={props.intent}
        sdsType={props.sdsType}
      >
        {props.textChild}
      </Banner>
    ),
  }
);
