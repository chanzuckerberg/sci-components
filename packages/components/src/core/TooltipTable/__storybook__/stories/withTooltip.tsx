import { Args } from "@storybook/types";
import Button from "src/core/Button";
import Link from "src/core/Link";
import TooltipCondensed from "src/core/TooltipCondensed";
import RawTooltipTableContent from "src/core/TooltipTable";

export const WithinTooltipDemo = (props: Args): JSX.Element => {
  const { contentAlert } = props;
  const handleAlert = () => {
    let alertContent;
    switch (contentAlert) {
      case "String":
        alertContent = "Some values do not pass the selected filter";
        break;
      case "Element":
        alertContent = <Link href="/">Click this link to see samples</Link>;
        break;
      case "None":
      default:
        alertContent = undefined;
    }
    return alertContent;
  };

  return (
    <div>
      Hover over the info icon to view the tooltip.
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "50px",
        }}
      >
        <TooltipCondensed
          title={null}
          hasInvertedStyle={false}
          componentSlot={
            <RawTooltipTableContent {...props} contentAlert={handleAlert()} />
          }
        >
          <Button
            aria-label="tooltip test button"
            sdsStyle="icon"
            sdsSize="large"
            icon="ExclamationMarkCircle"
          />
        </TooltipCondensed>
      </div>
    </div>
  );
};
