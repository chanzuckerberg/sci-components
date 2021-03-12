import { makeStyles } from "@material-ui/core";
import RawAutocomplete from "@material-ui/lab/Autocomplete";
import * as React from "react";
import { BoxShadows } from "../styles/common/constants/boxShadows";

const useStyles = makeStyles({
  listbox: {
    boxShadow: BoxShadows.M,
  },
});

const Autocomplete = (props) => {
  const classes = useStyles();
  const { listbox } = classes;

  return <RawAutocomplete {...props} classes={{ listbox }} />;
};

export default Autocomplete;
