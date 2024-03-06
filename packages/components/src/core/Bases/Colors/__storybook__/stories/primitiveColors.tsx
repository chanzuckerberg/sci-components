import { useTheme } from "@mui/material";
import { getColors } from "src/core/styles";
import Colors from "../components/Color";

export const PrimitiveColorsTemplate = () => {
  const theme = useTheme();
  const colors = getColors({ theme });

  if (colors) {
    // Prioritizing the common color to be passed as the initial color to
    // the SemanticColors component.
    const { common, ...rest } = colors;

    return (
      <Colors
        colors={{ common, ...rest }}
        type="primitive"
        prefix="sds-color-primitive"
      />
    );
  }
};
