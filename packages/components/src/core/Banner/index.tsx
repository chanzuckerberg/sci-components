import React, { ForwardedRef, forwardRef, useState } from "react";
import Icon, { IconNameToSizes, IconProps } from "src/core/Icon";
import {
  BannerExtraProps,
  Centered,
  IconWrapper,
  StyledBanner,
  StyledButton,
} from "./style";

export type BannerIntentType =
  | "accent"
  | "info"
  | "negative"
  | "notice"
  | "positive";

export interface BannerProps extends BannerExtraProps {
  children: React.ReactNode;
  icon?: keyof IconNameToSizes | React.ReactElement<CustomSVGProps>;
  sdsIconProps?: Partial<IconProps<keyof IconNameToSizes>>;
  dismissed?: boolean;
  dismissible?: boolean;
  onClose?: (e: React.MouseEvent) => void;
  intent?: BannerIntentType;
}

const Banner = forwardRef(function Banner(
  props: BannerProps,
  ref: ForwardedRef<HTMLDivElement | null>
): JSX.Element | null {
  const {
    children,
    dismissed,
    dismissible = true,
    onClose,
    sdsType,
    icon,
    sdsIconProps,
    intent = "info",
    ...rest
  } = props;

  const [wasDismissed, setWasDismissed] = useState<boolean>(false);

  if (dismissed || wasDismissed) return null;

  const handleClose = (e: React.MouseEvent) => {
    if (dismissed === undefined) {
      // let the component be uncontrolled
      setWasDismissed(true);
    }
    if (onClose) onClose(e);
  };

  const iconItem = () => {
    if (icon) {
      if (typeof icon !== "string") {
        return icon;
      } else {
        return <Icon sdsIcon={icon} sdsSize="s" {...sdsIconProps} />;
      }
    } else {
      switch (intent) {
        case "positive":
          return <Icon sdsIcon="CheckCircle" sdsSize="s" {...sdsIconProps} />;
        case "negative":
        case "notice":
          return (
            <Icon
              sdsIcon="ExclamationMarkCircle"
              sdsSize="s"
              {...sdsIconProps}
            />
          );
        case "info":
        default:
          return <Icon sdsIcon="InfoCircle" sdsSize="s" {...sdsIconProps} />;
      }
    }
  };

  return (
    <StyledBanner
      role="banner"
      sdsType={sdsType}
      intent={intent}
      ref={ref}
      {...rest}
    >
      <Centered>
        <IconWrapper bannerType={sdsType} intent={intent}>
          {iconItem()}
        </IconWrapper>
        {children}
      </Centered>
      {dismissible && (
        <StyledButton
          aria-label="Close"
          bannerType={sdsType}
          sdsType="tertiary"
          sdsSize="small"
          sdsStyle="icon"
          onClick={handleClose}
          icon="XMark"
        />
      )}
    </StyledBanner>
  );
});

export default Banner;
