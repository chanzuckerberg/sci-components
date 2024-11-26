import { FormControlLabel } from "@mui/material";
import { Args } from "@storybook/react";
import { useState } from "react";
import RawCallout from "src/core/Callout";
import InputToggle from "src/core/InputToggle";
import { SHORT_LOREM_IPSUM } from "src/common/storybook/loremIpsum";
import TooltipTableContent from "src/core/TooltipTable";

export const Callout = (props: Args): JSX.Element => {
  const { intent, onClose, autoDismiss, extraContent, ...rest } = props;

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
        {extraContent && (
          <div>
            {SHORT_LOREM_IPSUM}
            <div style={{ marginTop: 10 }}>
              <TooltipTableContent
                data={[
                  {
                    dataRows: [
                      { label: "Lorem ipsum", value: 14.03 },
                      { label: "Dollor", value: 432.53 },
                      { label: "Sit amet", value: "7,776.05" },
                    ],
                  },
                ]}
              />
            </div>
          </div>
        )}
      </RawCallout>
    </>
  );
};
