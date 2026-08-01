// count sits after a tab's label and says how many items wait on that tab's
// screen. It takes any node, not just a number, so it can carry text or a whole
// component. The last tab below pairs a number with a Tag.
//
// A count of 0 is drawn rather than dropped, which is what makes an empty tab
// read as empty rather than as unknown. Whatever count renders becomes part of
// the tab's accessible name, so it is announced as "Contributors 0".
//
// underlined runs a divider under the full width of the group, separating the
// tabs from the content below them.

import {
  Tab,
  Tabs,
  Tag,
  getSpaces,
  type CommonThemeProps,
} from "@czi-sds/components";
import styled from "@emotion/styled";
import { SyntheticEvent, useState } from "react";

const CountWithTag = styled.span<CommonThemeProps>`
  ${(props) => {
    const spaces = getSpaces(props);

    return `
      align-items: center;
      display: inline-flex;
      gap: ${spaces?.s}px;
    `;
  }}
`;

function App() {
  const [value, setValue] = useState(0);

  const handleChange = (_event: SyntheticEvent, newValue: unknown) => {
    setValue(newValue as number);
  };

  return (
    <div className="app">
      <Tabs
        aria-label="Project contents"
        onChange={handleChange}
        underlined
        value={value}
      >
        <Tab count={4} label="Samples" />
        <Tab count={0} label="Contributors" />
        <Tab
          count={
            <CountWithTag>
              14
              <Tag
                color="beta"
                label="BETA"
                sdsStyle="rounded"
                sdsType="secondary"
              />
            </CountWithTag>
          }
          label="Analyses"
        />
      </Tabs>
    </div>
  );
}

export default App;
