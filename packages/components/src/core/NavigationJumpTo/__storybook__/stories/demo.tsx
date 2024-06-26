import { Box } from "@mui/material";
import { forwardRef, useRef, useState } from "react";
import { TabPanelProps } from "@mui/base";
import { Args } from "@storybook/react";
import InputSlider from "src/core/InputSlider";
import RawNavigationJumpTo from "src/core/NavigationJumpTo";

interface TabPanelPropsExtra extends TabPanelProps {
  sdsDemoHeight: number;
}

const TabPanel = forwardRef<HTMLDivElement, TabPanelPropsExtra>(
  (props, ref) => {
    const { children, sdsDemoHeight, ...other } = props;

    return (
      <div
        ref={ref}
        role="tabpanel"
        style={{
          alignItems: "center",
          backgroundColor: "#f4f4f4",
          color: "black",
          display: "flex",
          fontFamily: "Inter, sans-serif",
          fontSize: "36px",
          fontWeight: 100,
          justifyContent: "center",
          margin: "0px 22px 22px 6px",
          minHeight: `${sdsDemoHeight}vh`,
          textAlign: "center",
        }}
        {...other}
      >
        <Box sx={{ p: 3 }}>
          {children}
          <p style={{ fontSize: 14, margin: "5px 0 0 0" }}>
            height: {sdsDemoHeight} vh
          </p>
        </Box>
      </div>
    );
  }
);

export const NavigationJumpToDemo = (props: Args): JSX.Element => {
  const [navPanelHeight, setNavPanelHeight] = useState(100);
  const sectionRef0 = useRef(null);
  const sectionRef1 = useRef(null);
  const sectionRef2 = useRef(null);
  const sectionRef3 = useRef(null);
  const sectionRef4 = useRef(null);

  return (
    <Box>
      <Box
        sx={{
          fontFamily: "Inter, sans-serif",
          margin: "0 0 30px 6px",
          width: 250,
        }}
      >
        <p id="nav-item-height-slider" style={{ marginBottom: "5px" }}>
          Section panel height:
        </p>
        <InputSlider
          aria-labelledby="nav-item-height-slider"
          min={20}
          max={120}
          step={1}
          onChange={(_, value) => {
            setNavPanelHeight(value as number);
          }}
          defaultValue={100}
          marks={[
            { label: "20", value: 20 },
            { label: "40", value: 40 },
            { label: "60", value: 60 },
            { label: "80", value: 80 },
            { label: "100", value: 100 },
            { label: "120", value: 120 },
          ]}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row-reverse",
          position: "relative",
          width: "100%",
        }}
      >
        <Box sx={{ width: 150 }}>
          <RawNavigationJumpTo
            {...props}
            items={[
              { elementRef: sectionRef0, title: "Section 1" },
              { elementRef: sectionRef1, title: "Section 2" },
              { elementRef: sectionRef2, title: "Section 3" },
              { elementRef: sectionRef3, title: "Section 4" },
              { elementRef: sectionRef4, title: "Section 5" },
            ]}
          />
        </Box>
        <Box
          sx={{
            position: "relative",
            width: "100%",
          }}
        >
          <TabPanel
            id="navigation-panel-1"
            ref={sectionRef0}
            sdsDemoHeight={navPanelHeight}
          >
            Section #1
          </TabPanel>
          <TabPanel
            id="navigation-panel-2"
            ref={sectionRef1}
            sdsDemoHeight={navPanelHeight}
          >
            Section #2
          </TabPanel>
          <TabPanel
            id="navigation-panel-3"
            ref={sectionRef2}
            sdsDemoHeight={navPanelHeight}
          >
            Section #3
          </TabPanel>
          <TabPanel
            id="navigation-panel-4"
            ref={sectionRef3}
            sdsDemoHeight={navPanelHeight}
          >
            Section #4
          </TabPanel>
          <TabPanel
            id="navigation-panel-5"
            ref={sectionRef4}
            sdsDemoHeight={navPanelHeight}
          >
            Section #5
          </TabPanel>
        </Box>
      </Box>
    </Box>
  );
};
