import { useTheme } from "@mui/material";
import { getSemanticColors } from "@components/src/core/styles";
import Colors from "../components/Colors";

export const SemanticColorsTemplate = () => {
  const theme = useTheme();
  const semanticColors = getSemanticColors({ theme });

  const { base, ...rest } = semanticColors || {};

  return (
    semanticColors && (
      <Colors colors={{ base, ...rest }} prefix="sds-color-semantic" />
    )
  );
};
