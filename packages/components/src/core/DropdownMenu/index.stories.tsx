import { AutocompleteValue, styled } from "@mui/material";
import { Args, Meta } from "@storybook/react";
import React, { useEffect, useRef, useState } from "react";
import ButtonIcon from "../ButtonIcon";
import InputDropdown from "../InputDropdown";
import Tag from "../Tag";
import { GITHUB_LABELS } from "./GITHUB_LABELS";
import { GITHUB_LABELS_MULTI_COLUMN } from "./GITHUB_LABELS_MULTI_COLUMN";
import RawDropdownMenu, { DefaultDropdownMenuOption } from "./index";

const POPPER_POSITION = "bottom-start";
const POPPER_WIDTH = 160;
const groupByOptions = [
  undefined,
  (option: DefaultDropdownMenuOption) => option.section as string,
];
const dataOptions = [GITHUB_LABELS, GITHUB_LABELS_MULTI_COLUMN];

const DropdownMenu = <
  T extends DefaultDropdownMenuOption,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined
>(
  props: Args
): JSX.Element => {
  const { label, multiple, options = GITHUB_LABELS, search, title } = props;
  const anchorRef = useRef(null);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  useEffect(() => {
    setTimeout(() => {
      setAnchorEl(anchorRef.current);
    }, 1);
  }, [anchorRef]);

  return (
    <div style={{ margin: "16px 0 0 24px" }} ref={anchorRef}>
      {anchorEl ? (
        <RawDropdownMenu<T, Multiple, DisableClearable, FreeSolo>
          label={label}
          anchorEl={anchorEl}
          disableCloseOnSelect={false}
          multiple={multiple}
          options={options}
          PopperBaseProps={{
            disablePortal: false,
            placement: POPPER_POSITION,
          }}
          search={search}
          title={title}
          getOptionDisabled={(option: T) => {
            return option.name === "Type: feature request";
          }}
          {...props}
        />
      ) : null}
    </div>
  );
};

export default {
  argTypes: {
    ClickAwayListenerProps: {
      control: { type: "object" },
    },
    groupBy: {
      control: {
        labels: ["No group by", "Group by section names"],
        type: "select",
      },
      mapping: groupByOptions,
      options: Object.keys(groupByOptions),
    },
    keepSearchOnSelect: {
      control: { type: "boolean" },
    },
    label: {
      control: { type: "text" },
      require: true,
    },
    multiple: {
      control: { type: "boolean" },
    },
    open: {
      control: {
        type: "boolean",
      },
    },
    options: {
      control: {
        labels: ["Single Column Autocomplete", "Multi Column Autocomplete"],
        type: "select",
      },
      mapping: dataOptions,
      options: Object.keys(dataOptions),
    },
    search: {
      control: { type: "boolean" },
    },
    title: {
      control: { type: "text" },
    },
    width: {
      control: { type: "number" },
    },
  },
  component: DropdownMenu,
  // (masoudmanson) For the purpose of storybook, the button is removed
  // from the dropdown menu component which may cause some accessibility
  // violations related to ARIA roles and attributes. However, this
  // should not be a concern as the component is always used with a button
  // in real applications. To avoid false positive test failures, the following
  // accessibility rules have been temporarily disabled in the tests
  parameters: {
    axe: {
      disabledRules: [
        "aria-input-field-name",
        "aria-required-children",
        "aria-required-parent",
        "button-name",
        "list",
        "listitem",
      ],
    },
  },
  title: "Dropdowns/DropdownMenu",
} as Meta;

// Default

export const Default = {
  args: {
    groupBy: groupByOptions[1],
    keepSearchOnSelect: true,
    multiple: true,
    open: true,
    search: true,
    title: "Github Labels",
    width: 300,
  },
};

// Live Preview

const storyRow = {
  display: "grid",
  gridColumnGap: 24,
  gridRowGap: 8,
  gridTemplateColumns: "repeat(4, 160px)",
  gridTemplateRows: "repeat(2, auto)",
};

const StyledInputDropdownLive1 = styled(InputDropdown)`
  position: relative !important;
  min-width: unset;
  &.MuiButtonBase-root {
    margin: 0 !important;

    & > span {
      font-size: 13px;
    }
  }
`;

const StyledInputDropdownLive3 = styled(InputDropdown)`
  position: relative !important;
  min-width: 160px;
  &.MuiButtonBase-root {
    margin: 0 !important;

    & > span {
      font-size: 13px;
    }
  }
`;

const LIVE_PREVIEW_LABELS = [
  {
    name: "Menu Item 1",
    section: "Section 1",
  },
  {
    name: "Menu Item 2",
    section: "Section 1",
  },
  {
    name: "Menu Item 3",
    section: "Section 1",
  },
  {
    name: "Menu Item 4",
    section: "Section 2",
  },
  {
    name: "Menu Item 5",
    section: "Section 2",
  },
  {
    name: "Menu Item 6",
    section: "Section 2",
  },
];

