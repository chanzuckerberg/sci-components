import React, {
  Children,
  cloneElement,
  ForwardedRef,
  isValidElement,
  ReactElement,
  ReactNode,
} from "react";
import { StyledButtonGroup } from "./style";
import { ButtonGroupProps } from "./ButtonGroup.types";
import { isIconOnlyChild } from "src/core/ButtonV2/style";
import {
  SDSWarningTypes,
  showWarningIfFirstOccurence,
} from "src/common/warnings";
import ButtonV2 from "src/core/ButtonV2";

export type { ButtonGroupProps };

/**
 * Check if a button element is icon-only (has no text content, only an icon).
 * A button is icon-only if:
 * - It has no children, OR
 * - Its only child is an Icon component
 */
const isIconOnlyButton = (buttonElement: ReactNode): boolean => {
  if (!isValidElement(buttonElement)) return false;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const buttonProps = buttonElement.props as any;

  // If button has startIcon or endIcon props with children text, it's not icon-only
  const hasIconProps = buttonProps?.startIcon || buttonProps?.endIcon;
  const hasChildren = buttonProps?.children !== undefined;

  // If it has icon props but also has children, it's not icon-only (has both icon and text)
  if (hasIconProps && hasChildren) {
    return false;
  }

  // If it has children, check if the children is only an icon
  // If no children but has icon props, it's icon-only
  // Otherwise, it's not icon-only
  return hasChildren ? isIconOnlyChild(buttonProps.children) : hasIconProps;
};

/**
 * Check if all buttons in the group are icon-only.
 */
const areAllButtonsIconOnly = (children: ReactNode): boolean => {
  const childArray = Children.toArray(children);

  // If no children, return false
  if (childArray.length === 0) return false;

  // Check each child button
  return childArray.every((child) => isIconOnlyButton(child));
};

/**
 * Check if a React element is a ButtonV2 component.
 */
const isButtonV2 = (element: ReactElement): boolean => {
  return element.type === ButtonV2;
};

/**
 * Clone children and inject the size prop to ButtonV2 components.
 */
const cloneChildrenWithSize = (
  children: ReactNode,
  size: "small" | "medium" | "large"
): ReactNode => {
  return Children.map(children, (child) => {
    if (isValidElement(child) && isButtonV2(child)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return cloneElement(child as ReactElement<any>, { size });
    }
    return child;
  });
};

/**
 * ButtonGroup - A group of buttons that can be used to toggle between options.
 *
 * Built on top of MUI ButtonGroup component.
 * @see https://mui.com/material-ui/react-button-group/
 *
 * Note: Vertical orientation is only available when all buttons are icon-only.
 */
const ButtonGroup = React.forwardRef(
  (
    props: ButtonGroupProps,
    ref: ForwardedRef<HTMLDivElement>
  ): JSX.Element | null => {
    const {
      sdsType = "primary",
      size = "medium",
      orientation = "horizontal",
      children,
      ...rest
    } = props;

    // Vertical orientation is only allowed when all buttons are icon-only
    const allIconOnly = areAllButtonsIconOnly(children);
    const effectiveOrientation = allIconOnly ? orientation : "horizontal";

    // Show warning if user requested vertical but it's not allowed
    if (orientation === "vertical" && !allIconOnly) {
      showWarningIfFirstOccurence(
        SDSWarningTypes.ButtonGroupVerticalOrientation
      );
    }

    // Clone children and inject size prop to ButtonV2 components
    const childrenWithSize = cloneChildrenWithSize(children, size);

    return (
      <StyledButtonGroup
        variant="outlined"
        sdsType={sdsType}
        size={size}
        orientation={effectiveOrientation}
        ref={ref}
        {...rest}
      >
        {childrenWithSize}
      </StyledButtonGroup>
    );
  }
);

export default ButtonGroup;
