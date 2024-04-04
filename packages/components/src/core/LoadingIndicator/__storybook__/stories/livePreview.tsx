import { Args } from "@storybook/react";
import { LIST_LIVE_PREVIEW_STYLES } from "../constants";
import RawLoadingIndicator from "src/core/LoadingIndicator";
import { useTheme } from "@mui/material";
import { getSpaces } from "src/core/styles";

export const LivePreviewDemo = (props: Args): JSX.Element => {
  const theme = useTheme();
  const spaces = getSpaces({ theme });

  return (
    <div style={LIST_LIVE_PREVIEW_STYLES as React.CSSProperties}>
      <div
        style={{
          marginBottom: spaces?.l,
          marginRight: spaces?.l,
          marginTop: spaces?.l,
        }}
      >
        <RawLoadingIndicator sdsStyle="minimal" {...props} />
      </div>
      <div
        style={{
          marginBottom: spaces?.l,
          marginRight: spaces?.l,
          marginTop: spaces?.l,
        }}
      >
        <RawLoadingIndicator sdsStyle="tag" {...props} />
      </div>
    </div>
  );
};
