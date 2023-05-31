/* eslint-disable no-use-before-define */
import { Args, Meta } from "@storybook/react";
import * as React from "react";
import RawMenuItem from "./index";
import { DemoWrapper } from "./style";

const MenuItem = (props: Args): JSX.Element => {
  const { name } = props;
  return (
    <DemoWrapper>
      <RawMenuItem data-testid="MenuItem" {...props}>
        {name}
      </RawMenuItem>
    </DemoWrapper>
  );
};

export default {
  argTypes: {
    column: {
      control: { type: "text" },
    },
    disabled: {
      control: { type: "boolean" },
    },
    isMultiSelect: {
      control: { type: "boolean" },
    },
    sdsIcon: {
      control: {
        type: "select",
      },
      options: [
        "bacteria",
        "barChartHorizontal3",
        "checkCircle",
        "gear",
        "flagCheck",
      ],
    },
    sdsIconProps: { control: { type: "object" } },
    selected: {
      control: { type: "boolean" },
    },
  },
  component: MenuItem,
  parameters: {
    axe: {
      disabledRules: ["aria-required-parent"],
    },
  },
  title: "Dropdowns/MenuItem",
} as Meta;

// Default

export const Default = {
  args: {
    column: "column value here",
    name: "text here",
  },
};

// Screenshot test

const MULTI_SELECT_OPTIONS = [false, true];
const COLUMN_OPTIONS = [undefined, "Column"];
const ICON_OPTIONS = [undefined, "gear"];
const SELECTED_OPTIONS = [false, true];
const DISABLED_OPTIONS = [false, true];
const PSEUDO_STATES = ["default", "hover", "active", "focus"];

