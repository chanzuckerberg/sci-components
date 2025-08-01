import { AccordionSummaryProps as RawAccordionSummaryProps } from "@mui/material";
import { StyledAccordionHeader, StyledSubtitle } from "./style";
import Icon from "src/core/Icon";

export interface SdsAccordionHeaderProps {
  subtitle?: string;
}

export type AccordionHeaderProps = RawAccordionSummaryProps &
  SdsAccordionHeaderProps;

const AccordionHeader = (props: AccordionHeaderProps) => {
  const { children, subtitle } = props;

  return (
    <StyledAccordionHeader
      expandIcon={<Icon sdsIcon="ChevronDown" sdsSize="xs" />}
    >
      {children}
      {subtitle && <StyledSubtitle>{subtitle}</StyledSubtitle>}
    </StyledAccordionHeader>
  );
};

export default AccordionHeader;
