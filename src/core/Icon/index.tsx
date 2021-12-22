import React from "react";
import { iconMap } from "./map";
import { ExtraProps, StyledIcon, StyledSvgIcon } from "./style";

interface Props extends ExtraProps {
  sdsIcon: keyof typeof iconMap;
}

const Icon = ({ sdsIcon, sdsSize, sdsType }: Props): JSX.Element | null => {
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

  if ((sdsSize === "xs" || sdsSize === "s") && smallIcon) {
    return (
      <StyledIcon>
        <StyledSvgIcon
          fillcontrast="white"
          viewBox="0 0 14 14"
          component={smallIcon}
          sdsSize={sdsSize}
          sdsType={sdsType}
        />
      </StyledIcon>
    );
  }
  if ((sdsSize === "l" || sdsSize === "xl") && largeIcon) {
    return (
      <StyledIcon>
        <StyledSvgIcon
          fillcontrast="white"
          viewBox="0 0 32 32"
          component={largeIcon}
          sdsSize={sdsSize}
          sdsType={sdsType}
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
