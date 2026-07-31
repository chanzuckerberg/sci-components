import { InputSlider } from "@czi-sds/components";
import { Box } from "@mui/material";

function App() {
  return (
    <div className="app">
      <Box sx={{ width: 200 }}>
        <InputSlider aria-label="Label" defaultValue={50} />
      </Box>
    </div>
  );
}

export default App;
