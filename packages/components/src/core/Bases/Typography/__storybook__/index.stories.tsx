import { Meta } from "@storybook/react";
import { BADGE } from "src/common/storybook/storybookBadges";
import Typography from "./components";

export default {
  parameters: {
    badges: [BADGE.STABLE],
  },
  title: "Bases/Typography",
} as Meta;

// Title Typography

export const TitleTypography = {
  render: () => <Typography categories={["title"]} />,
};

// Header Typography

export const HeaderTypography = {
  render: () => <Typography categories={["header"]} />,
};

// Body Typography

export const BodyTypography = {
  render: () => <Typography categories={["body"]} />,
};

// Code Typography

export const CodeTypography = {
  render: () => <Typography categories={["code"]} />,
};

// Caps Typography

export const CapsTypography = {
  render: () => <Typography categories={["caps"]} />,
};

// Tabular Typography

export const TabularTypography = {
  render: () => <Typography categories={["tabular"]} />,
};

// Link Typography

export const LinkTypography = {
  render: () => <Typography categories={["link"]} />,
};
