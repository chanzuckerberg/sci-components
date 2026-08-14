import React from "react";
import InputSlider from "./index";
import figma from "@figma/code-connect";

figma.connect(
  InputSlider,
  "https://www.figma.com/design/zedDsBDlmkLrKBTuJ4FAz7/Science-Design-System--v2-?node-id=6432%3A14593",
  {
    props: {
      // state=disabled -> disabled (real MUI Slider prop).
      disabled: figma.enum("state", {
        disabled: true,
      }),
      // Intentionally unmapped — InputSlider is a thin MUI Slider wrapper with no
      // SDS-specific props (InputSliderExtraProps extends SliderProps only):
      // - upperHandle/lowerHandle (0-100%): Figma authoring positions; the real
      //   prop is numeric value/defaultValue (data), which can't be read from Figma.
      // - doubleSided?: not a prop — range vs single is inferred at runtime from
      //   whether value/defaultValue is an array (isRangeSlider).
      // - showTickMarks?: nearest is MUI `marks`, but that's true|Array<{value,label}>
      //   (data), not a design-authorable boolean.
      // - showHandleValue?: nearest is MUI `valueLabelDisplay`; a display toggle
      //   the design isn't authoring, and InputSlider doesn't surface it.
    },
    example: ({ disabled }) => (
      // PLACEHOLDER DATA — replace with your own. Value is numeric slider data
      // and can't be read from Figma; defaultValue below is illustrative only.
      <InputSlider
        defaultValue={50}
        min={0}
        max={100}
        disabled={disabled}
        aria-label="Slider value"
      />
    ),
  }
);
