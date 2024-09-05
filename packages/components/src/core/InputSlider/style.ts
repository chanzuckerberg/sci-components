import { Slider, SliderProps, sliderClasses } from "@mui/material";
import styled from "@emotion/styled";
import {
  CommonThemeProps,
  focusVisibleA11yStyle,
  fontBodyXxs,
  fontBodyXxxs,
  getColors,
  getCorners,
  getMode,
  getSemanticColors,
  getShadows,
} from "src/core/styles";

export interface InputSliderExtraProps extends SliderProps, CommonThemeProps {}

const inputSlider = (props: InputSliderExtraProps) => {
  const corners = getCorners(props);
  const shadows = getShadows(props);
  const semanticColors = getSemanticColors(props);

  return `
    position: relative;

    .${sliderClasses.rail},
    .${sliderClasses.track} {
      border-radius: 2px;
    }

    .${sliderClasses.rail} {
      background-color: ${semanticColors?.base?.divider};
      opacity:1;
    }
    
    .${sliderClasses.track} {
      background-color: ${semanticColors?.accent?.fillPrimary};
    }

    .${sliderClasses.thumb} {
      ${focusVisibleA11yStyle(props)}
      height: 14px;
      width: 14px;
      background-color: ${semanticColors?.accent?.fillPrimary};

      &.${sliderClasses.focusVisible}, &:hover, &:focus, &:active {
        box-shadow: ${shadows?.none};
      }
    }

    .${sliderClasses.thumb}::before {
      display: none;
    }

    .${sliderClasses.thumb}::after {
      background-color: ${semanticColors?.base?.surfacePrimary} !important;
      height: 6px !important;
      width: 6px !important;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    .${sliderClasses.valueLabel} {
      padding: 2px 4px;
      color: ${semanticColors?.base?.textPrimary};
      background-color: ${semanticColors?.accent?.surfacePrimary};
      border-radius: ${corners?.m}px;
      left: unset; 
      top: -3px;

      &::before {
        display: none;
      }

      & * {
        background: transparent;
        color: ${semanticColors?.base?.textPrimary};
        transform: none;
        width: unset;
        height: unset;
      }
    }

    .${sliderClasses.mark} {
      // (masoudmanson): Although the mark is not a icon, but since we don't have 
      // a specific color for the mark, we use the iconDisabled color for it.
      background-color: ${semanticColors?.base?.iconDisabled};
      opacity: 1;
    }

    .${sliderClasses.mark}.${sliderClasses.markActive} {
      background-color: ${semanticColors?.base?.surfacePrimary};
    }

    .${sliderClasses.markLabel} {
      ${fontBodyXxxs(props)?.styles}
      color: ${semanticColors?.base?.textSecondary};
    }

    .${sliderClasses.markLabelActive} {
      color: ${semanticColors?.base?.textPrimary};
    }
  `;
};

const horizontal = (props: InputSliderExtraProps) => {
  const { marks } = props;
  const lastMarkIndex = Array.isArray(marks) ? marks.length - 1 : null;

  return `
    .${sliderClasses.rail},
    .${sliderClasses.track} {
      border: none;
      height: 4px;
    }

    // Adjust the position of the first mark by moving it 2px to the right to fit it inside the track
    span[data-index="0"].${sliderClasses.mark} {
      left: 2px !important;
    }

    // Adjust the position of the last mark by moving it 2px to the left to fit it inside the track
    span[data-index="${lastMarkIndex}"].${sliderClasses.mark} {
      left: calc(100% - 2px) !important;
    }
    
    .${sliderClasses.markLabel} {
      top: 26px;
    }

    .${sliderClasses.disabled} .${sliderClasses.track} {
      border: none;
    }
  `;
};

const disabledSlider = (props: InputSliderExtraProps) => {
  const colors = getColors(props);
  const semanticColors = getSemanticColors(props);
  const mode = getMode(props);

  return `
    .${sliderClasses.track} {
      background-color: ${semanticColors?.base?.fillDisabled};
    }

    .${sliderClasses.thumb}.${sliderClasses.disabled} {
      background-color: ${semanticColors?.base?.fillDisabled};
    }

    .${sliderClasses.valueLabel} {
      color: ${colors?.gray[300]};
      background-color: ${mode === "light" ? semanticColors?.base?.surfaceSecondary : semanticColors?.base?.surfacePrimary};
      
      & * {
        color: ${semanticColors?.base?.textDisabled};
      }
    }

    .${sliderClasses.markLabel} {
      color: ${semanticColors?.base?.textDisabled}
    }

    .${sliderClasses.mark} {
      background-color: ${semanticColors?.base?.fillPrimary};
    }
  `;
};

export const StyledSlider = styled(Slider)`
  ${fontBodyXxs}

  ${(props: InputSliderExtraProps) => {
    const { disabled } = props;

    return `
      ${inputSlider(props)}
      ${horizontal(props)}
      ${disabled ? disabledSlider(props) : ""}
    `;
  }}
`;
