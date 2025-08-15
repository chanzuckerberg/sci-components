import { AccordionSummaryProps as RawAccordionSummaryProps } from "@mui/material";
import { StyledAccordionHeader, StyledSubtitle } from "./style";
import Icon from "src/core/Icon";

export interface SdsAccordionHeaderProps {
  subtitle?: string;
  chevronSize?: "xs" | "s";
  id: string;
}

export type AccordionHeaderProps = RawAccordionSummaryProps &
  SdsAccordionHeaderProps;

const AccordionHeader = (props: AccordionHeaderProps) => {
  const { id, children, subtitle, chevronSize = "xs", ...rest } = props;

  return (
    <StyledAccordionHeader
      chevronSize={chevronSize}
      expandIcon={<Icon sdsIcon="ChevronDown" sdsSize={chevronSize} />}
      id={`${id}-header`}
      aria-controls={`${id}-content`}
      {...rest}
    >
      {children}
      {subtitle && <StyledSubtitle>{subtitle}</StyledSubtitle>}
    </StyledAccordionHeader>
  );
};

export default AccordionHeader;
