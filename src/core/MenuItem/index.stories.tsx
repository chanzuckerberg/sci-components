/* eslint-disable no-use-before-define */
import { InputLabel, Select, SelectProps } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import { styled } from "@mui/material/styles";
import { Args, Story } from "@storybook/react";
import * as React from "react";
import { getSpaces } from "../styles";
import MenuItem from "./index";
import { DemoWrapper } from "./style";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const PERSONS = [
  { name: "Harley Thomas", number: 1 },
  { name: "Janeece Pourroy", number: 2 },
  { name: "Jennifer Tang", number: 3 },
  { name: "Jonathan Sheu", number: 4 },
  { name: "Julie Han", number: 5 },
  { name: "Katrina Kalantar", number: 6 },
  { name: "Omar Valenzuela", number: 7 },
  { name: "Seve Badajoz", number: 8 },
  { name: "Tiago Carvalho", number: 9 },
  { name: "Timmy Huang", number: 10 },
];

function renderMenuItems(personName: string[]) {
  return PERSONS.map((person) => {
    const { name, number } = person;

    return (
      <MenuItem
        key={name}
        value={name}
        column={number}
        selected={personName.includes(name)}
        isMultiSelect
      >
        {name}
      </MenuItem>
    );
  });
}

const StyledFormControl = styled(FormControl)`
  ${(props) => {
    const spacings = getSpaces(props);
    return `
      margin: ${spacings?.xxl}px;
      max-width: 300px;
      min-width: 120px;
    `;
  }}
`;

export const MultipleSelect = MultipleSelectDemo.bind({});

function MultipleSelectDemo() {
  const [personName, setPersonName] = React.useState<string[]>([]);

  const handleChange: SelectProps["onChange"] = (event) => {
    setPersonName(event.target.value as string[]);
  };

  return (
    <div>
      <StyledFormControl variant="standard">
        <InputLabel id="demo-simple-select-outlined-label">Name</InputLabel>
        <Select
          MenuProps={MenuProps}
          multiple
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={personName}
          onChange={handleChange}
          label="Name"
          renderValue={(selected) => {
            return (selected as string[]).join(", ");
          }}
          variant="standard"
        >
          {renderMenuItems(personName)}
        </Select>
      </StyledFormControl>

      <br />

      <StyledFormControl variant="outlined">
        <InputLabel id="demo-simple-select-outlined-label">Name</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          multiple
          value={personName}
          onChange={handleChange}
          MenuProps={MenuProps}
          label="Name"
          renderValue={(selected) => {
            return (selected as string[]).join(", ");
          }}
        >
          {renderMenuItems(personName)}
        </Select>
      </StyledFormControl>

      <br />

      <StyledFormControl variant="filled">
        <InputLabel id="demo-simple-select-filled-label">Name</InputLabel>
        <Select
          MenuProps={MenuProps}
          multiple
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={personName}
          onChange={handleChange}
          renderValue={(selected) => {
            return (selected as string[]).join(", ");
          }}
          variant="filled"
        >
          {renderMenuItems(personName)}
        </Select>
      </StyledFormControl>
    </div>
  );
}

const Demo = (props: Args): JSX.Element => (
  <DemoWrapper>
    <MenuItem {...props} />
  </DemoWrapper>
);

export default {
  component: Demo,
  title: "MenuItem",
};

const Template: Story = (args) => <Demo {...args} />;

export const Default = Template.bind({});

Default.args = {
  children: "text here",
  value: "value-here",
};

export const WithColumn = Template.bind({});

WithColumn.args = {
  ...Default.args,
  column: "column value",
};

export const WithMultiSelect = Template.bind({});

WithMultiSelect.args = {
  ...Default.args,
  isMultiSelect: true,
};

export const WithMultiSelectSelected = Template.bind({});

WithMultiSelectSelected.args = {
  ...Default.args,
  isMultiSelect: true,
  selected: true,
};

export const Disabled = DisabledMenuItem.bind({});

function DisabledMenuItem() {
  return (
    <>
      <div>Single Select</div>
      <Demo {...Default.args} disabled isMultiSelect={false} />
      <Demo {...Default.args} disabled isMultiSelect={false} selected />
      <br />
      <div>Multi Select</div>
      <Demo {...Default.args} disabled isMultiSelect />
      <Demo {...Default.args} disabled isMultiSelect selected />
      <br />
      <div>With Column</div>
      <Demo {...Default.args} disabled column="column value" />
      <Demo {...Default.args} disabled column="column value" selected />
    </>
  );
}
