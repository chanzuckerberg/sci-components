import { Args } from "@storybook/react-vite";
import { useState } from "react";
import { TAG_FILTER_DEFAULT_STYLES } from "../constants";
import RawTagFilter from "@components/src/core/TagFilter";
import Button from "@components/src/core/Button";
import Callout from "@components/src/core/Callout";
import Icon from "@components/src/core/Icon";

export const TagFilter = (props: Args): JSX.Element => {
  const { label } = props;

  const [visible, setVisible] = useState(true);

  const handleShowChip = () => setVisible(true);
  const handleDismissChip = () => setVisible(false);

  return (
    <div style={TAG_FILTER_DEFAULT_STYLES as React.CSSProperties}>
      <Callout
        intent="negative"
        title="Deprecated!"
        sdsStyle="persistent"
        icon={<Icon sdsIcon="ExclamationMarkCircle" sdsSize="s" />}
        body={
          <>
            The <strong>TagFilter</strong> component is deprecated!
            <br />
            Please use <strong>Chip</strong> component instead.
          </>
        }
      />
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
