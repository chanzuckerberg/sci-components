import { TOOLTIP_PLACEMENT_STYLES } from "../constants";
import RawTooltip from "src/core/Tooltip";
import Button from "src/core/Button";

export const PlacementDemo = (): JSX.Element => {
  return (
    <div style={TOOLTIP_PLACEMENT_STYLES as React.CSSProperties}>
      <RawTooltip title="Text" placement="top-start" arrow open>
        <Button sdsStyle="minimal" sdsType="secondary">
          top-start
        </Button>
      </RawTooltip>
      <RawTooltip title="Text" placement="top" arrow open>
        <Button sdsStyle="minimal" sdsType="secondary">
          top
        </Button>
      </RawTooltip>
      <RawTooltip title="Text" placement="top-end" arrow open>
        <Button sdsStyle="minimal" sdsType="secondary">
          top-end
        </Button>
      </RawTooltip>
      <RawTooltip title="Text" placement="left-start" arrow open>
        <Button sdsStyle="minimal" sdsType="secondary">
          left-start
        </Button>
      </RawTooltip>
      <div />
      <RawTooltip title="Text" placement="right-start" arrow open>
        <Button sdsStyle="minimal" sdsType="secondary">
          right-start
        </Button>
      </RawTooltip>
      <RawTooltip title="Text" placement="left" arrow open>
        <Button sdsStyle="minimal" sdsType="secondary">
          left
        </Button>
      </RawTooltip>
      <div />
      <RawTooltip title="Text" placement="right" arrow open>
        <Button sdsStyle="minimal" sdsType="secondary">
          right
        </Button>
      </RawTooltip>
      <RawTooltip title="Text" placement="left-end" arrow open>
        <Button sdsStyle="minimal" sdsType="secondary">
          left-end
        </Button>
      </RawTooltip>
      <div />
      <RawTooltip title="Text" placement="right-end" arrow open>
        <Button sdsStyle="minimal" sdsType="secondary">
          right-end
        </Button>
      </RawTooltip>
      <RawTooltip title="Text" placement="bottom-start" arrow open>
        <Button sdsStyle="minimal" sdsType="secondary">
          bottom-start
        </Button>
      </RawTooltip>
      <RawTooltip title="Text" placement="bottom" arrow open>
        <Button sdsStyle="minimal" sdsType="secondary">
          bottom
        </Button>
      </RawTooltip>
      <RawTooltip title="Text" placement="bottom-end" arrow open>
        <Button sdsStyle="minimal" sdsType="secondary">
          bottom-end
        </Button>
      </RawTooltip>
    </div>
  );
};
