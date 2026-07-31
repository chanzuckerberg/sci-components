import React from "react";
import InputDropdown from "./index";
import figma from "@figma/code-connect";

/**
 * Code Connect mapping for InputDropdown.
 * Originally auto-generated, then extended by hand for the three Figma
 * properties the generator could not name-match to code props:
 *   - showDetailsText?  -> gates `details`
 *   - selectionType     -> fans out into `value` / `counter` + `multiple`
 *   - showIntentMessage? -> intentionally left unmapped (see note below)
 */
figma.connect(
  InputDropdown,
  "https://www.figma.com/design/zedDsBDlmkLrKBTuJ4FAz7/Science-Design-System--v2-?node-id=8850%3A44694",
  {
    props: {
      // --- Unchanged from the auto-generated mapping ---
      disabled: figma.enum("state", {
        disabled: true,
      }),
      intent: figma.enum("intent", {
        negative: "negative",
        notice: "notice",
      }),
      state: figma.enum("state", {
        default: "default",
        open: "open",
      }),
      sdsStyle: figma.enum("sdsStyle", {
        minimal: "minimal",
        square: "square",
        rounded: "rounded",
      }),
      sdsType: figma.enum("sdsType", {
        label: "label",
        value: "value",
      }),

      // --- Newly mapped (was commented out) ---

      // showDetailsText? toggles the `details` text. Note the literal "?" in
      // the Figma property name — it must be referenced verbatim.
      details: figma.boolean("showDetailsText?", {
        true: figma.textContent("Details"),
        false: undefined,
      }),

      // selectionType has no single code prop. It is translated:
      //   value   -> pass `value`
      //   counter -> pass `counter` AND `multiple` (counter only renders when multiple)
      //   "-"     -> neither
      value: figma.enum("selectionType", {
        value: figma.textContent("Value"),
        counter: undefined,
        "-": undefined,
      }),
      counter: figma.enum("selectionType", {
        counter: figma.textContent("Count"),
        value: undefined,
        "-": undefined,
      }),
      multiple: figma.enum("selectionType", {
        counter: true,
        value: false,
        "-": false,
      }),

      // showIntentMessage? is intentionally NOT mapped: InputDropdown itself
      // renders no intent message (see index.tsx) — the message block is owned
      // by the wrapping component, so there is no prop here to map it to.
    },
    example: (props) => (
      <InputDropdown
        disabled={props.disabled}
        intent={props.intent}
        label="Dropdown Label"
        onClick={() => {}}
        state={props.state}
        sdsStyle={props.sdsStyle}
        sdsType={props.sdsType}
        multiple={props.multiple}
        value={props.value}
        counter={props.counter}
        details={props.details}
      />
    ),
  }
);
