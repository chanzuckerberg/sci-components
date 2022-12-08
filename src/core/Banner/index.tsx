import React, { ForwardedRef, forwardRef, useState } from "react";
import { ButtonIconSizeToTypes } from "../ButtonIcon";
import Icon from "../Icon";
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
  dismissed?: boolean;
  dismissible?: boolean;
  onClose?: (e: React.MouseEvent) => void;
}

const Banner = forwardRef(function Banner<
  ButtonIconSize extends keyof ButtonIconSizeToTypes
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

  return (
    <StyledBanner role="banner" sdsType={sdsType} ref={ref} {...rest}>
      <Centered>
        <IconWrapper>
          <Icon sdsIcon="infoCircle" sdsSize="l" sdsType="static" />
        </IconWrapper>
        {children}
      </Centered>
      {dismissible && (
        <StyledButtonIcon
          aria-label="Close"
          bannerType={sdsType}
          sdsType="tertiary"
          sdsSize="small"
          onClick={handleClose}
          sdsIcon="xMark"
        />
      )}
    </StyledBanner>
  );
});

export default Banner;
