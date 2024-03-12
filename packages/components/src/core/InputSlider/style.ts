import { Slider, SliderProps, sliderClasses } from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  CommonThemeProps,
  fontBodyXxs,
  fontBodyXxxs,
  getColors,
  getCorners,
  getSemanticComponentColors,
  getSemanticTextColors,
  getShadows,
} from "src/core/styles";

export interface InputSliderExtraProps extends SliderProps, CommonThemeProps {}

const inputSlider = (props: InputSliderExtraProps) => {
  const corners = getCorners(props);
  const colors = getColors(props);
  const shadows = getShadows(props);
  const semanticComponentColors = getSemanticComponentColors(props);
  const semanticTextColors = getSemanticTextColors(props);

  return `
    position: relative;

    .${sliderClasses.rail},
    .${sliderClasses.track} {
      border-radius: 2px;
    }

    .${sliderClasses.rail} {
      background-color: ${semanticComponentColors?.base?.surfaceTertiary};
    }
    
    .${sliderClasses.track} {
      background-color: ${semanticComponentColors?.accent?.fill};
    }

    .${sliderClasses.thumb} {
      height: 14px;
      width: 14px;
      background-color: ${semanticComponentColors?.accent?.fill};

      &.${sliderClasses.focusVisible}, &:hover, &:focus, &:active {
        box-shadow: ${shadows?.none};
      }
    }

    .${sliderClasses.thumb}::before {
      display: none;
    }

    .${sliderClasses.thumb}::after {
      background-color: ${semanticComponentColors?.base?.surface} !important;
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
      background-color: ${semanticComponentColors?.accent?.surface};
      border-radius: ${corners?.m}px;
      left: unset; 
      top: -3px;

      &::before {
        display: none;
      }

      & * {
        background: transparent;
        color: ${semanticTextColors?.base?.primary};
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
      background-color: ${semanticComponentColors?.base?.surface};
    }

    .${sliderClasses.markLabel} {
      ${fontBodyXxxs(props)?.styles}
      color: ${colors?.gray[500]};
    }

    .${sliderClasses.markLabelActive} {
      color: ${semanticTextColors?.base?.primary};
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
  const semanticComponentColors = getSemanticComponentColors(props);
  const semanticTextColors = getSemanticTextColors(props);

  return `
    .${sliderClasses.track} {
      background-color: ${semanticComponentColors?.base?.fillDisabled};
    }

    .${sliderClasses.thumb}.${sliderClasses.disabled} {
      background-color: ${semanticComponentColors?.base?.fillDisabled};
    }

    .${sliderClasses.valueLabel} {
      color: ${colors?.gray[300]};
      background-color: ${semanticComponentColors?.base?.surfaceSecondary};
      
      & * {
        color: ${semanticTextColors?.base?.disabled};
      }
    }

    .${sliderClasses.markLabel} {
      color: ${semanticTextColors?.base?.disabled}
    }

    .${sliderClasses.mark} {
      background-color: ${semanticComponentColors?.base?.fillDisabled};
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
