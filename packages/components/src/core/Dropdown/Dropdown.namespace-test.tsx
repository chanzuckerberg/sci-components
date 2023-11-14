import {
  DefaultDropdownMenuOption,
  Dropdown,
  DropdownPopper,
  DropdownProps,
} from "@czi-sds/components";
import { noop } from "src/common/utils";

const OPTIONS = [
  {
    color: "#7057ff",
    description: "Good for newcomers",
    name: "good first issue",
  },
  {
    color: "#008672",
    description: "Extra attention is needed",
    name: "help wanted",
  },
];

const DropdownNameSpaceTest = <
  T extends DefaultDropdownMenuOption,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined
>(
  props: DropdownProps<T, Multiple, DisableClearable, FreeSolo>
) => {
  return (
    <Dropdown
      DropdownMenuProps={{ loading: true, loadingText: "Loading ..." }}
      label="Click Target"
      onChange={noop}
      options={OPTIONS}
      buttonPosition="left"
      buttons
      closeOnBlur
      multiple
      search
      onClose={noop}
      InputDropdownProps={{ sdsStyle: "square" }}
      PopperComponent={DropdownPopper}
    />
  );
};
