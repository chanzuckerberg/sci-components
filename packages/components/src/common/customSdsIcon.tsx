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
}) {
  const {
    sdsIcon = "bacteria",
    sdsSize = "l",
    sdsType = "static",
    color = "primary",
    ...rest
  } = props;
  return (
    <Icon
      sdsIcon={sdsIcon}
      sdsSize={sdsSize}
      sdsType={sdsType}
      color={color}
      {...rest}
    />
  );
}

export default CustomSdsIcon;
