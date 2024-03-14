import { Args } from "@storybook/react";
import {
  MENU_ITEM_COLUMN_OPTIONS,
  MENU_ITEM_DISABLED_OPTIONS,
  MENU_ITEM_MULTI_SELECT_OPTIONS,
  MENU_ITEM_PSEUDO_STATES,
  MENU_ITEM_SCREENSHOT_ICON_OPTIONS,
  MENU_ITEM_SDS_STYLE_OPTIONS,
  MENU_ITEM_SELECTED_OPTIONS,
} from "../constants";
import RawMenuItem, { MenuItemProps } from "src/core/MenuItem";

export const ScreenshotTestDemo = (props: Args): JSX.Element => {
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
      {MENU_ITEM_MULTI_SELECT_OPTIONS.map((isMultiSelect) => {
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
    isMultiSelect: (typeof MENU_ITEM_MULTI_SELECT_OPTIONS)[number];
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
        {MENU_ITEM_COLUMN_OPTIONS.map((column) => {
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
    isMultiSelect: (typeof MENU_ITEM_MULTI_SELECT_OPTIONS)[number];
    column: (typeof MENU_ITEM_COLUMN_OPTIONS)[number];
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
        {MENU_ITEM_SCREENSHOT_ICON_OPTIONS.map((sdsIcon) => {
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
    isMultiSelect: (typeof MENU_ITEM_MULTI_SELECT_OPTIONS)[number];
    column: (typeof MENU_ITEM_COLUMN_OPTIONS)[number];
    sdsIcon: (typeof MENU_ITEM_SCREENSHOT_ICON_OPTIONS)[number];
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
        {MENU_ITEM_SELECTED_OPTIONS.map((selected) => {
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
    isMultiSelect: (typeof MENU_ITEM_MULTI_SELECT_OPTIONS)[number];
    column: (typeof MENU_ITEM_COLUMN_OPTIONS)[number];
    sdsIcon: (typeof MENU_ITEM_SCREENSHOT_ICON_OPTIONS)[number];
    selected: (typeof MENU_ITEM_SELECTED_OPTIONS)[number];
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
        {MENU_ITEM_SDS_STYLE_OPTIONS.map((sdsStyle) => {
          return (
            <MenuItemStyles
              isMultiSelect={isMultiSelect}
              column={column}
              sdsIcon={sdsIcon}
              selected={selected}
              sdsStyle={sdsStyle}
              key={String(sdsStyle)}
            />
          );
        })}
      </div>
    );
  }

  // loop through all SDS_STYLE_OPTIONS + create headers for DETERMINISTIC_OPTIONS
  function MenuItemStyles({
    isMultiSelect,
    column,
    sdsIcon,
    selected,
    sdsStyle,
  }: {
    isMultiSelect: (typeof MENU_ITEM_MULTI_SELECT_OPTIONS)[number];
    column: (typeof MENU_ITEM_COLUMN_OPTIONS)[number];
    sdsIcon: (typeof MENU_ITEM_SCREENSHOT_ICON_OPTIONS)[number];
    selected: (typeof MENU_ITEM_SELECTED_OPTIONS)[number];
    sdsStyle: (typeof MENU_ITEM_SDS_STYLE_OPTIONS)[number];
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
          SdsStyle: <b>{sdsStyle}</b>
        </p>
        {MENU_ITEM_DISABLED_OPTIONS.map((disabled) => {
          return (
            <MenuItemDisabled
              isMultiSelect={isMultiSelect}
              column={column}
              sdsIcon={sdsIcon}
              selected={selected}
              sdsStyle={sdsStyle as MenuItemProps<"Gear">["sdsStyle"]}
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
    sdsStyle,
    disabled,
  }: {
    isMultiSelect: (typeof MENU_ITEM_MULTI_SELECT_OPTIONS)[number];
    column: (typeof MENU_ITEM_COLUMN_OPTIONS)[number];
    sdsIcon: (typeof MENU_ITEM_SCREENSHOT_ICON_OPTIONS)[number];
    selected: (typeof MENU_ITEM_SELECTED_OPTIONS)[number];
    sdsStyle: MenuItemProps<"Gear">["sdsStyle"];
    disabled: (typeof MENU_ITEM_DISABLED_OPTIONS)[number];
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
        {MENU_ITEM_PSEUDO_STATES.map((state) => {
          return (
            // to pass a11y, this container div must have role of "menu" since it contains components with roles of "menuitem"
            <div role="menu" style={LEVEL_STYLE} key={state}>
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
                    icon={sdsIcon}
                    selected={selected}
                    sdsStyle={sdsStyle}
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
};
