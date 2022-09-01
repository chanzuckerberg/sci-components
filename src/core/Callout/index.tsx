import { AlertProps } from "@mui/lab";
import { Grow } from "@mui/material";
import React, { useEffect, useState } from "react";
import ButtonIcon from "../ButtonIcon";
import Icon from "../Icon";
import { StyledCallout } from "./style";

const SDS_STAGE_OPEN = "open";
const SDS_STAGE_CLOSED = "closed";
export interface CalloutProps {
  autoDismiss?: boolean | number;
  dismissed?: boolean;
  expandable?: boolean;
  icon?: React.ReactNode;
  intent: "info" | "error" | "success" | "warning";
  sdsStage?: typeof SDS_STAGE_CLOSED | typeof SDS_STAGE_OPEN;
}

export type ExposedCalloutProps = AlertProps & CalloutProps;

/**
 * @see https://v4.mui.com/components/alert/
 */
const Callout = ({
  autoDismiss,
  children,
  dismissed,
  expandable,
  onClose,
  icon,
  intent,
  sdsStage,
  ...rest
}: ExposedCalloutProps): JSX.Element => {
  const [hide, setHide] = useState(dismissed);
  const [stage, setStage] = useState(sdsStage || SDS_STAGE_CLOSED);

  useEffect(() => {
    setHide(dismissed);

    if (autoDismiss) {
      const timeout = typeof autoDismiss === "boolean" ? 8000 : autoDismiss;
      setTimeout(() => {
        setHide(true);
      }, timeout);
    }
  }, [dismissed, autoDismiss]);

  const handleClose = (event: React.SyntheticEvent<Element, Event>) => {
    setHide(true);
    if (onClose) onClose(event);
  };

  const getIcon = () => {
    if (icon) return icon;

    switch (intent) {
      case "success":
        return <Icon sdsSize="l" sdsIcon="checkCircle" sdsType="static" />;
      case "info":
        return <Icon sdsSize="l" sdsIcon="infoCircle" sdsType="static" />;
      default:
        return (
          <Icon sdsSize="l" sdsIcon="exclamationMarkCircle" sdsType="static" />
        );
    }
  };

  const getAction = () => {
    if (expandable) {
      return (
        <ButtonIcon
          onClick={() => {
            setStage(expanded ? SDS_STAGE_CLOSED : SDS_STAGE_OPEN);
          }}
          sdsSize="small"
          sdsType="tertiary"
        >
          <Icon
            sdsIcon={expanded ? "chevronUp" : "chevronDown"}
            sdsSize="s"
            sdsType="button"
          />
        </ButtonIcon>
      );
    }
    return onClose ? (
      <ButtonIcon
        onClick={handleClose}
        sdsSize="small"
        sdsType="tertiary"
        size="large"
      >
        {" "}
        <Icon sdsIcon="xMark" sdsSize="s" sdsType="iconButton" />{" "}
      </ButtonIcon>
    ) : null;
  };

  const expanded = !expandable || stage === SDS_STAGE_OPEN;

  // when there is no CalloutTitlecomponent, or there is a single child element
  // the contents of children will be used as the title
  let calloutTitle = children;
  let calloutContent;

  const firstChildIsCalloutTitle =
    Array.isArray(children) && children[0]?.type?.name === "CalloutTitle";
  if (firstChildIsCalloutTitle) {
    [calloutTitle, ...calloutContent] = children;
  }

  return (
    <>
      <Grow in={!hide}>
        <StyledCallout
          onClose={onClose ? handleClose : undefined}
          action={getAction()}
          icon={getIcon()}
          severity={intent}
          expandable={expandable || false}
          expanded={expanded}
          {...rest}
        >
          {calloutTitle}
          {expanded && calloutContent}
        </StyledCallout>
      </Grow>
    </>
  );
};

export default Callout;
