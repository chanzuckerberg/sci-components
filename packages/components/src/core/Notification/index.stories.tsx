import { FormControlLabel, Switch } from "@mui/material";
import { action } from "@storybook/addon-actions";
import { Args, Meta } from "@storybook/react";
import React from "react";
import RawNotification, { NotificationProps } from "./index";
import CustomSvgIcon from "src/common/customSvgIcon";
import CustomSdsIcon from "src/common/customSdsIcon";
import { BADGE } from "@geometricpanda/storybook-addon-badges";

const iconOptions = [
  <CustomSvgIcon key="customSdsIcon" sx={{ height: 22, width: 22 }} />,
  <CustomSdsIcon key="customSvgIcon" />,
  "book",
  "checkCircle",
];
const buttonOnClickOptions = [action("onClick"), undefined];
const onClickOptions = [action("onClick"), undefined];

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
        buttonOnClick={buttonOnClick}
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
      control: {
        labels: ["() => {}", "undefined"],
        type: "select",
      },
      mapping: buttonOnClickOptions,
      options: Object.keys(buttonOnClickOptions),
    },
    buttonPosition: {
      control: { type: "radio" },
      options: ["left", "right"],
    },
    extraContent: {
      control: { type: "boolean" },
    },
    icon: {
      control: {
        labels: [
          "Custom SVG Icon",
          "Custom SDS Icon",
          "SDS Icon: Book",
          "SDS Icon: Check Circle",
        ],
        type: "select",
      },
      mapping: iconOptions,
      options: Object.keys(iconOptions),
    },
    intent: {
      control: { type: "radio" },
      options: ["info", "negative", "positive", "notice"],
    },
    onClose: {
      control: {
        labels: ["() => {}", "undefined"],
        type: "select",
      },
      mapping: onClickOptions,
      options: Object.keys(onClickOptions),
    },
    sdsIconProps: {
      control: { type: "object" },
    },
    slideDirection: {
      control: { type: "radio" },
      options: ["left", "right"],
    },
  },
  component: Notification,
  parameters: {
    badges: [BADGE.STABLE],
  },
  title: "Components/Notification",
} as Meta;

// Default

export const Default = {
  args: {
    autoDismiss: false,
    buttonPosition: "right",
    buttonText: "click me",
    extraContent: false,
    intent: "info",
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
    "negative",
    "positive",
    "notice",
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
            <React.Fragment key={"parent" + String(buttonOnClick)}>
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
            </React.Fragment>
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
