import { Meta } from "@storybook/react/*";
import NavigationFooter, {
  NavigationFooterNavItem,
  NavigationFooterProps,
} from "./index";
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
        alignItems: "center",
        border: "1px dashed black",
        display: "flex",
        fontSize: 10,
        height,
        justifyContent: "center",
        whiteSpace: "nowrap",
        width,
      }}
    >
      {children}
    </div>
  );
}

export default {
  args: {
    images: [
      <ExampleLogo key="1" width={100} height={40}>
        Image Slot
      </ExampleLogo>,

      <ExampleLogo key="2" width={100} height={40}>
        Image Slot
      </ExampleLogo>,

      <ExampleLogo key="3" width={100} height={40}>
        Image Slot
      </ExampleLogo>,
    ],

    logo: (
      <ExampleLogo width={50} height={24}>
        Logo Slot
      </ExampleLogo>
    ),

    navItems: Array.from(Array(5)).map<NavigationFooterNavItem>((_, idx) => ({
      label: `Nav Item ${idx + 1}`,
      url: `https://example.com/nav/${idx + 1}`,
    })),

    navLinks: Array.from(Array(5)).map<NavigationFooterNavItem>((_, idx) => ({
      label: `Link Item ${idx + 1}`,
      url: `https://example.com/nav/${idx + 1}`,
    })),

    tag: "BETA",
    tagColor: "beta",
    title: "Logo Name",
  } satisfies NavigationFooterProps,

  component: NavigationFooter,
  title: "Components/NavigationFooter",
} as Meta;

export const Default = {};
