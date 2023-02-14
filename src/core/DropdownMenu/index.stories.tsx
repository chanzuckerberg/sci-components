import { styled } from "@mui/material";
import { Args, Meta, Story } from "@storybook/react";
import React, { SyntheticEvent, useEffect, useState } from "react";
import ButtonIcon from "../ButtonIcon";
import { MUIValue, Value } from "../Dropdown";
import Icon from "../Icon";
import InputDropdown from "../InputDropdown";
import Tag from "../Tag";
import DropdownMenu, { DefaultDropdownMenuOption } from "./index";

export type DropdownOptionValue<T, Multiple> = Multiple extends
  | undefined
  | false
  ? T | undefined
  : Array<T> | undefined;

const StyledInputDropdown = styled(InputDropdown)`
  min-width: 300px;
`;

const POPPER_POSITION = "bottom-start";
const POPPER_WIDTH = 160;

const Demo = <Multiple extends boolean | undefined = false>(
  props: Args
): JSX.Element => {
  const {
    multiple,
    options = GITHUB_LABELS,
    search,
    title,
    label,
    value: propValue,
  } = props;

  const isControlled = propValue !== undefined;
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [value, setValue] = useState<
    Value<DefaultDropdownMenuOption, Multiple>
  >(getInitialValue());
  const [pendingValue, setPendingValue] = useState<
    Value<DefaultDropdownMenuOption, Multiple>
  >(getInitialValue());
  const id = open ? `dropdown-menu` : undefined;

  useEffect(() => {
    if (isControlled) {
      setValue(propValue);
    }
  }, [propValue]);

  return (
    <>
      <StyledInputDropdown
        aria-describedby={id}
        label={label}
        onClick={handleClick}
        sdsStage={open ? "userInput" : "default"}
        sdsType={multiple ? "multiSelect" : "singleSelect"}
        sdsStyle="square"
      />

      <DropdownMenu
        anchorEl={anchorEl}
        disableCloseOnSelect={false}
        id={id}
        multiple={multiple}
        onChange={handleChange}
        onClickAway={handleClickAway}
        open={open}
        options={options}
        PopperBaseProps={{ placement: POPPER_POSITION, sx: { width: 300 } }}
        search={search}
        title={title}
        value={(multiple ? pendingValue : value) as MUIValue<Multiple>}
        getOptionDisabled={(option: DefaultDropdownMenuOption) => {
          return (
            option.name === "Type: feature request" ||
            option.name === "Type: documentation"
            // option.section === "priority"
          );
        }}
        {...props}
      />
    </>
  );

  function handleClickAway() {
    if (open) {
      setOpen(false);

      if (multiple) {
        setValue(pendingValue);
      }
    }
  }

  function handleClick(event: React.MouseEvent<HTMLElement>) {
    if (open) {
      if (multiple) {
        setValue(pendingValue);
      }

      setOpen(false);

      if (anchorEl) {
        anchorEl.focus();
      }

      setAnchorEl(null);
    } else {
      if (multiple) {
        setPendingValue(value);
      }

      setAnchorEl(event.currentTarget);
      setOpen(true);
    }
  }

  function handleChange(
    _: SyntheticEvent<Element, Event>,
    newValue: Value<DefaultDropdownMenuOption, Multiple>
  ) {
    if (multiple) {
      return setPendingValue(newValue);
    }

    setValue(newValue);
    setOpen(false);
  }

  function getInitialValue(): Value<DefaultDropdownMenuOption, Multiple> {
    if (isControlled) {
      return propValue;
    }

    return multiple
      ? ([] as unknown as Value<DefaultDropdownMenuOption, Multiple>)
      : null;
  }
};

const groupByOptions = [
  undefined,
  (option: DefaultDropdownMenuOption) => option.section as string,
];

export default {
  argTypes: {
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
    search: {
      control: { type: "boolean" },
    },
    title: {
      control: { type: "text" },
    },
  },
  component: Demo,
  title: "DropdownMenu",
} as Meta;

const Template: Story = (args) => <Demo {...args} />;

export const Default = Template.bind({});

Default.args = {
  groupBy: groupByOptions[1],
  keepSearchOnSelect: true,
  label: "Click Target",
  multiple: true,
  search: true,
  title: "Github Labels",
};

// Live Preview Story

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

