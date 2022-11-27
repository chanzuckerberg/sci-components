import { AccordionProps as RawAccordionProps } from "@mui/material";
import React from "react";
import { AccordionExtraProps, StyledAccordion } from "./style";

export type AccordionProps = RawAccordionProps & AccordionExtraProps;

/**
 * @see https://v4.mui.com/components/accordion/
 */
const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  (props, ref) => {
    const { children, useDivider, togglePosition = "right", id } = props;
    const [expanded, setExpanded] = React.useState<string | false>(false);

    const handleChange =
      (panel: string) =>
      (_event: React.ChangeEvent<unknown>, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
      };
    return (
      <StyledAccordion
        square
        useDivider={useDivider}
        togglePosition={togglePosition}
        expanded={expanded === id}
        onChange={handleChange(id)}
        ref={ref}
        {...props}
      >
        {children}
      </StyledAccordion>
    );
  }
);

export default Accordion;
