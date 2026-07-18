import { StackedBarChartDataItem } from "../StackedBarChart.types";

export const STACKED_BAR_CHART_DATA: StackedBarChartDataItem[] = [
  {
    name: "Transcriptomic",
    value: 117,
    tooltip: {
      showSectionHeader: true,
      data: [
        {
          label: "Transcriptomic",
          dataRows: [
            { label: "Sub-modality", value: 14 },
            { label: "Another sub-modality", value: 19 },
            { label: "Modality sub-type here", value: 270 },
            { label: "Sub-type of modality", value: 93 },
          ],
        },
      ],
    },
  },
  {
    name: "Imaging",
    value: 61,
    tooltip: {
      data: [
        {
          label: "Imaging",
          dataRows: [
            { label: "Fluorescence microscopy", value: 22 },
            { label: "Confocal imaging", value: 15 },
            { label: "Electron microscopy", value: 11 },
            { label: "Light sheet imaging", value: 8 },
            { label: "Two-photon microscopy", value: 5 },
          ],
        },
      ],
    },
  },
  {
    name: "Sequencing",
    value: 34,
    tooltip: {
      data: [
        {
          label: "Sequencing",
          dataRows: [
            { label: "RNA-seq", value: 15 },
            { label: "DNA-seq", value: 10 },
            { label: "ChIP-seq", value: 6 },
            { label: "ATAC-seq", value: 3 },
          ],
        },
      ],
    },
  },
  {
    name: "Proteomics",
    value: 15,
    tooltip: {
      data: [
        {
          label: "Proteomics",
          dataRows: [
            { label: "Proteomics", value: 8 },
            { label: "Metabolomics", value: 4 },
            { label: "Flow cytometry", value: 3 },
          ],
        },
      ],
    },
  },
  {
    name: "Spatial Transcriptomics",
    value: 78,
    tooltip: {
      data: [
        {
          label: "Spatial Transcriptomics",
          dataRows: [
            { label: "Spatial transcriptomics", value: 60 },
            { label: "Spatial proteomics", value: 10 },
            { label: "Spatial metabolomics", value: 5 },
            { label: "Spatial lipidomics", value: 3 },
          ],
        },
      ],
    },
  },
  {
    name: "Prosthetics",
    value: 130,
  },
  {
    name: "Epigenomics",
    value: 100,
    tooltip: {
      data: [
        {
          label: "Epigenomics",
          dataRows: [
            { label: "DNA methylation", value: 30 },
            { label: "Histone modification", value: 20 },
            { label: "Chromatin accessibility", value: 10 },
            { label: "Chromatin remodeling", value: 10 },
            { label: "Chromatin transcription", value: 10 },
            { label: "Chromatin replication", value: 30 },
          ],
        },
      ],
    },
  },
];

/**
 * Alternate datasets for exercising segment resize/enter/exit animations by
 * switching the `data` control in Storybook.
 */

// Same categories as STACKED_BAR_CHART_DATA with different values, so every
// segment resizes in place.
export const STACKED_BAR_CHART_DATA_UPDATED_VALUES: StackedBarChartDataItem[] =
  STACKED_BAR_CHART_DATA.map((item, index) => ({
    ...item,
    value: [40, 190, 12, 88, 25, 47, 210][index] ?? item.value,
  }));

// Net fewer categories, but also introduces a new one, so removed segments
// animate out while an added segment animates in.
export const STACKED_BAR_CHART_DATA_FEWER_CATEGORIES: StackedBarChartDataItem[] =
  [
    ...STACKED_BAR_CHART_DATA.filter((item) =>
      ["Transcriptomic", "Imaging", "Epigenomics"].includes(item.name)
    ),
    { name: "Electrophysiology", value: 55 },
  ];

// Net more categories, but also drops some defaults, so added segments
// animate in while removed segments animate out.
export const STACKED_BAR_CHART_DATA_MORE_CATEGORIES: StackedBarChartDataItem[] =
  [
    ...STACKED_BAR_CHART_DATA.filter(
      (item) => !["Prosthetics", "Sequencing"].includes(item.name)
    ),
    { name: "Electrophysiology", value: 55 },
    { name: "Behavioral", value: 28 },
    { name: "Genomics", value: 145 },
    { name: "Metabolomics", value: 42 },
  ];
