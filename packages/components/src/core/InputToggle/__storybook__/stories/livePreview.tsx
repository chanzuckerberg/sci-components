import { Args } from "@storybook/react";
import RawInputToggle from "src/core/InputToggle";

export const LivePreviewDemo = (props: Args): JSX.Element => {
  return <RawInputToggle {...props} id="togglePreview" />;
};
