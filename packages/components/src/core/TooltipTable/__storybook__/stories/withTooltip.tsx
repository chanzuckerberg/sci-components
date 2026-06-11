import { Args } from "@storybook/react-vite";
import Button from "@components/src/core/Button";
import Icon from "@components/src/core/Icon";
import Link from "@components/src/core/Link";
import TooltipCondensed from "@components/src/core/TooltipCondensed";
import RawTooltipTableContent from "@components/src/core/TooltipTable";

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
