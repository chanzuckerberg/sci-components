import { WarningCircleIcon } from "@phosphor-icons/react";
import { Args } from "@storybook/react-vite";
import Callout from "@components/src/core/Callout";
import RawLink from "@components/src/core/Link";

export const Link = (props: Args): JSX.Element => {
  const { sdsStyle } = props;
  return (
    <>
      <Callout
        intent="negative"
        title="Deprecated!"
        sdsStyle="persistent"
        icon={<WarningCircleIcon weight="bold" />}
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
