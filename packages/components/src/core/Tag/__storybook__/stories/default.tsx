import { Args } from "@storybook/react-vite";
import RawTag from "@components/src/core/Tag";

export const Tag = (props: Args): JSX.Element => {
  const { label } = props;

  return <RawTag label={label} {...props} />;
};
