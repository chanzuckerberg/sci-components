import { Args } from "@storybook/react-vite";
import Callout from "@components/src/core/Callout";
import Icon from "@components/src/core/Icon";
import RawLink from "@components/src/core/Link";

export const Link = (props: Args): JSX.Element => {
  const { sdsStyle } = props;
  return (
    <>
      <Callout
        intent="negative"
        title="Deprecated!"
        sdsStyle="persistent"
        icon={<Icon sdsIcon="ExclamationMarkCircle" sdsSize="s" />}
        body={
          <>
            The <strong>Link</strong> component is deprecated!
            <br />
            Please use <strong>Link Typography</strong> instead.
          </>
        }
      />
      <RawLink href="/" sdsStyle={sdsStyle} {...props}>
        Test Link
      </RawLink>
    </>
  );
};
