import { CustomNavigationLogo } from "./stories/default";

export const NAVIGATION_HEADER_LOGO_OPTIONS = [
  <CustomNavigationLogo key="logo" />,
  null,
];

export const NAVIGATION_HEADER_EXCLUDED_CONTROLS = [];

export const SECTIONED_NAV_ITEMS = [
  {
    label: "Data Analysis Tools",
    onClick: () => alert("Data Analysis Tools clicked"),
    section: "Analytics",
  },
  {
    label: "Visualization Suite",
    onClick: () => alert("Visualization Suite clicked"),
    section: "Analytics",
  },
  {
    label: "Report Generator",
    onClick: () => alert("Report Generator clicked"),
    section: "Analytics",
  },
  {
    label: "Cloud Storage",
    onClick: () => alert("Cloud Storage clicked"),
    section: "Infrastructure",
  },
  {
    label: "API Gateway",
    onClick: () => alert("API Gateway clicked"),
    section: "Infrastructure",
  },
  {
    label: "Authentication",
    onClick: () => alert("Authentication clicked"),
    section: "Infrastructure",
  },
  {
    label: "Documentation",
    onClick: () => alert("Documentation clicked"),
  },
  {
    label: "Help Center",
    onClick: () => alert("Help Center clicked"),
  },
];
