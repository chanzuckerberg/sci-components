import { Args } from "@storybook/react-vite";
import Callout from "@components/src/core/Callout";
import Icon, { IconNameToSizes } from "@components/src/core/Icon";
import RawTagLegacy from "@components/src/core/TagLegacy";

export const TagLegacy = (props: Args): JSX.Element => {
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

  return (
    <>
      <Callout
        intent="negative"
        title="Deprecated!"
        sdsStyle="persistent"
        icon={<Icon sdsIcon="ExclamationMarkCircle" sdsSize="s" />}
        body={
          <>
            The <strong>TagLegacy</strong> component is deprecated!
            <br />
            Please use <strong>Tag</strong> component instead.
          </>
        }
      />
      <RawTagLegacy
        label={label}
        {...props}
        sdsSize={sdsSize}
        icon={finalIcon}
      />
    </>
  );
};
