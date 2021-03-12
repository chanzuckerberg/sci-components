import { makeStyles } from "@material-ui/core";
import RawAutocomplete, {
  AutocompleteProps,
} from "@material-ui/lab/Autocomplete";
import * as React from "react";
import { BoxShadows } from "../styles/common/constants/boxShadows";

type MyAutocomplete<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined
> = AutocompleteProps<T, Multiple, DisableClearable, FreeSolo>;

const useStyles = makeStyles({
  listbox: {
    boxShadow: BoxShadows.M,
  },
});

function Autocomplete<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined
>(
  props: MyAutocomplete<T, Multiple, DisableClearable, FreeSolo>
): React.ReactNode {
  const classes = useStyles();
  const { listbox } = classes;

  return <RawAutocomplete {...props} classes={{ listbox }} />;
}

export default Autocomplete;
