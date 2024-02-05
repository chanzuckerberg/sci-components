import { SvgIcon, SvgIconProps } from "@mui/material";

/**
 * CustomSvgIcon is a component that extends the SvgIcon component from the Material-UI library.
 * It allows easy usage of custom SVG icons with in the storybook demos.
 */
function CustomSvgIcon(props: SvgIconProps) {
  return (
    <SvgIcon color="primary" viewBox="2 2 20 20" {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

export default CustomSvgIcon;
