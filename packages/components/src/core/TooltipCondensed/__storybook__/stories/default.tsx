import { Args } from "@storybook/types";
import Button from "src/core/Button";
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
          <Button
            aria-label="tooltip condensed test button"
            data-testid="tooltip-hover"
            icon="ExclamationMarkCircle"
            sdsSize="large"
            sdsStyle="icon"
            sdsType="tertiary"
          />
        </RawTooltipCondensed>
        <p>Hover over the info icon to view the tooltip.</p>
      </div>
    </div>
  );
};
