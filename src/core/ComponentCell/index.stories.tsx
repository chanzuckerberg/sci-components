import { FormControlLabel } from "@mui/material";
import { Args, Story } from "@storybook/react";
import * as React from "react";
import {
  PrimaryText,
  SecondaryText,
  StyledTableData,
} from "../BasicCell/style";
import Checkbox from "../Checkbox";
import InputToggle from "../InputToggle";
import Tag from "../Tag";
import ComponentCellRaw from "./index";

const ComponentCell = (props: Args): JSX.Element => {
  return (
    <table>
      <tbody>
        <tr
          style={{
            display: "block",
            maxWidth: "180px",
          }}
        >
          <ComponentCellRaw
            contentPosition="center"
            data-testid="ComponentCell"
            {...props}
          />
        </tr>
      </tbody>
    </table>
  );
};

export default {
  argTypes: {
    contentPosition: {
      control: { type: "select" },
      options: ["left", "center", "right"],
    },
  },
};

const Template: Story = (props: Args) => {
  const { disabled } = props;
  const [checked, setChecked] = React.useState(true);

  const handleChange = () => setChecked((prevState) => !prevState);

  return (
    <ComponentCell>
      <FormControlLabel
        control={
          <Checkbox
            disabled={disabled}
            onChange={handleChange}
            stage={checked ? "unchecked" : "checked"}
          />
        }
        label="Label"
      />
    </ComponentCell>
  );
};

export const Default = Template.bind({});

Default.parameters = {
  snapshot: {
    skip: true,
  },
};

const TestDemo = (props: Args): JSX.Element => {
  const placementStyles = {
    display: "grid",
    gridColumnGap: "14px",
    gridRowGap: "0px",
    gridTemplateColumns: "repeat(3, 120px)",
    gridTemplateRows: "1fr",
  };

  return (
    <div style={placementStyles as React.CSSProperties}>
      <ComponentCell data-testid="ComponentCellA" contentPosition="left">
        <div style={{ display: "block" }}>
          <StyledTableData>
            <PrimaryText shouldTextWrap primaryTextWrapLineCount={4}>
              Lorem ipsum dolor
            </PrimaryText>
            <SecondaryText shouldTextWrap secondaryTextWrapLineCount={4}>
              Lorem Ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor.
            </SecondaryText>
          </StyledTableData>
          <Tag
            {...props}
            color="primary"
            label="Tertiary"
            sdsStyle="rounded"
            sdsType="primary"
          />
        </div>
      </ComponentCell>
      <ComponentCell data-testid="ComponentCellB" contentPosition="right">
        <InputToggle style={{ marginBottom: 0 }} {...props} />
      </ComponentCell>
    </div>
  );
};

const TestTemplate: Story = (args) => <TestDemo {...args} />;

export const Test = TestTemplate.bind({});
