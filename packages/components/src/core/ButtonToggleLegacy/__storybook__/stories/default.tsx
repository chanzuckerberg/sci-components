import { Args } from "@storybook/react-webpack5";
import RawButtonToggleLegacy from "src/core/ButtonToggleLegacy";
import Callout from "src/core/Callout";
import Icon from "src/core/Icon";

export const ButtonToggleLegacy = (props: Args): JSX.Element => {
  const { icon } = props;

  return (
    <>
      <Callout
        intent="negative"
        title="Deprecated!"
        sdsStyle="persistent"
        icon={<Icon sdsIcon="ExclamationMarkCircle" sdsSize="s" />}
        body={
          <>
            The <strong>ButtonToggleLegacy</strong> component is deprecated!
            <br />
            Please use <strong>ButtonToggle</strong> component instead.
          </>
        }
      />
      <RawButtonToggleLegacy
        aria-label="button-toggle"
        icon={icon}
        {...props}
      />
    </>
  );
};
