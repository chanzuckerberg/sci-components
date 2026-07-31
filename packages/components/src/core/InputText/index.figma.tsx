import React from "react";
import InputText from "./index";
import figma from "@figma/code-connect";

figma.connect(
  InputText,
  "https://www.figma.com/design/zedDsBDlmkLrKBTuJ4FAz7/Science-Design-System--v2-?node-id=8895%3A46555",
  {
    props: {
      // Field text — read from the "Value" layer. Surfaced as placeholder;
      // the sdsStage variant (default/userInput) is Figma's empty-vs-filled
      // display state and has no code prop, so it is intentionally unmapped.
      placeholder: figma.textContent("Value"),
      sdsType: figma.enum("sdsType", {
        textField: "textField",
        textArea: "textArea",
      }),
      // "default" key omitted: it equals the code default, so an absent `intent`
      // is equivalent. Snippet shows intent only for the meaningful cases.
      intent: figma.enum("intent", {
        negative: "negative",
        notice: "notice",
        positive: "positive",
      }),
      // state=disabled -> `disabled`. focus/hover are visual states (unmapped).
      disabled: figma.enum("state", {
        disabled: true,
      }),
      // Intentionally removed: `type` — auto-gen noise. It mapped sdsType to HTML
      //   input types "tel"/"file", which is meaningless; the component hardcodes
      //   type="text" internally.
      // Intentionally unmapped:
      // - "showIntentMessage?" and its message text: InputText does not render an
      //   intent message itself; it maps to MUI's passthrough `helperText`, not a
      //   first-class SDS prop.
    },
    example: (props) => (
      <InputText
        id="input-example"
        label="Input Label"
        placeholder={props.placeholder}
        sdsType={props.sdsType}
        intent={props.intent}
        disabled={props.disabled}
      />
    ),
  }
);
