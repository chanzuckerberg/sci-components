import { Args } from "@storybook/react-vite";
import RawButtonIcon from "@components/src/core/ButtonIcon";
import Callout from "@components/src/core/Callout";
import Icon from "@components/src/core/Icon";

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
            The <strong>ButtonIcon</strong> component is deprecated!
            <br />
            Please use <strong>Button</strong> component instead.
          </>
        }
      />
      <RawButtonIcon icon={icon} sdsSize="medium" sdsType="primary" {...rest} />
    </>
  );
};
