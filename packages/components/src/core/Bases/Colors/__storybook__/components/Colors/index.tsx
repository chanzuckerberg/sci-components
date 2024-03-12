import { Color as ColorType, getColors } from "src/core/styles";
import Color from "./color";
import { StyledColorGroupTitle, StyledColorsWrapper } from "./style";
import { useTheme } from "@mui/material";
import { NestedObject, flattenObj } from "./util";

interface SemanticColorsProps {
  colors: object;
  type?: "semantic" | "primitive";
  prefix?: string;
}

const Colors = (props: SemanticColorsProps): JSX.Element => {
  const { colors, type = "semantic", prefix } = props;

  const theme = useTheme();
  const primitiveColors = getColors({ theme });

  const flattenColors = primitiveColors
    ? flattenObj(primitiveColors as unknown as NestedObject, null)
    : {};

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
      return (
        <Color
          group={groupName}
          semanticName={
            type === "semantic" ? flattenColors[sdsColors] : sdsColors
          }
          value={sdsColors}
          prefix={prefix}
        />
      );
    } else {
      return Object.entries(sdsColors).map(([k, v]) => {
        if (v === "transparent") return;

        return (
          <Color
            key={k}
            group={groupName}
            value={v}
            semanticName={type === "semantic" ? flattenColors[v] : v}
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
