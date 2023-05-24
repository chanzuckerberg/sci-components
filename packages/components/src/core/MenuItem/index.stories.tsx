/* eslint-disable no-use-before-define */
import { Args, Meta } from "@storybook/react";
import * as React from "react";
import Icon from "../Icon";
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
const DETAILS_OPTIONS = ["sample details text", undefined];
const COLUMN_OPTIONS = ["sample column text", undefined];
const ICON_OPTIONS = [
  undefined,
  <Icon sdsSize="l" sdsIcon="download" sdsType="button" />,
];
const SELECTED_OPTIONS = [false, true];
const DISABLED_OPTIONS = [false, true];
const PSEUDO_STATES = ["default", "hover", "active", "focus"];

const ScreenshotTestDemo = (props: Args): JSX.Element => {
  // loop through all MULTI_SELECT_OPTIONS
  return (
    <>
      {MULTI_SELECT_OPTIONS.map((isMultiSelect) => {
        return (
          <MenuItemMultiSelect
            isMultiSelect={isMultiSelect}
            key={isMultiSelect}
          />
        );
      })}
    </>
  );

  // loop through all DETAILS_OPTIONS + create headers for MULTI_SELECT_OPTIONS
  function MenuItemMultiSelect({ isMultiSelect }) // : {
  //   isMultiSelect:
  // }
  {
    return (
      <div>
        {" "}
        {/* INSERT CSS STYLE HERE */}
        <p>
          {" "}
          {/* INSERT CSS STYLE HERE */}
          Multi-select: <b>{isMultiSelect ? "true" : "false"}</b>
        </p>
        {DETAILS_OPTIONS.map((details) => {
          return (
            <MenuItemDetails
              isMultiSelect={isMultiSelect}
              details={details}
              key={details}
            />
          );
        })}
      </div>
    );
  }

  // loop through all COLUMN_OPTIONS + create headers for DETAILS_OPTIONS
  function MenuItemDetails({ isMultiSelect, details }) // : {
  //   isMultiSelect:
  //   details:
  // }
  {
    return (
      <div>
        {" "}
        {/* INSERT CSS STYLE HERE */}
        <p>
          {" "}
          {/* INSERT CSS STYLE HERE */}
          Details: <b>{details ? "yes" : "no"}</b>
        </p>
        {COLUMN_OPTIONS.map((column) => {
          return (
            <MenuItemColumn
              isMultiSelect={isMultiSelect}
              details={details}
              column={column}
              key={column}
            />
          );
        })}
      </div>
    );
  }

  // loop through all ICON_OPTIONS + create headers for COLUMN_OPTIONS
  function MenuItemColumn({ isMultiSelect, details, column }) // : {
  // isMultiSelect:
  // details:
  // column:
  // }
  {
    return (
      <div>
        {" "}
        {/* INSERT CSS STYLE HERE */}
        <p>
          {" "}
          {/* INSERT CSS STYLE HERE */}
          Column: <b>{column ? "yes" : "no"}</b>
        </p>
        {ICON_OPTIONS.map((sdsIcon) => {
          return (
            <MenuItemIcon
              isMultiSelect={isMultiSelect}
              details={details}
              column={column}
              sdsIcon={sdsIcon}
              key={sdsIcon}
            />
          );
        })}
      </div>
    );
  }

  // loop through all SELECTED_OPTIONS + create headers for ICON_OPTIONS
  function MenuItemIcon({ isMultiSelect, details, column, sdsIcon }) // : {
  // isMultiSelect:
  // details:
  // column:
  // sdsIcon:
  // }
  {
    return (
      <div>
        {" "}
        {/* INSERT CSS STYLE HERE */}
        <p>
          {" "}
          {/* INSERT CSS STYLE HERE */}
          Icon: <b>{sdsIcon ? "yes" : "no"}</b>
        </p>
        {SELECTED_OPTIONS.map((selected) => {
          return (
            <MenuItemSelected
              isMultiSelect={isMultiSelect}
              details={details}
              column={column}
              sdsIcon={sdsIcon}
              selected={selected}
              key={selected}
            />
          );
        })}
      </div>
    );
  }

  // loop through all DISABLED_OPTIONS + create headers for SELECTED_OPTIONS
  function MenuItemSelected({
    isMultiSelect,
    details,
    column,
    sdsIcon,
    selected,
  }) // : {
  // isMultiSelect:
  // details:
  // column:
  // sdsIcon:
  // selected:
  // }
  {
    return (
      <div>
        {" "}
        {/* INSERT CSS STYLE HERE */}
        <p>
          {" "}
          {/* INSERT CSS STYLE HERE */}
          Selected: <b>{sdsIcon ? "true" : "false"}</b>
        </p>
        {DISABLED_OPTIONS.map((disabled) => {
          return (
            <MenuItemDisabled
              isMultiSelect={isMultiSelect}
              details={details}
              column={column}
              sdsIcon={sdsIcon}
              selected={selected}
              disabled={disabled}
              key={disabled}
            />
          );
        })}
      </div>
    );
  }

  // loop through all PSEUDO_STATES + create headers for DISABLED_OPTIONS, PSEUDO_STATES
  function MenuItemDisabled({
    isMultiSelect,
    details,
    column,
    sdsIcon,
    selected,
    disabled,
  }) // : {
  // isMultiSelect:
  // details:
  // column:
  // sdsIcon:
  // selected:
  // disabled:
  // }
  {
    return (
      <div>
        {" "}
        {/* INSERT CSS STYLE HERE */}
        {PSEUDO_STATES.map((state) => {
          return (
            <div>
              {" "}
              {/* INSERT CSS STYLE HERE */}
              {/* removes irrelevant disabled iterations: when combined with all pseudo-states except default, `disabled=false` is impossible */}
              {(disabled === false ||
                (disabled === true && state === "default")) && (
                <>
                  <p>
                    {" "}
                    {/* INSERT CSS STYLE HERE */}
                    {disabled === false ? "State: " : "Disabled: "}
                    <br />
                    <b>{disabled === false ? state : "true"}</b>
                  </p>
                  <RawMenuItem
                    {...props}
                    data-testid="menu-item"
                    isMultiSelect={isMultiSelect}
                    details={details}
                    column={column}
                    sdsIcon={sdsIcon}
                    selected={selected}
                    disabled={disabled}
                    key={disabled}
                    className={`pseudo-${state}`}
                    key={state}
                  >
                    Name here
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
    // controls: {
    //   exclude: ["onClick", "sdsStyle", "sdsType", "text"],
    // },
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
