import React from "react";
import InputToggle from "./index";
import figma from "@figma/code-connect";

figma.connect(
  InputToggle,
  "https://www.figma.com/design/zedDsBDlmkLrKBTuJ4FAz7/Science-Design-System--v2-?node-id=8801%3A19187",
  {
    props: {
      // sdsStage is a VARIANT ("on"/"off"), NOT a Figma boolean -> figma.enum
      // mapping to the `checked` boolean. (Auto-gen guessed figma.boolean and
      // left it commented out.) off -> false is the default, so it's omitted
      // from the snippet; checked appears only on "on" instances.
      checked: figma.enum("sdsStage", {
        on: true,
        off: false,
      }),
      // state=disabled -> disabled. hover is a visual state (unmapped).
      disabled: figma.enum("state", {
        disabled: true,
      }),
      // Intentionally unmapped:
      // - "Text" layer: this is the baked-on On/Off indicator driven by the
      //   onLabel/offLabel props (default "On"/"Off"), derived from `checked` —
      //   not a free-form label. Mapping it would misrepresent the API; the
      //   defaults are correct, so it's omitted.
      // - state=hover: visual state.
    },
    example: ({ checked, disabled }) => (
      <InputToggle checked={checked} disabled={disabled} />
    ),
  }
);
