import { Args } from "@storybook/react-vite";
import { StyledBackgroundAppearanceWrapper } from "@components/src/core/Button/style";
import RawButtonToggle from "@components/src/core/ButtonToggle";

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
