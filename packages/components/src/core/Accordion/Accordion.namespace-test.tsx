import { Accordion, AccordionProps } from "@czi-sds/components";
import React from "react";

const AccordionNameSpaceTest = (props: AccordionProps) => {
  return (
    <Accordion {...props} useDivider togglePosition="right" id="accordion-id" />
  );
};
