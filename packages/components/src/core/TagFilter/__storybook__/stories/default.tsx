import { Args } from "@storybook/react-webpack5";
import { useState } from "react";
import { TAG_FILTER_DEFAULT_STYLES } from "../constants";
import RawTagFilter from "src/core/TagFilter";
import ButtonV2 from "src/core/ButtonV2";

export const TagFilter = (props: Args): JSX.Element => {
  const { label } = props;

  const [visible, setVisible] = useState(true);

  const handleShowChip = () => setVisible(true);
  const handleDismissChip = () => setVisible(false);

  return (
    <div style={TAG_FILTER_DEFAULT_STYLES as React.CSSProperties}>
      <div>
        <ButtonV2
          disabled={visible}
          onClick={handleShowChip}
          sdsStyle="minimal"
          sdsType={visible ? "secondary" : "primary"}
        >
          {visible
            ? "Delete the tag by clicking on its icon"
            : "Click to reset"}
        </ButtonV2>
      </div>

      <div>
        {visible && (
          <RawTagFilter label={label} onDelete={handleDismissChip} {...props} />
        )}
      </div>
    </div>
  );
};
