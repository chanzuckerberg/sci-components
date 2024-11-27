import { AccordionSummaryProps as RawAccordionSummaryProps } from "@mui/material";
import { StyledAccordionHeader, StyledSubtitle } from "./style";
import Icon from "src/core/Icon";

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
      expandIcon={<Icon sdsIcon="ChevronDown" sdsSize="xs" />}
    >
      {children}
      {subtitle && <StyledSubtitle>{subtitle}</StyledSubtitle>}
    </StyledAccordionHeader>
  );
};

export default AccordionHeader;
