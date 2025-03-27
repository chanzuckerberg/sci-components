import { NavigationHeaderProps, NavigationHeader } from "@czi-sds/components";
import { useState } from "react";

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
          sdsStyle: "rounded",
          sdsType: "primary",
        },
        {
          children: "Secondary",
          sdsStyle: "rounded",
          sdsType: "secondary",
        },
        {
          children: "My Profile",
          icon: "Person",
          sdsStyle: "icon",
        },
      ]}
      hasInvertedStyle={false}
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
          itemType: "dropdown",
          items: [
            { label: "Item 1", onClick: () => alert("clicked on item 1") },
            { label: "Item 2", onClick: () => alert("clicked on item 2") },
          ],
          label: "Secondary",
        },
        {
          itemType: "text",
          label: "Secondary",
          onClick: () => alert("clicked on secondary"),
        },
      ]}
      showSearch={true}
      tag="Beta"
      tagColor="beta"
      position="sticky"
      scrollElevation={true}
    />
  );
};
