import { Box, Container, useTheme } from "@mui/material";
import { Args } from "@storybook/react-webpack5";
import { useState } from "react";
import { getSemanticColors } from "src/core/styles";
import RawNavigationHeader, {
  NavigationHeaderPrimaryNavItem,
  NavigationHeaderSecondaryNavItem,
} from "src/core/NavigationHeader";
import { EXTRA_LONG_LOREM_IPSUM } from "src/common/storybook/loremIpsum";

export const CustomNavigationLogo = (): JSX.Element => {
  const theme = useTheme();
  const colors = getSemanticColors({ theme });

  return (
    <div
      style={{
        alignItems: "center",
        border: `1px dashed ${colors?.base.borderPrimary}`,
        display: "flex",
        fontSize: 10,
        fontWeight: "normal",
        height: 24,
        justifyContent: "center",
        width: 50,
      }}
    >
      Logo slot
    </div>
  );
};

export const NavigationHeader = (
  props: Args & { theme: "light" | "dark" }
): JSX.Element => {
  const {
    title,
    theme,
    primaryNavItems,
    secondaryNavItems,
    backgroundAppearance,
    ...rest
  } = props;
  const [activePrimaryNavKey, setActivePrimaryNavKey] = useState("");

  const mode = backgroundAppearance === "dark" ? "dark" : theme;

  const processNavItems = (items: unknown) => {
    if (!Array.isArray(items)) return items;

    return items.map((item: unknown) => {
      const navItem = item as { itemType?: string; items?: unknown };

      if (
        navItem.itemType === "dropdown" &&
        typeof navItem.items === "function"
      ) {
        return {
          ...navItem,
          items: (navItem.items as (mode: "light" | "dark") => unknown[])(mode),
        };
      }
      return navItem;
    });
  };

  const primaryNavItemsNew = processNavItems(primaryNavItems) as
    | NavigationHeaderPrimaryNavItem<string>[]
    | undefined;
  const secondaryNavItemsNew = processNavItems(secondaryNavItems) as
    | NavigationHeaderSecondaryNavItem[]
    | undefined;

  return (
    <>
      <RawNavigationHeader
        {...rest}
        primaryNavItems={primaryNavItemsNew}
        secondaryNavItems={secondaryNavItemsNew}
        backgroundAppearance={backgroundAppearance}
        title={title}
        activePrimaryNavKey={activePrimaryNavKey}
        setActivePrimaryNavKey={setActivePrimaryNavKey}
      />
      <Container>
        <Box>
          {[...new Array(10)].map((_, idx) => (
            <p key={idx}>{EXTRA_LONG_LOREM_IPSUM}</p>
          ))}
        </Box>
      </Container>
    </>
  );
};
