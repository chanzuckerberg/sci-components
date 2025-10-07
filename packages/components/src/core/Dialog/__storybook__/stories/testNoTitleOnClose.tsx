import { Args } from "@storybook/react-webpack5";
import { Dialog } from "./default";

export function TestNoTitleOnCloseDemo(props: Args): JSX.Element {
  return <Dialog sdsSize="xs" {...props} isOpen />;
}
