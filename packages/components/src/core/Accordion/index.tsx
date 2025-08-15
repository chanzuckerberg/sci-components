import { AccordionProps as RawAccordionProps } from "@mui/material";
import React from "react";
import AccordionDetails from "./components/AccordionDetails";
import AccordionHeader from "./components/AccordionHeader";
import { AccordionExtraProps, StyledAccordion } from "./style";

export { AccordionDetails, AccordionHeader };

export type AccordionProps = RawAccordionProps &
  AccordionExtraProps & {
    id: string;
  };

/**
 * @see https://mui.com/material-ui/react-accordion/
 */
const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  (props, ref) => {
    const {
      id,
      children,
      useDivider,
      togglePosition = "right",
      defaultExpanded = false,
      ...rest
    } = props;

    const [expanded, setExpanded] = React.useState<string | false>(
      defaultExpanded ? id : false
    );

    const handleChange =
      (panel: string) =>
      (_event: React.ChangeEvent<unknown>, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
      };

    // Clone children and add props based on component type
    const enhancedChildren =
      React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          // Check if child is AccordionHeader
          if (child.type === AccordionHeader) {
            return React.cloneElement(child, {
              ...child.props,
              "aria-controls": `${id}-content`,
              id: `${id}-header`,
            });
          }
          // Check if child is AccordionDetails
          if (child.type === AccordionDetails) {
            return React.cloneElement(child, {
              ...child.props,
              id: `${id}-content`,
            });
          }
        }
        return child;
      }) || children;

    return (
      <StyledAccordion
        square
        useDivider={useDivider}
        togglePosition={togglePosition}
        ref={ref}
        expanded={expanded === id}
        onChange={handleChange(id)}
        {...rest}
      >
        {enhancedChildren}
      </StyledAccordion>
    );
  }
);

export default Accordion;
