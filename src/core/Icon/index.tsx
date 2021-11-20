import { SvgIcon } from "@material-ui/core";
import React from "react";
import { iconMap, IconSizes } from "./map";
import { StyledIcon } from "./style";

interface Props {
  sdsIcon: keyof typeof iconMap;
  sdsSize: IconSizes;
}

const SMALL_ICON_SIZES = [IconSizes.EXTRA_SMALL, IconSizes.SMALL];
const LARGE_ICON_SIZES = [IconSizes.LARGE, IconSizes.EXTRA_LARGE];

const Icon = ({ sdsIcon, sdsSize }: Props): JSX.Element => {
  const icon = iconMap[sdsIcon] ?? {};
  const { availableSizes, largeIcon, smallIcon } = icon;

  if (!availableSizes?.includes(sdsSize)) {
    console.error(
      `Error: Icon ${sdsIcon} not available in size ${sdsSize}.
      Please choose from available sizes for this icon: ${availableSizes?.join(
        ", "
      )}.`
    );
    return null;
  }

  if (SMALL_ICON_SIZES.includes(sdsSize) && smallIcon) {
    return (
      <StyledIcon sdsSize={sdsSize}>
        <SvgIcon
          fillcontrast="white"
          viewBox="0 0 14 14"
          component={smallIcon}
        />
      </StyledIcon>
    );
  }

  if (LARGE_ICON_SIZES.includes(sdsSize) && largeIcon) {
    return (
      <StyledIcon sdsSize={sdsSize}>
        <SvgIcon
          fillcontrast="white"
          viewBox="0 0 32 32"
          component={largeIcon}
        />
      </StyledIcon>
    );
  }

  console.error(
    `Error: Icon ${sdsIcon} not found for size ${sdsSize}. This is a czifui problem.`
  );

  return null;
};

export default Icon;
