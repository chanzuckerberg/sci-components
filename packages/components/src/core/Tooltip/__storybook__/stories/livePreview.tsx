import ButtonIcon from "src/core/ButtonIcon";
import { TOOLTIP_LIVE_PREVIEW_STYLES } from "../constants";
import RawTooltip from "src/core/Tooltip";
import Button from "src/core/Button";
import { EXTRA_SHORT_LOREM_IPSUM } from "src/common/storybook/loremIpsum";

export const LivePreviewDemo = (): JSX.Element => {
  return (
    <div style={TOOLTIP_LIVE_PREVIEW_STYLES as React.CSSProperties}>
      <RawTooltip
        title="Label lorem"
        sdsStyle="dark"
        placement="top"
        arrow
        open
      >
        <ButtonIcon
          sdsType="secondary"
          sdsSize="large"
          icon="InfoSpeechBubble"
        />
      </RawTooltip>
      <RawTooltip
        title={EXTRA_SHORT_LOREM_IPSUM}
        sdsStyle="light"
        placement="top"
        arrow
        open
      >
        <Button sdsType="primary" sdsStyle="rounded">
          Label
        </Button>
      </RawTooltip>
    </div>
  );
};
