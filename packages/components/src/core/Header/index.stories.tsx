import { Meta } from "@storybook/react";
import Header, {
  HeaderProps,
  HeaderPrimaryNav,
  HeaderSecondaryNav,
} from "./index";
import { useState } from "react";
import Button from "../Button";
import Icon from "../Icon";

function HeaderWrapper(props: HeaderProps) {
  const [activePrimaryNavKey, setActivePrimaryNavKey] = useState("1");

  return (
    <Header
      {...props}
      logo={<Icon sdsIcon="Bacteria" sdsSize="xl" sdsType="static" />}
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
            // {
            //   key: "3",
            //   label: "Primary Link 3",
            // },
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

      <Button
        icon="Person"
        sdsStyle="icon"
        sdsType="secondary"
        sdsIconProps={{
          sdsSize: "s",
        }}
      />
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
