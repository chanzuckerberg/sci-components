import { Accordion, AccordionProps } from "czifui";
import React from "react";

const AccordionNameSpaceTest = (props: AccordionProps) => {
  return (
    <Accordion {...props} useDivider togglePosition="right" id="accordion-id" />
  );
};
