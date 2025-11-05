import { Box, Container } from "@mui/material";
import { Args } from "@storybook/react-webpack5";
import { useState } from "react";
import RawNavigationHeader, {
  NavigationHeaderPrimaryNavItem,
  NavigationHeaderSecondaryNavItem,
} from "src/core/NavigationHeader";
import { EXTRA_LONG_LOREM_IPSUM } from "src/common/storybook/loremIpsum";
import { PRODUCTS, SERVICES, BENCHMARKS, RESEARCH } from "../constants";
import { DropdownItem } from "../../components/NavigationHeaderPrimaryNav";

export const DrawerStyleDemo = (
  props: Args & { theme: "light" | "dark" }
): JSX.Element => {
  const {
    title,
    theme,
    backgroundAppearance,
    initialActivePrimaryNavKey = "home",
    ...rest
  } = props;
  const [activePrimaryNavKey, setActivePrimaryNavKey] = useState(
    initialActivePrimaryNavKey
  );

  const mode = backgroundAppearance === "dark" ? "dark" : theme;

  // Primary nav items - clicking dropdown items automatically sets parent as active
  const primaryNavItems: NavigationHeaderPrimaryNavItem<string>[] = [
    {
      itemType: "text",
      key: "home",
      label: "Home",
      onClick: () => {
        console.log("Home clicked");
      },
    },
    {
      itemType: "dropdown",
      items: PRODUCTS(mode) as DropdownItem[],
      key: "products",
      label: "Products",
      onClick: () => console.log("Products dropdown clicked"),
      defaultUrl: "https://www.google.com",
      target: "_blank",
      rel: "noopener noreferrer",
      sectionProps: {
        Repositories: {
          actions: [
            {
              label: "Browse All",
              href: "/repositories",
            },
          ],
        },
      },
    },
    {
      itemType: "dropdown",
      items: SERVICES as DropdownItem[],
      key: "services",
      label: "Services",
      onClick: () => console.log("Services dropdown clicked"),
      defaultUrl: "/services",
      sectionProps: {
        Training: {
          actions: [
            {
              label: "Primary Action",
              onClick: () => console.log("Primary Action clicked"),
            },
            {
              label: "Secondary Action",
              onClick: () => console.log("Secondary Action clicked"),
            },
          ],
        },
        Consulting: {
          actions: [
            {
              label: "Read More",
              href: "/#",
            },
          ],
        },
      },
    },
    {
      itemType: "dropdown",
      items: BENCHMARKS as DropdownItem[],
      key: "benchmarks",
      label: "Benchmarks",
      onClick: () => console.log("Benchmarks dropdown clicked"),
      defaultUrl: "https://www.google.com",
      target: "_blank",
      rel: "noopener noreferrer",
      sectionProps: {
        Benchmarks: {
          colSpan: 2,
        },
      },
    },
  ];

  // Secondary nav items
  const secondaryNavItems: NavigationHeaderSecondaryNavItem[] = [
    {
      itemType: "dropdown",
      items: RESEARCH as DropdownItem[],
      key: "research",
      label: "Research",
      onClick: () => console.log("Research dropdown clicked"),
      defaultUrl: "/research",
    },
  ];

  return (
    <>
      <RawNavigationHeader
        {...rest}
        primaryNavItems={primaryNavItems}
        secondaryNavItems={secondaryNavItems}
        backgroundAppearance={backgroundAppearance}
        title={title}
        activePrimaryNavKey={activePrimaryNavKey}
        setActivePrimaryNavKey={setActivePrimaryNavKey}
      />
      <Container>
        <Box>
          <Box sx={{ padding: "20px 0" }}>
            <h2>Active Primary Nav Key: {activePrimaryNavKey || "(none)"}</h2>
            <p>
              Click on any navigation item or action button to see the active
              state indicator update. When you click an item inside a dropdown,
              the dropdown trigger will remain highlighted to show you&apos;re
              in that section.
            </p>
          </Box>
          {[...new Array(10)].map((_, idx) => (
            <p key={idx}>{EXTRA_LONG_LOREM_IPSUM}</p>
          ))}
        </Box>
      </Container>
    </>
  );
};
