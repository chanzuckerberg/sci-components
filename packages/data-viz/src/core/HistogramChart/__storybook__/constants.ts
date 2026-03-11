import { HistogramBin } from "src/core/HistogramChart/hooks/utils";

export const HISTOGRAM_DATA: HistogramBin[] = [];

export const HISTOGRAM_REFERENCE_DATA: number[][] = [];

const BIN_SIZE = 10;

for (let i = 0; i < 19; i++) {
  const binStart = i * BIN_SIZE;
  const binEnd = (i + 1) * BIN_SIZE;
  HISTOGRAM_DATA.push([binStart, binEnd, Math.round(Math.random() * 100)]);
}

for (let i = 0; i < 19; i++) {
  const binStart = i * BIN_SIZE;
  const binEnd = (i + 1) * BIN_SIZE;
  HISTOGRAM_REFERENCE_DATA.push([
    binStart,
    binEnd,
    Math.round(50 + Math.random() * 30),
  ]);
}

export const HISTOGRAM_TOOLTIP_OPTIONS = [
  { show: false },
  {
    enterable: true,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    formatter: function (param: any) {
      return param.data
        ? [
            `X-Axis: <strong>${param.data[0]} – ${param.data[1]}</strong><br/>`,
            `Y-Axis: <strong>${param.data[2]} ${param.marker}</strong>`,
          ].join("")
        : [];
    },
    show: true,
  },
];
