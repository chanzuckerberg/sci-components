import{n as e}from"./rolldown-runtime-DaJ6WEGw.js";var t;e((()=>{t=`// An array value turns the slider into a range with two thumbs, which the
// component labels "Minimum value" and "Maximum value" for screen readers.
import { InputSlider } from "@czi-sds/components";
import { Box } from "@mui/material";

function App() {
  return (
    <div className="app">
      <Box sx={{ width: 200 }}>
        <InputSlider
          defaultValue={[15, 85]}
          min={0}
          max={100}
          step={5}
          valueLabelDisplay="on"
        />
      </Box>
    </div>
  );
}

export default App;
`}))();export{t as default};