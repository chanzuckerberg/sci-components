import {
  StyledColorWrapper,
  StyledColorCode,
  StyledColorVariable,
  StyledColorTitle,
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

  const sassVariable = shade
    ? "$" + prefix + "-" + group + "-" + convertToKebabCase(shade)
    : "$" + prefix + "-" + group;

  const cssVariable = shade
    ? "--" + prefix + "-" + group + "-" + convertToKebabCase(shade)
    : "--" + prefix + "-" + group;

  const title = shade || group;

  return (
    <StyledColorWrapper
      key={group + shade}
      backgroundColor={String(value)}
      textColor={pickTextColorBasedOnBgColor(value)}
    >
      <div>
        <StyledColorTitle className="color-title">
          {title.charAt(0).toUpperCase() + title.slice(1)}
        </StyledColorTitle>

        <StyledColorVariable onClick={() => copyToClipboard(sassVariable)}>
          {sassVariable}
        </StyledColorVariable>
      </div>

      <div>
        <StyledColorCode onClick={() => copyToClipboard(value)}>
          {String(value)}
        </StyledColorCode>

        <StyledColorVariable onClick={() => copyToClipboard(cssVariable)}>
          {cssVariable}
        </StyledColorVariable>
      </div>
    </StyledColorWrapper>
  );
};

export default Color;
