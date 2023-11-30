import { FC, ForwardedRef, forwardRef } from "react";
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
  shade?: 100 | 200 | 300 | 400 | 500 | 600;
}

export type IconProps<IconName extends keyof IconNameToSizes> =
  IconExtraProps<IconName> & SdsIconWithColor;

/**
 * @see https://mui.com/material-ui/icons/#icons
 */
const Icon = forwardRef(function Icon<IconName extends keyof IconNameToSizes>(
  {
    className,
    color,
    shade,
    icon: icon,
    sdsSize,
    sdsType,
  }: IconProps<IconName>,
  ref: ForwardedRef<HTMLDivElement | null>
): JSX.Element | null {
  const iconItem = (): FC<CustomSVGProps> => {
    if (typeof icon !== "string") return icon;
    if (sdsSize === "xs" || sdsSize === "s")
      return iconMap[icon].smallIcon as FC<CustomSVGProps>;
    return iconMap[icon].largeIcon as FC<CustomSVGProps>;
  };

  if (sdsSize === "xs" || sdsSize === "s") {
    return (
      <StyledIcon ref={ref}>
        <StyledSvgIcon
          iconColor={color}
          shade={shade}
          className={className}
          fillcontrast="white"
          viewBox="0 0 14 14"
          component={iconItem()}
          sdsSize={sdsSize}
          sdsType={sdsType}
          icon={icon}
        />
      </StyledIcon>
    );
  }
  if (sdsSize === "l" || sdsSize === "xl") {
    return (
      <StyledIcon ref={ref}>
        <StyledSvgIcon
          iconColor={color}
          shade={shade}
          className={className}
          fillcontrast="white"
          viewBox="0 0 22 22"
          component={iconItem()}
          sdsSize={sdsSize}
          sdsType={sdsType}
          icon={icon}
        />
      </StyledIcon>
    );
  }

  // eslint-disable-next-line no-console
  console.error(
    `Error: Icon ${icon} not found for size ${sdsSize}. This is a @czi-sds/components problem.`
  );

  return null;
});

export default Icon;
