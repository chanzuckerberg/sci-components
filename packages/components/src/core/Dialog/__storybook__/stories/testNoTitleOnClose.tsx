import { Args } from "@storybook/types";
import { Dialog } from "./default";

export function TestNoTitleOnCloseDemo(props: Args): JSX.Element {
  return <Dialog sdsSize="xs" {...props} isOpen />;
}
