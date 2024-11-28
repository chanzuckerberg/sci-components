import { Meta } from "@storybook/react/*";
import NavigationFooter, {
  NavigationFooterNavItem,
  NavigationFooterProps,
} from "./index";
import { ReactNode } from "react";
import { getSemanticColors } from "../styles";
import { useTheme } from "@mui/material";

function ExampleLogo({
  children,
  height,
  width,
}: {
  children?: ReactNode;
  height: number;
  width: number;
}) {
  const theme = useTheme();
  const colors = getSemanticColors({ theme });

  return (
    <div
      style={{
        alignItems: "center",
        border: `1px dashed ${colors?.base.border}`,
        color: colors?.base.textPrimary,
        display: "flex",
        fontSize: 10,
        fontWeight: "normal",
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
      {
        image: (
          <ExampleLogo width={100} height={40}>
            Image Slot
          </ExampleLogo>
        ),
        url: "https://example.com/1",
      },

      {
        image: (
          <ExampleLogo width={100} height={40}>
            Image Slot
          </ExampleLogo>
        ),
        url: "https://example.com/2",
      },

      {
        image: (
          <ExampleLogo width={100} height={40}>
            Image Slot
          </ExampleLogo>
        ),
        url: "https://example.com/3",
      },
    ],

    logo: (
      <ExampleLogo width={50} height={24}>
        Logo Slot
      </ExampleLogo>
    ),

    logoUrl: "https://example.com",

    navItems: Array.from(Array(5)).map<NavigationFooterNavItem>((_, idx) => ({
      label: `Nav Item ${idx + 1}`,
      url: `https://example.com/nav/${idx + 1}`,
    })),

    navLinks: Array.from(Array(5)).map<NavigationFooterNavItem>((_, idx) => ({
      label: `Link Item ${idx + 1}`,
      url: `https://example.com/nav/${idx + 1}`,
    })),

    tag: "Beta",
    tagColor: "beta",
    title: "Logo Name",
  } satisfies NavigationFooterProps,

  component: NavigationFooter,
  title: "Components/NavigationFooter",
} as Meta;

export const Default = {};
