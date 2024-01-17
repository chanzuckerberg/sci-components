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
 * @see https://mui.com/material-ui/react-alert/
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
    if (icon !== undefined) return icon; // (liaprins): Explicitly use `icon !== undefined` to fix bug; see ticket for context: https://github.com/chanzuckerberg/sci-components/issues/577

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

  const getAction = (collapsed: boolean) => {
    if (expandable) {
      return (
        <ButtonIcon
          aria-label={collapsed ? "open" : "close"}
          onClick={() => {
            setStage(collapsed ? SDS_STAGE_OPEN : SDS_STAGE_CLOSED);
          }}
          sdsSize="small"
          sdsType="tertiary"
          sdsIcon={collapsed ? "chevronDown" : "chevronUp"}
        />
      );
    }
    return onClose ? (
      <ButtonIcon
        aria-label="Dismiss"
        onClick={handleClose}
        sdsSize="small"
        sdsType="tertiary"
        size="large"
        sdsIcon="xMark"
      />
    ) : null;
  };

  const collapsed = (expandable && stage === SDS_STAGE_CLOSED) || false;

  // when there is no CalloutTitlecomponent, or there is a single child element
  // the contents of children will be used as the title
  let calloutTitle = children;
  let calloutContent;

  const firstChildIsCalloutTitle =
    Array.isArray(children) &&
    children[0]?.type?.displayName === "CalloutTitle";

  if (firstChildIsCalloutTitle) {
    [calloutTitle, ...calloutContent] = children;
  }

  return (
    <>
      <Grow in={!hide}>
        <StyledCallout
          onClose={onClose ? handleClose : undefined}
          action={getAction(collapsed)}
          icon={getIcon()}
          severity={intent}
          collapsed={collapsed || false}
          {...rest}
        >
          {calloutTitle}
          {!collapsed && calloutContent}
        </StyledCallout>
      </Grow>
    </>
  );
};

export default Callout;
