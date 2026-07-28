import React from "react";
import Notification from "./index";
import figma from "@figma/code-connect";

figma.connect(
  Notification,
  "https://www.figma.com/design/zedDsBDlmkLrKBTuJ4FAz7/Science-Design-System--v2-?node-id=8945%3A10256",
  {
    props: {
      // REMOVED: `icon` was mapped to the content slot (↪️ slotContent). The icon
      // is intent-driven in code, so it is not mapped here.
      //
      // The designer content slot maps to `extraContent` (NOT icon).
      extraContent: figma.instance("↪️ slotContent"),
      buttonPosition: figma.enum("buttonPosition", {
        left: "left",
        right: "right",
      }),
      // FLAG: mapped from `showDismissButton?`, but these are different concepts
      // (is the dismiss button shown vs. is the notification dismissed). Left as
      // the auto-generated mapping; confirm against the real `dismissed` behavior.
      dismissed: figma.boolean("showDismissButton?"),
      // NOTE: Figma `intent` also has `accent`, left unmapped here so it falls
      // back to the code default. Add it if the code's intent type includes it.
      intent: figma.enum("intent", {
        info: "info",
        negative: "negative",
        notice: "notice",
        positive: "positive",
      }),
    },
    example: (props) => (
      <Notification
        extraContent={props.extraContent}
        buttonPosition={props.buttonPosition}
        dismissed={props.dismissed}
        slideDirection="left"
        intent={props.intent}
      />
    ),
  }
);
