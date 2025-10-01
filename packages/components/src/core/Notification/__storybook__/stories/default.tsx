import { FormControlLabel } from "@mui/material";
import { Args } from "@storybook/types";
import { useState } from "react";
import { SHORT_LOREM_IPSUM } from "src/common/storybook/loremIpsum";
import InputToggle from "src/core/InputToggle";
import RawNotification from "src/core/Notification";
import { TooltipTableContent } from "src/core/TooltipTable/__storybook__/stories/default";

export const Notification = (props: Args): JSX.Element => {
  const {
    intent,
    onClose,
    buttonOnClick,
    buttonText,
    slideDirection,
    extraContent,
    autoDismiss,
  } = props;

  const [dismissed, setDismissed] = useState(false);

  const handleChange = () => {
    setDismissed((prev) => !prev);
  };

  return (
    <>
      <FormControlLabel
        control={<InputToggle checked={dismissed} onChange={handleChange} />}
        label="Hide Notification"
        sx={{
          "& .MuiSwitch-root": {
            mr: "12px",
          },
          margin: "0 0 16px 0",
        }}
      />
      <RawNotification
        autoDismiss={autoDismiss}
        dismissed={dismissed}
        slideDirection={slideDirection}
        intent={intent}
        onClose={onClose}
        buttonOnClick={buttonOnClick}
        buttonText={buttonText}
        {...props}
      >
        This is a notification!
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
      </RawNotification>
    </>
  );
};
