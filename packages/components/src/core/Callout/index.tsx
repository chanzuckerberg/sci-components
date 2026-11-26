import { AlertProps, Grow } from "@mui/material";
import {
  CaretDownIcon,
  CaretUpIcon,
  CheckCircleIcon,
  InfoIcon,
  WarningCircleIcon,
  XIcon,
} from "@phosphor-icons/react";
import React, { useEffect, useState } from "react";
import { INTERNAL_ICON_PROPS } from "@components/src/common/utils";
import { StyledCallout } from "./style";
import CalloutTitle from "./components/CalloutTitle";
import CalloutBody from "./components/CalloutBody";
import CalloutExtraContent from "./components/CalloutExtraContent";
import Button from "../Button";

const SDS_STAGE_OPEN = "open";
const SDS_STAGE_CLOSED = "closed";

export type CalloutIntentType =
  | "accent"
  | "info"
  | "negative"
  | "notice"
  | "positive";
export type CalloutSdsStyleType = "persistent" | "expandable" | "dismissible";
export interface CalloutProps {
  autoDismiss?: boolean | number;
  dismissed?: boolean;
  /**
   * Icon displayed to the left of the Callout title, usually a Phosphor or
   * `@czi-sds/icons` icon. The Callout draws it at its own size and color.
   * Defaults to the icon for the current `intent`.
   */
  icon?: React.ReactElement;
  intent: CalloutIntentType;
  sdsStage?: typeof SDS_STAGE_CLOSED | typeof SDS_STAGE_OPEN;
  title?: string;
  hideTitle?: boolean;
  body?: React.ReactNode;
  hideBody?: boolean;
  /**
   * The same slot as `children`, for callers that would rather pass it as a
   * prop. Both render when both are given, `children` first.
   */
  extraContent?: React.ReactNode;
  sdsStyle?: CalloutSdsStyleType;
}

export type ExposedCalloutProps = Omit<AlertProps, "severity"> & CalloutProps;

/**
 * @see https://mui.com/material-ui/react-alert/
 */
const Callout = (props: ExposedCalloutProps): JSX.Element => {
  const {
    autoDismiss,
    dismissed,
    icon,
    intent,
    sdsStage = SDS_STAGE_OPEN,
    title,
    body,
    hideTitle = false,
    hideBody = false,
    sdsStyle = "persistent",
    children,
    extraContent,
    ...rest
  } = props;
  const [hide, setHide] = useState(dismissed);
  const [stage, setStage] = useState(sdsStage);

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
    if (props?.onClose) props?.onClose(event);
  };

  const getIcon = () => {
    if (icon !== undefined) return icon;

    switch (intent) {
      case "positive":
        return <CheckCircleIcon {...INTERNAL_ICON_PROPS} size={16} />;
      case "info":
        return <InfoIcon {...INTERNAL_ICON_PROPS} size={16} />;
      default:
        return <WarningCircleIcon {...INTERNAL_ICON_PROPS} size={16} />;
    }
  };

  const getAction = (collapsed: boolean) => {
    if (sdsStyle === "expandable") {
      return (
        <Button
          aria-label={collapsed ? "open" : "close"}
          onClick={() => {
            setStage(collapsed ? SDS_STAGE_OPEN : SDS_STAGE_CLOSED);
          }}
          size="large"
          sdsType="secondary"
          sdsStyle="minimal"
          backgroundOnHover={false}
        >
          {collapsed ? (
            <CaretDownIcon {...INTERNAL_ICON_PROPS} size={16} />
          ) : (
            <CaretUpIcon {...INTERNAL_ICON_PROPS} size={16} />
          )}
        </Button>
      );
    } else if (sdsStyle === "dismissible") {
      return (
        <Button
          aria-label="Dismiss"
          onClick={handleClose}
          sdsType="secondary"
          sdsStyle="minimal"
          size="large"
          backgroundOnHover={false}
        >
          <XIcon {...INTERNAL_ICON_PROPS} size={16} />
        </Button>
      );
    }

    return null;
  };

  const collapsed =
    (sdsStyle === "expandable" && stage === SDS_STAGE_CLOSED) || false;

  return (
    <Grow in={!hide}>
      <StyledCallout
        onClose={handleClose}
        action={getAction(collapsed)}
        icon={getIcon()}
        intent={intent}
        collapsed={collapsed || false}
        sdsStyle={sdsStyle}
        hideBody={hideBody}
        {...rest}
      >
        {!hideTitle && <CalloutTitle>{title}</CalloutTitle>}
        {!hideBody && <CalloutBody hideTitle={hideTitle}>{body}</CalloutBody>}
        {sdsStyle === "expandable" && !collapsed && (
          <CalloutExtraContent hideTitle={hideTitle} hideBody={hideBody}>
            {children}
            {extraContent}
          </CalloutExtraContent>
        )}
      </StyledCallout>
    </Grow>
  );
};

export default Callout;
