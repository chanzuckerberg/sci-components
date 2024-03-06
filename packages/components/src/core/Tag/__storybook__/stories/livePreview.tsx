import { Args } from "@storybook/react";
import RawTag from "src/core/Tag";
import { TAG_LIVE_PREVIEW_STYLES } from "../constants";
import Icon from "src/core/Icon";

export const LivePreviewDemo = (props: Args): JSX.Element => {
  const { color, icon, label } = props;

  return (
    <div style={TAG_LIVE_PREVIEW_STYLES as React.CSSProperties}>
      <div>
        <RawTag
          {...props}
          color={color}
          icon={undefined}
          label={label}
          sdsStyle="square"
          sdsType="primary"
        />
      </div>

      <div>
        <RawTag
          {...props}
          color={color}
          icon={undefined}
          label={label}
          sdsStyle="square"
          sdsType="secondary"
        />
      </div>

      <div>
        <RawTag
          {...props}
          color={color}
          icon={
            icon || <Icon sdsSize="l" sdsIcon="CheckCircle" sdsType="button" />
          }
          label={label}
          sdsStyle="square"
          sdsType="secondary"
        />
      </div>

      <div>
        <RawTag
          {...props}
          color={color}
          icon={undefined}
          label={label}
          sdsStyle="rounded"
          sdsType="primary"
        />
      </div>

      <div>
        <RawTag
          {...props}
          color={color}
          icon={undefined}
          label={label}
          sdsStyle="rounded"
          sdsType="secondary"
        />
      </div>

      <div>
        <RawTag
          {...props}
          color={color}
          icon={
            icon || <Icon sdsSize="l" sdsIcon="CheckCircle" sdsType="button" />
          }
          label={label}
          sdsStyle="rounded"
          sdsType="secondary"
        />
      </div>
    </div>
  );
};
