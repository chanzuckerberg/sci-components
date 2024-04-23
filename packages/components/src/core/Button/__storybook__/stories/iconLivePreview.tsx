import { SDSAppTheme } from "src/core/styles";
import RawButton from "src/core/Button";
// import { BUTTON_TEXT, DEFAULT_PLACEMENT_STYLES } from "../constants";
// import Icon from "src/core/Icon";

// Icon Live Preview Demo

export const IconLivePreviewDemo = (): JSX.Element => {
  const spaces = SDSAppTheme?.spacing;

  const livePreviewStyles: React.CSSProperties = {
    alignItems: "center",
    display: "grid",
    gridColumnGap: "24px",
    gridTemplateColumns: "repeat(7, min-content)",
  };

  return (
    <div style={livePreviewStyles}>
      <div style={{ display: "flex" }}>
        <RawButton
          aria-label="grid"
          style={{ marginRight: spaces?.xxs }}
          icon="Grid"
          sdsSize="large"
          sdsType="primary"
          sdsStyle="icon"
        />
        <RawButton
          aria-label="grid"
          style={{ marginRight: spaces?.xxs }}
          icon="Grid"
          sdsSize="large"
          sdsType="primary"
          sdsStyle="icon"
        />
      </div>
      <div style={{ display: "flex" }}>
        <RawButton
          aria-label="infoSpeechBubble"
          style={{ marginRight: spaces?.m }}
          icon="InfoSpeechBubble"
          sdsSize="large"
          sdsType="secondary"
          sdsStyle="icon"
        />
        <RawButton
          aria-label="infoSpeechBubble"
          style={{ marginRight: spaces?.m }}
          icon="InfoSpeechBubble"
          sdsSize="large"
          sdsType="secondary"
          sdsStyle="icon"
        />
      </div>
      <div>
        <RawButton
          aria-label="xMark"
          style={{ marginRight: spaces?.m }}
          icon="XMark"
          sdsSize="large"
          sdsType="tertiary"
          sdsStyle="icon"
        />
      </div>
      <div>
        <RawButton
          aria-label="xMark"
          style={{ marginRight: spaces?.m }}
          icon="XMark"
          sdsSize="medium"
          sdsType="tertiary"
          sdsStyle="icon"
        />
      </div>
      <div style={{ display: "flex" }}>
        <RawButton
          aria-label="barChartVertical3"
          style={{ marginRight: spaces?.s }}
          icon="BarChartVertical3"
          sdsSize="small"
          sdsType="primary"
          sdsStyle="icon"
        />
        <RawButton
          aria-label="barChartVertical3"
          style={{ marginRight: spaces?.s }}
          icon="BarChartVertical3"
          sdsSize="small"
          sdsType="primary"
          sdsStyle="icon"
        />
      </div>
      <div style={{ display: "flex" }}>
        <RawButton
          aria-label="plusCircle"
          style={{ marginRight: spaces?.s }}
          icon="PlusCircle"
          sdsSize="small"
          sdsType="secondary"
          sdsStyle="icon"
        />
        <RawButton
          aria-label="plusCircle"
          style={{ marginRight: spaces?.s }}
          icon="PlusCircle"
          sdsSize="small"
          sdsType="secondary"
          sdsStyle="icon"
        />
      </div>
      <div>
        <RawButton
          aria-label="xMark"
          style={{ marginRight: spaces?.s }}
          icon="XMark"
          sdsSize="small"
          sdsType="tertiary"
          sdsStyle="icon"
        />
      </div>
    </div>
  );
};
