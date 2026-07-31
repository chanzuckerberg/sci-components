// sdsStyle="drawer" opens a full-width panel on hover instead of a menu on
// click. It is the only style that draws item icons and the per-section
// actions, and backgroundAppearance="dark" inverts the whole header.
//
// The panel is a MUI Drawer that normally portals to the page body and fixes
// itself to the viewport, which on this page would cover the docs instead of
// the example. The theme below turns that portal off, the CSS anchors the panel
// to the example, and the focus options stop it from scrolling itself into
// view. A real page, where the header spans the viewport, needs none of it.

import {
  NavigationHeader,
  fontBodyS,
  getSemanticColors,
  type CommonThemeProps,
  type NavigationHeaderPrimaryNavItem,
} from "@czi-sds/components";
import styled from "@emotion/styled";
import { ThemeProvider, createTheme, useTheme } from "@mui/material/styles";
import { useMemo, useState } from "react";

const Stage = styled.div`
  min-height: 380px;
  position: relative;

  /* The panel, its backdrop, and the modal wrapper are all fixed to the
     viewport by default; anchoring them to this box keeps them in the frame. */
  .MuiModal-root,
  .MuiBackdrop-root,
  .MuiDrawer-paper {
    position: absolute;
  }

  /* The backdrop blurs the page behind the panel. Anchored here it covers only
     the bar, so it would blur the header rather than anything behind it. */
  && .MuiBackdrop-root {
    display: none;
  }

  /* Without the portal the panel renders inside the header, which clips it. */
  header.MuiPaper-root {
    overflow: visible;
  }

  /* On a real page the panel starts at the top of the viewport and reserves
     72px so its contents clear the header. Anchored here it would paint over
     the header instead, so it starts below the bar and reserves less. The
     doubled class outweighs the component's own top and padding. */
  && .MuiDrawer-paper {
    padding-top: 24px;
    top: 48px;
  }
`;

const Hint = styled.p<CommonThemeProps>`
  ${fontBodyS}

  ${(props) => {
    const semanticColors = getSemanticColors(props);

    return `
      color: ${semanticColors?.base?.textSecondary};
      margin: 24px;
    `;
  }}
`;

const primaryNavItems: NavigationHeaderPrimaryNavItem<string>[] = [
  {
    itemType: "dropdown",
    items: [
      {
        details: "Every public dataset",
        icon: "Search",
        label: "Browse datasets",
        section: "Data",
      },
      {
        details: "Pull data from the command line",
        icon: "Code",
        label: "API reference",
        section: "Data",
      },
      {
        details: "Single-cell multiomic data",
        icon: "Grid",
        label: "CZ CELLxGENE",
        section: "Repositories",
      },
      {
        details: "3D sub-cellular tomograms",
        icon: "Flask",
        label: "CryoET",
        section: "Repositories",
      },
    ],
    key: "data",
    label: "Data",
    sectionProps: {
      Repositories: {
        actions: [{ href: "/repositories", label: "Browse all" }],
      },
    },
  },
  {
    itemType: "text",
    key: "about",
    label: "About",
    onClick: () => console.log("About clicked"),
  },
];

function App() {
  const [activePrimaryNavKey, setActivePrimaryNavKey] = useState("data");
  const theme = useTheme();

  const containedTheme = useMemo(
    () =>
      createTheme(theme, {
        components: {
          MuiModal: {
            defaultProps: {
              disableAutoFocus: true,
              disableEnforceFocus: true,
              disablePortal: true,
              disableRestoreFocus: true,
            },
          },
        },
      }),
    [theme]
  );

  return (
    <div className="app">
      <ThemeProvider theme={containedTheme}>
        <Stage>
          <NavigationHeader
            activePrimaryNavKey={activePrimaryNavKey}
            backgroundAppearance="dark"
            primaryNavItems={primaryNavItems}
            sdsStyle="drawer"
            setActivePrimaryNavKey={setActivePrimaryNavKey}
            showSearch={false}
            title="Science Data"
          />

          <Hint>Hover “Data” to open the panel.</Hint>
        </Stage>
      </ThemeProvider>
    </div>
  );
}

export default App;
