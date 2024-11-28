import { Meta } from "@storybook/react";
import NavigationHeader, {
  NavigationHeaderProps,
  NavigationHeaderPrimaryNav,
  NavigationHeaderSecondaryNav,
} from "./index";
import { useState } from "react";
import Button from "../Button";
import Icon from "../Icon";
import { useMediaQuery, useTheme } from "@mui/material";
import { getTypography } from "../styles";

function NavigationHeaderWrapper(props: NavigationHeaderProps) {
  const [activePrimaryNavKey, setActivePrimaryNavKey] = useState("1");
  const theme = useTheme();
  const isNarrow = useMediaQuery(theme.breakpoints.down("md"));
  const typography = getTypography({ theme });

  return (
    <NavigationHeader
      {...props}
      logo={
        <div
          style={{
            alignItems: "center",
            border: "1px dashed black",
            display: "flex",
            fontSize: 10,
            height: 24,
            justifyContent: "center",
            width: 50,
          }}
        >
          Logo slot
        </div>
      }
      primaryNav={
        <NavigationHeaderPrimaryNav
          onChange={setActivePrimaryNavKey}
          value={activePrimaryNavKey}
          items={[
            {
              key: "1",
              label: "Primary",
            },
            {
              key: "2",
              label: "Primary",
              tag: "BETA",
              tagColor: "beta",
            },
          ]}
        />
      }
      secondaryNav={
        <NavigationHeaderSecondaryNav
          items={[
            {
              items: [
                { label: "Item 1", onClick: () => alert("clicked on item 1") },
                { label: "Item 2", onClick: () => alert("clicked on item 2") },
              ],
              label: "Secondary",
              type: "dropdown",
            },

            {
              label: "Secondary",
              onClick: () => alert("clicked on secondary"),
              type: "text",
            },
          ]}
        />
      }
    >
      <Button sdsStyle="rounded" sdsType="primary">
        Primary
      </Button>

      <Button sdsStyle="rounded" sdsType="secondary">
        Secondary
      </Button>

      {isNarrow ? (
        <Button
          startIcon={<Icon sdsIcon="Person" sdsSize="l" sdsType="button" />}
          sdsStyle="minimal"
          sdsType="secondary"
          sx={typography?.mobileStyles.body.semibold.m}
        >
          My Profile
        </Button>
      ) : (
        <Button startIcon="Person" sdsStyle="minimal" sdsType="secondary" />
      )}
    </NavigationHeader>
  );
}

export default {
  argTypes: {
    primaryNavPosition: {
      control: { type: "select" },
      options: ["left", "right"],
    },
  },

  args: {
    tag: "BETA",
    tagColor: "beta",
    title: "Logo Name",
  } satisfies NavigationHeaderProps,

  component: NavigationHeaderWrapper,
  title: "Components/NavigationHeader",
} as Meta;

export const Default = {};
