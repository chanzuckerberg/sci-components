import { useTheme } from "@mui/material";
import { getColors } from "src/core/styles";
import Colors from "../components/Colors";

export const PrimitiveColorsTemplate = () => {
  const theme = useTheme();
  const colors = getColors({ theme });

  if (colors) {
    // Prioritizing the gray color to be passed as the initial color to
    // the SemanticColors component.
    const { gray, ...rest } = colors;

    return (
      <Colors
        colors={{ gray, ...rest }}
        type="primitive"
        prefix="sds-color-primitive"
      />
    );
  }
};