const ScreenshotTestDemo = (props: Args): JSX.Element => {
  const DISPLAY_CONTENTS: React.CSSProperties = {
    display: "contents",
  };
  const MID_LABEL: React.CSSProperties = {
    borderStyle: "solid none none none",
    gridColumn: "1 / 6",
    justifySelf: "stretch",
    paddingTop: 10,
  };

  // loop through all MULTI_SELECT_OPTIONS
  return (
    <>
      {MULTI_SELECT_OPTIONS.map((isMultiSelect) => {
        console.log(isMultiSelect);
        return (
          <MenuItemMultiSelect
            isMultiSelect={isMultiSelect}
            key={String(isMultiSelect)}
          />
        );
      })}
    </>
  );

  // loop through all COLUMN_OPTIONS + create headers for MULTI_SELECT_OPTIONS
  function MenuItemMultiSelect({
    isMultiSelect,
  }: {
    isMultiSelect: (typeof MULTI_SELECT_OPTIONS)[number];
  }) {
    const LEVEL_STYLE: React.CSSProperties = {
      columnGap: "20px",
      display: "inline-grid",
      fontFamily: "sans-serif",
      marginRight: "50px",
    };
    const LABEL_STYLE: React.CSSProperties = {
      fontSize: "2em",
      gridColumn: "1 / 6",
      marginBottom: 10,
    };

    return (
      <div style={LEVEL_STYLE}>
        <p style={LABEL_STYLE}>
          Multi-select: <b>{isMultiSelect ? "yes" : "no"}</b>
        </p>
        {COLUMN_OPTIONS.map((column) => {
          return (
            <MenuItemColumn
              isMultiSelect={isMultiSelect}
              column={column}
              key={String(column)}
            />
          );
        })}
      </div>
    );
  }

  // loop through all ICON_OPTIONS + create headers for COLUMN_OPTIONS
  function MenuItemColumn({
    isMultiSelect,
    column,
  }: {
    isMultiSelect: (typeof MULTI_SELECT_OPTIONS)[number];
    column: (typeof COLUMN_OPTIONS)[number];
  }) {
    const LABEL_STYLE: React.CSSProperties = {
      ...MID_LABEL,
      alignSelf: "end",
      borderWidth: "3px",
      fontSize: "1.17em",
      margin: "0 0 15px 0",
    };
    return (
      <div style={DISPLAY_CONTENTS}>
        <p style={LABEL_STYLE}>
          Column: <b>{column ? "yes" : "no"}</b>
        </p>
        {ICON_OPTIONS.map((sdsIcon) => {
          return (
            <MenuItemIcon
              isMultiSelect={isMultiSelect}
              column={column}
              sdsIcon={sdsIcon}
              key={String(sdsIcon)}
            />
          );
        })}
      </div>
    );
  }

  // loop through all SELECTED_OPTIONS + create headers for ICON_OPTIONS
  function MenuItemIcon({
    isMultiSelect,
    column,
    sdsIcon,
  }: {
    isMultiSelect: (typeof MULTI_SELECT_OPTIONS)[number];
    column: (typeof COLUMN_OPTIONS)[number];
    sdsIcon: (typeof ICON_OPTIONS)[number];
  }) {
    const LABEL_STYLE: React.CSSProperties = {
      ...MID_LABEL,
      alignSelf: "end",
      borderWidth: "2px",
      fontSize: "1em",
      margin: "0 0 15px 0",
    };
    return (
      <div style={DISPLAY_CONTENTS}>
        <p style={LABEL_STYLE}>
          Icon: <b>{sdsIcon ? "yes" : "no"}</b>
        </p>
        {SELECTED_OPTIONS.map((selected) => {
          return (
            <MenuItemSelected
              isMultiSelect={isMultiSelect}
              column={column}
              sdsIcon={sdsIcon}
              selected={selected}
              key={String(selected)}
            />
          );
        })}
      </div>
    );
  }

  // loop through all DISABLED_OPTIONS + create headers for SELECTED_OPTIONS
  function MenuItemSelected({
    isMultiSelect,
    column,
    sdsIcon,
    selected,
  }: {
    isMultiSelect: (typeof MULTI_SELECT_OPTIONS)[number];
    column: (typeof COLUMN_OPTIONS)[number];
    sdsIcon: (typeof ICON_OPTIONS)[number];
    selected: (typeof SELECTED_OPTIONS)[number];
  }) {
    const LABEL_STYLE: React.CSSProperties = {
      ...MID_LABEL,
      alignSelf: "end",
      borderWidth: "1px",
      fontSize: "0.83em",
      margin: "0 0 10px 0",
    };
    return (
      <div style={DISPLAY_CONTENTS}>
        <p style={LABEL_STYLE}>
          Selected: <b>{selected ? "true" : "false"}</b>
        </p>
        {DISABLED_OPTIONS.map((disabled) => {
          return (
            <MenuItemDisabled
              isMultiSelect={isMultiSelect}
              column={column}
              sdsIcon={sdsIcon}
              selected={selected}
              disabled={disabled}
              key={String(disabled)}
            />
          );
        })}
      </div>
    );
  }

  // loop through all PSEUDO_STATES + create headers for DISABLED_OPTIONS, PSEUDO_STATES
  function MenuItemDisabled({
    isMultiSelect,
    column,
    sdsIcon,
    selected,
    disabled,
  }: {
    isMultiSelect: (typeof MULTI_SELECT_OPTIONS)[number];
    column: (typeof COLUMN_OPTIONS)[number];
    sdsIcon: (typeof ICON_OPTIONS)[number];
    selected: (typeof SELECTED_OPTIONS)[number];
    disabled: (typeof DISABLED_OPTIONS)[number];
  }) {
    const LEVEL_STYLE: React.CSSProperties = {
      marginBottom: 20,
    };
    const LABEL_STYLE: React.CSSProperties = {
      fontSize: "0.67em",
      margin: "10px 0 20px 0",
    };
    return (
      <div style={DISPLAY_CONTENTS}>
        {PSEUDO_STATES.map((state) => {
          return (
            // to pass a11y, this container div must have role of "menu" since it contains components with roles of "menuitem"
            <div role="menu" style={LEVEL_STYLE}>
              {/* removes irrelevant disabled iterations: when combined with all pseudo-states except default, `disabled=false` is impossible */}
              {(disabled === false ||
                (disabled === true && state === "default")) && (
                <>
                  <p style={LABEL_STYLE}>
                    {disabled ? "Disabled: " : "State: "}
                    <b>{disabled ? "true" : state}</b>
                  </p>
                  <RawMenuItem
                    {...props}
                    data-testid="menu-item"
                    isMultiSelect={isMultiSelect}
                    column={column}
                    sdsIcon={sdsIcon}
                    selected={selected}
                    disabled={disabled}
                    className={`pseudo-${state}`}
                    key={state}
                  >
                    Name
                  </RawMenuItem>
                </>
              )}
            </div>
          );
        })}
      </div>
    );
  }
}; // close ScreenshotTestDemo

export const ScreenshotTest = {
  args: {
    name: "text here",
  },
  parameters: {
    controls: {
      exclude: [
        "name",
        "column",
        "disabled",
        "isMultiSelect",
        "sdsIcon",
        "sdsIconProps",
        "selected",
      ],
    },
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <ScreenshotTestDemo {...args} />,
};

// Test

export const Test = {
  args: {
    column: "test column",
    name: "test text",
  },
  parameters: {
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <MenuItem {...args} />,
};
