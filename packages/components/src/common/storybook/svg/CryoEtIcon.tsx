import { SvgIcon, SvgIconProps } from "@mui/material";

/**
 * CustomSvgIcon is a component that extends the SvgIcon component from the Material-UI library.
 * It allows easy usage of custom SVG icons with in the storybook demos.
 */

function CryoEtIcon(props: SvgIconProps & { innerColor?: string }) {
  const { innerColor = "#ccc", ...rest } = props;

  return (
    <SvgIcon color="primary" viewBox="0 0 24 24" {...rest}>
      <g transform="matrix(1, 0, 0, 1, 1.153001, 0.000838)">
        <path
          d="M 10.609 0.1 C 10.961 -0.053 11.369 -0.032 11.707 0.163 L 19.195 4.489 L 19.192 4.492 L 16.741 5.901 L 11.104 2.646 L 3.824 7.003 L 9.727 9.947 C 9.05 10.402 8.638 11.164 8.638 11.985 L 8.638 12.144 L 2.503 9.082 L 2.503 16.663 L 8.638 20.028 L 8.638 22.775 C 8.638 22.791 8.639 22.809 8.639 22.827 L 0.683 18.461 C 0.291 18.246 0.047 17.834 0.047 17.386 L 0.047 7.101 C 0.047 6.671 0.275 6.274 0.643 6.052 L 10.46 0.174 L 10.609 0.1 Z"
          fill={innerColor}
        ></path>
        <path
          d="M 21.647 16.898 L 21.636 17.052 C 21.591 17.411 21.387 17.736 21.076 17.933 L 11.747 23.811 C 11.37 24.049 10.891 24.062 10.499 23.846 C 10.109 23.631 9.866 23.22 9.866 22.775 L 9.866 11.985 C 9.866 11.548 10.099 11.144 10.478 10.924 L 19.807 5.552 C 20.187 5.332 20.653 5.332 21.033 5.552 C 21.414 5.77 21.647 6.175 21.647 6.61 L 21.647 16.898 Z M 12.321 12.691 L 12.321 20.553 L 19.192 16.222 L 19.192 8.732 L 12.321 12.691 Z"
          fill="#8F5AFF"
        ></path>
      </g>
    </SvgIcon>
  );
}

export default CryoEtIcon;
