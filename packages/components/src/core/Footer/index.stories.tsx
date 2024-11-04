import { Meta } from "@storybook/react/*";
import Footer, { FooterNavItem, FooterProps } from "./index";
import Icon from "../Icon";
import { ReactNode } from "react";

function ExampleLogo({
  children,
  height,
  width,
}: {
  children?: ReactNode;
  height: number;
  width: number;
}) {
  return (
    <div
      style={{
        width,
        height,
        fontSize: 10,
        whiteSpace: "nowrap",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "1px dashed black",
      }}
    >
      {children}
    </div>
  );
}

export default {
  component: Footer,
  title: "Components/Footer",
  args: {
    title: "Logo Name",
    tag: "BETA",
    tagColor: "beta",

    navItems: Array.from(Array(5)).map<FooterNavItem>((_, idx) => ({
      label: `Nav Item ${idx + 1}`,
      url: `https://example.com/nav/${idx + 1}`,
    })),

    navLinks: Array.from(Array(5)).map<FooterNavItem>((_, idx) => ({
      label: `Link Item ${idx + 1}`,
      url: `https://example.com/nav/${idx + 1}`,
    })),

    logo: (
      <ExampleLogo width={50} height={24}>
        Logo Slot
      </ExampleLogo>
    ),

    images: [
      <ExampleLogo width={100} height={40}>
        Image Slot
      </ExampleLogo>,

      <ExampleLogo width={100} height={40}>
        Image Slot
      </ExampleLogo>,

      <ExampleLogo width={100} height={40}>
        Image Slot
      </ExampleLogo>,
    ],
  } satisfies FooterProps,
} as Meta;

export const Default = {};
