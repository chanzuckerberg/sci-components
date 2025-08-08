import { AccordionSummaryProps as RawAccordionSummaryProps } from "@mui/material";
import { StyledAccordionHeader, StyledSubtitle } from "./style";
import Icon from "src/core/Icon";

export interface SdsAccordionHeaderProps {
  subtitle?: string;
  chevronSize?: "xs" | "s";
}

export type AccordionHeaderProps = RawAccordionSummaryProps &
  SdsAccordionHeaderProps;

const AccordionHeader = (props: AccordionHeaderProps) => {
  const { children, subtitle, chevronSize = "xs" } = props;

  return (
    <StyledAccordionHeader
      chevronSize={chevronSize}
      expandIcon={<Icon sdsIcon="ChevronDown" sdsSize={chevronSize} />}
    >
      {children}
      {subtitle && <StyledSubtitle>{subtitle}</StyledSubtitle>}
    </StyledAccordionHeader>
  );
};

export default AccordionHeader;
