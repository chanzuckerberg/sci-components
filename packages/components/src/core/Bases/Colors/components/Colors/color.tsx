import {
  StyledColorWrapper,
  StyledColorCode,
  StyledColorVariable,
} from "./style";
import {
  convertToKebabCase,
  copyToClipboard,
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

  const colorVariable = shade
    ? prefix + "-" + group + "-" + convertToKebabCase(shade)
    : prefix + "-" + group;

  return (
    <StyledColorWrapper
      key={group + shade}
      backgroundColor={String(value)}
      textColor={pickTextColorBasedOnBgColor(value)}
    >
      <div>
        <span>{shade || group}</span>
        <StyledColorCode onClick={() => copyToClipboard(value)}>
          {String(value)}
        </StyledColorCode>
      </div>
      <StyledColorVariable onClick={() => copyToClipboard(colorVariable)}>
        {colorVariable}
      </StyledColorVariable>
    </StyledColorWrapper>
  );
};

export default Color;
