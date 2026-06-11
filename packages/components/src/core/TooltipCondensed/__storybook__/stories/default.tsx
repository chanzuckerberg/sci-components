import { Args } from "@storybook/react-vite";
import Button from "@components/src/core/Button";
import Icon from "@components/src/core/Icon";
import RawTooltipCondensed from "@components/src/core/TooltipCondensed";

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
          <Button
            aria-label="tooltip condensed test button"
            data-testid="tooltip-hover"
            size="large"
            sdsStyle="minimal"
            sdsType="primary"
          >
            <Icon sdsIcon="ExclamationMarkCircle" sdsSize="s" />
          </Button>
        </RawTooltipCondensed>
        <p>Hover over the info icon to view the tooltip.</p>
      </div>
    </div>
  );
};
