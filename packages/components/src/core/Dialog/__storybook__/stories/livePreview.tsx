import { Args } from "@storybook/react";
import { Dialog } from "./default";

export function LivePreviewDemo(props: Args): JSX.Element {
  return (
    <>
      <Dialog sdsSize="xs" {...props} />
      <Dialog sdsSize="s" {...props} />
      <Dialog sdsSize="m" {...props} />
      <Dialog sdsSize="l" {...props} />
    </>
  );
}
