import { Accordion, AccordionProps } from "@czifui/sci-components";
import React from "react";

const AccordionNameSpaceTest = (props: AccordionProps) => {
  return (
    <Accordion {...props} useDivider togglePosition="right" id="accordion-id" />
  );
};
