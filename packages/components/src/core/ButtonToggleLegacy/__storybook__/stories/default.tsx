import { Args } from "@storybook/react-vite";
import RawButtonToggleLegacy from "@components/src/core/ButtonToggleLegacy";
import Callout from "@components/src/core/Callout";
import Icon from "@components/src/core/Icon";

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
