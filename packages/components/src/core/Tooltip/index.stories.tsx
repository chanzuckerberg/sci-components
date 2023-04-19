import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Args, Meta } from "@storybook/react";
import React from "react";
import Button from "../Button";
import ButtonIcon from "../ButtonIcon";
import RawTooltip from "./index";

const Tooltip = (props: Args): JSX.Element => {
  const { title } = props;
  return (
    <div>
      Hover over the info icon to view the tooltip.
      <p>
        ArrowOffset changes the position of the tooltip arrow and can be any
        numeric value within [-120, 120]. Any value value over the width of the
        tooltip will remove the arrow from the tooltip.
      </p>
      <div
        style={{
          margin: "135px 300px",
        }}
      >
        <RawTooltip title={title} {...props}>
          <InfoOutlinedIcon />
        </RawTooltip>
      </div>
    </div>
  );
};

export default {
  argTypes: {
    arrow: {
      control: { type: "boolean" },
    },
    arrowOffset: {
      control: { type: "number" },
    },
    placement: {
      control: { type: "select" },
      options: [
        "bottom-start",
        "bottom",
        "bottom-end",
        "left-start",
        "left",
        "left-end",
        "right-start",
        "right",
        "right-end",
        "top-start",
        "top",
        "top-end",
      ],
    },
    sdsStyle: {
      control: { type: "radio" },
      options: ["dark", "light"],
    },
    title: {
      control: { type: "text" },
    },
    width: {
      control: { type: "radio" },
      options: ["default", "wide"],
    },
  },
  component: Tooltip,
  parameters: {
    // delay allows for font to load and prevents chromatic from constantly creating new baselines
    chromatic: { delay: 5000 },
  },
  title: "Tooltip",
} as Meta;

// Default

export const Default = {
  args: {
    arrow: true,
    placement: "top",
    sdsStyle: "dark",
    subtitle: "dolor sit amet",
    title: "Lorem ipsum",
    width: "default",
  },
};

// Live Preview

const LivePreviewDemo = (): JSX.Element => {
  const livePreviewStyles = {
    alignSelf: "self-start",
    display: "grid",
    gridColumnGap: "80px",
    gridTemplateColumns: "repeat(3, 130px)",
    paddingTop: "80px",
  };

  return (
    <div style={livePreviewStyles as React.CSSProperties}>
      <RawTooltip
        title="Label lorem"
        sdsStyle="dark"
        placement="top"
        arrow
        open
      >
        <ButtonIcon
          sdsType="secondary"
          sdsSize="large"
          sdsIcon="infoSpeechBubble"
        />
      </RawTooltip>
      <RawTooltip
        title="Label lorem ipsum tellus ac cursus commodo, tortor mauris."
        sdsStyle="light"
        placement="top"
        arrow
        open
      >
        <Button sdsType="primary" sdsStyle="rounded">
          Label
        </Button>
      </RawTooltip>
    </div>
  );
};

export const LivePreview = {
  parameters: {
    snapshot: {
      skip: true,
    },
  },
  render: () => <LivePreviewDemo />,
};

// Placement Demo

const PlacementDemo = (): JSX.Element => {
  const placementStyles = {
    display: "grid",
    gridColumnGap: "50px",
    gridRowGap: "50px",
    gridTemplateColumns: "repeat(3, 130px",
    gridTemplateRows: "repeat(5, 60px)",
    justifyContent: "center",
    padding: "100px",
  };

  return (
    <div style={placementStyles as React.CSSProperties}>
      <RawTooltip title="Text" placement="top-start" arrow open>
        <Button sdsStyle="minimal" sdsType="secondary">
          top-start
        </Button>
      </RawTooltip>
      <RawTooltip title="Text" placement="top" arrow open>
        <Button sdsStyle="minimal" sdsType="secondary">
          top
        </Button>
      </RawTooltip>
      <RawTooltip title="Text" placement="top-end" arrow open>
        <Button sdsStyle="minimal" sdsType="secondary">
          top-end
        </Button>
      </RawTooltip>
      <RawTooltip title="Text" placement="left-start" arrow open>
        <Button sdsStyle="minimal" sdsType="secondary">
          left-start
        </Button>
      </RawTooltip>
      <div />
      <RawTooltip title="Text" placement="right-start" arrow open>
        <Button sdsStyle="minimal" sdsType="secondary">
          right-start
        </Button>
      </RawTooltip>
      <RawTooltip title="Text" placement="left" arrow open>
        <Button sdsStyle="minimal" sdsType="secondary">
          left
        </Button>
      </RawTooltip>
      <div />
      <RawTooltip title="Text" placement="right" arrow open>
        <Button sdsStyle="minimal" sdsType="secondary">
          right
        </Button>
      </RawTooltip>
      <RawTooltip title="Text" placement="left-end" arrow open>
        <Button sdsStyle="minimal" sdsType="secondary">
          left-end
        </Button>
      </RawTooltip>
      <div />
      <RawTooltip title="Text" placement="right-end" arrow open>
        <Button sdsStyle="minimal" sdsType="secondary">
          right-end
        </Button>
      </RawTooltip>
      <RawTooltip title="Text" placement="bottom-start" arrow open>
        <Button sdsStyle="minimal" sdsType="secondary">
          bottom-start
        </Button>
      </RawTooltip>
      <RawTooltip title="Text" placement="bottom" arrow open>
        <Button sdsStyle="minimal" sdsType="secondary">
          bottom
        </Button>
      </RawTooltip>
      <RawTooltip title="Text" placement="bottom-end" arrow open>
        <Button sdsStyle="minimal" sdsType="secondary">
          bottom-end
        </Button>
      </RawTooltip>
    </div>
  );
};

export const PlacementPreview = {
  parameters: {
    snapshot: {
      skip: true,
    },
  },
  render: () => <PlacementDemo />,
};

// Test

const TestDemo = (props: Args): JSX.Element => {
  const { title, ...rest } = props;
  return (
    <RawTooltip title={title} {...rest} data-testid="tooltip">
      <div>I am a tooltip child element</div>
    </RawTooltip>
  );
};

export const Test = {
  parameters: {
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => (
    <TestDemo title="test" {...args} data-testid="tooltip" />
  ),
};
