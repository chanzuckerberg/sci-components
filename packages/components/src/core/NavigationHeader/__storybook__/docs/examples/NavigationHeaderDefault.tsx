// The default dropdown style: primary items on the left of the search field,
// secondary items and buttons on the right. Nav items are data, not children,
// so the header owns the markup for every row.

import {
  Icon,
  NavigationHeader,
  getSemanticColors,
  type CommonThemeProps,
  type NavigationHeaderPrimaryNavItem,
  type NavigationHeaderSecondaryNavItem,
} from "@czi-sds/components";
import styled from "@emotion/styled";
import { useState } from "react";

const Logo = styled.div<CommonThemeProps>`
  ${(props) => {
    const semanticColors = getSemanticColors(props);

    return `
      align-items: center;
      border: 1px dashed ${semanticColors?.base?.borderPrimary};
      color: ${semanticColors?.base?.textSecondary};
      display: flex;
      font-size: 10px;
      height: 24px;
      justify-content: center;
      width: 50px;
    `;
  }}
`;

const primaryNavItems: NavigationHeaderPrimaryNavItem<string>[] = [
  {
    itemType: "text",
    key: "datasets",
    label: "Datasets",
    onClick: () => console.log("Datasets clicked"),
  },
  {
    itemType: "dropdown",
    items: [
      { label: "Cell types", onClick: () => console.log("Cell types clicked") },
      { label: "Genes", onClick: () => console.log("Genes clicked") },
    ],
    key: "explore",
    label: "Explore",
  },
];

const secondaryNavItems: NavigationHeaderSecondaryNavItem<string>[] = [
  {
    itemType: "text",
    key: "docs",
    label: "Docs",
    onClick: () => console.log("Docs clicked"),
  },
];

function App() {
  const [activePrimaryNavKey, setActivePrimaryNavKey] = useState("datasets");

  return (
    <div className="app">
      <NavigationHeader
        activePrimaryNavKey={activePrimaryNavKey}
        setActivePrimaryNavKey={setActivePrimaryNavKey}
        buttons={[
          { children: "Sign in", sdsStyle: "outline", sdsType: "primary" },
          {
            children: <Icon sdsIcon="Person" sdsSize="s" />,
            onClick: () => console.log("Profile clicked"),
            sdsStyle: "minimal",
            sdsType: "secondary",
          },
        ]}
        isSticky={false}
        logo={<Logo>Logo slot</Logo>}
        logoUrl="https://chanzuckerberg.com"
        menuProps={{ disablePortal: true, disableScrollLock: true }}
        primaryNavItems={primaryNavItems}
        secondaryNavItems={secondaryNavItems}
        showSearch={false}
        tag="Beta"
        tagColor="beta"
        title="Cell Atlas"
      />
    </div>
  );
}

export default App;
