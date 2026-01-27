import { TOOLTIP_PLACEMENT_STYLES } from "../constants";
import RawTooltip from "src/core/Tooltip";
import Button from "src/core/Button";

export const PlacementDemo = (): JSX.Element => {
  return (
    <div style={TOOLTIP_PLACEMENT_STYLES as React.CSSProperties}>
      <RawTooltip title="Text" placement="top-start" arrow open>
        <Button sdsStyle="outline" sdsType="primary" size="large">
          top-start
        </Button>
      </RawTooltip>
      <RawTooltip title="Text" placement="top" arrow open>
        <Button sdsStyle="outline" sdsType="primary" size="large">
          top
        </Button>
      </RawTooltip>
      <RawTooltip title="Text" placement="top-end" arrow open>
        <Button sdsStyle="outline" sdsType="primary" size="large">
          top-end
        </Button>
      </RawTooltip>
      <RawTooltip title="Text" placement="left-start" arrow open>
        <Button sdsStyle="outline" sdsType="primary" size="large">
          left-start
        </Button>
      </RawTooltip>
      <div />
      <RawTooltip title="Text" placement="right-start" arrow open>
        <Button sdsStyle="outline" sdsType="primary" size="large">
          right-start
        </Button>
      </RawTooltip>
      <RawTooltip title="Text" placement="left" arrow open>
        <Button sdsStyle="outline" sdsType="primary" size="large">
          left
        </Button>
      </RawTooltip>
      <div />
      <RawTooltip title="Text" placement="right" arrow open>
        <Button sdsStyle="outline" sdsType="primary" size="large">
          right
        </Button>
      </RawTooltip>
      <RawTooltip title="Text" placement="left-end" arrow open>
        <Button sdsStyle="outline" sdsType="primary" size="large">
          left-end
        </Button>
      </RawTooltip>
      <div />
      <RawTooltip title="Text" placement="right-end" arrow open>
        <Button sdsStyle="outline" sdsType="primary" size="large">
          right-end
        </Button>
      </RawTooltip>
      <RawTooltip title="Text" placement="bottom-start" arrow open>
        <Button sdsStyle="outline" sdsType="primary" size="large">
          bottom-start
        </Button>
      </RawTooltip>
      <RawTooltip title="Text" placement="bottom" arrow open>
        <Button sdsStyle="outline" sdsType="primary" size="large">
          bottom
        </Button>
      </RawTooltip>
      <RawTooltip title="Text" placement="bottom-end" arrow open>
        <Button sdsStyle="outline" sdsType="primary" size="large">
          bottom-end
        </Button>
      </RawTooltip>
    </div>
  );
};
