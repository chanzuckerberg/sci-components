import React, { forwardRef, ReactElement, ReactNode } from "react";
import { StyledCardActions } from "./style";
import ButtonV2, { ButtonV2Props } from "src/core/ButtonV2";
import {
  SDSWarningTypes,
  showWarningIfFirstOccurence,
} from "src/common/warnings";
import { ContentCardProps } from "../..";
import { EMPTY_OBJECT, cn } from "src/common/utils";

export interface ContentCardActionsProps {
  buttonsPosition?: "left" | "right";
  clickableCard?: ContentCardProps["clickableCard"];
  classes?: {
    cardActions?: string;
  };
  children:
    | React.ReactElement<ButtonV2Props>
    | Array<React.ReactElement<ButtonV2Props>>;
}

const isButtonElement = (
  child: ReactNode
): child is ReactElement<ButtonV2Props> => {
  if (React.isValidElement(child) && child.type === ButtonV2) {
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
    const {
      buttonsPosition,
      clickableCard,
      children,
      classes = EMPTY_OBJECT,
    } = props;

    const { cardActions }: ContentCardActionsProps["classes"] = classes;

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
          className={cn(cardActions)}
        >
          {[
            React.cloneElement(
              clickableCardButton as React.ReactElement<ButtonV2Props>,
              {
                component: "div",
                ...(clickableCardButton?.props as ButtonV2Props),
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
        className={cn(cardActions)}
      >
        {validChildren}
      </StyledCardActions>
    );
  }
);

export default ContentCardActions;
