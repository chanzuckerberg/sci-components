import { Args } from "@storybook/react";
import RawButtonIcon from "src/core/ButtonIcon";
import Callout from "src/core/Callout";
import Icon from "src/core/Icon";

export const ButtonIcon = (props: Args): JSX.Element => {
  const { icon, ...rest } = props;

  return (
    <>
      <Callout
        intent="negative"
        title="Deprecated!"
        sdsStyle="persistent"
        icon={<Icon sdsIcon="ExclamationMarkCircle" sdsSize="l" />}
        body={
          <>
            The <strong>ButtnoIcon</strong> component is deprecated!
            <br />
            Please use <strong>Button</strong> component with{" "}
            <strong>Icon</strong> style instead.
          </>
        }
      >
        The <strong>Alert</strong> component is deprecated!
      </Callout>
      <RawButtonIcon icon={icon} sdsSize="medium" sdsType="primary" {...rest} />
    </>
  );
};
