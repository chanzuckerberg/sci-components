import { SvgIcon, SvgIconProps } from "@mui/material";

/**
 * CustomSvgIcon is a component that extends the SvgIcon component from the Material-UI library.
 * It allows easy usage of custom SVG icons with in the storybook demos.
 */

function CryoEtIcon(props: SvgIconProps) {
  return (
    <SvgIcon color="primary" viewBox="0 0 24 24" {...props}>
      <path
        d="M 11.757 0.1 C 12.117 -0.052 12.532 -0.03 12.876 0.165 L 20.503 4.49 L 20.501 4.491 L 18.003 5.902 L 12.261 2.646 L 4.846 7.005 L 10.859 9.949 C 10.168 10.401 9.75 11.165 9.75 11.985 L 9.75 12.145 L 3.499 9.083 L 3.499 16.663 L 9.75 20.03 L 9.75 22.776 C 9.75 22.792 9.75 22.81 9.751 22.827 L 1.649 18.461 C 1.248 18.246 1 17.834 1 17.388 L 1 7.102 C 1 6.672 1.231 6.273 1.605 6.052 L 11.607 0.174 L 11.757 0.1 Z"
        fill="white"
        style={{ strokeWidth: 1 }}
      ></path>
      <path
        d="M 23 16.898 L 22.989 17.054 C 22.944 17.413 22.735 17.737 22.417 17.933 L 12.918 23.811 C 12.533 24.049 12.046 24.064 11.646 23.848 C 11.248 23.632 10.999 23.222 10.999 22.776 L 10.999 11.985 C 10.999 11.548 11.239 11.144 11.625 10.925 L 21.125 5.552 C 21.512 5.333 21.988 5.333 22.374 5.552 C 22.762 5.77 23 6.175 23 6.613 L 23 16.898 Z M 13.5 12.693 L 13.5 20.554 L 20.501 16.223 L 20.501 8.733 L 13.5 12.693 Z"
        fill="#8F5AFF"
        style={{ strokeWidth: 1 }}
      ></path>
    </SvgIcon>
  );
}

export default CryoEtIcon;
