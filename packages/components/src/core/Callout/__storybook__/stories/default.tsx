import { FormControlLabel } from "@mui/material";
import { Args } from "@storybook/react";
import { useState } from "react";
import RawCallout from "src/core/Callout";
import InputToggle from "src/core/InputToggle";
import CalloutTitle from "src/core/Callout/components/CalloutTitle";
import { EXTRA_SHORT_LOREM_IPSUM } from "src/common/storybook/loremIpsum";

export const Callout = (props: Args): JSX.Element => {
  const { intent, onClose, calloutTitle, autoDismiss, ...rest } = props;

  const [dismissed, setDismissed] = useState(false);

  const handleChange = () => {
    setDismissed((prev) => !prev);
  };

  const finalOnclose = !onClose ? undefined : () => setDismissed(true);

  return (
    <>
      {!autoDismiss && (
        <FormControlLabel
          control={<InputToggle checked={dismissed} onChange={handleChange} />}
          label="Hide Callout"
          sx={{
            "& .MuiSwitch-root": {
              mr: "12px",
            },
            margin: "0 0 16px 0",
          }}
        />
      )}
      <RawCallout
        autoDismiss={autoDismiss}
        intent={intent}
        dismissed={dismissed}
        onClose={finalOnclose}
        {...rest}
      >
        {calloutTitle && <CalloutTitle>{calloutTitle}</CalloutTitle>}
        {EXTRA_SHORT_LOREM_IPSUM}
      </RawCallout>
    </>
  );
};
