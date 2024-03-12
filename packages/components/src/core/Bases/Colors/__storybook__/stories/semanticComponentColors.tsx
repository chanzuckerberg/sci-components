import { useTheme } from "@mui/material";
import { getSemanticComponentColors } from "src/core/styles";
import Colors from "../components/Colors";

export const SemanticComponentColorsTemplate = () => {
  const theme = useTheme();
  const semanticComponentColors = getSemanticComponentColors({ theme });

  return (
    semanticComponentColors && (
      <Colors
        colors={semanticComponentColors}
        prefix="sds-color-semantic-component"
      />
    )
  );
};
