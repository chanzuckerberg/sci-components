import { Args, Story } from "@storybook/react";
import React, { useState } from "react";
import { noop } from "src/common/utils";
import Button from "../Button";
import { DefaultMenuSelectOption } from "../MenuSelect";
import ComplexFilter from "./index";

const Demo = (props: Args): JSX.Element => {
  return (
    <ComplexFilter
      label="Click Target"
      onChange={noop}
      options={GITHUB_LABELS}
      {...props}
    />
  );
};

export default {
  component: Demo,
  title: "ComplexFilter",
};

const Template: Story = (args) => <Demo {...args} />;

export const SingleSelect = Template.bind({});

export const SingleSelectWithSearch = Template.bind({});

SingleSelectWithSearch.args = {
  search: true,
};

export const SingleSelectControlled = (): JSX.Element => {
  const [value, setValue] = useState<DefaultMenuSelectOption | null>(
    GITHUB_LABELS[0]
  );

  return (
    <>
      <ComplexFilter
        label="Click Target"
        options={GITHUB_LABELS}
        onChange={handleChange}
        value={value}
      />

      <br />

      <Button color="primary" variant="contained" onClick={update}>
        Update Controlled Value
      </Button>
    </>
  );

  function update() {
    setValue(GITHUB_LABELS[1]);
  }

  function handleChange(newValue: DefaultMenuSelectOption | null) {
    setValue(newValue);
  }
};

export const MultipleSelect = Template.bind({});

export const MultipleSelectWithSearch = Template.bind({});

MultipleSelectWithSearch.args = {
  multiple: true,
  search: true,
};

MultipleSelect.args = {
  multiple: true,
};

function ResizableWrapper({
  children,
}: {
  children: JSX.Element;
}): JSX.Element {
  return (
    <div
      style={{
        border: "1px solid black",
        height: "200px",
        overflow: "auto",
        resize: "both",
        width: "500px",
      }}
    >
      {children}
    </div>
  );
}

export const MultipleSelectControlled = (): JSX.Element => {
  const [value, setValue] = useState<DefaultMenuSelectOption[] | null>([
    GITHUB_LABELS[0],
    GITHUB_LABELS[1],
    GITHUB_LABELS[2],
    GITHUB_LABELS[3],
    GITHUB_LABELS[4],
    GITHUB_LABELS[5],
    GITHUB_LABELS[6],
    GITHUB_LABELS[7],
    GITHUB_LABELS[8],
    GITHUB_LABELS[9],
  ]);

  return (
    <>
      Resize to see how chips flow given different widths and heights!
      <ResizableWrapper>
        <ComplexFilter
          multiple
          label="Click Target"
          options={GITHUB_LABELS}
          onChange={handleChange}
          value={value}
          style={{ width: "100%" }}
        />
      </ResizableWrapper>
      <br />
      <Button color="primary" variant="contained" onClick={update}>
        Update Controlled Value
      </Button>
    </>
  );

  function update() {
    setValue([GITHUB_LABELS[7], GITHUB_LABELS[8], GITHUB_LABELS[9]]);
  }

  function handleChange(newValue: DefaultMenuSelectOption[] | null) {
    setValue(newValue);
  }
};

// From https://github.com/abdonrd/github-labels
const GITHUB_LABELS = [
  {
    color: "#7057ff",
    description: "Good for newcomers",
    name: "good first issue",
  },
  {
    color: "#008672",
    description: "Extra attention is needed",
    name: "help wanted",
  },
  {
    color: "#b60205",
    description: "",
    name: "priority: critical",
  },
  {
    color: "#d93f0b",
    description: "",
    name: "priority: high",
  },
  {
    color: "#0e8a16",
    description: "",
    name: "priority: low",
  },
  {
    color: "#fbca04",
    description: "",
    name: "priority: medium",
  },
  {
    color: "#fec1c1",
    description: "",
    name: "status: can't reproduce",
  },
  {
    color: "#215cea",
    description: "",
    name: "status: confirmed",
  },
  {
    color: "#cfd3d7",
    description: "This issue or pull request already exists",
    name: "status: duplicate",
  },
  {
    color: "#fef2c0",
    description: "",
    name: "status: needs information",
  },
  {
    color: "#eeeeee",
    description: "This will not be worked on",
    name: "status: wont do/fix",
  },
  {
    color: "#d73a4a",
    description: "Something isn't working",
    name: "type: bug",
  },
  {
    color: "#d4c5f9",
    description: "",
    name: "type: discussion",
  },
  {
    color: "#006b75",
    description: "",
    name: "type: documentation",
  },
  {
    color: "#84b6eb",
    description: "",
    name: "type: enhancement",
  },
  {
    color: "#3e4b9e",
    description: "A theme of work that contain sub-tasks",
    name: "type: epic",
  },
  {
    color: "#fbca04",
    description: "New feature or request",
    name: "type: feature request",
  },
  {
    color: "#d876e3",
    description: "Further information is requested",
    name: "type: question",
  },
];
