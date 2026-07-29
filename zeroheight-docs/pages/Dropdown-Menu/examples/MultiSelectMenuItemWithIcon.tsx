import { useState } from "react";
import { MenuItem } from "@czi-sds/components";
import { MenuList } from "@mui/material";

function App() {
  const [selected, setSelected] = useState(false);

  const handleClick = () => {
    setSelected((prev) => !prev);
  };

  return (
    <div className="app">
      <MenuList>
        <MenuItem
          isMultiSelect
          column="Column Value"
          sdsIcon="Gear"
          count={3}
          sdsIconProps={{
            color: "purple",
          }}
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
