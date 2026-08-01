// Passing columns instead of options switches the component to its multi-column
// form: each entry is a named list with its own width, rendered side by side and
// separated by a divider that can carry an icon.
//
// The value changes shape to match. Instead of one selection there is one per
// column, keyed by the column's name, and the handler receives the whole record
// every time any column changes.
//
// One search field sits above all the columns and filters them together.
// groupBy is ignored here: sections and columns do not combine.
//
// open is set here only so the columns are visible on the page.

import { useState } from "react";
import {
  Autocomplete,
  Icon,
  fontBodyXs,
  getSemanticColors,
  getSpaces,
  type AutocompleteMultiColumnOnChange,
  type AutocompleteMultiColumnOption,
  type AutocompleteMultiColumnValue,
  type CommonThemeProps,
  type DefaultAutocompleteOption,
} from "@czi-sds/components";
import styled from "@emotion/styled";

type Option = DefaultAutocompleteOption;

const COLUMNS: AutocompleteMultiColumnOption<Option, true, false, false>[] = [
  {
    icon: <Icon sdsIcon="ChevronRight" sdsSize="xs" />,
    name: "Tissue",
    options: [
      { name: "Blood" },
      { name: "Brain" },
      { name: "Kidney" },
      { name: "Lung" },
    ],
    width: 180,
  },
  {
    name: "Assay",
    options: [
      { count: 24, name: "10x 3' v3" },
      { name: "Slide-seq" },
      { details: "Sequential FISH", name: "seqFISH" },
      { name: "Smart-seq2" },
    ],
    width: 220,
  },
];

const Readout = styled.p<CommonThemeProps>`
  ${fontBodyXs}

  ${(props) => {
    const semanticColors = getSemanticColors(props);
    const spaces = getSpaces(props);

    return `
      color: ${semanticColors?.base?.textSecondary};
      margin: 0 0 ${spaces?.m}px;
    `;
  }}
`;

type Picked = AutocompleteMultiColumnValue<Option, true, false, false>;

function App() {
  const [picked, setPicked] = useState<Picked>({});

  const handleChange: AutocompleteMultiColumnOnChange<
    Option,
    true,
    false,
    false
  > = (_event, value) => setPicked(value);

  const summary = Object.entries(picked ?? {})
    .filter(([, options]) => options.length)
    .map(([column, options]) => `${column}: ${options.length}`)
    .join(" · ");

  return (
    <div className="app" style={{ width: 440 }}>
      <Readout>{summary || "Nothing selected."}</Readout>

      <Autocomplete<Option, true, false, false>
        label="Search tissues and assays"
        multiple
        open
        options={COLUMNS}
        search
        onChange={handleChange}
      />
    </div>
  );
}

export default App;
