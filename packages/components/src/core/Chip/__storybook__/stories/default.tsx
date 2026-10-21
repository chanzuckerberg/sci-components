import { Args } from "@storybook/react-vite";
import { useState } from "react";
import { CHIP_DEFAULT_STYLES } from "../constants";
import RawChip from "@components/src/core/Chip";
import Button from "@components/src/core/Button";

export const Chip = (props: Args): JSX.Element => {
  const { label } = props;

  const [visible, setVisible] = useState(true);

  const handleShowChip = () => setVisible(true);
  const handleDismissChip = () => setVisible(false);

  return (
    <div style={CHIP_DEFAULT_STYLES as React.CSSProperties}>
      <div>
        <Button
          disabled={visible}
          onClick={handleShowChip}
          sdsStyle="minimal"
          sdsType={visible ? "secondary" : "primary"}
        >
          {visible ? "Remove the chip by clicking on it" : "Click to reset"}
        </Button>
      </div>

      <div>
        {visible && (
          <RawChip label={label} onDelete={handleDismissChip} {...props} />
        )}
      </div>
    </div>
  );
};
