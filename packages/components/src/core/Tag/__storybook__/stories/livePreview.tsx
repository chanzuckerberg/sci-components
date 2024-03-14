import { Args } from "@storybook/react";
import RawTag from "src/core/Tag";
import { TAG_LIVE_PREVIEW_STYLES } from "../constants";
import Icon from "src/core/Icon";

export const LivePreviewDemo = (props: Args): JSX.Element => {
  const { color, label } = props;

  return (
    <div style={TAG_LIVE_PREVIEW_STYLES as React.CSSProperties}>
      {/* First Row Start */}
      {/* Small - Square -Primary - No Icon */}
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

      {/* Small - Square - Secondary - No Icon */}
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

      {/* Small - Square - Primary - With Icon */}
      <div>
        <RawTag
          {...props}
          color={color}
          icon={<Icon sdsSize="xs" sdsIcon="CheckCircle" sdsType="button" />}
          label={label}
          sdsStyle="square"
          sdsType="primary"
        />
      </div>

      {/* Small - Square - Secondary - With Icon */}
      <div>
        <RawTag
          {...props}
          color={color}
          icon={<Icon sdsSize="xs" sdsIcon="CheckCircle" sdsType="button" />}
          label={label}
          sdsStyle="square"
          sdsType="secondary"
        />
      </div>

      {/* Large - Square - Primary - With Icon */}
      <div>
        <RawTag
          {...props}
          color={color}
          label={label}
          icon={<Icon sdsSize="l" sdsIcon="CheckCircle" sdsType="button" />}
          sdsStyle="square"
          sdsType="primary"
          sdsSize="l"
        />
      </div>

      {/* Large - Square - Secondary - With Icon */}
      <div>
        <RawTag
          {...props}
          color={color}
          icon={<Icon sdsSize="l" sdsIcon="CheckCircle" sdsType="button" />}
          label={label}
          sdsStyle="square"
          sdsType="secondary"
          sdsSize="l"
        />
      </div>
      {/* First Row End */}

      {/* Second Row Start */}
      {/* Small - Rounded -Primary - No Icon */}
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

      {/* Small - Rounded - Secondary - No Icon */}
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

      {/* Small - Rounded - Primary - With Icon */}
      <div>
        <RawTag
          {...props}
          color={color}
          icon={<Icon sdsSize="xs" sdsIcon="CheckCircle" sdsType="button" />}
          label={label}
          sdsStyle="rounded"
          sdsType="primary"
        />
      </div>

      {/* Small - Rounded - Secondary - With Icon */}
      <div>
        <RawTag
          {...props}
          color={color}
          icon={<Icon sdsSize="xs" sdsIcon="CheckCircle" sdsType="button" />}
          label={label}
          sdsStyle="rounded"
          sdsType="secondary"
        />
      </div>

      {/* Large - Rounded - Primary - With Icon */}
      <div>
        <RawTag
          {...props}
          color={color}
          label={label}
          icon={<Icon sdsSize="l" sdsIcon="CheckCircle" sdsType="button" />}
          sdsStyle="rounded"
          sdsType="primary"
          sdsSize="l"
        />
      </div>

      {/* Large - Rounded - Secondary - With Icon */}
      <div>
        <RawTag
          {...props}
          color={color}
          icon={<Icon sdsSize="l" sdsIcon="CheckCircle" sdsType="button" />}
          label={label}
          sdsStyle="rounded"
          sdsType="secondary"
          sdsSize="l"
        />
      </div>
      {/* Second Row End */}
    </div>
  );
};
