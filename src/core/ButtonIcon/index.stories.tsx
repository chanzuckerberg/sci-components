import { Args, Story } from "@storybook/react";
import React from "react";
import Icon from "../Icon";
import { defaultAppTheme } from "../styles";
import ButtonIcon from "./index";

const Demo = (props: Args): JSX.Element => {
  const { icon, ...rest } = props;

  const [active, setActive] = React.useState(false);
  const handleButtonClick = () => setActive(!active);

  return (
    <ButtonIcon
      onClick={handleButtonClick}
      active={active}
      {...rest}
      size="large"
    >
      {icon}
    </ButtonIcon>
  );
};

export default {
  argTypes: {
    active: {
      control: {
        type: "boolean",
      },
      defaultValue: false,
    },
    disabled: {
      control: {
        type: "boolean",
      },
      defaultValue: false,
    },
    sdsSize: {
      control: {
        type: "select",
      },
      defaultValue: "medium",
      options: ["small", "medium", "large"],
    },
    sdsType: {
      control: {
        type: "select",
      },
      defaultValue: "primary",
      options: ["primary", "secondary", "tertiary"],
    },
  },
  component: Demo,
  title: "ButtonIcon",
};

const Template: Story = (args) => <Demo {...args} />;

export const Default = Template.bind({});

Default.args = {
  "aria-label": "info",
  disabled: false,
  icon: <Icon sdsIcon="infoCircle" sdsSize="xl" sdsType="iconButton" />,
  sdsSize: "large",
  sdsType: "primary",
};

Default.parameters = {
  snapshot: {
    skip: true,
  },
};

export const Test = Template.bind({});

Test.args = {
  "aria-label": "info",
  disabled: false,
  icon: <Icon sdsIcon="search" sdsSize="xl" sdsType="iconButton" />,
  sdsSize: "large",
  sdsType: "secondary",
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
        <Demo
          style={{ marginRight: spacings?.xxs }}
          icon={<Icon sdsIcon="grid" sdsSize="l" sdsType="iconButton" />}
          sdsSize="large"
          sdsType="primary"
        />
        <Demo
          style={{ marginRight: spacings?.xxs }}
          icon={<Icon sdsIcon="grid" sdsSize="l" sdsType="iconButton" />}
          sdsSize="large"
          sdsType="primary"
        />
      </div>
      <div style={{ display: "flex" }}>
        <Demo
          style={{ marginRight: spacings?.m }}
          icon={
            <Icon sdsIcon="infoSpeechBubble" sdsSize="l" sdsType="iconButton" />
          }
          sdsSize="large"
          sdsType="secondary"
        />
        <Demo
          style={{ marginRight: spacings?.m }}
          icon={
            <Icon sdsIcon="infoSpeechBubble" sdsSize="l" sdsType="iconButton" />
          }
          sdsSize="large"
          sdsType="secondary"
        />
      </div>
      <div>
        <Demo
          style={{ marginRight: spacings?.m }}
          icon={<Icon sdsIcon="xMark" sdsSize="l" sdsType="iconButton" />}
          sdsSize="large"
          sdsType="tertiary"
        />
      </div>
      <div>
        <Demo
          style={{ marginRight: spacings?.m }}
          icon={<Icon sdsIcon="xMark" sdsSize="s" sdsType="iconButton" />}
          sdsSize="medium"
          sdsType="tertiary"
        />
      </div>
      <div style={{ display: "flex" }}>
        <Demo
          style={{ marginRight: spacings?.s }}
          icon={
            <Icon
              sdsIcon="barChartVertical3"
              sdsSize="s"
              sdsType="iconButton"
            />
          }
          sdsSize="small"
          sdsType="primary"
        />
        <Demo
          style={{ marginRight: spacings?.s }}
          icon={
            <Icon
              sdsIcon="barChartVertical3"
              sdsSize="s"
              sdsType="iconButton"
            />
          }
          sdsSize="small"
          sdsType="primary"
        />
      </div>
      <div style={{ display: "flex" }}>
        <Demo
          style={{ marginRight: spacings?.s }}
          icon={<Icon sdsIcon="plusCircle" sdsSize="s" sdsType="iconButton" />}
          sdsSize="small"
          sdsType="secondary"
        />
        <Demo
          style={{ marginRight: spacings?.s }}
          icon={<Icon sdsIcon="plusCircle" sdsSize="s" sdsType="iconButton" />}
          sdsSize="small"
          sdsType="secondary"
        />
      </div>
      <div>
        <Demo
          style={{ marginRight: spacings?.s }}
          icon={<Icon sdsIcon="xMark" sdsSize="s" sdsType="iconButton" />}
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
