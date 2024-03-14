import { FormControl, FormLabel, RadioGroup } from "@mui/material";
import { Args } from "@storybook/react";
import { INPUT_RADIO_LIVE_PREVIEW_STYLES } from "../constants";
import RawInputRadio from "src/core/InputRadio";

const CustomFormLabel = (props: Args): JSX.Element => {
  const { children } = props;

  return <FormLabel sx={{ mb: "12px" }}>{children}</FormLabel>;
};

export const LivePreviewDemo = (): JSX.Element => {
  return (
    <div style={INPUT_RADIO_LIVE_PREVIEW_STYLES as React.CSSProperties}>
      <FormControl>
        <CustomFormLabel>No Labels or Captions</CustomFormLabel>
        <RadioGroup name="input-radio-group-no-labels" defaultValue={1}>
          <RawInputRadio value="1" />
          <RawInputRadio value="2" intent="warning" />
          <RawInputRadio value="3" intent="error" />
          <RawInputRadio value="4" disabled />
        </RadioGroup>
      </FormControl>

      <FormControl>
        <CustomFormLabel>With Labels</CustomFormLabel>
        <RadioGroup
          title="With Labels/Captions"
          aria-labelledby="demo-input-radio-group-labels"
          defaultValue="demo1"
          name="input-radio-group"
        >
          <RawInputRadio label="Default" value="1" />
          <RawInputRadio label="Warning" value="2" intent="warning" />
          <RawInputRadio label="Error" value="3" intent="error" />
          <RawInputRadio label="Disabled" value="4" disabled />
        </RadioGroup>
      </FormControl>

      <FormControl>
        <CustomFormLabel>With Labels and Captions</CustomFormLabel>
        <RadioGroup
          title="With Labels/Captions"
          aria-labelledby="demo-input-radio-group-labels-captions"
          defaultValue="demo1"
          name="input-radio-group"
        >
          <RawInputRadio label="Default" caption="Caption I" value="1" />
          <RawInputRadio
            label="Warning"
            caption="Caption II"
            value="2"
            intent="warning"
          />
          <RawInputRadio
            label="Error"
            caption="Caption III"
            value="3"
            intent="error"
          />
          <RawInputRadio
            disabled
            label="Disabled"
            caption="Caption IV"
            value="4"
          />
        </RadioGroup>
      </FormControl>
    </div>
  );
};
