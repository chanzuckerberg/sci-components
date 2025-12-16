export const STACKED_BAR_CHART_DATA = [
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
