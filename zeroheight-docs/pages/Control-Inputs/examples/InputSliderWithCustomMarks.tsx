import { InputSlider } from "@czi-sds/components";
import { Box } from "@mui/material";

const generateCustomMarks = (min: number, max: number) => {
  return [
    {
      label: min,
      value: min,
    },
    {
      label: ((max - min) / 2 + min).toFixed(0),
      value: (max - min) / 2 + min,
    },
    {
      label: max,
      value: max,
    },
  ];
};

function App() {
  return (
    <div className="app">
      <Box sx={{ width: 200 }}>
        <InputSlider
          aria-label="Label"
          marks={generateCustomMarks(0, 100)}
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
