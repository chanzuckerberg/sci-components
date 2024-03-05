import { Color as ColorType } from "src/core/styles";
import Color from "./color";
import { StyledColorGroupTitle, StyledColorsWrapper } from "./style";

interface SemanticColorsProps {
  colors: object;
  type?: "semantic" | "primitive";
  prefix?: string;
}

const Colors = (props: SemanticColorsProps): JSX.Element => {
  const { colors, type = "semantic", prefix } = props;

  const renderColorGroups = (colorGroups: object) => {
    if (colorGroups) {
      return Object.entries(colorGroups).map(([key, value]) => (
        <div key={key}>
          <StyledColorGroupTitle>
            {key.charAt(0).toLocaleUpperCase() + key.slice(1)}
          </StyledColorGroupTitle>
          <div>{renderColors(value, key)}</div>
        </div>
      ));
    }
  };

  const renderColors = (sdsColors: ColorType, groupName: string) => {
    if (typeof sdsColors === "string") {
      return <Color group={groupName} value={sdsColors} prefix={prefix} />;
    } else {
      return Object.entries(sdsColors).map(([k, v]) => {
        if (v === "transparent") return;

        return (
          <Color
            key={k}
            group={groupName}
            value={v}
            shade={k}
            prefix={prefix}
          />
        );
      });
    }
  };

  return (
    <StyledColorsWrapper type={type}>
      {colors && renderColorGroups(colors)}
    </StyledColorsWrapper>
  );
};

export default Colors;