const LivePreviewDemo = (): JSX.Element => {
  const options = LIVE_PREVIEW_LABELS;

  const [anchorEl1, setAnchorEl1] = useState<HTMLElement | null>(null);
  const [anchorEl2, setAnchorEl2] = useState<HTMLElement | null>(null);
  const [anchorEl3, setAnchorEl3] = useState<HTMLElement | null>(null);
  const [anchorEl4, setAnchorEl4] = useState<HTMLElement | null>(null);

  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);

  const [value1, setValue1] =
    useState<Value<DefaultDropdownMenuOption, false>>(null);
  const [value2, setValue2] =
    useState<Value<DefaultDropdownMenuOption, false>>(null);

  const [pendingValue3, setPendingValue3] = useState<
    DropdownOptionValue<DefaultDropdownMenuOption, true>
  >([]);
  const [pendingValue4, setPendingValue4] = useState<
    DropdownOptionValue<DefaultDropdownMenuOption, true>
  >([]);

  return (
    <div style={storyRow as React.CSSProperties}>
      <div style={{ alignSelf: "end", gridArea: "1/1/2/2" }}>
        <StyledInputDropdownLive1
          aria-describedby="live1"
          onClick={handleClick1}
          label="Click Target"
          sdsStage={open1 ? "userInput" : "default"}
          sdsType="singleSelect"
          sdsStyle="minimal"
        />

        <DropdownMenu
          anchorEl={anchorEl1}
          id="live1"
          open={!!open1}
          onChange={handleChange1}
          disableCloseOnSelect={false}
          options={options.slice(0, 3) as DefaultDropdownMenuOption[]}
          PopperBaseProps={{
            placement: POPPER_POSITION,
            sx: { width: POPPER_WIDTH },
          }}
          search={false}
          multiple={false}
          hasSections={false}
          value={value1}
          onClickAway={handleClickAway1}
        />
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

        <DropdownMenu
          anchorEl={anchorEl2}
          id="live2"
          open={!!open2}
          search={false}
          multiple={false}
          onChange={handleChange2}
          disableCloseOnSelect={false}
          options={options.slice(0, 3) as DefaultDropdownMenuOption[]}
          PopperBaseProps={{
            placement: POPPER_POSITION,
            sx: { width: POPPER_WIDTH },
          }}
          value={value2}
          title="Title Lorem Ipsum"
          onClickAway={handleClickAway2}
        />
      </div>

      <div style={{ gridArea: "1/3/2/4" }}>
        <StyledInputDropdownLive3
          aria-describedby="live3"
          onClick={handleClick3}
          label="Click Target"
          sdsStage={open3 ? "userInput" : "default"}
          sdsType="multiSelect"
          sdsStyle="rounded"
        />

        <DropdownMenu
          id="live3"
          anchorEl={anchorEl3}
          open={!!open3}
          search
          multiple
          onChange={handleChange3}
          disableCloseOnSelect
          options={options as DefaultDropdownMenuOption[]}
          PopperBaseProps={{
            placement: POPPER_POSITION,
            sx: { width: POPPER_WIDTH },
          }}
          value={pendingValue3}
          onClickAway={handleClickAway3}
        />
      </div>

      <div style={{ gridArea: "1/4/2/5" }}>
        <StyledInputDropdownLive3
          aria-describedby="live4"
          onClick={handleClick4}
          label="Click Target"
          sdsStage={open4 ? "userInput" : "default"}
          sdsType="multiSelect"
          sdsStyle="square"
        />

        <DropdownMenu
          id="live4"
          anchorEl={anchorEl4}
          open={!!open4}
          search={false}
          multiple
          hasSections
          groupBy={(option) => option.section as string}
          onChange={handleChange4}
          disableCloseOnSelect
          options={options as DefaultDropdownMenuOption[]}
          PopperBaseProps={{
            placement: POPPER_POSITION,
            sx: { width: POPPER_WIDTH },
          }}
          value={pendingValue4}
          onClickAway={handleClickAway4}
        />
      </div>
    </div>
  );

  function handleClickAway1() {
    return open1 && setOpen1(false);
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
    newValue: Value<DefaultDropdownMenuOption, false>
  ) {
    setOpen1(false);
    setValue1(newValue as Value<DefaultDropdownMenuOption, false>);
  }

  function handleClickAway2() {
    return open2 && setOpen2(false);
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
    newValue: Value<DefaultDropdownMenuOption, false>
  ) {
    setOpen2(false);
    setValue2(newValue as Value<DefaultDropdownMenuOption, false>);
  }

  function handleClickAway3() {
    return open3 && setOpen3(false);
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
    newValue: DropdownOptionValue<DefaultDropdownMenuOption, true>
  ) {
    return setPendingValue3(
      newValue as DropdownOptionValue<DefaultDropdownMenuOption, true>
    );
  }

  function handleClickAway4() {
    return open4 && setOpen4(false);
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
    newValue: DropdownOptionValue<DefaultDropdownMenuOption, true>
  ) {
    return setPendingValue4(
      newValue as DropdownOptionValue<DefaultDropdownMenuOption, true>
    );
  }
};

const LivePreviewTemplate: Story = (args) => <LivePreviewDemo {...args} />;

export const LivePreview = LivePreviewTemplate.bind({});

LivePreview.args = {
  keepSearchOnSelect: true,
  multiple: false,
  search: false,
};

