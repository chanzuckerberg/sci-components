import { FormControl, RadioGroup } from "@mui/material";
import RawInputRadio from "src/core/InputRadio";
import { StyledFormLabel } from "./style";

export const TestDemo = (): JSX.Element => {
  return (
    <FormControl>
      <StyledFormLabel id="demo-radio-buttons-group-label">
        Ticket Status
      </StyledFormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="demo1"
        name="input-radio-group"
        data-testid="radioButtonGroup"
        sx={{ mt: 5, gap: "8px" }}
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
