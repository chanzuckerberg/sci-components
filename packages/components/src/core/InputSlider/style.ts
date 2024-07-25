import { Slider, SliderProps, sliderClasses } from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  CommonThemeProps,
  focusVisibleA11yStyle,
  fontBodyXxs,
  fontBodyXxxs,
  getColors,
  getCorners,
  getSemanticColors,
  getShadows,
} from "src/core/styles";

export interface InputSliderExtraProps extends SliderProps, CommonThemeProps {}

const inputSlider = (props: InputSliderExtraProps) => {
  const corners = getCorners(props);
  const colors = getColors(props);
  const shadows = getShadows(props);
  const semanticColors = getSemanticColors(props);

  return `
    position: relative;

    .${sliderClasses.rail},
    .${sliderClasses.track} {
      border-radius: 2px;
    }

    .${sliderClasses.rail} {
      background-color: ${semanticColors?.base?.surfaceTertiary};
    }
    
    .${sliderClasses.track} {
      background-color: ${semanticColors?.accent?.fill};
    }

    .${sliderClasses.thumb} {
      ${focusVisibleA11yStyle(props)}
      height: 14px;
      width: 14px;
      background-color: ${semanticColors?.accent?.fill};

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
      color: black;
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
      background-color: ${colors?.gray[400]};
      opacity: 1;
    }

    .${sliderClasses.mark}.${sliderClasses.markActive} {
      background-color: ${semanticColors?.base?.surfacePrimary};
    }

    .${sliderClasses.markLabel} {
      ${fontBodyXxxs(props)?.styles}
      color: ${colors?.gray[500]};
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

  return `
    .${sliderClasses.track} {
      background-color: ${semanticColors?.base?.fillDisabled};
    }

    .${sliderClasses.thumb}.${sliderClasses.disabled} {
      background-color: ${semanticColors?.base?.fillDisabled};
    }

    .${sliderClasses.valueLabel} {
      color: ${colors?.gray[300]};
      background-color: ${semanticColors?.base?.surfaceSecondary};
      
      & * {
        color: ${semanticColors?.base?.textDisabled};
      }
    }

    .${sliderClasses.markLabel} {
      color: ${semanticColors?.base?.textDisabled}
    }

    .${sliderClasses.mark} {
      background-color: ${semanticColors?.base?.fillDisabled};
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
