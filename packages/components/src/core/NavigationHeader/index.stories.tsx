import { Meta } from "@storybook/react";
import NavigationHeader, { NavigationHeaderProps } from "./index";
import { useState } from "react";
import { useTheme } from "@mui/material";
import { getSemanticColors } from "../styles";

function NavigationHeaderWrapper(props: NavigationHeaderProps) {
  const [activePrimaryNavKey, setActivePrimaryNavKey] = useState("1");
  const theme = useTheme();
  const colors = getSemanticColors({ theme });

  return (
    <NavigationHeader
      {...props}
      logoUrl="http://example.com"
      logo={
        <div
          style={{
            alignItems: "center",
            border: `1px dashed ${colors?.base.border}`,
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
      }
      activePrimaryNavKey={activePrimaryNavKey}
      setActivePrimaryNavKey={setActivePrimaryNavKey}
      primaryNavItems={[
        {
          key: "1",
          label: "Primary",
        },
        {
          key: "2",
          label: "Primary",
          tag: "Beta",
          tagColor: "beta",
        },
      ]}
      secondaryNavItems={[
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
      buttons={[
        { children: "Primary", sdsType: "primary" },
        { children: "Secondary", sdsType: "secondary" },
        { children: "My Profile", icon: "Person" },
      ]}
    />
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
    hasInvertedStyle: false,
    tag: "Beta",
    tagColor: "beta",
    title: "Logo Name",
  } satisfies NavigationHeaderProps,

  component: NavigationHeaderWrapper,
  title: "Components/NavigationHeader",
} as Meta;

export const Default = {};
