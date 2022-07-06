import { Args, Story } from "@storybook/react";
import React from "react";
import Icon from "../Icon";
import { getSpaces } from "../styles";
import IconButton from "./index";

const Demo = (props: Args): JSX.Element => {
  const { icon, ...rest } = props;

  const [active, setActive] = React.useState(false);
  const handleButtonClick = () => setActive(!active);

  return (
    <IconButton
      onClick={handleButtonClick}
      active={active}
      {...rest}
      size="large"
    >
      {icon}
    </IconButton>
  );
};

export default {
  component: Demo,
  title: "IconButton",
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

const LivePreviewDemo = (props: Args): JSX.Element => {
  const spacings = getSpaces(props);

  const livePreviewStyles = {
    alignItems: "center",
    display: "grid",
    gridColumnGap: "0px",
    gridRowGap: "50px",
    gridTemplateColumns: "repeat(11, min-content)",
  };

  return (
    <div style={livePreviewStyles as React.CSSProperties}>
      <div>
        <Demo
          style={{ marginRight: spacings?.xxs }}
          icon={<Icon sdsIcon="grid" sdsSize="l" sdsType="iconButton" />}
          sdsSize="large"
          sdsType="primary"
        />
      </div>
      <div>
        <Demo
          style={{ marginRight: spacings?.xxs }}
          icon={<Icon sdsIcon="grid" sdsSize="l" sdsType="iconButton" />}
          sdsSize="large"
          sdsType="primary"
        />
      </div>
      <div>
        <Demo
          style={{ marginLeft: "24px", marginRight: "10px" }}
          icon={
            <Icon sdsIcon="infoSpeechBubble" sdsSize="l" sdsType="iconButton" />
          }
          sdsSize="large"
          sdsType="secondary"
        />
      </div>
      <div>
        <Demo
          style={{ marginRight: "10px" }}
          icon={
            <Icon sdsIcon="infoSpeechBubble" sdsSize="l" sdsType="iconButton" />
          }
          sdsSize="large"
          sdsType="secondary"
        />
      </div>
      <div>
        <Demo
          style={{ marginLeft: "24px", marginRight: "10px" }}
          icon={<Icon sdsIcon="xMark" sdsSize="l" sdsType="iconButton" />}
          sdsSize="large"
          sdsType="tertiary"
        />
      </div>
      <div>
        <Demo
          style={{ marginLeft: "24px", marginRight: "10px" }}
          icon={<Icon sdsIcon="xMark" sdsSize="s" sdsType="iconButton" />}
          sdsSize="medium"
          sdsType="tertiary"
        />
      </div>
      <div>
        <Demo
          style={{ marginLeft: "24px", marginRight: "8px" }}
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
      <div>
        <Demo
          style={{ marginRight: "8px" }}
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
      <div>
        <Demo
          style={{ marginLeft: "24px", marginRight: "8px" }}
          icon={<Icon sdsIcon="plusCircle" sdsSize="s" sdsType="iconButton" />}
          sdsSize="small"
          sdsType="secondary"
        />
      </div>
      <div>
        <Demo
          style={{ marginRight: "8px" }}
          icon={<Icon sdsIcon="plusCircle" sdsSize="s" sdsType="iconButton" />}
          sdsSize="small"
          sdsType="secondary"
        />
      </div>
      <div>
        <Demo
          style={{ marginLeft: "24px", marginRight: "8px" }}
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
