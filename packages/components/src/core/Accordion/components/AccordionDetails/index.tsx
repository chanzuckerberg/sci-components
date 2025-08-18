import { AccordionDetailsProps as RawAccordionDetailsProps } from "@mui/material";
import { StyledAccordionDetails } from "./style";

export interface SdsAccordionDetailsProps {
  id?: string;
}

export type AccordionDetailsProps = RawAccordionDetailsProps &
  SdsAccordionDetailsProps;

const AccordionDetails = (props: AccordionDetailsProps) => {
  const { children, id, ...rest } = props;
  return (
    <StyledAccordionDetails id={id} {...rest}>
      {children}
    </StyledAccordionDetails>
  );
};

export default AccordionDetails;