const LivePreviewDemo = <
  T extends DefaultDropdownMenuOption,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined
>(): JSX.Element => {
  const options = LIVE_PREVIEW_LABELS;

  const [anchorEl1, setAnchorEl1] = useState<HTMLElement | null>(null);
  const [anchorEl2, setAnchorEl2] = useState<HTMLElement | null>(null);
  const [anchorEl3, setAnchorEl3] = useState<HTMLElement | null>(null);
  const [anchorEl4, setAnchorEl4] = useState<HTMLElement | null>(null);

  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);

  const [value1, setValue1] = useState<
    AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>
  >(getInitialValue(false));
  const [value2, setValue2] = useState<
    AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>
  >(getInitialValue(false));

  const [pendingValue3, setPendingValue3] = useState<
    AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>
  >(getInitialValue(true));
  const [pendingValue4, setPendingValue4] = useState<
    AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>
  >(getInitialValue(true));

  return (
    <div style={storyRow as React.CSSProperties}>
      <div style={{ alignSelf: "end", gridArea: "1/1/2/2" }}>
        <StyledInputDropdownLive1
          aria-describedby="live1"
          onClick={handleClick1}
          label="Click Target"
          sdsStage={open1 ? "userInput" : "default"}
          sdsType="label"
          multiple={false}
          sdsStyle="minimal"
        />

        {anchorEl1 ? (
          <RawDropdownMenu<T, Multiple, DisableClearable, FreeSolo>
            label="Search"
            anchorEl={anchorEl1}
            open={!!open1}
            onChange={handleChange1}
            disableCloseOnSelect={false}
            options={options.slice(0, 3) as T[]}
            PopperBaseProps={{
              placement: POPPER_POSITION,
            }}
            search={false}
            multiple={false as Multiple}
            value={value1}
            onClickAway={handleClickAway1}
            width={POPPER_WIDTH}
          />
        ) : null}
      </div>

      <div style={{ gridArea: "1/2/2/3" }}>
        <ButtonIcon
          aria-describedby="live2"
          aria-label="Open menu"
          onClick={handleClick2}
          on={false}
          sdsSize="large"
          sdsType="secondary"
          sdsIcon="infoSpeechBubble"
        />

        {anchorEl2 ? (
          <RawDropdownMenu<T, Multiple, DisableClearable, FreeSolo>
            label="Search"
            anchorEl={anchorEl2}
            open={!!open2}
            search={false}
            multiple={false as Multiple}
            onChange={handleChange2}
            disableCloseOnSelect={false}
            options={options.slice(0, 3) as T[]}
            PopperBaseProps={{
              placement: POPPER_POSITION,
            }}
            value={value2}
            title="Title Lorem Ipsum"
            onClickAway={handleClickAway2}
            width={POPPER_WIDTH}
          />
        ) : null}
      </div>

      <div style={{ gridArea: "1/3/2/4" }}>
        <StyledInputDropdownLive3
          aria-describedby="live3"
          onClick={handleClick3}
          label="Click Target"
          sdsStage={open3 ? "userInput" : "default"}
          sdsType="label"
          multiple
          sdsStyle="rounded"
        />

        {anchorEl3 ? (
          <RawDropdownMenu<T, Multiple, DisableClearable, FreeSolo>
            label="Search"
            anchorEl={anchorEl3}
            open={!!open3}
            search
            multiple={true as Multiple}
            onChange={handleChange3}
            disableCloseOnSelect
            options={options as T[]}
            PopperBaseProps={{
              placement: POPPER_POSITION,
            }}
            value={pendingValue3}
            onClickAway={handleClickAway3}
            width={POPPER_WIDTH}
          />
        ) : null}
      </div>

      <div style={{ gridArea: "1/4/2/5" }}>
        <StyledInputDropdownLive3
          aria-describedby="live4"
          onClick={handleClick4}
          label="Click Target"
          sdsStage={open4 ? "userInput" : "default"}
          sdsType="label"
          multiple
          sdsStyle="square"
        />

        {anchorEl4 ? (
          <RawDropdownMenu<T, Multiple, DisableClearable, FreeSolo>
            label="Search"
            anchorEl={anchorEl4}
            open={!!open4}
            search={false}
            multiple={true as Multiple}
            groupBy={(option) => option.section as string}
            onChange={handleChange4}
            disableCloseOnSelect
            options={options as T[]}
            PopperBaseProps={{
              placement: POPPER_POSITION,
            }}
            value={pendingValue4}
            onClickAway={handleClickAway4}
            width={POPPER_WIDTH}
          />
        ) : null}
      </div>
    </div>
  );

  function getInitialValue(
    multiple: boolean
  ): AutocompleteValue<T, Multiple, DisableClearable, FreeSolo> {
    return multiple
      ? ([] as unknown as AutocompleteValue<
          T,
          Multiple,
          DisableClearable,
          FreeSolo
        >)
      : (null as AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>);
  }

  function handleClickAway1() {
    setOpen1(false);
  }

  function handleClick1(event: React.MouseEvent<HTMLElement>) {
    if (open1) {
      setOpen1(false);

      if (anchorEl1) {
        anchorEl1.focus();
      }

      setAnchorEl1(null);
    } else {
      setAnchorEl1(event.currentTarget);
      setOpen1(true);
    }
  }

  function handleChange1(
    _: React.SyntheticEvent<Element, Event>,
    newValue: AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>
  ) {
    setOpen1(false);
    setValue1(
      newValue as AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>
    );
  }

  function handleClickAway2() {
    setOpen2(false);
  }

  function handleClick2(event: React.MouseEvent<HTMLElement>) {
    if (open2) {
      setOpen2(false);

      if (anchorEl2) {
        anchorEl2.focus();
      }

      setAnchorEl2(null);
    } else {
      setAnchorEl2(event.currentTarget);
      setOpen2(true);
    }
  }

  function handleChange2(
    _: React.SyntheticEvent<Element, Event>,
    newValue: AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>
  ) {
    setOpen2(false);
    setValue2(
      newValue as AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>
    );
  }

  function handleClickAway3() {
    setOpen3(false);
  }

  function handleClick3(event: React.MouseEvent<HTMLElement>) {
    if (open3) {
      setOpen3(false);

      if (anchorEl3) {
        anchorEl3.focus();
      }

      setAnchorEl3(null);
    } else {
      setAnchorEl3(event.currentTarget);
      setOpen3(true);
    }
  }

  function handleChange3(
    _: React.SyntheticEvent<Element, Event>,
    newValue: AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>
  ) {
    return setPendingValue3(
      newValue as AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>
    );
  }

  function handleClickAway4() {
    setOpen4(false);
  }

  function handleClick4(event: React.MouseEvent<HTMLElement>) {
    if (open4) {
      setOpen4(false);

      if (anchorEl4) {
        anchorEl4.focus();
      }

      setAnchorEl4(null);
    } else {
      setAnchorEl4(event.currentTarget);
      setOpen4(true);
    }
  }

  function handleChange4(
    _: React.SyntheticEvent<Element, Event>,
    newValue: AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>
  ) {
    return setPendingValue4(
      newValue as AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>
    );
  }
};

