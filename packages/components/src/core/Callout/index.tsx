import { AlertProps } from "@mui/lab";
import { Grow } from "@mui/material";
import React, { useEffect, useState } from "react";
import Button from "src/core/Button";
import Icon, { IconNameToSizes, IconProps } from "src/core/Icon";
import { StyledCallout } from "./style";
import CalloutTitle from "./components/CalloutTitle";
import CalloutBody from "./components/CalloutBody";
import CalloutExtraContent from "./components/CalloutExtraContent";

const SDS_STAGE_OPEN = "open";
const SDS_STAGE_CLOSED = "closed";

export type CalloutIntentType = "info" | "negative" | "notice" | "positive";
export type CalloutSdsStyleType = "persistent" | "expandable" | "dismissible";
export interface CalloutProps {
  autoDismiss?: boolean | number;
  dismissed?: boolean;
  icon?: keyof IconNameToSizes | React.ReactElement<CustomSVGProps>;
  sdsIconProps?: Partial<IconProps<keyof IconNameToSizes>>;
  intent: CalloutIntentType;
  sdsStage?: typeof SDS_STAGE_CLOSED | typeof SDS_STAGE_OPEN;
  title?: string;
  hideTitle?: boolean;
  body?: string;
  hideBody?: boolean;
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
    sdsIconProps,
    intent,
    sdsStage,
    title,
    body,
    hideTitle = false,
    hideBody = false,
    sdsStyle = "persistent",
    children,
    ...rest
  } = props;
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
    if (props?.onClose) props?.onClose(event);
  };

  const getIcon = () => {
    if (icon !== undefined) {
      if (typeof icon !== "string") {
        return icon;
      } else {
        return (
          <Icon
            sdsSize="l"
            sdsIcon={icon as keyof IconNameToSizes}
            {...sdsIconProps}
          />
        );
      }
    } else {
      switch (intent) {
        case "positive":
          return <Icon sdsSize="l" sdsIcon="CheckCircle" />;
        case "info":
          return <Icon sdsSize="l" sdsIcon="InfoCircle" />;
        default:
          return <Icon sdsSize="l" sdsIcon="ExclamationMarkCircle" />;
      }
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
          sdsSize="small"
          sdsType="tertiary"
          sdsStyle="icon"
          icon={collapsed ? "ChevronDown" : "ChevronUp"}
        />
      );
    } else if (sdsStyle === "dismissible") {
      return (
        <Button
          aria-label="Dismiss"
          onClick={handleClose}
          sdsSize="small"
          sdsType="tertiary"
          sdsStyle="icon"
          size="large"
          icon="XMark"
        />
      );
    }

    return null;
  };

  const collapsed =
    (sdsStyle === "expandable" && stage === SDS_STAGE_CLOSED) || false;

  return (
    <>
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
            </CalloutExtraContent>
          )}
        </StyledCallout>
      </Grow>
    </>
  );
};

export default Callout;
