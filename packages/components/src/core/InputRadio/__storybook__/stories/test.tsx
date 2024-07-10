import { FormControl, FormLabel, RadioGroup } from "@mui/material";
import RawInputRadio from "src/core/InputRadio";

export const TestDemo = (): JSX.Element => {
  return (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label" style={{ color: "black" }}>
        Ticket Status
      </FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="demo1"
        name="input-radio-group"
        data-testid="radioButtonGroup"
        sx={{ mt: 5 }}
      >
        <RawInputRadio data-testid="inputRadio" label="Blocked" value="demo1" />
        <RawInputRadio
          caption="Caption"
          data-testid="inputRadio"
          label="In Progress"
          value="demo2"
        />
        <RawInputRadio
          caption="Caption"
          data-testid="inputRadio"
          label="Completed"
          value="demo3"
        />
      </RadioGroup>
    </FormControl>
  );
};
