import React from "react";
import Tooltip from "./index";
import figma from "@figma/code-connect";

figma.connect(
  Tooltip,
  "https://www.figma.com/design/zedDsBDlmkLrKBTuJ4FAz7/Science-Design-System--v2-?node-id=3757%3A63685",
  {
    props: {
      // REMOVED (drift fix): `inverted` and `hasInvertedStyle` both mapped the
      // Figma property "hasInvertedStyle?", which no longer exists on the
      // component. If the code still has an `inverted` prop, it simply can't be
      // driven from Figma anymore, so it's left unmapped.

      placement: figma.enum("placement", {
        left: "left",
        right: "right",
        bottomEnd: "bottom-end",
        bottomStart: "bottom-start",
        bottom: "bottom",
        leftEnd: "left-end",
        leftStart: "left-start",
        rightEnd: "right-end",
        rightStart: "right-start",
        topEnd: "top-end",
        topStart: "top-start",
        top: "top",
      }),
      slots: figma.instance("↪️ slotContent"),

      // FLAG (not a drift error, but suspect): this sets open=true only when
      // placement=topEnd — almost certainly an auto-generation artifact. It
      // validates because `placement` still exists, so I left it to keep the
      // fix minimal, but you probably want to delete it.
      open: figma.enum("placement", {
        topEnd: true,
      }),
    },
    example: (props) => (
      <Tooltip title="Tooltip text" open={props.open} placement={props.placement}>
        <span>Tooltip content</span>
      </Tooltip>
    ),
  }
);
