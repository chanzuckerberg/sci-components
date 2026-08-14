import React from "react";
import InputRadio from "./index";
import figma from "@figma/code-connect";

figma.connect(
  InputRadio,
  "https://www.figma.com/design/zedDsBDlmkLrKBTuJ4FAz7/Science-Design-System--v2-?node-id=8793%3A19098",
  {
    props: {
      // Figma sdsStage (selected/unselected) -> code stage (checked/unchecked).
      // NAME TRANSLATION: vocabularies differ; auto-gen omitted this entirely,
      // so selected vs unselected never appeared in the snippet.
      stage: figma.enum("sdsStage", {
        selected: "checked",
        unselected: "unchecked",
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
      // - IntentMessage subtree (showIntentMessage?/showSecondMessage? + text):
      //   InputRadio has no intent-message prop; `intent` only recolors the
      //   radio. Design-only decoration.
      // - state=hover: visual state.
    },
    example: ({ stage, intent, disabled, label, caption }) => (
      <InputRadio
        stage={stage}
        intent={intent}
        disabled={disabled}
        label={label}
        caption={caption}
      />
    ),
  }
);
