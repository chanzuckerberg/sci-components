import React from "react";
import InputSearch from "./index";
import figma from "@figma/code-connect";

figma.connect(
  InputSearch,
  "https://www.figma.com/design/zedDsBDlmkLrKBTuJ4FAz7/Science-Design-System--v2-?node-id=8895%3A46442",
  {
    props: {
      // Field text — read live from the "Value" layer. Surfaced as placeholder;
      // sdsStage (default/userInput) is Figma's empty-vs-filled display state
      // and has no code prop, so it is intentionally unmapped.
      placeholder: figma.textContent("Value"),
      sdsStyle: figma.enum("sdsStyle", {
        rounded: "rounded",
        square: "square",
      }),
      intent: figma.enum("intent", {
        negative: "negative",
        notice: "notice",
      }),
      // state=disabled -> disabled. focus/hover are visual states (unmapped).
      disabled: figma.enum("state", {
        disabled: true,
      }),
      // Intentionally unmapped:
      // - IntentMessage subtree (showIntentMessage?/showSecondMessage? + text):
      //   InputSearch has no intent-message prop; `intent` only recolors the
      //   field border. Design-only decoration.
      // - sdsStage (default/userInput): empty-vs-filled display state, no prop.
      // - state=focus/hover: visual states.
    },
    example: ({ placeholder, sdsStyle, intent, disabled }) => (
      <InputSearch
        id="search-example"
        label="Search Label"
        placeholder={placeholder}
        sdsStyle={sdsStyle}
        intent={intent}
        disabled={disabled}
      />
    ),
  }
);
