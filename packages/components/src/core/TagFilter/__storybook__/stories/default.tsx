import { Args } from "@storybook/react";
import { useState } from "react";
import { TAG_FILTER_DEFAULT_STYLES } from "../constants";
import RawTagFilter from "src/core/TagFilter";
import Button from "src/core/Button";

export const TagFilter = (props: Args): JSX.Element => {
  const { label } = props;

  const [visible, setVisible] = useState(true);

  const handleShowChip = () => setVisible(true);
  const handleDismissChip = () => setVisible(false);

  return (
    <div style={TAG_FILTER_DEFAULT_STYLES as React.CSSProperties}>
      <div>
        <Button
          disabled={visible}
          onClick={handleShowChip}
          sdsStyle="minimal"
          sdsType={visible ? "secondary" : "primary"}
        >
          {visible
            ? "Delete the tag by clicking on its icon"
            : "Click to reset"}
        </Button>
      </div>

      <div>
        {visible && (
          <RawTagFilter label={label} onDelete={handleDismissChip} {...props} />
        )}
      </div>
    </div>
  );
};
