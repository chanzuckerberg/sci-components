import { InputText } from "@czi-sds/components";
import { Box } from "@mui/material";

function App() {
  return (
    <div className="app">
      <Box sx={{ width: 300 }}>
        <InputText
          id="search-input"
          label="Label"
          placeholder="Enter your text"
          hideLabel
        />
      </Box>
    </div>
  );
}

export default App;
