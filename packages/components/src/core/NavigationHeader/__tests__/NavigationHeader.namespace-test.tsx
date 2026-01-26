import { NavigationHeaderProps, NavigationHeader } from "@czi-sds/components";
import { useState } from "react";
import Icon from "src/core/Icon";

const NavigationHederNameSpaceTest = (props: NavigationHeaderProps) => {
  const [activePrimaryNavKey, setActivePrimaryNavKey] = useState("1");

  return (
    <NavigationHeader
      title="Title"
      activePrimaryNavKey={activePrimaryNavKey}
      setActivePrimaryNavKey={setActivePrimaryNavKey}
      buttons={[
        {
          children: "Primary",
          sdsStyle: "solid",
          sdsType: "primary",
        },
        {
          children: "Secondary",
          sdsStyle: "solid",
          sdsType: "secondary",
        },
        {
          children: <Icon sdsIcon="Person" sdsSize="s" />,
          sdsStyle: "minimal",
        },
      ]}
      backgroundAppearance="matchBackground"
      logo={<div>Logo</div>}
      logoUrl="https://chanzuckerberg.com"
      primaryNavItems={[
        {
          itemType: "text",
          key: "1",
          label: "Primary",
        },
        {
          itemType: "text",
          key: "2",
          label: "Primary",
          tag: "Beta",
          tagColor: "beta",
        },
      ]}
      secondaryNavItems={[
        {
          key: "3",
          itemType: "dropdown",
          items: [
            { label: "Item 1", onClick: () => alert("clicked on item 1") },
            { label: "Item 2", onClick: () => alert("clicked on item 2") },
          ],
          label: "Secondary",
        },
        {
          key: "4",
          itemType: "text",
          label: "Secondary",
          onClick: () => alert("clicked on secondary"),
        },
      ]}
      showSearch={true}
      tag="Beta"
      tagColor="beta"
      isSticky={true}
      scrollElevation={true}
    />
  );
};
