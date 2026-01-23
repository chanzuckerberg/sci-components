import { Args } from "@storybook/react-webpack5";
import RawButtonDropdown from "src/core/ButtonDropdownV2";
import Callout from "src/core/Callout";

export const InvalidSdsTypeDestructiveError = (
  <Callout
    intent="negative"
    title="Invalid Props!"
    body={
      <>
        <strong>ButtonDropdownV2</strong> does not support the{" "}
        <strong>destructive</strong> type. Please choose either{" "}
        <strong>primary</strong> or <strong>secondary</strong>.
      </>
    }
  />
);

export const ButtonDropdownV2 = (props: Args): JSX.Element => {
  const { sdsStyle, startIcon, sdsType, ...rest } = props;

  if (sdsType === "destructive") {
    return InvalidSdsTypeDestructiveError;
  }

  return (
    <RawButtonDropdown
      startIcon={startIcon}
      sdsStyle={sdsStyle}
      sdsType={sdsType}
      {...rest}
    />
  );
};
