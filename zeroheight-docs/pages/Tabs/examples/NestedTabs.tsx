// The small size exists for a second layer of tabbing under a large group, which
// is the only place the design guidance puts it. Each level is its own Tabs group
// with its own state, and the second level resets when the first one changes, so a
// section never opens on a sub-tab that was chosen somewhere else.
//
// Each group brings its own spacing — 24px under the large one, 12px over the
// small one — and those margins collapse into a single 24px gap between the two
// strips, so neither level needs margins added or taken away here.

import { Tab, Tabs } from "@czi-sds/components";
import { SyntheticEvent, useState } from "react";

const SECTIONS = [
  { label: "Samples", subTabs: ["All", "Flagged", "Archived"] },
  { label: "Sequencing runs", subTabs: ["Completed", "In progress"] },
];

function App() {
  const [section, setSection] = useState(0);
  const [subTab, setSubTab] = useState(0);

  const handleSectionChange = (_event: SyntheticEvent, newValue: unknown) => {
    setSection(newValue as number);
    setSubTab(0);
  };

  const handleSubTabChange = (_event: SyntheticEvent, newValue: unknown) => {
    setSubTab(newValue as number);
  };

  return (
    <div className="app">
      <Tabs
        aria-label="Project sections"
        onChange={handleSectionChange}
        underlined
        value={section}
      >
        {SECTIONS.map((item) => (
          <Tab key={item.label} label={item.label} />
        ))}
      </Tabs>

      <Tabs
        aria-label={`${SECTIONS[section].label} views`}
        onChange={handleSubTabChange}
        sdsSize="small"
        value={subTab}
      >
        {SECTIONS[section].subTabs.map((label) => (
          <Tab key={label} label={label} />
        ))}
      </Tabs>
    </div>
  );
}

export default App;
