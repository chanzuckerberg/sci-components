import { AccordionProps as RawAccordionProps } from "@mui/material";
import React from "react";
import { AccordionExtraProps, StyledAccordion } from "./style";

export type AccordionProps = RawAccordionProps & AccordionExtraProps;

/**
 * @see https://v4.mui.com/components/accordion/
 */
const Accordion = (props: AccordionProps) => {
  const { children, useDivider, togglePosition = "right", id } = props;
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) =>
    (_event: React.ChangeEvent<unknown>, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
  return (
    <StyledAccordion
      id={id}
      square
      useDivider={useDivider}
      togglePosition={togglePosition}
      expanded={expanded === id}
      onChange={handleChange(id)}
      data-testid="accordion"
    >
      {children}
    </StyledAccordion>
  );
};

export default Accordion;
