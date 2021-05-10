import { css } from "@emotion/css";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import { Args, Story } from "@storybook/react";
import React from "react";
import TooltipTableContent from "../TooltipTableContent/index";
import Tooltip from "./index";

const tooltipContent =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

const Demo = (props: Args): JSX.Element => {
  const { title } = props;
  return (
    <Tooltip title={title} {...props}>
      <InfoOutlinedIcon />
    </Tooltip>
  );
};

export default {
  component: Demo,
  title: "Tooltip",
};

const Template: Story = (args) => <Demo {...args} />;

export const Action = Template.bind({});

Action.args = {
  inverted: true,
  title: tooltipContent,
};

export const Info = Template.bind({});

Info.args = {
  inverted: false,
  title: tooltipContent,
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
    label: "Section 1",
    dataRows: rows.slice(0, 3),
  },
  {
    label: "Section 2",
    dataRows: rows.slice(3, 9),
    disabled: true,
  },
];

const alert = "Some values do not pass the selected filters.";

export const Table = Template.bind({});

Table.args = {
  title: <TooltipTableContent alert={alert} data={data} />,
};

export const StyledArrow = Template.bind({});

const arrow = css`
  left: 0 !important;
`;

StyledArrow.args = {
  classes: { arrow },
};
