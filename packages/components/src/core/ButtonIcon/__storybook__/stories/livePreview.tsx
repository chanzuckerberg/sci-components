import { SDSAppTheme } from "src/core/styles";
import { ButtonIcon } from "./default";

export const LivePreviewDemo = (): JSX.Element => {
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
        <ButtonIcon
          aria-label="grid"
          style={{ marginRight: spaces?.xxs }}
          icon="Grid"
          sdsSize="large"
          sdsType="primary"
        />
        <ButtonIcon
          aria-label="grid"
          style={{ marginRight: spaces?.xxs }}
          icon="Grid"
          sdsSize="large"
          sdsType="primary"
        />
      </div>
      <div style={{ display: "flex" }}>
        <ButtonIcon
          aria-label="infoSpeechBubble"
          style={{ marginRight: spaces?.m }}
          icon="InfoSpeechBubble"
          sdsSize="large"
          sdsType="secondary"
        />
        <ButtonIcon
          aria-label="infoSpeechBubble"
          style={{ marginRight: spaces?.m }}
          icon="InfoSpeechBubble"
          sdsSize="large"
          sdsType="secondary"
        />
      </div>
      <div>
        <ButtonIcon
          aria-label="xMark"
          style={{ marginRight: spaces?.m }}
          icon="XMark"
          sdsSize="large"
          sdsType="tertiary"
        />
      </div>
      <div>
        <ButtonIcon
          aria-label="xMark"
          style={{ marginRight: spaces?.m }}
          icon="XMark"
          sdsSize="medium"
          sdsType="tertiary"
        />
      </div>
      <div style={{ display: "flex" }}>
        <ButtonIcon
          aria-label="barChartVertical3"
          style={{ marginRight: spaces?.s }}
          icon="BarChartVertical3"
          sdsSize="small"
          sdsType="primary"
        />
        <ButtonIcon
          aria-label="barChartVertical3"
          style={{ marginRight: spaces?.s }}
          icon="BarChartVertical3"
          sdsSize="small"
          sdsType="primary"
        />
      </div>
      <div style={{ display: "flex" }}>
        <ButtonIcon
          aria-label="plusCircle"
          style={{ marginRight: spaces?.s }}
          icon="PlusCircle"
          sdsSize="small"
          sdsType="secondary"
        />
        <ButtonIcon
          aria-label="plusCircle"
          style={{ marginRight: spaces?.s }}
          icon="PlusCircle"
          sdsSize="small"
          sdsType="secondary"
        />
      </div>
      <div>
        <ButtonIcon
          aria-label="xMark"
          style={{ marginRight: spaces?.s }}
          icon="XMark"
          sdsSize="small"
          sdsType="tertiary"
        />
      </div>
    </div>
  );
};
