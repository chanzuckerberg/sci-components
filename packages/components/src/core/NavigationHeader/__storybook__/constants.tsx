/* eslint-disable sonarjs/no-duplicate-string */
import { SparkleIcon } from "@czi-sds/icons";
import {
  BookIcon,
  ChartBarIcon,
  ChatsIcon,
  CodeIcon,
  FlaskIcon,
  InfoIcon,
  LightbulbIcon,
  LinkIcon,
  MagnifyingGlassIcon,
  PackageIcon,
  RocketIcon,
  TerminalWindowIcon,
  UsersIcon,
} from "@phosphor-icons/react";
import CellByGeneIcon from "@components/src/common/storybook/svg/CellByGeneIcon";
import CryoEtIcon from "@components/src/common/storybook/svg/CryoEtIcon";
import { CustomNavigationLogo } from "./stories/default";

export const NAVIGATION_HEADER_LOGO_OPTIONS = {
  placeholder: <CustomNavigationLogo key="logo" />,
  empty: null,
};

export const NAVIGATION_HEADER_EXCLUDED_CONTROLS = [];

export const PRODUCTS = (mode: "light" | "dark" = "light") => [
  {
    label: "Browse Datasets",
    onClick: () => console.log("Browse Datasets clicked"),
    section: "Data",
    details: "Explore all datasets",
    icon: <MagnifyingGlassIcon weight="bold" />,
    href: "https://www.google.com",
    target: "_blank",
    component: "a",
  },
  {
    label: "API Reference",
    onClick: () => console.log("API Reference clicked"),
    section: "Data",
    details: "Use our CLI or API to access data",
    icon: <CodeIcon weight="bold" />,
  },
  {
    label: "Contribute a Dataset",
    onClick: () => console.log("Contribute a Dataset clicked"),
    section: "Data",
    details: "Share your dataset with the community",
    icon: <RocketIcon weight="bold" />,
  },
  {
    label: "CZ CELL×GENE",
    onClick: () => console.log("CZ CELL×GENE clicked"),
    section: "Repositories",
    details: "Single-cell multiomic data",
    icon: <CellByGeneIcon innerColor={mode === "dark" ? "white" : "black"} />,
  },
  {
    label: "CryoET",
    onClick: () => console.log("CryoET clicked"),
    section: "Repositories",
    details: "High-resolution 3D sub-cellular tomograms",
    icon: <CryoEtIcon innerColor={mode === "dark" ? "white" : "black"} />,
  },
  {
    label: "scBaseCamp",
    onClick: () => console.log("scBaseCamp clicked"),
    section: "Featured Data",
    icon: <SparkleIcon weight="bold" />,
  },
  {
    label: "Billion Cell Project",
    onClick: () => console.log("Billion Cell Project clicked"),
    section: "Featured Data",
    icon: <SparkleIcon weight="bold" />,
  },
  {
    label: "CELL×STATE",
    onClick: () => console.log("CELL×STATE clicked"),
    section: "Featured Data",
    icon: <SparkleIcon weight="bold" />,
  },
  {
    label: "Open Cell Microscopy Images",
    onClick: () => console.log("Open Cell Microscopy Images clicked"),
    section: "Featured Data",
    icon: <SparkleIcon weight="bold" />,
  },
];

export const SERVICES = [
  {
    label: "Technical Support",
    onClick: () => console.log("Technical Support clicked"),
    section: "Support",
    details: "Get help from our expert team",
    icon: <InfoIcon weight="bold" />,
  },
  {
    label: "Community Forum",
    onClick: () => console.log("Community Forum clicked"),
    section: "Support",
    details: "Connect with other users and share insights",
    icon: <UsersIcon weight="bold" />,
  },
  {
    label: "Documentation",
    onClick: () => console.log("Documentation clicked"),
    section: "Support",
    details: "Comprehensive guides and tutorials",
    icon: <BookIcon weight="bold" />,
  },
  {
    label: "Workshops",
    onClick: () => console.log("Workshops clicked"),
    section: "Training",
    details: "Live instructor-led sessions",
    icon: <ChatsIcon weight="bold" />,
  },
  {
    label: "Online Courses",
    onClick: () => console.log("Online Courses clicked"),
    section: "Training",
    details: "This item is without an icon",
  },
  {
    label: "Books and Articles",
    onClick: () => console.log("Online Courses clicked"),
    section: "Training",
  },
  {
    label: "Custom Development",
    onClick: () => console.log("Custom Development clicked"),
    section: "Consulting",
    details:
      "Custom development services for your project needs and goals with a team of experts in the field of single-cell biology and single-cell genomics data analysis.",
    icon: <CodeIcon weight="bold" />,
  },
  {
    label: "Integration Services",
    onClick: () => console.log("Integration Services clicked"),
    section: "Consulting",
    icon: <LinkIcon weight="bold" />,
  },
  {
    label: "Data Analysis Consulting",
    onClick: () => console.log("Data Analysis Consulting clicked"),
    section: "Consulting",
  },
];

export const RESEARCH = [
  {
    label: "Research",
    onClick: () => console.log("Research clicked"),
    section: "Research",
    details:
      "Explore data portals, software packages, and hardware from the BioHub Network",
    icon: <FlaskIcon weight="bold" />,
  },
  {
    label: "Tech Blog",
    onClick: () => console.log("Tech Blog clicked"),
    section: "Writing",
    details:
      "Read about recent technology advancements from the BioHub Network",
    icon: <LightbulbIcon weight="bold" />,
  },
];

export const BENCHMARKS = [
  {
    label: "Benchmark Results",
    onClick: () => console.log("Benchmark Results clicked"),
    section: "Benchmarks",
    details:
      "Web-based interface to explore and compare model performance on benchmark tasks",
    icon: <ChartBarIcon weight="bold" />,
  },
  {
    label: "Benchmark Package",
    onClick: () => console.log("Benchmark Package clicked"),
    section: "Benchmarks",
    details:
      "Modular Python benchmarking package that’s easy to integrate with experiment-tracking tools like TensorBoard or MLflow",
    icon: <PackageIcon weight="bold" />,
  },
  {
    label: "Benchmark CLI",
    onClick: () => console.log("Benchmark CLI clicked"),
    section: "Benchmarks",
    details:
      "Command-line tool to reproducibly evaluate models against curated datasets, tasks, and metrics",
    icon: <TerminalWindowIcon weight="bold" />,
  },
];
