import {
  CheckCircleIcon,
  InfoIcon,
  WarningCircleIcon,
  XIcon,
} from "@phosphor-icons/react";
import React, { ForwardedRef, forwardRef, useState } from "react";
import { INTERNAL_ICON_PROPS } from "@components/src/common/utils";
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
  /**
   * An icon element, usually a Phosphor or `@czi-sds/icons` icon, shown in
   * place of the icon the intent would pick. The Banner draws it at its own
   * size and color.
   */
  icon?: React.ReactElement;
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
    if (icon) return icon;

    switch (intent) {
      case "positive":
        return <CheckCircleIcon {...INTERNAL_ICON_PROPS} size={16} />;
      case "negative":
      case "notice":
        return <WarningCircleIcon {...INTERNAL_ICON_PROPS} size={16} />;
      case "info":
      default:
        return <InfoIcon {...INTERNAL_ICON_PROPS} size={16} />;
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
          sdsType="secondary"
          size="large"
          sdsStyle="minimal"
          backgroundOnHover={false}
          onClick={handleClose}
        >
          <XIcon {...INTERNAL_ICON_PROPS} size={16} />
        </StyledButton>
      )}
    </StyledBanner>
  );
});

export default Banner;
