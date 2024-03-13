import { Args } from "@storybook/react";
import Callout from "src/core/Callout";
import CalloutTitle from "src/core/Callout/components/CalloutTitle";
import RawTag from "src/core/Tag";

export const Tag = (props: Args): JSX.Element => {
  const { label, sdsSize, icon } = props;

  if (sdsSize === "l" && !icon) {
    return (
      <Callout intent="negative">
        <CalloutTitle>Invalid Props!</CalloutTitle>
        <p>
          The large-size tag must include an icon. Please choose an icon from
          the controls section or switch the Tag size to small.
        </p>
      </Callout>
    );
  }

  return <RawTag label={label} {...props} sdsSize={sdsSize} icon={icon} />;
};
