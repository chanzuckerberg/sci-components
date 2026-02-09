export const HISTOGRAM_DATA: number[][] = [];
// Reference distribution - slightly different from main data
export const HISTOGRAM_REFERENCE_DATA: number[][] = [];

for (let i = 1; i < 20; i++) {
  HISTOGRAM_DATA.push([i, Math.round(Math.random() * 100)]);
}

for (let i = 1; i < 20; i++) {
  HISTOGRAM_REFERENCE_DATA.push([i, Math.round(50 + Math.random() * 30)]);
}

// NEW: Add labels for x-axis
export const HISTOGRAM_LABELS = Array.from(
  { length: 19 },
  (_, i) => `${i * 10}-${(i + 1) * 10}`
);

export const HISTOGRAM_TOOLTIP_OPTIONS = [
  { show: false },
  {
    enterable: true,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    formatter: function (param: any) {
      return param.data
        ? [
            `X-Axis: <strong>${param.data[0]}</strong><br/>`,
            `Y-Axis: <strong>${param.data[1]} ${param.marker}</strong>`,
          ].join("")
        : [];
    },
    show: true,
  },
];
