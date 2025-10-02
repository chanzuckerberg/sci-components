import { Args } from "@storybook/types";
import { Dialog } from "./default";

export function TestButtonPositionLeftDemo(props: Args): JSX.Element {
  return <Dialog sdsSize="xs" {...props} isOpen buttonPosition="left" />;
}
