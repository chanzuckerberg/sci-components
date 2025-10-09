import { Args } from "@storybook/react-webpack5";
import RawTooltip from "src/core/Tooltip";

export const TestDemo = (props: Args): JSX.Element => {
  const { title, ...rest } = props;
  return (
    <RawTooltip title={title} {...rest} data-testid="tooltip">
      <div style={{ display: "inline-block" }}>
        I am a tooltip child element.
      </div>
    </RawTooltip>
  );
};
