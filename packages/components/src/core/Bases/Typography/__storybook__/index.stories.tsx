import { Meta } from "@storybook/react-vite";
import Typography from "./components";

export default {
  parameters: {
    /**
     * A Bases story is documentation — a specimen of the type scale the page
     * renders in place — and the accessibility suite is for the components,
     * which answer for themselves in their own stories. Two keys because there
     * are two suites: `a11y` is addon-a11y's, `axe` is axe-storybook-testing's.
     */
    a11y: { test: "off" },
    axe: { skip: true },
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
