import { InputText } from "@czi-sds/components";
import { Box } from "@mui/material";

function App() {
  return (
    <div className="app">
      <Box sx={{ width: 300 }}>
        <InputText
          id="search-input"
          label="Description"
          placeholder="Enter your text"
          sdsType="textArea"
        />
      </Box>
    </div>
  );
}

export default App;
