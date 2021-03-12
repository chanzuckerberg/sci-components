/* eslint-disable no-use-before-define */
import { InputLabel, Select, SelectProps } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import MenuItem from "./index";

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
        text={name}
        value={name}
        column={number}
        selected={personName.includes(name)}
      />
    );
  });
}

const useStyles = makeStyles((theme) => ({
  /* stylelint-disable-next-line */
  formControl: {
    margin: theme.spacing(5),
    maxWidth: 300,
    minWidth: 120,
  },
}));

function MultipleSelect() {
  const classes = useStyles();
  const [personName, setPersonName] = React.useState<string[]>([]);

  const handleChange: SelectProps["onChange"] = (event) => {
    setPersonName(event.target.value as string[]);
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
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
        >
          {renderMenuItems(personName)}
        </Select>
      </FormControl>

      <br />

      <FormControl variant="outlined" className={classes.formControl}>
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
      </FormControl>

      <br />

      <FormControl variant="filled" className={classes.formControl}>
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
        >
          {renderMenuItems(personName)}
        </Select>
      </FormControl>
    </div>
  );
}

const MenuItemStories = storiesOf("MenuItem", module);

MenuItemStories.add("MultipleSelect", () => <MultipleSelect />);
