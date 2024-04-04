import { Args } from "@storybook/react";
import { Dialog } from "./default";

export function TestNoTitleOnCloseDemo(props: Args): JSX.Element {
  return <Dialog sdsSize="xs" {...props} isOpen />;
}
