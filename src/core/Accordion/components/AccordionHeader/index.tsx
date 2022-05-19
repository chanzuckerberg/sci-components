import { AccordionSummaryProps as RawAccordionSummaryProps } from "@material-ui/core";
import React from "react";
import Icon from "src/core/Icon";
import { StyledAccordionHeader, StyledSubtitle } from "./style";

export interface SdsAccordionHeaderProps {
  subtitle?: string;
}

export type AccordionHeaderProps = RawAccordionSummaryProps &
  SdsAccordionHeaderProps;

const AccordionHeader = (props: AccordionHeaderProps) => {
  const { children, id, subtitle } = props;
  return (
    <StyledAccordionHeader
      aria-controls={`${id}-panel-content`}
      id={id}
      expandIcon={<Icon sdsIcon="chevronDown" sdsSize="s" sdsType="static" />}
    >
      {children}
      {subtitle && <StyledSubtitle>{subtitle}</StyledSubtitle>}
    </StyledAccordionHeader>
  );
};

export default AccordionHeader;
