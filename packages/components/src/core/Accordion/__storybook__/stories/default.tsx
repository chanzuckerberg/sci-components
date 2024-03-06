import { Args } from "@storybook/react";
import RawAccordion, {
  AccordionDetails,
  AccordionHeader,
} from "src/core/Accordion";
import { EXTRA_SHORT_LOREM_IPSUM } from "src/common/storybook/loremIpsum";

export const Accordion = (props: Args): JSX.Element => {
  const { id, subtitle, useDivider, togglePosition } = props;
  return (
    <RawAccordion
      id={id}
      useDivider={useDivider}
      togglePosition={togglePosition}
      {...props}
    >
      <AccordionHeader id={`${id}-header`} subtitle={subtitle}>
        Accordion Header
      </AccordionHeader>
      <AccordionDetails>{EXTRA_SHORT_LOREM_IPSUM}</AccordionDetails>
    </RawAccordion>
  );
};
