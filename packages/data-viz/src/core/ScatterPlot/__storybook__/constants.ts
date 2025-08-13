export const SCATTERPLOT_SIZE = 100;

export const SCATTERPLOT_ITEM_SIZE = 20;

export const SCATTERPLOT_NUMBERS = Array.from(Array(SCATTERPLOT_SIZE).keys());

export const SCATTERPLOT_DATA: { x: number; y: number }[] = [];

for (let i = 0; i < SCATTERPLOT_SIZE; i++) {
  SCATTERPLOT_DATA.push({
    x: Math.round(Math.random() * 100),
    y: Math.round(Math.random() * 100),
  });
}

export const SCATTERPLOT_ENCODE = { x: "x", y: "y" };

export const SCATTERPLOT_ITEM_STYLE = {
  borderColor: "white",
  borderType: "solid",
  borderWidth: 1,
  color: "gray",
  opacity: 1,
};

export const SCATTERPLOT_TOOLTIP_OPTIONS = [
  { show: false },
  {
    enterable: true,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    formatter: function (param: any) {
      return param.data
        ? [
            `X-Axis: <strong>${param.data.x}</strong><br/>`,
            `Y-Axis: <strong>${param.data.y}</strong>`,
          ].join("")
        : [];
    },
    show: true,
  },
];