LivePreview.parameters = {
  snapshot: {
    skip: true,
  },
};

// Test Story

const TestDemo = (props: Args): JSX.Element => {
  const { multiple, options = LIVE_PREVIEW_LABELS, search } = props;

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const [open, setOpen] = useState(false);

  const [value, setValue] = useState<
    null | DefaultDropdownMenuOption | DefaultDropdownMenuOption[]
  >(multiple ? [] : null);

  const [pendingValue, setPendingValue] = useState<DefaultDropdownMenuOption[]>(
    []
  );

  const id = open ? "github-label" : undefined;

  return (
    <>
      <InputDropdown
        aria-describedby={id}
        onClick={handleClick}
        label="Click Target"
        sdsStage={open ? "userInput" : "default"}
        sdsType={multiple ? "multiSelect" : "singleSelect"}
        sdsStyle="square"
        data-testid="dropdown-menu"
      />

      <DropdownMenu
        anchorEl={anchorEl}
        id={id}
        open={open}
        search={search}
        multiple={multiple}
        value={multiple ? pendingValue : value}
        onChange={handleChange}
        disableCloseOnSelect={multiple}
        options={options}
        onClickAway={handleClickAway}
        {...props}
      />
    </>
  );

  function handleClickAway() {
    if (open) {
      setOpen(false);
      return multiple && setValue(pendingValue);
    }
  }

  function handleClick(event: React.MouseEvent<HTMLElement>) {
    if (!open) {
      if (multiple) {
        setPendingValue(value as DefaultDropdownMenuOption[]);
      }

      setAnchorEl(event.currentTarget);
      setOpen(true);
    } else {
      if (multiple) {
        setValue(pendingValue);
      }

      setOpen(false);

      if (anchorEl) {
        anchorEl.focus();
      }

      setAnchorEl(null);
    }
  }

  function handleChange(
    _: React.ChangeEvent<unknown>,
    newValue: DefaultDropdownMenuOption | DefaultDropdownMenuOption[] | null
  ) {
    if (!multiple) {
      setValue(newValue as DefaultDropdownMenuOption);
      setOpen(false);
    }

    return setPendingValue(newValue as DefaultDropdownMenuOption[]);
  }
};

const TestTemplate: Story = (args) => <TestDemo {...args} />;

export const Test = TestTemplate.bind({});

Test.args = {
  keepSearchOnSelect: false,
  multiple: false,
  search: false,
};

Test.parameters = {
  snapshot: {
    skip: true,
  },
};

/*
 * From https://github.com/abdonrd/github-labels
 * Edited to have Sections and sorted to fix the MUI warning
 * for unsorted and groupedBy options
 */
const GITHUB_LABELS = [
  {
    name: "Status: can't reproduce",
    section: "name only",
  },
  {
    name: "Status: confirmed",
    section: "name only",
  },
  {
    count: 3,
    name: "Status: duplicate",
    section: "name with count",
  },
  {
    count: 5,
    name: "Status: needs information",
    section: "name with count",
  },
  {
    details: "This will not be worked on",
    name: "Status: wont do/fix",
    section: "name with details",
  },
  {
    details: "This is still in progress",
    name: "Status: work in progress",
    section: "name with details",
  },
  {
    details: "This will not be worked on",
    icon: <Icon sdsIcon="bacteria" sdsSize="s" sdsType="static" />,
    name: "Type: bug",
    section: "With Icon",
  },
  {
    count: 4,
    icon: <Icon sdsIcon="puzzlePiece" sdsSize="s" sdsType="static" />,
    name: "Type: discussion",
    section: "With Icon",
  },
  {
    icon: <Icon sdsIcon="copy" sdsSize="s" sdsType="static" />,
    name: "Type: documentation",
    section: "With Icon",
  },
  {
    icon: <Icon sdsIcon="lightBulb" sdsSize="s" sdsType="static" />,
    name: "Type: enhancement",
    section: "With Icon",
  },
  {
    icon: <Icon sdsIcon="list" sdsSize="s" sdsType="static" />,
    name: "Type: epic",
    section: "With Icon",
  },
  {
    icon: <Icon sdsIcon="treeVertical" sdsSize="s" sdsType="static" />,
    name: "Type: feature request",
    section: "With Icon",
  },
  {
    icon: <Icon sdsIcon="search" sdsSize="s" sdsType="static" />,
    name: "Type: question",
    section: "With Icon",
  },
  {
    component: (
      <div>
        <Icon sdsIcon="exclamationMarkCircle" sdsSize="s" sdsType="static" />{" "}
        <span>Add an icon using custom component</span>
      </div>
    ),
    count: 32,
    name: "custom 1",
    section: "custom component",
  },
  {
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
  },
];

const LIVE_PREVIEW_LABELS = [
  {
    // icon: <Icon sdsIcon="flagCheck" sdsSize="s" sdsType="static" />,
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
