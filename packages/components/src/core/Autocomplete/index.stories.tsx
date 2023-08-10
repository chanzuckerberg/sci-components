import { Args, Meta } from "@storybook/react";
import { SyntheticEvent, useRef, useState } from "react";
import { GITHUB_LABELS } from "../DropdownMenu/GITHUB_LABELS";
import TagFilter from "../TagFilter";
import RawAutocomplete, { DefaultAutocompleteOption } from "./index";

export type DropdownOptionValue<T, Multiple> = Multiple extends
  | undefined
  | false
  ? T | undefined
  : Array<T> | undefined;

const groupByOptions = [
  undefined,
  (option: DefaultAutocompleteOption) => option.section as string,
];

const Autocomplete = (props: Args): JSX.Element => {
  const { options = GITHUB_LABELS } = props;

  const [selection, setSelection] = useState<string | null>();
  const [inputValue, setInputValue] = useState<string>("");

  return (
    <div style={{ margin: "16px 0 0 24px" }}>
      <RawAutocomplete
        // (masoudmanson): To turn off autocomplete, we need to add the id attribute.
        id="test-id"
        label="Select a GitHub label"
        disableCloseOnSelect={false}
        onChange={handleChange}
        options={options}
        inputValue={inputValue}
        onInputChange={(_, newInputValue) => {
          setInputValue(newInputValue);
        }}
        getOptionDisabled={(option: DefaultAutocompleteOption) => {
          return (
            option.name === "Type: feature request" ||
            option.name === "Type: documentation"
          );
        }}
        sx={{
          width: 300,
        }}
        {...props}
      />
      <div style={{ marginTop: 10 }}>
        {selection ? (
          <TagFilter label={selection} onDelete={() => setSelection(null)} />
        ) : null}
      </div>
    </div>
  );

  function handleChange(
    _: SyntheticEvent<Element, Event>,
    newValue: DefaultAutocompleteOption | null
  ) {
    if (newValue && newValue.name) {
      setSelection(newValue.name);
      setInputValue("");
    }
  }
};

export default {
  argTypes: {
    groupBy: {
      control: {
        labels: ["No group by", "Group by section names"],
        type: "select",
      },
      mapping: groupByOptions,
      options: Object.keys(groupByOptions),
    },
    label: {
      control: { type: "text" },
      require: true,
    },
  },
  component: Autocomplete,
  // (masoudmanson) For the purpose of storybook, the button is removed
  // from the Autocomplete component which may cause some accessibility
  // violations related to ARIA roles and attributes. However, this
  // should not be a concern as the component is always used with a button
  // in real applications. To avoid false positive test failures, the following
  // accessibility rules have been temporarily disabled in the tests
  parameters: {
    axe: {
      disabledRules: [
        "aria-input-field-name",
        "aria-required-children",
        "aria-required-parent",
        "button-name",
        "list",
        "listitem",
      ],
    },
  },
  title: "Dropdowns/Autocomplete",
} as Meta;

// Default

export const Default = {
  args: {
    groupBy: groupByOptions[1],
    label: "Select a GitHub label",
  },
};

// Test

const TestDemo = (props: Args): JSX.Element => {
  const { options = GITHUB_LABELS, label } = props;

  const anchorRef = useRef(null);

  return (
    <div style={{ margin: "16px 0 0 24px" }} ref={anchorRef}>
      <RawAutocomplete
        id="test-autocomplete-id"
        label={label}
        disableCloseOnSelect={false}
        options={options}
        groupBy={(option: DefaultAutocompleteOption) =>
          option.section as string
        }
        {...props}
        sx={{ width: 300 }}
      />
    </div>
  );
};

export const Test = {
  args: {
    label: "Select a label",
  },
  parameters: {
    controls: {
      exclude: ["groupBy", "label"],
    },
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <TestDemo data-testid="autocomplete" {...args} />,
};
