import { Args, Meta, Story } from "@storybook/react";
import React from "react";
import { defaultAppTheme } from "../styles";
import RawButtonIcon from "./index";

const ButtonIcon = (props: Args): JSX.Element => {
  const { sdsIcon, ...rest } = props;

  const [on, setOn] = React.useState(false);
  const handleButtonClick = () => setOn(!on);

  return (
    <RawButtonIcon
      onClick={handleButtonClick}
      on={on}
      sdsIcon={sdsIcon}
      sdsSize="medium"
      sdsType="primary"
      {...rest}
    />
  );
};

export default {
  argTypes: {
    disabled: {
      control: {
        type: "boolean",
      },
    },
    on: {
      control: {
        type: "boolean",
      },
    },
    sdsIcon: {
      control: {
        type: "select",
      },
      options: [
        "dotsHorizontal",
        "copy",
        "download",
        "people",
        "treeHorizontal",
        "grid",
        "virus",
        "xMark",
      ],
    },
    sdsSize: {
      control: {
        type: "select",
      },
      options: ["small", "medium", "large"],
    },
    sdsType: {
      control: {
        type: "select",
      },
      options: ["primary", "secondary", "tertiary"],
    },
  },
  component: ButtonIcon,
  title: "ButtonIcon",
} as Meta;

const Template: Story = (args) => <ButtonIcon {...args} />;

export const Default = Template.bind({});

Default.args = {
  "aria-label": "info",
  disabled: false,
  sdsIcon: "dotsHorizontal",
  sdsSize: "large",
  sdsType: "primary",
};

Default.parameters = {
  snapshot: {
    skip: true,
  },
};

const LivePreviewDemo = (): JSX.Element => {
  const spacings = defaultAppTheme?.spacing;

  const livePreviewStyles = {
    alignItems: "center",
    display: "grid",
    gridColumnGap: "24px",
    gridTemplateColumns: "repeat(7, min-content)",
  };

  return (
    <div style={livePreviewStyles as React.CSSProperties}>
      <div style={{ display: "flex" }}>
        <ButtonIcon
          aria-label="grid"
          style={{ marginRight: spacings?.xxs }}
          sdsIcon="grid"
          sdsSize="large"
          sdsType="primary"
        />
        <ButtonIcon
          aria-label="grid"
          style={{ marginRight: spacings?.xxs }}
          sdsIcon="grid"
          sdsSize="large"
          sdsType="primary"
        />
      </div>
      <div style={{ display: "flex" }}>
        <ButtonIcon
          aria-label="infoSpeechBubble"
          style={{ marginRight: spacings?.m }}
          sdsIcon="infoSpeechBubble"
          sdsSize="large"
          sdsType="secondary"
        />
        <ButtonIcon
          aria-label="infoSpeechBubble"
          style={{ marginRight: spacings?.m }}
          sdsIcon="infoSpeechBubble"
          sdsSize="large"
          sdsType="secondary"
        />
      </div>
      <div>
        <ButtonIcon
          aria-label="xMark"
          style={{ marginRight: spacings?.m }}
          sdsIcon="xMark"
          sdsSize="large"
          sdsType="tertiary"
        />
      </div>
      <div>
        <ButtonIcon
          aria-label="xMark"
          style={{ marginRight: spacings?.m }}
          sdsIcon="xMark"
          sdsSize="medium"
          sdsType="tertiary"
        />
      </div>
      <div style={{ display: "flex" }}>
        <ButtonIcon
          aria-label="barChartVertical3"
          style={{ marginRight: spacings?.s }}
          sdsIcon="barChartVertical3"
          sdsSize="small"
          sdsType="primary"
        />
        <ButtonIcon
          aria-label="barChartVertical3"
          style={{ marginRight: spacings?.s }}
          sdsIcon="barChartVertical3"
          sdsSize="small"
          sdsType="primary"
        />
      </div>
      <div style={{ display: "flex" }}>
        <ButtonIcon
          aria-label="plusCircle"
          style={{ marginRight: spacings?.s }}
          sdsIcon="plusCircle"
          sdsSize="small"
          sdsType="secondary"
        />
        <ButtonIcon
          aria-label="plusCircle"
          style={{ marginRight: spacings?.s }}
          sdsIcon="plusCircle"
          sdsSize="small"
          sdsType="secondary"
        />
      </div>
      <div>
        <ButtonIcon
          aria-label="xMark"
          style={{ marginRight: spacings?.s }}
          sdsIcon="xMark"
          sdsSize="small"
          sdsType="tertiary"
        />
      </div>
    </div>
  );
};
const LivePreviewTemplate: Story = (args) => <LivePreviewDemo {...args} />;

export const LivePreview = LivePreviewTemplate.bind({});

LivePreview.parameters = {
  snapshot: {
    skip: true,
  },
};

const TestDemo = (): JSX.Element => {
  return (
    <RawButtonIcon
      aria-label="dotsHorizontal"
      data-testid="iconButton"
      on
      sdsIcon="dotsHorizontal"
      sdsSize="medium"
      sdsType="primary"
    />
  );
};

const TestTemplate: Story = () => <TestDemo />;

export const Test = TestTemplate.bind({});
