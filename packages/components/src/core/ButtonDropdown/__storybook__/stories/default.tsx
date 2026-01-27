import { Args } from "@storybook/react-webpack5";
import { StyledBackgroundAppearanceWrapper } from "src/core/Button/style";
import RawButtonDropdown from "src/core/ButtonDropdown";
import Callout from "src/core/Callout";

export const InvalidSdsTypeDestructiveError = (
  <Callout
    intent="negative"
    title="Invalid Props!"
    body={
      <>
        <strong>ButtonDropdown</strong> does not support the{" "}
        <strong>destructive</strong> type. Please choose either{" "}
        <strong>primary</strong> or <strong>secondary</strong>.
      </>
    }
  />
);

export const ButtonDropdown = (props: Args): JSX.Element => {
  const { backgroundAppearance, sdsStyle, startIcon, sdsType, ...rest } = props;

  if (sdsType === "destructive") {
    return InvalidSdsTypeDestructiveError;
  }

  return (
    <StyledBackgroundAppearanceWrapper
      backgroundAppearance={props.backgroundAppearance}
    >
      <RawButtonDropdown
        backgroundAppearance={backgroundAppearance}
        startIcon={startIcon}
        sdsStyle={sdsStyle}
        sdsType={sdsType}
        {...rest}
      />
    </StyledBackgroundAppearanceWrapper>
  );
};
