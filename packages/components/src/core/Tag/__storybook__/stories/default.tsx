import { Args } from "@storybook/react-webpack5";
import Callout from "src/core/Callout";
import Icon, { IconNameToSizes } from "src/core/Icon";
import RawTag from "src/core/Tag";

export const Tag = (props: Args): JSX.Element => {
  const { label, sdsSize, icon } = props;

  const finalIcon =
    typeof icon === "string" ? (
      <Icon sdsSize={sdsSize} sdsIcon={icon as keyof IconNameToSizes} />
    ) : (
      icon
    );

  if (sdsSize === "l" && !icon) {
    return (
      <Callout
        intent="negative"
        title="Invalid Props!"
        body="The large-size tag must include an icon. Please choose an icon from the controls section or switch the Tag size to small."
      />
    );
  }

  return <RawTag label={label} {...props} sdsSize={sdsSize} icon={finalIcon} />;
};
