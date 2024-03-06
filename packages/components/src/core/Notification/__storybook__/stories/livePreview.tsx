import { Args } from "@storybook/react";
import { SHORT_LOREM_IPSUM } from "src/common/storybook/loremIpsum";
import { NOTIFICATION_LIVE_PREVIEW_ROW_STYLES } from "../constants";
import RawNotification from "src/core/Notification";
import { action } from "@storybook/addon-actions";

export const LivePreviewDemo = (props: Args): JSX.Element => {
  return (
    <div style={NOTIFICATION_LIVE_PREVIEW_ROW_STYLES as React.CSSProperties}>
      <RawNotification slideDirection="left" intent="info" {...props}>
        this is a notification
      </RawNotification>
      <RawNotification
        slideDirection="left"
        intent="info"
        buttonOnClick={action("onClick")}
        buttonText="click me"
        {...props}
      >
        this is a notification
      </RawNotification>
      <RawNotification
        slideDirection="left"
        intent="info"
        buttonOnClick={action("onClick")}
        buttonText="click me"
        {...props}
      >
        this is a notification
        <div>{SHORT_LOREM_IPSUM}</div>
      </RawNotification>
    </div>
  );
};
