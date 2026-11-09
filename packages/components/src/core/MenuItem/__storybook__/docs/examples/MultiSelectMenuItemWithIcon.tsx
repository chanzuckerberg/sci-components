import { useState } from "react";
import { MenuItem, getColors } from "@czi-sds/components";
import { MenuList, useTheme } from "@mui/material";
import { GearIcon } from "@phosphor-icons/react";

function App() {
  const [selected, setSelected] = useState(false);
  const colors = getColors({ theme: useTheme() });

  const handleClick = () => {
    setSelected((prev) => !prev);
  };

  return (
    <div className="app">
      <MenuList>
        <MenuItem
          isMultiSelect
          column="Column Value"
          icon={<GearIcon weight="bold" color={colors?.purple[500]} />}
          selected={selected}
          onClick={handleClick}
        >
          MenuItem 1
        </MenuItem>
      </MenuList>
    </div>
  );
}

export default App;
