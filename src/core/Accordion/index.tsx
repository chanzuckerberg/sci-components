import { AccordionProps as RawAccordionProps } from "@material-ui/core";
import React from "react";
import { ExtraProps, StyledAccordion } from "./style";

export type AccordionProps = RawAccordionProps & ExtraProps;

const Accordion = (props: AccordionProps) => {
  const { children, useDivider } = props;
  return (
    <StyledAccordion square useDivider={useDivider}>
      {children}
    </StyledAccordion>
  );
};

export default Accordion;
