// Menu itself has no notion of a selected value: MenuItem draws the state and
// the surrounding component owns it. Because closing only happens when
// something calls `onClose`, items that toggle a selection leave the Menu open
// for the next one.

import { useState } from "react";
import { Button, Menu, MenuItem } from "@czi-sds/components";

const ORGANISMS = [
  { count: "12,480", name: "Homo sapiens" },
  { count: "8,213", name: "Mus musculus" },
  { count: "3,006", name: "Danio rerio" },
];

function App() {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [selected, setSelected] = useState<string[]>(["Homo sapiens"]);
  const isOpen = Boolean(anchorEl);

  const toggle = (name: string) => {
    setSelected((previous) =>
      previous.includes(name)
        ? previous.filter((item) => item !== name)
        : [...previous, name]
    );
  };

  return (
    <div className="app">
      <Button
        id="selection-menu-button"
        sdsStyle="minimal"
        sdsType="primary"
        aria-controls={isOpen ? "selection-menu" : undefined}
        aria-expanded={isOpen || undefined}
        aria-haspopup="true"
        onClick={(event) => setAnchorEl(event.currentTarget)}
      >
        {`Organism (${selected.length})`}
      </Button>

      <Menu
        id="selection-menu"
        anchorEl={anchorEl}
        open={isOpen}
        onClose={() => setAnchorEl(null)}
        slotProps={{ list: { "aria-labelledby": "selection-menu-button" } }}
      >
        {ORGANISMS.map((organism) => (
          <MenuItem
            key={organism.name}
            isMultiSelect
            column={organism.count}
            selected={selected.includes(organism.name)}
            onClick={() => toggle(organism.name)}
          >
            {organism.name}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

export default App;
