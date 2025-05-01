export const HISTOGRAM_DATA: number[][] = [];

for (let i = 0; i < 20; i++) {
  HISTOGRAM_DATA.push([i, Math.round(Math.random() * 100)]);
}

export const HISTOGRAM_TOOLTIP_OPTIONS = [
  { show: false },
  {
    enterable: true,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    formatter: function (param: any) {
      console.log(param);
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
