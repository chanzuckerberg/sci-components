import { Args } from "@storybook/react-vite";
import Link from "@components/src/core/Link";
import RawTooltipTableContent from "@components/src/core/TooltipTable";

export const TooltipTableContent = (props: Args): JSX.Element => {
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

  return <RawTooltipTableContent {...props} contentAlert={handleAlert()} />;
};
