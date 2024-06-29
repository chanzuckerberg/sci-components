import { FormControlLabel } from "@mui/material";
import { useState } from "react";
import InputToggle from "src/core/InputToggle";
import RawLoadingIndicator from "src/core/LoadingIndicator";

export const ScreenReaderDemo = (): JSX.Element => {
  const [loading, setLoading] = useState(true);

  const handleChange = () => {
    setLoading((prev) => !prev);
  };

  return (
    <>
      <FormControlLabel
        control={<InputToggle checked={loading} onChange={handleChange} />}
        label="Toggle Loading"
        sx={{
          "& .MuiSwitch-root": {
            mr: "12px",
          },
          margin: "0 0 16px 0",
        }}
      />
      <fieldset>
        <legend>aria-live region</legend>
        <div role="region" id="loading-indicator" aria-live="polite">
          {loading ? (
            <>
              <p>The content is being loaded!</p>
              <RawLoadingIndicator sdsStyle="tag" />
            </>
          ) : (
            <>
              <p>Loading has finished!</p>
            </>
          )}
        </div>
      </fieldset>
    </>
  );
};
