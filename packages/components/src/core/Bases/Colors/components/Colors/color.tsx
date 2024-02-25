import { useState } from "react";
import {
  StyledColorWrapper,
  StyledColorCode,
  StyledColorVariable,
} from "./style";
import {
  convertToKebabCase,
  pickTextColorBasedOnBgColor,
} from "src/core/Bases/utils";

interface ColorComponentProps {
  group: string;
  value: string;
  shade?: string;
  prefix?: string;
}

const Color = (props: ColorComponentProps) => {
  const { group, value, shade, prefix = "$" } = props;

  const [text, setText] = useState(shade || group);
  const colorVariable = shade
    ? prefix + "-" + group + "-" + convertToKebabCase(shade)
    : prefix + "-" + group;

  return (
    <StyledColorWrapper
      key={group + shade}
      backgroundColor={String(value)}
      onClick={() => {
        navigator.clipboard.writeText(colorVariable);
        setText("Copied!");
      }}
      onMouseEnter={() => {
        setText("Click to Copy");
      }}
      onMouseLeave={() => {
        setText(shade || group);
      }}
      textColor={pickTextColorBasedOnBgColor(value)}
    >
      <div>
        <span>{text}</span>
        <StyledColorCode>{String(value)}</StyledColorCode>
      </div>
      <StyledColorVariable>{colorVariable}</StyledColorVariable>
    </StyledColorWrapper>
  );
};

export default Color;
