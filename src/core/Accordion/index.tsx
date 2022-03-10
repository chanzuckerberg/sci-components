import React from "react";
import AccordionDetails from "./components/AccordionDetails";
import AccordionHeader from "./components/AccordionHeader";
import { StyledAccordion } from "./style";

const Accordion = (props) => {
  const { id } = props;
  return (
    <StyledAccordion>
      <AccordionHeader id={id}>Accordion 1</AccordionHeader>
      <AccordionDetails>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
        malesuada lacus ex, sit amet blandit leo lobortis eget.
      </AccordionDetails>
    </StyledAccordion>
  );
};

export default Accordion;
