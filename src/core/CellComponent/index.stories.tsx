import { FormControlLabel, RadioGroup } from "@mui/material";
import { Args, Story } from "@storybook/react";
import * as React from "react";
import Checkbox from "../Checkbox";
import RadioButton from "../Radio";
import TableRow from "../TableRow";
import Tag from "../Tag";
import CellComponentRaw from "./index";
import { StyledStoryBody, StyledStoryHeading } from "./style";

const CellComponent = (props: Args): JSX.Element => {
  const { horizontalAlign, verticalAlign } = props;

  return (
    <table>
      <tbody>
        <TableRow
          style={{
            display: "block",
            maxWidth: "280px",
          }}
        >
          <CellComponentRaw
            text-align={horizontalAlign}
            verticalAlign={verticalAlign}
            data-testid="CellComponent"
            {...props}
          />
        </TableRow>
      </tbody>
    </table>
  );
};

export default {
  argTypes: {
    horizontalAlign: {
      control: { type: "select" },
      options: ["left", "center", "right"],
    },
    verticalAlign: {
      control: { type: "select" },
      options: ["top", "center", "bottom"],
    },
  },
  component: CellComponent,
  title: "CellComponent",
};

const Template: Story = (props: Args) => {
  const { disabled, horizontalAlign, verticalAlign } = props;
  const [checked, setChecked] = React.useState(true);

  const handleChange = () => setChecked((prevState) => !prevState);

  return (
    <CellComponent
      horizontalAlign={horizontalAlign}
      verticalAlign={verticalAlign}
      style={{ height: 60, width: 150 }}
    >
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
    </CellComponent>
  );
};

export const Default = Template.bind({});

Default.parameters = {
  snapshot: {
    skip: true,
  },
};

Default.args = {
  horizontalAlign: "center",
  verticalAlign: "center",
};

const TestDemo = (props: Args): JSX.Element => {
  const placementStyles = {
    display: "grid",
    gridColumnGap: "14px",
    gridRowGap: "0px",
    gridTemplateColumns: "279px 50px",
    gridTemplateRows: "1fr",
  };

  return (
    <div style={placementStyles as React.CSSProperties}>
      <div>
        <CellComponent
          data-testid="CellComponentA"
          horizontalAlign="right"
          verticalAlign="bottom"
          style={{ height: 116, width: 279 }}
        >
          <div style={{ display: "block" }}>
            <StyledStoryHeading data-testid="Child">
              Lorem ipsum dolor
            </StyledStoryHeading>
            <StyledStoryBody data-testid="Child" style={{ paddingBottom: 10 }}>
              Lorem Ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor.
            </StyledStoryBody>
            <Tag
              color="primary"
              data-testid="Child"
              label="Tertiary"
              sdsStyle="rounded"
              sdsType="primary"
              {...props}
            />
          </div>
        </CellComponent>
      </div>
      <div>
        <CellComponent
          data-testid="CellComponentB"
          horizontalAlign="left"
          verticalAlign="top"
        >
          <div style={{ display: "block" }}>
            <StyledStoryHeading
              data-testid="Child"
              style={{ paddingBottom: 10 }}
            >
              Lorem ipsum dolor
            </StyledStoryHeading>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              data-testid="Child"
              defaultValue="demo"
              name="radio-buttons-group"
            >
              <FormControlLabel
                control={<RadioButton stage="checked" {...props} />}
                label="Label"
                value="demo"
              />
            </RadioGroup>
          </div>
        </CellComponent>
      </div>
    </div>
  );
};

const TestTemplate: Story = (args) => <TestDemo {...args} />;

export const Test = TestTemplate.bind({});

Test.parameters = {
  controls: { exclude: ["verticalAlign", "horizontalAlign"] },
};
