// `anchorOrigin` picks the point on the trigger the Menu grows from, and
// `transformOrigin` the corner of the Menu that meets it. Pairing right edges
// keeps the surface aligned with the end of the button instead of centered
// under it.

import { useState } from "react";
import { Button, Menu, MenuItem } from "@czi-sds/components";

function App() {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const isOpen = Boolean(anchorEl);

  const handleClose = () => setAnchorEl(null);

  return (
    <div className="app">
      <Button
        id="placement-menu-button"
        sdsStyle="outline"
        sdsType="primary"
        aria-controls={isOpen ? "placement-menu" : undefined}
        aria-expanded={isOpen || undefined}
        aria-haspopup="true"
        onClick={(event) => setAnchorEl(event.currentTarget)}
      >
        Right aligned Menu
      </Button>

      <Menu
        id="placement-menu"
        anchorEl={anchorEl}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        open={isOpen}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        onClose={handleClose}
        slotProps={{ list: { "aria-labelledby": "placement-menu-button" } }}
      >
        <MenuItem sdsType="action" onClick={handleClose}>
          Rename
        </MenuItem>
        <MenuItem sdsType="action" onClick={handleClose}>
          Duplicate
        </MenuItem>
        <MenuItem disabled sdsType="action" onClick={handleClose}>
          Archive
        </MenuItem>
      </Menu>
    </div>
  );
}

export default App;
