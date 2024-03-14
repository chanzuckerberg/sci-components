import React, { ForwardedRef, forwardRef, useState } from "react";
import { ButtonIconSizeToTypes } from "src/core/ButtonIcon";
import Icon, { IconNameToSizes, IconProps } from "src/core/Icon";
import {
  BannerExtraProps,
  Centered,
  IconWrapper,
  StyledBanner,
  StyledButtonIcon,
} from "./style";

export interface BannerProps<ButtonIconSize extends keyof ButtonIconSizeToTypes>
  extends BannerExtraProps<ButtonIconSize> {
  children: React.ReactNode;
  icon?: keyof IconNameToSizes | React.ReactElement<CustomSVGProps>;
  sdsIconProps?: Partial<IconProps<keyof IconNameToSizes>>;
  dismissed?: boolean;
  dismissible?: boolean;
  onClose?: (e: React.MouseEvent) => void;
}

const Banner = forwardRef(function Banner<
  ButtonIconSize extends keyof ButtonIconSizeToTypes,
>(
  props: BannerProps<ButtonIconSize>,
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
        return (
          <Icon sdsIcon={icon} sdsSize="l" sdsType="static" {...sdsIconProps} />
        );
      }
    } else {
      return (
        <Icon
          sdsIcon="InfoCircle"
          sdsSize="l"
          sdsType="static"
          {...sdsIconProps}
        />
      );
    }
  };

  return (
    <StyledBanner role="banner" sdsType={sdsType} ref={ref} {...rest}>
      <Centered>
        <IconWrapper>{iconItem()}</IconWrapper>
        {children}
      </Centered>
      {dismissible && (
        <StyledButtonIcon
          aria-label="Close"
          bannerType={sdsType}
          sdsType="tertiary"
          sdsSize="small"
          onClick={handleClose}
          icon="XMark"
        />
      )}
    </StyledBanner>
  );
});

export default Banner;
