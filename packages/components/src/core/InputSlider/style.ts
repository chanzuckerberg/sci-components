import { Slider, SliderProps } from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  CommonThemeProps,
  fontBodyXxs,
  getColors,
  getCorners,
} from "../styles";

export interface InputSliderExtraProps
  extends Omit<SliderProps, "nonce" | "rev" | "rel" | "autoFocus" | "content">,
    CommonThemeProps {}

const inputSlider = (props: InputSliderExtraProps) => {
  const corners = getCorners(props);
  const colors = getColors(props);

  return `
  position: relative;

  .MuiSlider-rail,
  .MuiSlider-track {
    border-radius: 2px;
  }

  .MuiSlider-rail {
    background-color: ${colors?.gray[200]};
  }
  
  .MuiSlider-track {
    background-color: ${colors?.primary[400]};
  }

  .MuiSlider-thumb {
    height: 14px;
    width: 14px;
    background-color: ${colors?.primary[400]};

    &.Mui-focusVisible, &:hover, &:focus, &:active {
      box-shadow: none;
    }
  }

  .MuiSlider-thumb::before {
    display: none;
  }

  .MuiSlider-thumb::after {
    background-color: white !important;
    height: 6px !important;
    width: 6px !important;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .MuiSlider-valueLabel {
    padding: 2px 4px;
    color: black;
    background-color: ${colors?.primary[200]};
    border-radius: ${corners?.m}px;
    left: unset; 
    top: -3px;

    &::before {
      display: none;
    }

    & * {
      background: transparent;
      color: black;
      transform: none;
      width: unset;
      height: unset;
    }
  }

  .MuiSlider-mark {
    background-color: ${colors?.gray[400]};
    opacity: 1;
  }

  .MuiSlider-mark.MuiSlider-markActive {
    background-color: white;
  }

  .MuiSlider-markLabel {
    color: ${colors?.gray[500]}
  }

  .MuiSlider-markLabelActive {
    color: black;
  }
  `;
};

const horizontal = (props: InputSliderExtraProps) => {
  const { marks } = props;
  const lastMarkIndex = Array.isArray(marks) ? marks.length - 1 : null;

  return `
    .MuiSlider-rail,
    .MuiSlider-track {
      border: none;
      height: 4px;
    }

    // Adjust the position of the first mark by moving it 2px to the right to fit it inside the track
    span[data-index="0"].MuiSlider-mark {
      left: 2px !important;
    }

    // Adjust the position of the last mark by moving it 2px to the left to fit it inside the track
    span[data-index="${lastMarkIndex}"].MuiSlider-mark {
      left: calc(100% - 2px) !important;
    }
    
    .MuiSlider-markLabel {
      top: 26px;
    }

    .Mui-disabled .MuiSlider-track {
      border: none;
    }
  `;
};

const vertical = (props: InputSliderExtraProps) => {
  const { marks } = props;
  const lastMarkIndex = Array.isArray(marks) ? marks.length - 1 : null;

  return `  
    .MuiSlider-rail,
    .MuiSlider-track {
      border: none;
      width: 4px;
    }

    // Adjust the position of the first mark by moving it 2px up to fit it inside the track.
    span[data-index="0"].MuiSlider-mark {
      bottom: 2px !important;
    }

    // Adjust the position of the last mark by moving it 2px down to fit it inside the track.
    span[data-index="${lastMarkIndex}"].MuiSlider-mark {
      bottom: calc(100% - 2px) !important;
    }

    .MuiSlider-markLabel {
      left: 26px;
    }
  `;
};

const disabledSlider = (props: InputSliderExtraProps) => {
  const colors = getColors(props);

  return `
    .MuiSlider-track {
      background-color: ${colors?.gray[300]};
    }

    .MuiSlider-thumb.Mui-disabled {
      background-color: ${colors?.gray[300]};
    }

    .MuiSlider-valueLabel {
      color: ${colors?.gray[300]};
      background-color: ${colors?.gray[100]};
      
      & * {
        color: ${colors?.gray[300]};
      }
    }

    .MuiSlider-markLabel {
      color: ${colors?.gray[300]}
    }

    .MuiSlider-mark {
      background-color: ${colors?.gray[300]};
    }
  `;
};

export const StyledSlider = styled(Slider)`
  ${fontBodyXxs}

  ${(props: InputSliderExtraProps) => {
    const { orientation, disabled } = props;

    return `
      ${inputSlider(props)}
      ${orientation === "vertical" ? vertical(props) : horizontal(props)}
      ${disabled ? disabledSlider(props) : ""}
    `;
  }}
`;
