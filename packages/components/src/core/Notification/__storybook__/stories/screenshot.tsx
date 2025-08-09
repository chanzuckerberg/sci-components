import { Fragment } from "react";
import {
  NOTIFICATION_EXTRA_CONTENT_OPTIONS,
  NOTIFICATION_INTENT_OPTIONS,
  NOTIFICATION_SCREENSHOT_BUTTON_ON_CLICK_OPTIONS,
} from "../constants";
import { SHORT_LOREM_IPSUM } from "src/common/storybook/loremIpsum";
import RawNotification from "src/core/Notification";

export const ScreenshotTestDemo = (): JSX.Element => {
  // loop through all INTENT_OPTIONS
  return (
    <>
      {NOTIFICATION_INTENT_OPTIONS.map((intent) => {
        return <NotificationIntent intent={intent} key={intent} />;
      })}
    </>
  );

  // loop through all EXTRA_CONTENT_OPTIONS + create headers for INTENT_OPTIONS
  function NotificationIntent({
    intent,
  }: {
    intent: (typeof NOTIFICATION_INTENT_OPTIONS)[number];
  }) {
    const LEVEL_STYLE: React.CSSProperties = {
      columnGap: "25px",
      display: "inline-grid",
      fontFamily: "sans-serif",
      marginLeft: "50px",
    };
    const LABEL_STYLE: React.CSSProperties = {
      fontSize: "2em",
      gridColumn: "1 / 3",
      marginBottom: 0,
    };
    return (
      <div style={LEVEL_STYLE}>
        <p style={LABEL_STYLE}>
          Intent: <b>{intent}</b>
        </p>
        {NOTIFICATION_EXTRA_CONTENT_OPTIONS.map((extraContent) => {
          return (
            <NotificationExtraContent
              intent={intent}
              extraContent={extraContent}
              key={String(extraContent)}
            />
          );
        })}
      </div>
    );
  }

  // loop through all BUTTON_ON_CLICK_OPTIONS + create headers for EXTRA_CONTENT_OPTIONS, BUTTON_ON_CLICK_OPTIONS
  function NotificationExtraContent({
    intent,
    extraContent,
  }: {
    intent: (typeof NOTIFICATION_INTENT_OPTIONS)[number];
    extraContent: boolean;
  }) {
    const EXTRA_CONTENT_LABEL_STYLE: React.CSSProperties = {
      borderStyle: "solid none none none",
      fontSize: "1.17em",
      gridColumn: "1 / 3",
      justifySelf: "stretch",
      marginBottom: 10,
      paddingTop: 10,
    };
    const BUTTON_ON_CLICK_LABEL_STYLE: React.CSSProperties = {
      fontSize: "0.67em",
      margin: "10px 0",
    };
    return (
      <div style={{ display: "contents" }}>
        <p style={EXTRA_CONTENT_LABEL_STYLE}>
          Extra content: <b>{extraContent ? "yes" : "no"}</b>
        </p>
        {NOTIFICATION_SCREENSHOT_BUTTON_ON_CLICK_OPTIONS.map(
          (buttonOnClick) => {
            return (
              <Fragment key={"parent" + String(buttonOnClick)}>
                <p style={BUTTON_ON_CLICK_LABEL_STYLE}>
                  Button: <b>{buttonOnClick ? "yes" : "no"}</b>
                </p>
                <RawNotification
                  slideDirection="left"
                  data-testid="notification"
                  intent={intent}
                  extraContent={extraContent}
                  buttonOnClick={buttonOnClick}
                  buttonText="Click here"
                  key={String(buttonOnClick)}
                >
                  Notification test text
                  {extraContent && <div>{SHORT_LOREM_IPSUM}</div>}
                </RawNotification>
              </Fragment>
            );
          }
        )}
      </div>
    );
  }
};
