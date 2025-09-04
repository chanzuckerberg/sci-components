import { Args } from "@storybook/react-webpack5";
import RawIcon from "src/core/Icon";

export const Icon = (props: Args): JSX.Element => {
  const { sdsIcon, sdsSize, ...rest } = props;

  return <RawIcon sdsIcon={sdsIcon} sdsSize={sdsSize} {...rest} />;
};
