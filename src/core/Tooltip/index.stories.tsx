import { css } from "@emotion/css";
import { Box, Grid } from "@material-ui/core/";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import { Args, Story } from "@storybook/react";
import React from "react";
import Button from "../Button";
import TooltipTableContent from "../TooltipTableContent/index";
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
          margin: "125px",
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
  title: "Tooltip",
};

const Template: Story = (args) => <Demo {...args} />;

export const Dark = Template.bind({});

Dark.args = {
  arrow: true,
  placement: "top",
  sdsStyle: "dark",
  subtitle: "dolor sit amet",
  title: "Lorem ipsum",
  width: "default",
};

export const Light = Template.bind({});

Light.args = {
  arrow: true,
  placement: "top",
  sdsStyle: "light",
  title: fillerText,
  width: "default",
};

export const LightWide = Template.bind({});

LightWide.args = {
  arrow: true,
  placement: "top",
  sdsStyle: "light",
  title: fillerText,
  width: "wide",
};

const rows = [
  { label: "Sample", value: "Sample Name" },
  { label: "Name", value: "Taxon Name" },
  { label: "Category", value: "Species" },
  { label: "NT Z Score", value: 100 },
  { label: "NT rPM", value: 200 },
  { label: "NT r (total reads)", value: 333 },
  { label: "NR Z Score", value: 404 },
  { label: "NR rPM", value: 524 },
  { label: "NR r (total reads)", value: 600 },
];

const data = [
  {
    dataRows: rows.slice(0, 3),
    label: "Section 1",
  },
  {
    dataRows: rows.slice(3, 9),
    disabled: true,
    label: "Section 2",
  },
];

const alert = "Some values do not pass the selected filters.";

export const Table = Template.bind({});

Table.args = {
  title: <TooltipTableContent contentAlert={alert} data={data} />,
};

export const StyledArrow = Template.bind({});

const arrow = css`
  left: 0 !important;
`;

StyledArrow.args = {
  arrow: true,
  classes: { arrow },
  title: fillerText,
};

const PlacementDemo = (): JSX.Element => {
  return (
    <Box sx={{ margin: 75, width: 500 }}>
      <Grid container spacing={8} justifyContent="center">
        <Grid item>
          <Tooltip title="Text" placement="top-start" arrow open>
            <Button>top-start</Button>
          </Tooltip>
          <Tooltip title="Text" placement="top" arrow open>
            <Button>top</Button>
          </Tooltip>
          <Tooltip title="Text" placement="top-end" arrow open>
            <Button>top-end</Button>
          </Tooltip>
        </Grid>
      </Grid>
      <Grid container justifyContent="center">
        <Grid
          item
          container
          spacing={8}
          xs={6}
          alignItems="flex-start"
          direction="column"
        >
          <Grid item>
            <Tooltip title="Text" placement="left-start" arrow open>
              <Button>left-start</Button>
            </Tooltip>
          </Grid>
          <Grid item>
            <Tooltip title="Text" placement="left" arrow open>
              <Button>left</Button>
            </Tooltip>
          </Grid>
          <Grid item>
            <Tooltip title="Text" placement="left-end" arrow open>
              <Button>left-end</Button>
            </Tooltip>
          </Grid>
        </Grid>
        <Grid
          item
          container
          spacing={8}
          xs={6}
          alignItems="flex-end"
          direction="column"
        >
          <Grid item>
            <Tooltip title="Text" placement="right-start" arrow open>
              <Button>right-start</Button>
            </Tooltip>
          </Grid>
          <Grid item>
            <Tooltip title="Text" placement="right" arrow open>
              <Button>right</Button>
            </Tooltip>
          </Grid>
          <Grid item>
            <Tooltip title="Text" placement="right-end" arrow open>
              <Button>right-end</Button>
            </Tooltip>
          </Grid>
        </Grid>
      </Grid>
      <Grid container spacing={8} justifyContent="center">
        <Grid item>
          <Tooltip title="Text" placement="bottom-start" arrow open>
            <Button>bottom-start</Button>
          </Tooltip>
          <Tooltip title="Text" placement="bottom" arrow open>
            <Button>bottom</Button>
          </Tooltip>
          <Tooltip title="Text" placement="bottom-end" arrow open>
            <Button>bottom-end</Button>
          </Tooltip>
        </Grid>
      </Grid>
    </Box>
  );
};

const PlacementTemplate: Story = () => <PlacementDemo />;

export const PlacementPreview = PlacementTemplate.bind({});
