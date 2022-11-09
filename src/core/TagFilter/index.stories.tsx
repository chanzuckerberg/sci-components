import { styled } from "@mui/material/styles";
import { Args, Meta, Story } from "@storybook/react";
import React from "react";
import Button from "../Button";
import FilterTag from "./index";

const StyledButton = styled(Button)`
  &:focus {
    outline: none;
  }
`;

const Demo = (props: Args): JSX.Element => {
  const { label } = props;

  const [visible, setVisible] = React.useState(true);

  const handleShowChip = () => setVisible(true);
  const handleDismissChip = () => setVisible(false);

  const PreviewStyles = {
    display: "inline-grid",
    gridColumnGap: 24,
    gridRowGap: 24,
    gridTemplateColumns: "repeat(1, 1fr)",
    gridTemplateRows: "repeat(1, 1fr)",
  };

  return (
    <div style={PreviewStyles as React.CSSProperties}>
      <div style={{ gridArea: "1 / 1 / 1 / 2" }}>
        <StyledButton
          disabled={visible}
          onClick={handleShowChip}
          sdsStyle="minimal"
          sdsType={visible ? "secondary" : "primary"}
        >
          {visible
            ? "Delete the tag by clicking on its icon"
            : "Click to reset"}
        </StyledButton>
      </div>

      <div style={{ gridArea: "2 / 1 / 2 / 2" }}>
        {visible && (
          <FilterTag label={label} onDelete={handleDismissChip} {...props} />
        )}
      </div>
    </div>
  );
};

export default {
  argTypes: {
    label: {
      control: { type: "text" },
      required: true,
    },
  },
  component: Demo,
  title: "TagFilter",
} as Meta;

const Template: Story = (args) => <Demo {...args} />;

export const Default = Template.bind({});

Default.args = {
  label: "TagFilter",
};

/*
 * Live Preview
 */

const LivePreviewDemo = (props: Args): JSX.Element => {
  const { label } = props;

  return <FilterTag label={label} onDelete={() => {}} {...props} />;
};

const LivePreviewTemplate: Story = (args) => <LivePreviewDemo {...args} />;

export const LivePreview = LivePreviewTemplate.bind({});

LivePreview.parameters = {
  snapshot: {
    skip: true,
  },
};

LivePreview.args = {
  label: "Label",
};

/*
 * Test Story
 */

const TestDemo = (props: Args): JSX.Element => {
  const { label } = props;

  return (
    <FilterTag
      data-testid="tag-filter"
      label={label}
      onDelete={() => {}}
      {...props}
    />
  );
};

const TestTemplate: Story = (args) => <TestDemo {...args} />;

export const Test = TestTemplate.bind({});

Test.parameters = {
  snapshot: {
    skip: true,
  },
};

Test.args = {
  label: "Label",
};
