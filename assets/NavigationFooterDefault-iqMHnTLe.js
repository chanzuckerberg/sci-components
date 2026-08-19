import{i as e}from"./preload-helper-xPQekRTU.js";var t;e((()=>{t=`// The footer takes three separate lists: navItems sit beside the logo on the
// top row, navLinks run along the bottom row separated by dividers, and images
// sit opposite them.

import {
  NavigationFooter,
  getSemanticColors,
  type CommonThemeProps,
} from "@czi-sds/components";
import styled from "@emotion/styled";

const Placeholder = styled.div<CommonThemeProps & { boxWidth: number }>\`
  \${(props) => {
    const semanticColors = getSemanticColors(props);

    return \`
      align-items: center;
      border: 1px dashed \${semanticColors?.base?.borderPrimary};
      color: \${semanticColors?.base?.textSecondary};
      display: flex;
      font-size: 10px;
      height: 24px;
      justify-content: center;
      white-space: nowrap;
      width: \${props.boxWidth}px;
    \`;
  }}
\`;

function App() {
  return (
    <div className="app">
      <NavigationFooter
        images={[
          {
            image: <Placeholder boxWidth={80}>Partner logo</Placeholder>,
            url: "https://chanzuckerberg.com",
          },
        ]}
        logo={<Placeholder boxWidth={64}>Logo slot</Placeholder>}
        logoUrl="https://chanzuckerberg.com"
        navItems={[
          { label: "Datasets", url: "/datasets" },
          { label: "Documentation", url: "/docs" },
          { label: "Support", url: "/support" },
        ]}
        navLinks={[
          { label: "Privacy", url: "/privacy" },
          { label: "Terms", url: "/terms" },
          { label: "Contact us", url: "/contact" },
        ]}
        tag="Beta"
        tagColor="beta"
        title="Cell Atlas"
      />
    </div>
  );
}

export default App;
`}))();export{t as default};