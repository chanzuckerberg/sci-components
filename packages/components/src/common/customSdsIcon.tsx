import Icon, { IconProps } from "../core/Icon";

/**
 * CustomSdsIcon is an Icon component built on top of the core SDS Icon.
 * This custom component is designed for use in Storybook demos,
 * allowing easy customization.
 */
function CustomSdsIcon(props: {
  sdsIcon?: IconProps<"bacteria">["sdsIcon"];
  sdsSize?: IconProps<"bacteria">["sdsSize"];
  sdsType?: IconProps<"bacteria">["sdsType"];
  color?: IconProps<"bacteria">["color"];
  shade?: IconProps<"bacteria">["shade"];
}) {
  const {
    sdsIcon = "bacteria",
    sdsSize = "l",
    sdsType = "static",
    color = "blue",
    shade = 400,
    ...rest
  } = props;
  return (
    <Icon
      sdsIcon={sdsIcon}
      sdsSize={sdsSize}
      sdsType={sdsType}
      color={color}
      shade={shade}
      {...rest}
    />
  );
}

export default CustomSdsIcon;
