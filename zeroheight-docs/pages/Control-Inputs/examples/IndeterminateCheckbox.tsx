import { useState } from "react";
import { Box } from "@mui/material";
import { InputCheckbox } from "@czi-sds/components";

function App() {
  const [checked, setChecked] = useState([true, false]);

  const handleChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked([event.target.checked, event.target.checked]);
  };

  const handleChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked([event.target.checked, checked[1]]);
  };

  const handleChange3 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked([checked[0], event.target.checked]);
  };

  const children = (
    <Box sx={{ display: "flex", flexDirection: "column", ml: 6 }}>
      <InputCheckbox
        label="Child 1"
        checkboxProps={{
          checked: checked[0],
          onChange: handleChange2,
        }}
      />
      <InputCheckbox
        label="Child 2"
        checkboxProps={{
          checked: checked[1],
          onChange: handleChange3,
        }}
      />
    </Box>
  );

  return (
    <div className="app">
      <InputCheckbox
        label="Parent"
        checkboxProps={{
          checked: checked[0] && checked[1],
          indeterminate: checked[0] !== checked[1],
          onChange: handleChange1,
        }}
      />
      {children}
    </div>
  );
}

export default App;
