import React, { forwardRef, ReactElement, ReactNode } from "react";
import { StyledCardActions } from "./style";
import Button, { ButtonProps } from "src/core/Button";
import {
  SDSWarningTypes,
  showWarningIfFirstOccurence,
} from "src/common/warnings";
import { ContentCardProps } from "../..";

export interface ContentCardActionsProps {
  buttonsPosition?: "left" | "right";
  clickableCard?: ContentCardProps["clickableCard"];
  classes?: {
    cardActions?: string;
  };
  children:
    | React.ReactElement<ButtonProps>
    | Array<React.ReactElement<ButtonProps>>;
}

const isButtonElement = (
  child: ReactNode
): child is ReactElement<ButtonProps> => {
  if (React.isValidElement(child) && child.type === Button) {
    return true;
  } else {
    showWarningIfFirstOccurence(SDSWarningTypes.ContentCardActionsOnlyButtons);
    return false;
  }
};

/**
 * @see https://mui.com/material-ui/api/card-actions/
 */
const ContentCardActions = forwardRef<HTMLDivElement, ContentCardActionsProps>(
  function ContentCardActions(
    props: ContentCardActionsProps,
    ref
  ): JSX.Element | null {
    const { buttonsPosition, clickableCard, children, classes } = props;

    /**
     * (masoudmanson):
     * We need to ensure that only SDS buttons are used within the
     * ContentCardActions component slot. This is to prevent any potential
     * issues with using other components within the ContentCardActions component slot.
     */
    const validChildren = React.Children.toArray(
      Array.isArray(children) ? children : [children]
    ).filter(isButtonElement);

    /**
     * If the card is clickable, it acts as a `<button>` itself and cannot
     * have `<button>` elements as children. If multiple buttons are provided,
     * only the first one will be kept, and a warning will be shown.
     *
     * Any additional buttons cannot remain as `<button>` elements due to
     * DOM hierarchy constraints; they will be converted to `<a>` tags instead.
     */
    if (clickableCard) {
      if (validChildren.length > 1) {
        showWarningIfFirstOccurence(
          SDSWarningTypes.ClickableContentCardNumberOfButtons
        );
      }

      /**
       * (masoudmanson): Since a clickable card can have at most one button,
       * we select the first button from the validChildren array and ignore the rest.
       */
      const clickableCardButton = validChildren.shift();

      if (!clickableCardButton) {
        return null;
      }

      return (
        <StyledCardActions
          ref={ref}
          buttonsPosition={buttonsPosition}
          className={classes?.cardActions}
        >
          {[
            React.cloneElement(
              clickableCardButton as React.ReactElement<ButtonProps>,
              {
                component: "div",
                ...(clickableCardButton?.props as ButtonProps),
              }
            ),
          ]}
        </StyledCardActions>
      );
    }

    return (
      <StyledCardActions
        ref={ref}
        buttonsPosition={buttonsPosition}
        className={classes?.cardActions}
      >
        {validChildren}
      </StyledCardActions>
    );
  }
);

export default ContentCardActions;
