export const DOMAIN_DATA = [
  {
    name: "Transcriptomic",
    value: 117,
    tooltip: {
      showSectionHeader: false,
      data: [
        {
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
      showSectionHeader: false,
      data: [
        {
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
      showSectionHeader: false,
      data: [
        {
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
      showSectionHeader: false,
      data: [
        {
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
    name: "Type",
    value: 130,
    tooltip: {
      showSectionHeader: false,
      data: [
        {
          dataRows: [
            { label: "Single-cell analysis", value: 38 },
            { label: "Bulk analysis", value: 32 },
            { label: "Spatial analysis", value: 25 },
            { label: "Time-series", value: 18 },
            { label: "Multi-omics", value: 10 },
            { label: "In situ", value: 7 },
          ],
        },
      ],
    },
  },
  {
    name: "Prosthetics",
    value: 130,
    tooltip: {
      showSectionHeader: false,
      data: [
        {
          dataRows: [
            { label: "Prosthetics", value: 80 },
            { label: "Orthotics", value: 15 },
            { label: "Prosthetic components", value: 35 },
          ],
        },
      ],
    },
  },
];

export const ORGANISM_DATA = [
  {
    name: "H. sapiens",
    value: 322,
    tooltip: {
      showSectionHeader: false,
      data: [
        {
          dataRows: [
            { label: "Brain tissue", value: 98 },
            { label: "Blood samples", value: 85 },
            { label: "Skin tissue", value: 62 },
            { label: "Liver tissue", value: 45 },
            { label: "Lung tissue", value: 32 },
          ],
        },
      ],
    },
  },
  {
    name: "M. musculus",
    value: 130,
    tooltip: {
      showSectionHeader: false,
      data: [
        {
          dataRows: [
            { label: "Brain tissue", value: 52 },
            { label: "Spleen tissue", value: 38 },
            { label: "Liver tissue", value: 25 },
            { label: "Kidney tissue", value: 15 },
          ],
        },
      ],
    },
  },
  {
    name: "C. Jacques",
    value: 89,
    tooltip: {
      showSectionHeader: false,
      data: [
        {
          dataRows: [
            { label: "Cell culture", value: 45 },
            { label: "Colony samples", value: 28 },
            { label: "Spore samples", value: 16 },
          ],
        },
      ],
    },
  },
  {
    name: "D. melanogaster",
    value: 74,
    tooltip: {
      showSectionHeader: false,
      data: [
        {
          dataRows: [
            { label: "Adult stage", value: 25 },
            { label: "Larval stage", value: 20 },
            { label: "Embryonic stage", value: 15 },
            { label: "Pupal stage", value: 9 },
            { label: "Late embryonic", value: 5 },
          ],
        },
      ],
    },
  },
  {
    name: "S. cerevisiae",
    value: 27,
    tooltip: {
      showSectionHeader: false,
      data: [
        {
          dataRows: [
            { label: "Wild-type strain", value: 15 },
            { label: "Mutant strains", value: 8 },
            { label: "Laboratory strains", value: 4 },
          ],
        },
      ],
    },
  },
  {
    name: "D. rerio",
    value: 21,
    tooltip: {
      showSectionHeader: false,
      data: [
        {
          dataRows: [
            { label: "Adult samples", value: 12 },
            { label: "Embryonic samples", value: 9 },
          ],
        },
      ],
    },
  },
  {
    name: "S. pombe",
    value: 16,
    tooltip: {
      showSectionHeader: false,
      data: [
        {
          dataRows: [
            { label: "Wild-type strain", value: 10 },
            { label: "Mutant strains", value: 6 },
          ],
        },
      ],
    },
  },
  {
    name: "A. thaliana",
    value: 11,
    tooltip: {
      showSectionHeader: false,
      data: [
        {
          dataRows: [
            { label: "Leaf tissue", value: 3 },
            { label: "Root tissue", value: 3 },
            { label: "Flower tissue", value: 2 },
            { label: "Seed samples", value: 2 },
            { label: "Stem tissue", value: 1 },
          ],
        },
      ],
    },
  },
];

export const TISSUE_DATA = [
  {
    name: "Brain",
    value: 450,
    tooltip: {
      showSectionHeader: false,
      data: [
        {
          dataRows: [
            { label: "Cerebral cortex", value: 150 },
            { label: "Hippocampus", value: 95 },
            { label: "Cerebellum", value: 80 },
            { label: "Brainstem", value: 55 },
            { label: "Thalamus", value: 40 },
            { label: "Amygdala", value: 30 },
          ],
        },
      ],
    },
  },
  {
    name: "Heart",
    value: 280,
    tooltip: {
      showSectionHeader: false,
      data: [
        {
          dataRows: [
            { label: "Left ventricle", value: 95 },
            { label: "Right ventricle", value: 75 },
            { label: "Left atrium", value: 52 },
            { label: "Right atrium", value: 38 },
            { label: "Septum", value: 20 },
          ],
        },
      ],
    },
  },
  {
    name: "Liver",
    value: 220,
    tooltip: {
      showSectionHeader: false,
      data: [
        {
          dataRows: [
            { label: "Right lobe", value: 110 },
            { label: "Left lobe", value: 75 },
            { label: "Caudate lobe", value: 35 },
          ],
        },
      ],
    },
  },
  {
    name: "Kidney",
    value: 150,
    tooltip: {
      showSectionHeader: false,
      data: [
        {
          dataRows: [
            { label: "Cortex", value: 55 },
            { label: "Medulla", value: 45 },
            { label: "Renal pelvis", value: 28 },
            { label: "Glomeruli", value: 12 },
            { label: "Collecting ducts", value: 10 },
          ],
        },
      ],
    },
  },
];

// Amount-based data examples
// Example using global unit (all items use the same unit)
export const DOMAIN_DATA_AMOUNT = [
  {
    name: "Transcriptomic",
    value: 460,
    tooltip: {
      showSectionHeader: false,
      data: [
        {
          dataRows: [
            { label: "RNA-seq", value: 180 },
            { label: "Microarray", value: 150 },
            { label: "Single-cell RNA", value: 130 },
          ],
        },
      ],
    },
  },
  {
    name: "Imaging",
    value: 310,
    tooltip: {
      showSectionHeader: false,
      data: [
        {
          dataRows: [
            { label: "Fluorescence", value: 150 },
            { label: "Confocal", value: 100 },
            { label: "Electron microscopy", value: 60 },
          ],
        },
      ],
    },
  },
  {
    name: "Sequencing",
    value: 191,
    tooltip: {
      showSectionHeader: false,
      data: [
        {
          dataRows: [
            { label: "DNA-seq", value: 100 },
            { label: "ChIP-seq", value: 55 },
            { label: "ATAC-seq", value: 36 },
          ],
        },
      ],
    },
  },
  {
    name: "Another",
    value: 76,
    tooltip: {
      showSectionHeader: false,
      data: [
        {
          dataRows: [
            { label: "Proteomics", value: 45 },
            { label: "Metabolomics", value: 31 },
          ],
        },
      ],
    },
  },
  {
    name: "Type Five",
    value: 44,
    tooltip: {
      showSectionHeader: false,
      data: [
        {
          dataRows: [
            { label: "Flow cytometry", value: 30 },
            { label: "Mass spectrometry", value: 14 },
          ],
        },
      ],
    },
  },
];

// Example with mixed units (some items override the global unit)
export const MIXED_UNIT_DATA = [
  {
    name: "Small files",
    value: 245,
    // Uses global unit
    tooltip: {
      showSectionHeader: false,
      data: [
        {
          dataRows: [
            { label: "Documents", value: 120 },
            { label: "Text files", value: 85 },
            { label: "Config files", value: 40 },
          ],
        },
      ],
    },
  },
  {
    name: "Large files",
    value: 1200,
    unit: "MB", // Override global unit with MB
    tooltip: {
      showSectionHeader: false,
      data: [
        {
          dataRows: [
            { label: "Videos", value: 800 },
            { label: "Images", value: 300 },
            { label: "Audio", value: 100 },
          ],
        },
      ],
    },
  },
  {
    name: "Cache",
    value: 380,
    // Uses global unit
    tooltip: {
      showSectionHeader: false,
      data: [
        {
          dataRows: [
            { label: "Browser cache", value: 200 },
            { label: "App cache", value: 180 },
          ],
        },
      ],
    },
  },
];

export const BUDGET_DATA = [
  {
    name: "Research",
    value: 450,
    unit: "K",
    tooltip: {
      showSectionHeader: false,
      data: [
        {
          dataRows: [
            { label: "Equipment", value: 180 },
            { label: "Personnel", value: 150 },
            { label: "Materials", value: 120 },
          ],
        },
      ],
    },
  },
  {
    name: "Operations",
    value: 280,
    unit: "K",
    tooltip: {
      showSectionHeader: false,
      data: [
        {
          dataRows: [
            { label: "Facilities", value: 120 },
            { label: "IT Infrastructure", value: 90 },
            { label: "Utilities", value: 70 },
          ],
        },
      ],
    },
  },
  {
    name: "Development",
    value: 170,
    unit: "K",
    tooltip: {
      showSectionHeader: false,
      data: [
        {
          dataRows: [
            { label: "Software", value: 80 },
            { label: "Training", value: 55 },
            { label: "Consulting", value: 35 },
          ],
        },
      ],
    },
  },
];

// Example with disabled items (for the "remaining" segment)
export const DATA_WITH_DISABLED = [
  {
    name: "Active",
    value: 320,
    tooltip: {
      showSectionHeader: false,
      data: [
        {
          dataRows: [
            { label: "Running processes", value: 180 },
            { label: "Active connections", value: 140 },
          ],
        },
      ],
    },
  },
  {
    name: "Inactive",
    value: 180,
    tooltip: {
      showSectionHeader: false,
      data: [
        {
          dataRows: [
            { label: "Paused processes", value: 100 },
            { label: "Idle connections", value: 80 },
          ],
        },
      ],
    },
  },
  {
    name: "Unknown",
    value: 50,
    // This item is disabled - no interactions allowed
    disabled: true,
    tooltip: {
      showSectionHeader: false,
      data: [
        {
          dataRows: [{ label: "Unclassified", value: 50 }],
        },
      ],
    },
  },
];

export const STORAGE_DATA = [
  {
    name: "Documents",
    value: 245,
    unit: "GB",
    tooltip: {
      showSectionHeader: false,
      data: [
        {
          dataRows: [
            { label: "PDFs", value: 120 },
            { label: "Word files", value: 85 },
            { label: "Spreadsheets", value: 40 },
          ],
        },
      ],
    },
  },
  {
    name: "Images",
    value: 380,
    unit: "GB",
    tooltip: {
      showSectionHeader: false,
      data: [
        {
          dataRows: [
            { label: "Raw images", value: 220 },
            { label: "Processed", value: 100 },
            { label: "Thumbnails", value: 60 },
          ],
        },
      ],
    },
  },
  {
    name: "Videos",
    value: 125,
    unit: "GB",
    tooltip: {
      showSectionHeader: false,
      data: [
        {
          dataRows: [
            { label: "HD videos", value: 85 },
            { label: "Compressed", value: 40 },
          ],
        },
      ],
    },
  },
];
