import {
  Button,
  CommonThemeProps,
  getSemanticColors,
} from "@czi-sds/components";
import styled from "@emotion/styled";

/**
 * Copy button whose icon takes the accent colours on interaction. `&&` raises
 * specificity above SDS's own `&:hover svg`.
 */
export const TrackSequenceCopyButton = styled(Button)`
  ${(props: CommonThemeProps) => {
    const semanticColors = getSemanticColors(props);

    return `
      &&:hover svg {
        color: ${semanticColors?.accent?.foregroundInteraction};
      }

      &&:focus-visible svg {
        color: ${semanticColors?.accent?.foreground};
      }

      &&:active svg {
        color: ${semanticColors?.accent?.foregroundPressed};
      }
    `;
  }}
`;
