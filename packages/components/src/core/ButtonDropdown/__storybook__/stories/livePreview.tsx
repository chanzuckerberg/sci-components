import { Args } from "@storybook/react";
import { ButtonDropdown } from "./default";
import Icon from "src/core/Icon";
import { BUTTON_DROPDOWN_TEXT } from "../constants";

const livePreviewWrapperStyle = {
  display: "grid",
  gridColumnGap: 10,
  gridRowGap: 24,
  gridTemplateColumns: "repeat(2, min-content)",
  gridTemplateRows: "repeat(2, auto)",
};

export function LivePreviewDemo(props: Args): JSX.Element {
  return (
    <div style={livePreviewWrapperStyle as React.CSSProperties}>
      <div>
        <ButtonDropdown
          sdsType="primary"
          sdsStyle="rounded"
          icon={<Icon sdsIcon="Download" sdsSize="l" sdsType="button" />}
          {...props}
        >
          {BUTTON_DROPDOWN_TEXT}
        </ButtonDropdown>
      </div>

      <div>
        <ButtonDropdown
          sdsType="secondary"
          sdsStyle="rounded"
          icon={<Icon sdsIcon="Download" sdsSize="l" sdsType="button" />}
          {...props}
        >
          {BUTTON_DROPDOWN_TEXT}
        </ButtonDropdown>
      </div>

      <div>
        <ButtonDropdown
          sdsType="primary"
          sdsStyle="square"
          icon={<Icon sdsIcon="Download" sdsSize="l" sdsType="button" />}
          {...props}
        >
          {BUTTON_DROPDOWN_TEXT}
        </ButtonDropdown>
      </div>

      <div>
        <ButtonDropdown
          sdsType="secondary"
          sdsStyle="square"
          icon={<Icon sdsIcon="Download" sdsSize="l" sdsType="button" />}
          {...props}
        >
          {BUTTON_DROPDOWN_TEXT}
        </ButtonDropdown>
      </div>
    </div>
  );
}
