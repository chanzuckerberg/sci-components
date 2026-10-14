// A Menu anchored to the button that opens it: `anchorEl` places the surface,
// `open` drives its visibility, and `onClose` handles the backdrop click and
// the Esc key. Each item closes the Menu itself.

import { useState } from "react";
import { Button, Menu, MenuItem } from "@czi-sds/components";

function App() {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const isOpen = Boolean(anchorEl);

  const handleClose = () => setAnchorEl(null);

  return (
    <div className="app">
      <Button
        id="default-menu-button"
        sdsStyle="minimal"
        sdsType="primary"
        aria-controls={isOpen ? "default-menu" : undefined}
        aria-expanded={isOpen || undefined}
        aria-haspopup="true"
        onClick={(event) => setAnchorEl(event.currentTarget)}
      >
        Open Menu
      </Button>

      <Menu
        id="default-menu"
        anchorEl={anchorEl}
        open={isOpen}
        onClose={handleClose}
        slotProps={{ list: { "aria-labelledby": "default-menu-button" } }}
      >
        <MenuItem sdsType="action" onClick={handleClose}>
          Contact us
        </MenuItem>
        <MenuItem sdsType="action" onClick={handleClose}>
          Terms of Use
        </MenuItem>
        <MenuItem sdsType="action" onClick={handleClose}>
          Privacy Policy
        </MenuItem>
        <MenuItem sdsType="action" onClick={handleClose}>
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
}

export default App;
