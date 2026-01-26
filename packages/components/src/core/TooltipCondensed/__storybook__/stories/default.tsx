import { Args } from "@storybook/react-webpack5";
import ButtonV2 from "src/core/ButtonV2";
import Icon from "src/core/Icon";
import RawTooltipCondensed from "src/core/TooltipCondensed";

export const TooltipCondensed = (props: Args): JSX.Element => {
  const { title, indicator } = props;
  return (
    <div>
      <div
        style={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          justifyContent: "center",
        }}
      >
        <RawTooltipCondensed indicator={indicator} title={title} {...props}>
          <ButtonV2
            aria-label="tooltip condensed test button"
            data-testid="tooltip-hover"
            size="large"
            sdsStyle="minimal"
            sdsType="primary"
          >
            <Icon sdsIcon="ExclamationMarkCircle" sdsSize="s" />
          </ButtonV2>
        </RawTooltipCondensed>
        <p>Hover over the info icon to view the tooltip.</p>
      </div>
    </div>
  );
};
