import { styled } from "@mui/material/styles";
import { Args, Meta } from "@storybook/react";
import React from "react";
import Button from "../Button";
import RawTagFilter from "./index";

const StyledButton = styled(Button)`
  &:focus {
    outline: none;
  }
`;

const TagFilter = (props: Args): JSX.Element => {
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
          <RawTagFilter label={label} onDelete={handleDismissChip} {...props} />
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
  component: TagFilter,
  title: "TagFilter",
} as Meta;

// Default

export const Default = {
  args: {
    label: "TagFilter",
  },
};

// Live Preview

const LivePreviewDemo = (props: Args): JSX.Element => {
  const { label } = props;

  return <RawTagFilter label={label} onDelete={() => {}} {...props} />;
};

export const LivePreview = {
  args: {
    label: "Label",
  },
  parameters: {
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <LivePreviewDemo {...args} />,
};

// Screenshot Test
const ScreenshotTestDemo = (props: Args): JSX.Element => {
  const PSEUDO_STATES = ["default", "hover", "active", "focus"];
  const { label } = props;
  const LABEL_STYLE: React.CSSProperties = {
    fontFamily: "sans-serif",
    fontSize: "0.67em",
    fontWeight: "normal",
    margin: "20px 0 10px",
  };

  // loop through all PSEUDO_STATES + create headers for PSEUDO_STATES
  return (
    <>
      {PSEUDO_STATES.map((state) => {
        return (
          <>
            <p style={LABEL_STYLE}>
              State: <b>{state}</b>
            </p>
            <RawTagFilter
              data-testid="button"
              label={label}
              onDelete={() => {}}
              className={`pseudo-${state}`}
              key={state}
              {...props}
            />
          </>
        );
      })}
    </>
  );
};

export const ScreenshotTest = {
  args: {
    label: "Label",
  },
  parameters: {
    controls: {
      exclude: ["label"],
    },
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <ScreenshotTestDemo {...args} />,
};

// Test

const TestDemo = (props: Args): JSX.Element => {
  const { label } = props;

  return (
    <RawTagFilter
      data-testid="tag-filter"
      label={label}
      onDelete={() => {}}
      {...props}
    />
  );
};

export const Test = {
  args: {
    label: "Label",
  },
  parameters: {
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <TestDemo {...args} data-testid="tag-filter" />,
};
