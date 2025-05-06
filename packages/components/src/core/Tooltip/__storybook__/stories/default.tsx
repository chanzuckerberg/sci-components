import { useTheme } from "@mui/material";
import { Args } from "@storybook/react";
import Button from "src/core/Button";
import { getSemanticColors } from "src/core/styles";
import RawTooltip from "src/core/Tooltip";

export const CustomComponentSlot = (): JSX.Element => {
  const theme = useTheme();
  const colors = getSemanticColors({ theme });

  return (
    <div
      style={{
        alignItems: "center",
        border: `1px dashed ${colors?.base.borderPrimary}`,
        display: "flex",
        fontSize: 10,
        fontWeight: "normal",
        height: 50,
        justifyContent: "center",
        width: "100%",
      }}
    >
      Component slot
    </div>
  );
};

export const Tooltip = (props: Args): JSX.Element => {
  const { title } = props;
  return (
    <div>
      Hover over the info icon to view the tooltip.
      <p>
        ArrowOffset changes the position of the tooltip arrow and can be any
        numeric value within [-120, 120]. Any value value over the width of the
        tooltip will remove the arrow from the tooltip.
      </p>
      <div
        style={{
          margin: "135px 300px",
        }}
      >
        <RawTooltip title={title} {...props}>
          <Button
            aria-label="tooltip test button"
            sdsStyle="icon"
            sdsSize="large"
            icon="ExclamationMarkCircle"
          />
        </RawTooltip>
      </div>
    </div>
  );
};
