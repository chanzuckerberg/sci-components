import { useTheme } from "@mui/material";
import { getSemanticTextColors } from "src/core/styles";
import Colors from "../components/Color";

export const SemanticTextColorsTemplate = () => {
  const theme = useTheme();
  const semanticTextColors = getSemanticTextColors({ theme });

  return (
    semanticTextColors && (
      <Colors colors={semanticTextColors} prefix="$sds-color-semantic-text" />
    )
  );
};
