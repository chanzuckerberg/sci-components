import { FormControlLabel, Switch } from "@mui/material";
import { action } from "@storybook/addon-actions";
import { Args, Meta } from "@storybook/react";
import React from "react";
import Button from "../Button";
import RawNotification, { NotificationProps } from "./index";

const Notification = (props: Args): JSX.Element => {
  const {
    intent,
    onClose,
    buttonOnClick,
    buttonText,
    slideDirection,
    extraContent,
    autoDismiss,
  } = props;

  const [dismissed, setDismissed] = React.useState(false);

  const handleChange = () => {
    setDismissed((prev) => !prev);
  };

  if (buttonOnClick) {
    return (
      <>
        {!autoDismiss && (
          <FormControlLabel
            control={<Switch checked={dismissed} onChange={handleChange} />}
            label="Hide"
          />
        )}
        <RawNotification
          autoDismiss={autoDismiss}
          dismissed={dismissed}
          slideDirection={slideDirection}
          intent={intent}
          onClose={onClose}
          buttonOnClick={action("onClick")}
          buttonText={buttonText}
          {...props}
        >
          This is a notification!
          {extraContent && (
            <div>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet
              eveniet sapiente, officiis aut possimus suscipit assumenda non?
            </div>
          )}
        </RawNotification>
        <Button onClick={handleChange} sdsType="primary" sdsStyle="rounded">
          Reset Notification
        </Button>
      </>
    );
  }
  return (
    <>
      {!autoDismiss && (
        <FormControlLabel
          control={<Switch checked={dismissed} onChange={handleChange} />}
          label="Hide"
        />
      )}
      <RawNotification
        autoDismiss={autoDismiss}
        dismissed={dismissed}
        slideDirection={slideDirection}
        intent={intent}
        onClose={onClose}
        {...props}
      >
        This is a notification!
        {extraContent && (
          <div>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet
            eveniet sapiente, officiis aut possimus suscipit assumenda non?
          </div>
        )}
      </RawNotification>
      <Button onClick={handleChange} sdsType="primary" sdsStyle="rounded">
        Reset Notification
      </Button>
    </>
  );
};

export default {
  argTypes: {
    autoDismiss: {
      control: { type: "select" },
      options: [true, false, 4000, 12000, 20000],
    },
    buttonOnClick: {
      control: { type: "boolean" },
    },
    extraContent: {
      control: { type: "boolean" },
    },
    intent: {
      control: { type: "radio" },
      options: ["info", "error", "success", "warning"],
    },
    onClose: {
      control: {
        labels: {
          "() => {}": true,
          undefined,
        },
        type: "select",
      },
      options: [action("onClick"), undefined],
    },
    slideDirection: {
      control: { type: "radio" },
      options: ["left", "right"],
    },
  },
  component: Notification,
  title: "Notification",
} as Meta;

// Default

export const Default = {
  args: {
    autoDismiss: false,
    buttonOnClick: false,
    buttonText: "click me",
    extraContent: false,
    intent: "success",
    slideDirection: "left",
  },
};

// Live Preview

const storyRow = {
  alignItems: "flex-start",
  display: "flex",
  flexDirection: "row",
  gap: "20px",
};

const LivePreviewDemo = (props: Args): JSX.Element => {
  return (
    <div style={storyRow as React.CSSProperties}>
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
        <div>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet eveniet
          sapiente, officiis aut possimus suscipit assumenda non?
        </div>
      </RawNotification>
    </div>
  );
};

export const LivePreview = {
  parameters: {
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <LivePreviewDemo {...args} />,
};

// Screenshot test
const ScreenshotTestDemo = (): JSX.Element => {
  const INTENT_OPTIONS: NotificationProps["intent"][] = [
    "info",
    "error",
    "success",
    "warning",
  ];
  const EXTRA_CONTENT_OPTIONS = [false, true];
  const BUTTON_ON_CLICK_OPTIONS: NotificationProps["buttonOnClick"][] = [
    undefined,
    action("onClick"),
  ];

  // loop through all INTENT_OPTIONS
  return (
    <>
      {INTENT_OPTIONS.map((intent) => {
        return <NotificationIntent intent={intent} key={intent} />;
      })}
    </>
  );

  // loop through all EXTRA_CONTENT_OPTIONS + create headers for INTENT_OPTIONS
  function NotificationIntent({
    intent,
  }: {
    intent: (typeof INTENT_OPTIONS)[number];
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
        {EXTRA_CONTENT_OPTIONS.map((extraContent) => {
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
    intent: (typeof INTENT_OPTIONS)[number];
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
        {BUTTON_ON_CLICK_OPTIONS.map((buttonOnClick) => {
          return (
            <div>
              <>
                <p style={BUTTON_ON_CLICK_LABEL_STYLE}>
                  Button: <b>{buttonOnClick ? "yes" : "no"}</b>
                </p>
                <RawNotification
                  slideDirection="left"
                  data-testid="notification"
                  intent={intent}
                  extraContent={extraContent}
                  buttonOnClick={buttonOnClick}
                  buttonText="click me"
                  key={String(buttonOnClick)}
                >
                  Notification test text
                  {extraContent && (
                    <div>
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Amet eveniet sapiente, officiis aut possimus suscipit
                      assumenda non?
                    </div>
                  )}
                </RawNotification>
              </>
            </div>
          );
        })}
      </div>
    );
  }
};

export const ScreenshotTest = {
  args: {
    label: "Label",
  },
  parameters: {
    controls: {
      exclude: [
        "label",
        "autoDismiss",
        "buttonOnClick",
        "extraContent",
        "intent",
        "onClose",
        "slideDirection",
      ],
    },
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <ScreenshotTestDemo {...args} />,
};

// Test

const TestDemo = (props: Args): JSX.Element => {
  return (
    <RawNotification
      slideDirection="left"
      intent="info"
      {...props}
      data-testid="notification"
    >
      this is a notification
    </RawNotification>
  );
};

export const Test = {
  parameters: {
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <TestDemo {...args} />,
};
