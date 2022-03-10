import { AccordionSummaryProps } from "@material-ui/core";
import React from "react";
import Icon from "src/core/Icon";
import { StyledAccordionHeader } from "./style";

const AccordionHeader = (props: AccordionSummaryProps) => {
  const { children, id } = props;
  return (
    <StyledAccordionHeader
      aria-controls={`${id}-panel-content`}
      id={id}
      expandIcon={<Icon sdsIcon="chevronDown" sdsSize="s" sdsType="static" />}
    >
      {children}
    </StyledAccordionHeader>
  );
};

export default AccordionHeader;
