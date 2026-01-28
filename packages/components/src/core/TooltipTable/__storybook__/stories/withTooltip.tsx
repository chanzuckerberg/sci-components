import { Args } from "@storybook/react-webpack5";
import Button from "src/core/Button";
import Icon from "src/core/Icon";
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
            size="large"
            sdsStyle="minimal"
            sdsType="primary"
          >
            <Icon sdsIcon="ExclamationMarkCircle" sdsSize="s" />
          </Button>
        </TooltipCondensed>
      </div>
    </div>
  );
};