export const LivePreview = {
  args: {
    keepSearchOnSelect: true,
    multiple: false,
    search: false,
  },
  parameters: {
    controls: {
      exclude: [
        "keepSearchOnSelect",
        "ClickAwayListenerProps",
        "search",
        "multiple",
        "label",
        "groupBy",
        "open",
        "options",
        "title",
        "width",
      ],
    },
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <LivePreviewDemo {...args} />,
};

// Screenshot test

const ScreenshotTestDemo = (props: Args): JSX.Element => {
  const TITLE_OPTIONS = [undefined, "Sample title text"];
  const SEARCH_OPTIONS = [false, true];
  const GROUP_BY_OPTIONS = [false, true];
  const SCREENSHOT_TEST_TAG_COMPONENT = {
    component: (
      <div>
        Available Labels:
        <div style={{ marginTop: 10 }}>
          <Tag
            label="bug"
            sdsStyle="rounded"
            sdsType="secondary"
            color="error"
          />
          <Tag
            label="feature"
            sdsStyle="rounded"
            sdsType="secondary"
            color="warning"
          />
          <Tag
            label="refactor"
            sdsStyle="rounded"
            sdsType="secondary"
            color="gray"
          />
        </div>
      </div>
    ),
    name: "custom 2",
    section: "custom component",
  };
  const SCREENSHOT_TEST_OPTIONS = LIVE_PREVIEW_LABELS.concat(
    SCREENSHOT_TEST_TAG_COMPONENT
  );

  const DISPLAY_CONTENTS: React.CSSProperties = {
    display: "contents",
  };
  const MID_LABEL: React.CSSProperties = {
    borderStyle: "solid none none none",
    gridColumn: "1 / 3",
    justifySelf: "stretch",
    paddingTop: 10,
  };

  // loop through all TITLE_OPTIONS
  return (
    <>
      {TITLE_OPTIONS.map((title) => {
        return <DropdownMenuTitle title={title} key={title} />;
      })}
    </>
  );

  // loop through all SEARCH_OPTIONS + create headers for TITLE_OPTIONS
  function DropdownMenuTitle({
    title,
  }: {
    title: (typeof TITLE_OPTIONS)[number];
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
      marginBottom: 10,
    };
    return (
      <div style={LEVEL_STYLE}>
        <p style={LABEL_STYLE}>
          Title: <b>{title ? "yes" : "no"}</b>
        </p>
        {SEARCH_OPTIONS.map((search) => {
          return (
            <DropdownMenuSearch
              title={title}
              search={search}
              key={String(search)}
            />
          );
        })}
      </div>
    );
  }

  function DropdownMenuSearch({
    title,
    search,
  }: {
    title: (typeof TITLE_OPTIONS)[number];
    search: (typeof SEARCH_OPTIONS)[number];
  }) {
    const SEARCH_LABEL: React.CSSProperties = {
      ...MID_LABEL,
      borderWidth: "2px",
      fontSize: "1.17em",
      margin: 0,
    };
    const LEVEL_STYLE: React.CSSProperties = {
      margin: "0 300px 475px 0",
    };
    const GROUP_BY_LABEL: React.CSSProperties = {
      fontSize: "0.67em",
      margin: "10px 0 475px",
    };
    return (
      <div style={DISPLAY_CONTENTS}>
        <p style={SEARCH_LABEL}>
          Search: <b>{search ? "yes" : "no"}</b>
        </p>
        {GROUP_BY_OPTIONS.map((groupBy) => {
          return (
            <div style={LEVEL_STYLE} key={`level-${String(groupBy)}`}>
              <>
                <p style={GROUP_BY_LABEL}>
                  Grouped: <b>{groupBy ? "yes" : "no"}</b>
                </p>
                <DropdownMenu
                  {...props}
                  groupBy={
                    groupBy &&
                    ((option: (typeof SCREENSHOT_TEST_OPTIONS)[number]) =>
                      option.section as string)
                  }
                  options={
                    SCREENSHOT_TEST_OPTIONS as DefaultDropdownMenuOption[]
                  }
                  title={title}
                  search={search}
                  key={String(groupBy)}
                />
              </>
            </div>
          );
        })}
      </div>
    );
  }
}; // close ScreenShotTestDemo

export const ScreenshotTest = {
  parameters: {
    axe: {
      timeout: 10 * 1000,
    },
    controls: {
      exclude: [
        "keepSearchOnSelect",
        "ClickAwayListenerProps",
        "search",
        "multiple",
        "label",
        "groupBy",
        "open",
        "options",
        "title",
        "width",
      ],
    },
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <ScreenshotTestDemo {...args} />,
};

// Test

const TestDemo = <
  T extends DefaultDropdownMenuOption,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined
>(
  props: Args
): JSX.Element => {
  const { multiple, options = GITHUB_LABELS, search } = props;

  const anchorRef = useRef(null);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const [value, setValue] = useState<
    AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>
  >(getInitialValue(false));

  const [pendingValue, setPendingValue] = useState<
    AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>
  >(getInitialValue(true));

  useEffect(() => {
    setAnchorEl(anchorRef.current);
  }, []);

  return (
    <div style={{ margin: "16px 0 0 24px" }} ref={anchorRef}>
      {anchorEl ? (
        <RawDropdownMenu<T, Multiple, DisableClearable, FreeSolo>
          label="Search"
          anchorEl={anchorEl}
          open
          search={search}
          multiple={multiple}
          value={multiple ? pendingValue : value}
          onChange={handleChange}
          disableCloseOnSelect={multiple}
          options={options}
          onClickAway={handleClickAway}
          groupBy={(option: T) => option.section as string}
          width={300}
          {...props}
        />
      ) : null}
    </div>
  );

  function handleClickAway() {
    return multiple && setValue(pendingValue);
  }

  function handleChange(
    _: React.ChangeEvent<unknown>,
    newValue: AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>
  ) {
    if (!multiple) {
      setValue(
        newValue as AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>
      );
    }

    return setPendingValue(
      newValue as AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>
    );
  }

  // eslint-disable-next-line sonarjs/no-identical-functions
  function getInitialValue(
    isMultiple: boolean
  ): AutocompleteValue<T, Multiple, DisableClearable, FreeSolo> {
    return isMultiple
      ? ([] as unknown as AutocompleteValue<
          T,
          Multiple,
          DisableClearable,
          FreeSolo
        >)
      : (null as AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>);
  }
};

export const Test = {
  args: {
    keepSearchOnSelect: false,
    multiple: true,
    search: true,
    title: "Github Labels",
  },
  parameters: {
    controls: {
      exclude: [
        "keepSearchOnSelect",
        "ClickAwayListenerProps",
        "search",
        "multiple",
        "label",
        "groupBy",
        "open",
        "options",
        "title",
        "width",
      ],
    },
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <TestDemo data-testid="dropdown-menu" {...args} />,
};
