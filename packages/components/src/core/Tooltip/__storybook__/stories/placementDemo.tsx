import { TOOLTIP_PLACEMENT_STYLES } from "../constants";
import RawTooltip from "src/core/Tooltip";
import ButtonV2 from "src/core/ButtonV2";

export const PlacementDemo = (): JSX.Element => {
  return (
    <div style={TOOLTIP_PLACEMENT_STYLES as React.CSSProperties}>
      <RawTooltip title="Text" placement="top-start" arrow open>
        <ButtonV2 sdsStyle="outline" sdsType="primary" size="large">
          top-start
        </ButtonV2>
      </RawTooltip>
      <RawTooltip title="Text" placement="top" arrow open>
        <ButtonV2 sdsStyle="outline" sdsType="primary" size="large">
          top
        </ButtonV2>
      </RawTooltip>
      <RawTooltip title="Text" placement="top-end" arrow open>
        <ButtonV2 sdsStyle="outline" sdsType="primary" size="large">
          top-end
        </ButtonV2>
      </RawTooltip>
      <RawTooltip title="Text" placement="left-start" arrow open>
        <ButtonV2 sdsStyle="outline" sdsType="primary" size="large">
          left-start
        </ButtonV2>
      </RawTooltip>
      <div />
      <RawTooltip title="Text" placement="right-start" arrow open>
        <ButtonV2 sdsStyle="outline" sdsType="primary" size="large">
          right-start
        </ButtonV2>
      </RawTooltip>
      <RawTooltip title="Text" placement="left" arrow open>
        <ButtonV2 sdsStyle="outline" sdsType="primary" size="large">
          left
        </ButtonV2>
      </RawTooltip>
      <div />
      <RawTooltip title="Text" placement="right" arrow open>
        <ButtonV2 sdsStyle="outline" sdsType="primary" size="large">
          right
        </ButtonV2>
      </RawTooltip>
      <RawTooltip title="Text" placement="left-end" arrow open>
        <ButtonV2 sdsStyle="outline" sdsType="primary" size="large">
          left-end
        </ButtonV2>
      </RawTooltip>
      <div />
      <RawTooltip title="Text" placement="right-end" arrow open>
        <ButtonV2 sdsStyle="outline" sdsType="primary" size="large">
          right-end
        </ButtonV2>
      </RawTooltip>
      <RawTooltip title="Text" placement="bottom-start" arrow open>
        <ButtonV2 sdsStyle="outline" sdsType="primary" size="large">
          bottom-start
        </ButtonV2>
      </RawTooltip>
      <RawTooltip title="Text" placement="bottom" arrow open>
        <ButtonV2 sdsStyle="outline" sdsType="primary" size="large">
          bottom
        </ButtonV2>
      </RawTooltip>
      <RawTooltip title="Text" placement="bottom-end" arrow open>
        <ButtonV2 sdsStyle="outline" sdsType="primary" size="large">
          bottom-end
        </ButtonV2>
      </RawTooltip>
    </div>
  );
};
