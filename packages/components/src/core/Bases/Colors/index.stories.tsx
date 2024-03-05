import { Meta } from "@storybook/react";
import { BADGE } from "../../../common/storybookBadges";
import Colors from "./storybook/components/Color";
import { useTheme } from "@mui/material";
import {
  getColors,
  getSemanticComponentColors,
  getSemanticTextColors,
} from "../../styles";

export default {
  parameters: {
    axe: {
      disabledRules: ["color-contrast"],
    },
    badges: [BADGE.WIP],
  },
  title: "Bases/Colors",
} as Meta;

// Primitive

const PrimitiveColorsTemplate = () => {
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

export const PrimitiveColors = {
  render: () => <PrimitiveColorsTemplate />,
};

// Semantic Component Colors

const SemanticComponentColorsTemplate = () => {
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

export const SemanticComponentColors = {
  render: () => <SemanticComponentColorsTemplate />,
};

// Semantic Text Colors

const SemanticTextColorsTemplate = () => {
  const theme = useTheme();
  const semanticTextColors = getSemanticTextColors({ theme });

  return (
    semanticTextColors && (
      <Colors colors={semanticTextColors} prefix="$sds-color-semantic-text" />
    )
  );
};

export const SemanticTextColors = {
  render: () => <SemanticTextColorsTemplate />,
};
