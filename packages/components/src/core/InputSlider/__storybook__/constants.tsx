export const INPUT_SLIDER_EXCLUDED_CONTROLS = [
  "defaultValue",
  "disabled",
  "marks",
  "max",
  "min",
  "step",
  "valueLabelDisplay",
];

export const INPUT_SLIDER_GENERATE_CUSTOM_MARKS = (
  min: number,
  max: number
) => {
  return [
    {
      label: min,
      value: min,
    },
    {
      label: ((max - min) / 2 + min).toFixed(0),
      value: (max - min) / 2 + min,
    },
    {
      label: max,
      value: max,
    },
  ];
};

export const INPUT_SLIDER_DEMO_WRAPPER_STYLES = {
  height: 180,
  marginLeft: 20,
  marginTop: 15,
  width: 180,
};

export const INPUT_SLIDER_LIVE_PREVIEW_ROW_STYLES = {
  display: "grid",
  gridColumnGap: 40,
  gridTemplateColumns: "repeat(2, 180px)",
  margin: "15px 0 0 20px",
};
