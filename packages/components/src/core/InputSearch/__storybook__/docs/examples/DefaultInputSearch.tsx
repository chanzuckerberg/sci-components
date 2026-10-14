import { InputSearch } from "@czi-sds/components";
import { Box } from "@mui/material";

function App() {
  return (
    <div className="app">
      <Box sx={{ width: 300 }}>
        <InputSearch id="search-input" label="search" placeholder="Search" />
      </Box>
    </div>
  );
}

export default App;
