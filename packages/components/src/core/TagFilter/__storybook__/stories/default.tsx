import { Args } from "@storybook/react-vite";
import { useState } from "react";
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
    <div>
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
      {!visible && (
        <Button onClick={handleShowChip} sdsStyle="minimal" sdsType="secondary">
          Click to reset
        </Button>
      )}
      <div>
        {visible && (
          <RawTagFilter label={label} onDelete={handleDismissChip} {...props} />
        )}
      </div>
    </div>
  );
};
