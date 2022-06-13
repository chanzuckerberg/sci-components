import { css } from "@emotion/css";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import { Args, Story } from "@storybook/react";
import React from "react";
import Button from "../Button";
import Tooltip from "./index";

const fillerText =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

const Demo = (props: Args): JSX.Element => {
  const { title } = props;
  return (
    <div>
      Hover over the info icon to view the tooltip.
      <div
        style={{
          margin: "135px 300px",
        }}
      >
        <Tooltip title={title} {...props}>
          <InfoOutlinedIcon />
        </Tooltip>
      </div>
    </div>
  );
};

export default {
  argTypes: {
    arrow: {
      control: { type: "boolean" },
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
  component: Demo,
  parameters: {
    // delay allows for font to load and prevents chromatic from constantly creating new baselines
    chromatic: { delay: 5000 },
  },
  title: "Tooltip",
};

const Template: Story = (args) => <Demo {...args} />;

export const Dark = Template.bind({});
Dark.parameters = {
  snapshot: {
    skip: true,
  },
};

Dark.args = {
  arrow: true,
  placement: "top",
  sdsStyle: "dark",
  subtitle: "dolor sit amet",
  title: "Lorem ipsum",
  width: "default",
};

export const Light = Template.bind({});
Light.parameters = {
  snapshot: {
    skip: true,
  },
};

Light.args = {
  arrow: true,
  placement: "top",
  sdsStyle: "light",
  title: fillerText,
  width: "default",
};

export const LightWide = Template.bind({});
LightWide.parameters = {
  snapshot: {
    skip: true,
  },
};

LightWide.args = {
  arrow: true,
  placement: "top",
  sdsStyle: "light",
  title: fillerText,
  width: "wide",
};

export const NoTooltipTitle = Template.bind({});

NoTooltipTitle.parameters = {
  snapshot: {
    skip: true,
  },
};

NoTooltipTitle.args = {
  arrow: true,
  placement: "top",
  sdsStyle: "light",
  width: "wide",
};

export const StyledArrow = Template.bind({});
StyledArrow.parameters = {
  snapshot: {
    skip: true,
  },
};

const arrow = css`
  left: 0 !important;
`;

StyledArrow.args = {
  arrow: true,
  classes: { arrow },
  title: fillerText,
};

const placementStyles = {
  display: "grid",
  gridColumnGap: "50px",
  gridRowGap: "50px",
  gridTemplateColumns: "repeat(3, 130px",
  gridTemplateRows: "repeat(5, 60px)",
  justifyContent: "center",
  padding: "100px",
};

const PlacementDemo = (): JSX.Element => {
  return (
    <div style={placementStyles as React.CSSProperties}>
      <Tooltip title="Text" placement="top-start" arrow open>
        <Button>top-start</Button>
      </Tooltip>
      <Tooltip title="Text" placement="top" arrow open>
        <Button>top</Button>
      </Tooltip>
      <Tooltip title="Text" placement="top-end" arrow open>
        <Button>top-end</Button>
      </Tooltip>
      <Tooltip title="Text" placement="left-start" arrow open>
        <Button>left-start</Button>
      </Tooltip>
      <div />
      <Tooltip title="Text" placement="right-start" arrow open>
        <Button>right-start</Button>
      </Tooltip>
      <Tooltip title="Text" placement="left" arrow open>
        <Button>left</Button>
      </Tooltip>
      <div />
      <Tooltip title="Text" placement="right" arrow open>
        <Button>right</Button>
      </Tooltip>
      <Tooltip title="Text" placement="left-end" arrow open>
        <Button>left-end</Button>
      </Tooltip>
      <div />
      <Tooltip title="Text" placement="right-end" arrow open>
        <Button>right-end</Button>
      </Tooltip>
      <Tooltip title="Text" placement="bottom-start" arrow open>
        <Button>bottom-start</Button>
      </Tooltip>
      <Tooltip title="Text" placement="bottom" arrow open>
        <Button>bottom</Button>
      </Tooltip>
      <Tooltip title="Text" placement="bottom-end" arrow open>
        <Button>bottom-end</Button>
      </Tooltip>
    </div>
  );
};

const PlacementTemplate: Story = () => <PlacementDemo />;

export const PlacementPreview = PlacementTemplate.bind({});
PlacementPreview.parameters = {
  snapshot: {
    skip: true,
  },
};

const TestDemo = (props: Args): JSX.Element => {
  const { title, ...rest } = props;
  return (
    <Tooltip title={title} {...rest} data-testid="tooltip">
      <div>I am a tooltip child element</div>
    </Tooltip>
  );
};

const TestTemplate: Story = (args) => <TestDemo title="test" {...args} />;
export const Test = TestTemplate.bind({});
