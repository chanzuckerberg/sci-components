import React, { ForwardedRef, forwardRef } from "react";
import { iconMap, IconNameToSizes } from "./map";
import { IconExtraProps, StyledIcon, StyledSvgIcon } from "./style";

export type { IconNameToSizes };

export type IconProps<IconName extends keyof IconNameToSizes> =
  IconExtraProps<IconName>;

/**
 * @see https://mui.com/material-ui/icons/#icons
 */
const Icon = forwardRef(function Icon<IconName extends keyof IconNameToSizes>(
  { className, sdsIcon, sdsSize, sdsType }: IconProps<IconName>,
  ref: ForwardedRef<HTMLDivElement | null>
): JSX.Element | null {
  const icon = iconMap[sdsIcon] ?? {};
  const { largeIcon, smallIcon } = icon;

  if ((sdsSize === "xs" || sdsSize === "s") && smallIcon) {
    return (
      <StyledIcon ref={ref}>
        <StyledSvgIcon
          className={className}
          fillcontrast="white"
          viewBox="0 0 14 14"
          component={smallIcon}
          sdsSize={sdsSize}
          sdsType={sdsType}
          sdsIcon={sdsIcon}
        />
      </StyledIcon>
    );
  }
  if ((sdsSize === "l" || sdsSize === "xl") && largeIcon) {
    return (
      <StyledIcon ref={ref}>
        <StyledSvgIcon
          className={className}
          fillcontrast="white"
          viewBox="0 0 32 32"
          component={largeIcon}
          sdsSize={sdsSize}
          sdsType={sdsType}
          sdsIcon={sdsIcon}
        />
      </StyledIcon>
    );
  }

  // eslint-disable-next-line no-console
  console.error(
    `Error: Icon ${sdsIcon} not found for size ${sdsSize}. This is a czifui problem.`
  );

  return null;
});

export default Icon;
