import { Meta } from "@storybook/react";
import Header, {
  HeaderProps,
  HeaderPrimaryNav,
  HeaderSecondaryNav,
} from "./index";
import { useState } from "react";
import Button from "../Button";
import Icon from "../Icon";
import { useMediaQuery, useTheme } from "@mui/material";
import { getTypography } from "../styles";

function HeaderWrapper(props: HeaderProps) {
  const [activePrimaryNavKey, setActivePrimaryNavKey] = useState("1");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const typography = getTypography({ theme });

  return (
    <Header
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
        <HeaderPrimaryNav
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
        <HeaderSecondaryNav
          items={[
            {
              type: "dropdown",
              label: "Secondary",
              items: [
                { label: "Item 1", onClick: () => alert("clicked on item 1") },
                { label: "Item 2", onClick: () => alert("clicked on item 2") },
              ],
            },

            {
              type: "text",
              label: "Secondary",
              onClick: () => alert("clicked on secondary"),
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

      {isMobile ? (
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
    </Header>
  );
}

export default {
  component: HeaderWrapper,
  title: "Components/Header",
  argTypes: {
    primaryNavPosition: {
      control: { type: "select" },
      options: ["left", "right"],
    },
  },
  args: {
    title: "Logo Name",
    tag: "BETA",
    tagColor: "beta",
  } satisfies HeaderProps,
} as Meta;

export const Default = {};
