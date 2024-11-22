import Icon, { IconProps } from "../../core/Icon";

/**
 * CustomSdsIcon is an Icon component built on top of the core SDS Icon.
 * This custom component is designed for use in Storybook demos,
 * allowing easy customization.
 */
function CustomSdsIcon(props: {
  sdsIcon?: IconProps<"Bacteria">["sdsIcon"];
  sdsSize?: IconProps<"Bacteria">["sdsSize"];
  color?: IconProps<"Bacteria">["color"];
  shade?: IconProps<"Bacteria">["shade"];
}) {
  const {
    sdsIcon = "Bacteria",
    sdsSize = "l",
    color = "blue",
    shade = 400,
    ...rest
  } = props;
  return (
    <Icon
      sdsIcon={sdsIcon}
      sdsSize={sdsSize}
      color={color}
      shade={shade}
      {...rest}
    />
  );
}

export default CustomSdsIcon;
