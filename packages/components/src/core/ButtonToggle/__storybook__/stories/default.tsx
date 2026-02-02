import { Args } from "@storybook/react-webpack5";
import { StyledBackgroundAppearanceWrapper } from "src/core/Button/style";
import RawButtonToggle from "src/core/ButtonToggle";

export const ButtonToggle = (props: Args): JSX.Element => {
  const { backgroundAppearance, startIcon } = props;

  return (
    <StyledBackgroundAppearanceWrapper
      backgroundAppearance={backgroundAppearance}
    >
      <RawButtonToggle
        aria-label="button-toggle"
        startIcon={startIcon}
        {...props}
      />
    </StyledBackgroundAppearanceWrapper>
  );
};
