import { FormControlLabel, RadioGroup } from "@mui/material";
import { Args, Meta } from "@storybook/react";
import * as React from "react";
import InputRadio from "../InputRadio";
import InputToggle from "../InputToggle";
import TableRow from "../TableRow";
import Tag from "../Tag";
import CellComponentRaw from "./index";
import { StyledStoryBody, StyledStoryHeading } from "./style";

const CellComponent = (props: Args): JSX.Element => {
  const { horizontalAlign, verticalAlign, children } = props;

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
            horizontalAlign={horizontalAlign}
            verticalAlign={verticalAlign}
            data-testid="CellComponent"
            {...props}
          >
            {children}
          </CellComponentRaw>
        </TableRow>
      </tbody>
    </table>
  );
};

export default {
  argTypes: {
    fitCellToComponent: {
      control: { type: "boolean" },
    },
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
  parameters: {
    axe: {
      disabledRules: [
        // Unfortunately the MUI Switch component renders an input field without a label, which
        // fails an axe check.
        "label",
      ],
    },
  },
  title: "Table/CellComponent",
} as Meta;

export const Default = {
  args: {
    horizontalAlign: "left",
    verticalAlign: "center",
  },
  parameters: {
    snapshot: {
      skip: true,
    },
  },
  render: (props: Args) => {
    const { horizontalAlign, verticalAlign, fitCellToComponent } = props;

    if (fitCellToComponent) {
      return (
        <CellComponent
          horizontalAlign={horizontalAlign}
          verticalAlign={verticalAlign}
          data-testid="CellComponent"
          {...props}
        >
          <InputToggle />
        </CellComponent>
      );
    }

    return (
      <CellComponent
        horizontalAlign={horizontalAlign}
        verticalAlign={verticalAlign}
        data-testid="CellComponent"
        style={{ height: 100, width: 100 }}
        {...props}
      >
        <InputToggle />
      </CellComponent>
    );
  },
};

const TestDemo = (props: Args): JSX.Element => {
  const placementStyles = {
    display: "grid",
    gridColumnGap: "14px",
    gridRowGap: "0px",
    gridTemplateColumns: "112px 50px",
    gridTemplateRows: "1fr",
  };

  return (
    <div style={placementStyles as React.CSSProperties}>
      <div>
        <CellComponent
          data-testid="CellComponentA"
          horizontalAlign="right"
          verticalAlign="bottom"
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
                control={<InputRadio stage="checked" {...props} />}
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

export const Test = {
  parameters: {
    controls: { exclude: ["verticalAlign", "horizontalAlign"] },
  },
  render: (args: Args) => <TestDemo {...args} />,
};
