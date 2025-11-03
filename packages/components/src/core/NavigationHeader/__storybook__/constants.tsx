/* eslint-disable sonarjs/no-duplicate-string */
import CellByGeneIcon from "src/common/storybook/svg/CellByGeneIcon";
import CryoEtIcon from "src/common/storybook/svg/CryoEtIcon";
import { CustomNavigationLogo } from "./stories/default";

export const NAVIGATION_HEADER_LOGO_OPTIONS = [
  <CustomNavigationLogo key="logo" />,
  null,
];

export const NAVIGATION_HEADER_EXCLUDED_CONTROLS = [];

export const PRODUCTS = [
  {
    label: "Browse Datasets",
    onClick: () => alert("Browse Datasets clicked"),
    section: "Data",
    details: "Explore all datasets",
    icon: "Search",
  },
  {
    label: "API Reference",
    onClick: () => alert("API Reference clicked"),
    section: "Data",
    details: "Use our CLI or API to access data",
    icon: "Code",
  },
  {
    label: "Contribute a Dataset",
    onClick: () => alert("Contribute a Dataset clicked"),
    section: "Data",
    details: "Share your dataset with the community",
    icon: "Rocket",
  },
  {
    label: "CZ CELL×GENE",
    onClick: () => alert("CZ CELL×GENE clicked"),
    section: "Repositories",
    details: "Single-cell multiomic data",
    icon: <CellByGeneIcon />,
  },
  {
    label: "CryoET",
    onClick: () => alert("CryoET clicked"),
    section: "Repositories",
    details: "High-resolution 3D sub-cellular tomograms",
    icon: <CryoEtIcon />,
  },
  {
    label: "scBaseCamp",
    onClick: () => alert("scBaseCamp clicked"),
    section: "Featured Data",
    icon: "Sparkle",
  },
  {
    label: "Billion Cell Project",
    onClick: () => alert("Billion Cell Project clicked"),
    section: "Featured Data",
    icon: "Sparkle",
  },
  {
    label: "CELL×STATE",
    onClick: () => alert("CELL×STATE clicked"),
    section: "Featured Data",
    icon: "Sparkle",
  },
  {
    label: "Open Cell Microscopy Images",
    onClick: () => alert("Open Cell Microscopy Images clicked"),
    section: "Featured Data",
    icon: "Sparkle",
  },
];

export const SERVICES = [
  {
    label: "Technical Support",
    onClick: () => alert("Technical Support clicked"),
    section: "Support",
    details: "Get help from our expert team",
    icon: "InfoCircle",
  },
  {
    label: "Community Forum",
    onClick: () => alert("Community Forum clicked"),
    section: "Support",
    details: "Connect with other users and share insights",
    icon: "People",
  },
  {
    label: "Documentation",
    onClick: () => alert("Documentation clicked"),
    section: "Support",
    details: "Comprehensive guides and tutorials",
    icon: "Book",
  },
  {
    label: "Workshops",
    onClick: () => alert("Workshops clicked"),
    section: "Training",
    details: "Live instructor-led sessions",
    icon: "SpeechBubbles",
  },
  {
    label: "Online Courses",
    onClick: () => alert("Online Courses clicked"),
    section: "Training",
    details: "This item is without an icon",
  },
  {
    label: "Books and Articles",
    onClick: () => alert("Online Courses clicked"),
    section: "Training",
  },
  {
    label: "Custom Development",
    onClick: () => alert("Custom Development clicked"),
    section: "Consulting",
    details:
      "Custom development services for your project needs and goals with a team of experts in the field of single-cell biology and single-cell genomics data analysis.",
    icon: "Code",
  },
  {
    label: "Integration Services",
    onClick: () => alert("Integration Services clicked"),
    section: "Consulting",
    icon: "Link",
  },
  {
    label: "Data Analysis Consulting",
    onClick: () => alert("Data Analysis Consulting clicked"),
    section: "Consulting",
  },
];

export const DOCUMENTATION = [
  {
    label: "Documentation",
    onClick: () => alert("Documentation clicked"),
    section: "Documentation",
    details: "Comprehensive guides and tutorials",
    icon: "Book",
  },
  {
    label: "API Reference",
    onClick: () => alert("API Reference clicked"),
    section: "Documentation",
    details: "Use our CLI or API to access data",
    icon: "Code",
  },
  {
    label: "Contribute a Dataset",
    onClick: () => alert("Contribute a Dataset clicked"),
    section: "Documentation",
    details: "Share your dataset with the community",
    icon: "Rocket",
  },
  {
    label: "Code of Conduct",
    onClick: () => alert("Code of Conduct clicked"),
    section: "Documentation",
    details: "Our code of conduct",
  },
  {
    label: "Privacy Policy",
    onClick: () => alert("Privacy Policy clicked"),
    section: "Legal",
    icon: "EyeClosed",
  },
  {
    label: "Terms of Service",
    onClick: () => alert("Terms of Service clicked"),
    section: "Legal",
    icon: "Scale",
  },
  {
    label: "Cookie Policy",
    onClick: () => alert("Cookie Policy clicked"),
    section: "Legal",
  },
];
