import React from "react";
import Accordion, { AccordionHeader, AccordionDetails } from "./index";
import figma from "@figma/code-connect";

figma.connect(
  Accordion,
  "https://www.figma.com/design/zedDsBDlmkLrKBTuJ4FAz7/Science-Design-System--v2-?node-id=8339-14285",
  {
    props: {
      togglePosition: figma.enum("togglePosition", {
        left: "left",
        right: "right",
      }),
      useDivider: figma.boolean("showDivider?"),
      // Header text, read live from the "Accordion header" layer.
      headerText: figma.textContent("Accordion header"),
      // Subtitle is an AccordionHeader prop, gated by showSubtitle?; when the
      // designer hides it, it resolves to undefined and drops from the snippet.
      subtitle: figma.boolean("showSubtitle?", {
        true: figma.textContent("Optional subtitle"),
        false: undefined,
      }),
      // Body text. Only slotType=text exposes a single readable layer, so read
      // it live there; for the "content" slot (arbitrary instance swap) and the
      // closed "-" state there is no readable text node, so fall back to a
      // placeholder here in the mapping (the parser disallows || in the JSX).
      bodyText: figma.enum("slotType", {
        text: figma.textContent("Text slot (childNode)"),
        content: "Accordion content — replace with your own nodes",
        "-": "Accordion content — replace with your own nodes",
      }),
      // Intentionally removed: `disabled` — no such prop on Accordion (not in
      //   AccordionProps/AccordionExtraProps; Figma state=disabled is visual only).
      // Intentionally unmapped:
      // - sdsStage (open/closed), state (default/disabled/hover/pressed):
      //   display/authoring states with no design-authored SDS prop.
      //   defaultExpanded exists but is runtime state.
      // - slotContent instance swap: body content lives in AccordionDetails
      //   children, not an Accordion prop.
    },
    example: ({ togglePosition, useDivider, headerText, subtitle, bodyText }) => (
      <Accordion
        id="accordion-example"
        togglePosition={togglePosition}
        useDivider={useDivider}
      >
        <AccordionHeader subtitle={subtitle}>{headerText}</AccordionHeader>
        <AccordionDetails>{bodyText}</AccordionDetails>
      </Accordion>
    ),
  }
);
