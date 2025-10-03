import { Args } from "@storybook/react-webpack5";
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
        icon={<Icon sdsIcon="ExclamationMarkCircle" sdsSize="s" />}
        body={
          <>
            The <strong>ButtnoIcon</strong> component is deprecated!
            <br />
            Please use <strong>Button</strong> component with{" "}
            <strong>Icon</strong> style instead.
          </>
        }
      />
      <RawButtonIcon icon={icon} sdsSize="medium" sdsType="primary" {...rest} />
    </>
  );
};
