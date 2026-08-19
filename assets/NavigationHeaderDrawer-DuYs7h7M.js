import{i as e}from"./preload-helper-xPQekRTU.js";var t;e((()=>{t=`// sdsStyle="drawer" opens a full-width panel on hover instead of a menu on
// click. It is the only style that draws item icons and the per-section
// actions, and backgroundAppearance="dark" inverts the whole header.
//
// The panel is a MUI Drawer: it goes to the end of the page and fixes itself to
// the viewport, which here would cover the docs rather than the example. The
// theme below sends it to the box instead, the CSS anchors it there, and the
// focus options stop it from scrolling itself into view. Rendering it in place
// with disablePortal would put it inside the header, where it paints over the
// bar as it slides in. A real page, where the header spans the viewport and the
// panel slides out from under it, needs none of this.

import {
  NavigationHeader,
  fontBodyS,
  getSemanticColors,
  type CommonThemeProps,
  type NavigationHeaderPrimaryNavItem,
} from "@czi-sds/components";
import styled from "@emotion/styled";
import { ThemeProvider, createTheme, useTheme } from "@mui/material/styles";
import { useMemo, useRef, useState } from "react";

const Stage = styled.div\`
  min-height: 380px;
  position: relative;

  /* The panel starts above the box it belongs to and slides down into it, which
     on a real page means starting off screen. Here it would cross the docs. */
  overflow: hidden;

  /* The panel, its backdrop, and the modal wrapper are all fixed to the
     viewport by default; anchoring them to this box keeps them in the frame. */
  .MuiModal-root,
  .MuiBackdrop-root,
  .MuiDrawer-paper {
    position: absolute;
  }
\`;

const Hint = styled.p<CommonThemeProps>\`
  \${fontBodyS}

  \${(props) => {
    const semanticColors = getSemanticColors(props);

    return \`
      color: \${semanticColors?.base?.textSecondary};
      margin: 24px;
    \`;
  }}
\`;

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
  const stageRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();

  const containedTheme = useMemo(
    () =>
      createTheme(theme, {
        components: {
          MuiModal: {
            defaultProps: {
              container: () => stageRef.current,
              disableAutoFocus: true,
              disableEnforceFocus: true,
              // The docs and the playground render overlays in place by
              // default. This one needs its portal back, aimed at the stage.
              disablePortal: false,
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
        <Stage ref={stageRef}>
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
`}))();export{t as default};