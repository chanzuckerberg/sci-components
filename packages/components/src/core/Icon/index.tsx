import { ForwardedRef, forwardRef } from "react";
import { IconNameToSizes, iconMap } from "./map";
import {
  IconExtraProps,
  SdsIconColorType,
  StyledIcon,
  StyledSvgIcon,
} from "./style";

export type { IconNameToSizes };

export interface SdsIconWithColor {
  color?: SdsIconColorType;
  shade?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800;
}

export type IconProps<IconName extends keyof IconNameToSizes> =
  IconExtraProps<IconName> & SdsIconWithColor;

/**
 * @see https://mui.com/material-ui/icons/#icons
 */
const Icon = forwardRef(function Icon<IconName extends keyof IconNameToSizes>(
  { className, color, shade, sdsIcon, sdsSize }: IconProps<IconName>,
  ref: ForwardedRef<HTMLDivElement | null>
): JSX.Element | null {
  const icon = iconMap[sdsIcon] ?? {};
  const { largeIcon, smallIcon } = icon;

  if ((sdsSize === "xxs" || sdsSize === "xs" || sdsSize === "s") && smallIcon) {
    return (
      <StyledIcon ref={ref}>
        <StyledSvgIcon
          iconColor={color}
          shade={shade}
          className={className}
          fillcontrast="white"
          viewBox="0 0 16 16"
          width={16}
          height={16}
          component={smallIcon}
          sdsSize={sdsSize}
          sdsIcon={sdsIcon}
        />
      </StyledIcon>
    );
  }
  if ((sdsSize === "l" || sdsSize === "xl") && largeIcon) {
    return (
      <StyledIcon ref={ref}>
        <StyledSvgIcon
          iconColor={color}
          shade={shade}
          className={className}
          fillcontrast="white"
          viewBox="0 0 24 24"
          width={24}
          height={24}
          component={largeIcon}
          sdsSize={sdsSize}
          sdsIcon={sdsIcon}
        />
      </StyledIcon>
    );
  }

  // eslint-disable-next-line no-console
  console.error(
    `Error: Icon ${sdsIcon} not found for size ${sdsSize}. This is a @czi-sds/components problem.`
  );

  return null;
});

export default Icon;
