import React from "react";
import InputCheckbox from "./index";
import figma from "@figma/code-connect";

figma.connect(
  InputCheckbox,
  "https://www.figma.com/design/zedDsBDlmkLrKBTuJ4FAz7/Science-Design-System--v2-?node-id=8784%3A18915",
  {
    props: {
      // Figma sdsStage (unselected/selected/indeterminate) -> code stage
      // (unchecked/checked/indeterminate). NAME TRANSLATION: the Figma and code
      // vocabularies differ; auto-gen mapped only indeterminate and dropped the
      // other two, so selected/unselected produced no stage at all.
      stage: figma.enum("sdsStage", {
        selected: "checked",
        unselected: "unchecked",
        indeterminate: "indeterminate",
      }),
      intent: figma.enum("intent", {
        negative: "negative",
        notice: "notice",
      }),
      // state=disabled -> disabled. hover is a visual state (unmapped).
      disabled: figma.enum("state", {
        disabled: true,
      }),
      // Label + caption, read live and gated on their Figma booleans.
      label: figma.boolean("showLabelText?", {
        true: figma.textContent("Label"),
        false: undefined,
      }),
      caption: figma.boolean("showCaptionText?", {
        true: figma.textContent("Caption"),
        false: undefined,
      }),
      // Intentionally unmapped:
      // - IntentMessage subtree (showIntentMessage?/showSecondMessage? + its text):
      //   InputCheckbox has no intent-message prop. `intent` only recolors the
      //   checkbox; the Figma message is design-only decoration.
      // - state=hover: visual state.
    },
    example: ({ stage, intent, disabled, label, caption }) => (
      <InputCheckbox
        stage={stage}
        intent={intent}
        disabled={disabled}
        label={label}
        caption={caption}
      />
    ),
  }
);
