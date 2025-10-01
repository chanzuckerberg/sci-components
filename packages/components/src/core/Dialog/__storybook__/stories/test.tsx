import { Args } from "@storybook/types";
import { Dialog } from "./default";

export function TestDemo(props: Args): JSX.Element {
  const defaultProps = { ...props, isOpen: true, titleOnClose: true };

  return (
    <>
      <Dialog sdsSize="xs" {...defaultProps} />
      <Dialog sdsSize="s" {...defaultProps} />
      <Dialog sdsSize="m" {...defaultProps} />
      <Dialog sdsSize="l" {...defaultProps} />
    </>
  );
}
