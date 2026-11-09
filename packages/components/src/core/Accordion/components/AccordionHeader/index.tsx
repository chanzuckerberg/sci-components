import { AccordionSummaryProps as RawAccordionSummaryProps } from "@mui/material";
import { CaretDownIcon } from "@phosphor-icons/react";
import { INTERNAL_ICON_PROPS } from "@components/src/common/utils";
import { StyledAccordionHeader, StyledSubtitle } from "./style";

export interface SdsAccordionHeaderProps {
  subtitle?: string;
  chevronSize?: "xs" | "s";
}

export type AccordionHeaderProps = RawAccordionSummaryProps &
  SdsAccordionHeaderProps;

const AccordionHeader = (props: AccordionHeaderProps) => {
  const { children, subtitle, chevronSize = "xs", ...rest } = props;

  return (
    <StyledAccordionHeader
      chevronSize={chevronSize}
      expandIcon={
        <CaretDownIcon
          {...INTERNAL_ICON_PROPS}
          size={chevronSize === "s" ? 16 : 12}
        />
      }
      {...rest}
    >
      {children}
      {subtitle && <StyledSubtitle>{subtitle}</StyledSubtitle>}
    </StyledAccordionHeader>
  );
};

export default AccordionHeader;
