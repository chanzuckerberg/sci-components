import styled from "@emotion/styled";
import { ClickAwayListener } from "@material-ui/core";
import Popper from "@material-ui/core/Popper";
import { makeStyles } from "@material-ui/core/styles";
import { Args, Story } from "@storybook/react";
import React, { useState } from "react";
import Icon from "../Icon";
import IconButton from "../IconButton";
import InputDropdown from "../InputDropdown";
import {
  AppThemeOptions,
  fontHeaderXs,
  getBorders,
  getCorners,
  getShadows,
  getSpaces,
  getTypography,
} from "../styles";
import DropdownMenu, { DefaultDropdownMenuOption } from "./index";

const StyledInputDropdown = styled(InputDropdown)`
  position: relative;
  min-width: 300px;
  &.MuiButtonBase-root {
    margin: 0 !important;
  }
`;

const StyledHeaderTitle = styled("div")<{ search: boolean }>`
  ${fontHeaderXs}

  ${(props) => {
    const { search } = props;

    const typography = getTypography(props);
    const spacings = getSpaces(props);

    return `
      font-family: ${typography?.fontFamily};
      color: black;
      padding-top: ${spacings?.xxs}px;
      padding-right: ${spacings?.s}px;
      padding-left: ${spacings?.s}px; 
      ${search ? `padding-bottom: 0px;` : `padding-bottom: ${spacings?.xs}px;`}
    `;
  }}
`;

const useStyles = makeStyles((theme: AppThemeOptions) => {
  const shadows = getShadows({ theme });
  const corners = getCorners({ theme });
  const spacings = getSpaces({ theme });
  const borders = getBorders({ theme });

  return {
    livePreviewPopper: {
      backgroundColor: "white",
      border: borders?.gray[100],
      borderRadius: corners?.m,
      boxShadow: shadows?.m,
      marginTop: spacings?.s,
      padding: spacings?.xs,
      width: 146,
      zIndex: 1,
    },
    popper: {
      backgroundColor: "white",
      border: borders?.gray[100],
      borderRadius: corners?.m,
      boxShadow: shadows?.m,
      marginTop: spacings?.s,
      padding: spacings?.xs,
      width: 286,
      zIndex: 1,
    },
    popperDisablePortal: {
      position: "relative",
      width: "100% !important",
    },
  };
});

// eslint-disable-next-line sonarjs/cognitive-complexity -- Demo code
const Demo = (props: Args): JSX.Element => {
  // eslint-disable-next-line react/prop-types -- Demo code
  const {
    multiple,
    options = GITHUB_LABELS,
    search,
    hasSections,
    title,
  } = props;

  const classes = useStyles();

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
      <ClickAwayListener onClickAway={handleClickAway}>
        <div>
          <StyledInputDropdown
            aria-describedby={id}
            onClick={handleClick}
            label="Click Target"
            sdsStage={open ? "userInput" : "default"}
            sdsType={multiple ? "multiSelect" : "singleSelect"}
            sdsStyle="square"
          />

          <Popper
            id={id}
            open={open}
            anchorEl={anchorEl}
            className={classes.popper}
          >
            {title && (
              <StyledHeaderTitle search={search}>
                Github Labels {hasSections ? " by category" : ""}
              </StyledHeaderTitle>
            )}

            <DropdownMenu
              open={!!open}
              search={search}
              multiple={multiple}
              value={multiple ? pendingValue : value}
              onChange={handleChange}
              disableCloseOnSelect={multiple}
              options={options}
              groupBy={
                hasSections ? (option) => option.section as string : undefined
              }
              {...props}
            />
          </Popper>
        </div>
      </ClickAwayListener>
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
        setPendingValue(value as DefaultDropdownMenuOption[]);
      }

      setAnchorEl(event.currentTarget);
      setOpen(true);
    }
  }

  function handleChange(
    _: React.ChangeEvent<unknown>,
    newValue: DefaultDropdownMenuOption | DefaultDropdownMenuOption[] | null
  ) {
    if (multiple) {
      return setPendingValue(newValue as DefaultDropdownMenuOption[]);
    }

    setValue(newValue as DefaultDropdownMenuOption);
    setOpen(false);
  }
};

export default {
  argTypes: {
    hasSections: {
      control: { type: "boolean" },
    },
    keepSearchOnSelect: {
      control: { type: "boolean" },
    },
    multiple: {
      control: { type: "boolean" },
    },
    search: {
      control: { type: "boolean" },
    },
    title: {
      control: { type: "boolean" },
    },
  },
  component: Demo,
  title: "DropdownMenu",
};

const Template: Story = (args) => <Demo {...args} />;

export const Default = Template.bind({});

Default.args = {
  hasSections: true,
  keepSearchOnSelect: true,
  multiple: true,
  search: true,
  title: true,
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

    & .MuiButton-label > span {
      font-size: 13px;
    }
  }
`;

const StyledInputDropdownLive3 = styled(InputDropdown)`
  position: relative !important;
  min-width: 160px;
  &.MuiButtonBase-root {
    margin: 0 !important;

    & .MuiButton-label > span {
      font-size: 13px;
    }
  }
`;

const LivePreviewDemo = (): JSX.Element => {
  const options = LIVE_PREVIEW_LABELS;
  const classes = useStyles();

  const [anchorEl1, setAnchorEl1] = useState<HTMLElement | null>(null);
  const [anchorEl2, setAnchorEl2] = useState<HTMLElement | null>(null);
  const [anchorEl3, setAnchorEl3] = useState<HTMLElement | null>(null);
  const [anchorEl4, setAnchorEl4] = useState<HTMLElement | null>(null);

  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);

  const [value1, setValue1] = useState<null | DefaultDropdownMenuOption>(null);
  const [value2, setValue2] = useState<null | DefaultDropdownMenuOption>(null);

  const [pendingValue3, setPendingValue3] = useState<
    DefaultDropdownMenuOption[]
  >([]);
  const [pendingValue4, setPendingValue4] = useState<
    DefaultDropdownMenuOption[]
  >([]);

  return (
    <div style={storyRow as React.CSSProperties}>
      <div style={{ alignSelf: "end", gridArea: "1/1/2/2" }}>
        <ClickAwayListener onClickAway={handleClickAway1}>
          <div>
            <StyledInputDropdownLive1
              aria-describedby="live1"
              onClick={handleClick1}
              label="Click Target"
              sdsStage={open1 ? "userInput" : "default"}
              sdsType="singleSelect"
              sdsStyle="minimal"
            />

            <Popper
              id="live1"
              open={open1}
              anchorEl={anchorEl1}
              className={classes.livePreviewPopper}
              placement="bottom-start"
            >
              <DropdownMenu
                open={!!open1}
                onChange={handleChange1}
                disableCloseOnSelect={false}
                options={options.slice(0, 3)}
                search={false}
                multiple={false}
                hasSections={false}
                value={value1}
              />
            </Popper>
          </div>
        </ClickAwayListener>
      </div>

      <div style={{ gridArea: "1/2/2/3" }}>
        <ClickAwayListener onClickAway={handleClickAway2}>
          <div>
            <IconButton
              aria-describedby="live2"
              onClick={handleClick2}
              active={false}
              sdsSize="large"
              sdsType="secondary"
            >
              <Icon
                sdsIcon="infoSpeechBubble"
                sdsSize="l"
                sdsType="iconButton"
              />
            </IconButton>

            <Popper
              id="live2"
              open={open2}
              anchorEl={anchorEl2}
              className={classes.livePreviewPopper}
              placement="bottom-start"
            >
              <StyledHeaderTitle search={false}>
                Title Lorem Ipsum
              </StyledHeaderTitle>

              <DropdownMenu
                open={!!open2}
                search={false}
                multiple={false}
                onChange={handleChange2}
                disableCloseOnSelect={false}
                options={options.slice(0, 3)}
                value={value2}
              />
            </Popper>
          </div>
        </ClickAwayListener>
      </div>

      <div style={{ gridArea: "1/3/2/4" }}>
        <ClickAwayListener onClickAway={handleClickAway3}>
          <div>
            <StyledInputDropdownLive3
              aria-describedby="live3"
              onClick={handleClick3}
              label="Click Target"
              sdsStage={open3 ? "userInput" : "default"}
              sdsType="multiSelect"
              sdsStyle="rounded"
            />

            <Popper
              id="live3"
              open={open3}
              anchorEl={anchorEl3}
              className={classes.livePreviewPopper}
              placement="bottom-start"
            >
              <DropdownMenu
                open={!!open3}
                search
                multiple
                onChange={handleChange3}
                disableCloseOnSelect
                options={options}
                value={pendingValue3}
              />
            </Popper>
          </div>
        </ClickAwayListener>
      </div>

      <div style={{ gridArea: "1/4/2/5" }}>
        <ClickAwayListener onClickAway={handleClickAway4}>
          <div>
            <StyledInputDropdownLive3
              aria-describedby="live4"
              onClick={handleClick4}
              label="Click Target"
              sdsStage={open4 ? "userInput" : "default"}
              sdsType="multiSelect"
              sdsStyle="square"
            />

            <Popper
              id="live4"
              open={open4}
              anchorEl={anchorEl4}
              className={classes.livePreviewPopper}
              placement="bottom-start"
            >
              <DropdownMenu
                open={!!open4}
                search={false}
                multiple
                hasSections
                groupBy={(option) => option.section as string}
                onChange={handleChange4}
                disableCloseOnSelect
                options={options}
                value={pendingValue4}
              />
            </Popper>
          </div>
        </ClickAwayListener>
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
    _: React.ChangeEvent<unknown>,
    newValue: DefaultDropdownMenuOption | DefaultDropdownMenuOption[] | null
  ) {
    setOpen1(false);
    setValue1(newValue as DefaultDropdownMenuOption);
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
    _: React.ChangeEvent<unknown>,
    newValue: DefaultDropdownMenuOption | DefaultDropdownMenuOption[] | null
  ) {
    setOpen2(false);
    setValue2(newValue as DefaultDropdownMenuOption);
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
    _: React.ChangeEvent<unknown>,
    newValue: DefaultDropdownMenuOption | DefaultDropdownMenuOption[] | null
  ) {
    return setPendingValue3(newValue as DefaultDropdownMenuOption[]);
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
    _: React.ChangeEvent<unknown>,
    newValue: DefaultDropdownMenuOption | DefaultDropdownMenuOption[] | null
  ) {
    return setPendingValue4(newValue as DefaultDropdownMenuOption[]);
  }
};

const LivePreviewTemplate: Story = (args) => <LivePreviewDemo {...args} />;

export const LivePreview = LivePreviewTemplate.bind({});

LivePreview.args = {
  hasSections: false,
  keepSearchOnSelect: true,
  multiple: false,
  search: false,
  title: false,
};

LivePreview.parameters = {
  snapshot: {
    skip: true,
  },
};

// Test Story

const TestDemo = (props: Args): JSX.Element => {
  const {
    hasSections,
    multiple,
    options = GITHUB_LABELS,
    search,
    title,
  } = props;

  const classes = useStyles();

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
      <ClickAwayListener onClickAway={handleClickAway}>
        <div>
          <StyledInputDropdown
            aria-describedby={id}
            onClick={handleClick}
            label="Click Target"
            sdsStage={open ? "userInput" : "default"}
            sdsType={multiple ? "multiSelect" : "singleSelect"}
            sdsStyle="square"
            data-testid="dropdown-menu"
          />

          <Popper
            id={id}
            open={open}
            anchorEl={anchorEl}
            className={classes.popper}
          >
            {title && (
              <StyledHeaderTitle search={search}>
                Github Labels {hasSections ? " by category" : ""}
              </StyledHeaderTitle>
            )}

            <DropdownMenu
              open={!!open}
              search={search}
              multiple={multiple}
              value={multiple ? pendingValue : value}
              onChange={handleChange}
              disableCloseOnSelect={multiple}
              options={options}
              groupBy={
                hasSections ? (option) => option.section as string : undefined
              }
              {...props}
            />
          </Popper>
        </div>
      </ClickAwayListener>
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
  hasSections: false,
  keepSearchOnSelect: false,
  multiple: false,
  search: false,
  title: false,
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
    details: "Bigger than 85",
    name: "Priority: critical",
    section: "priority",
  },
  {
    details: "Between 50 and 85",
    name: "Priority: high",
    section: "priority",
  },
  {
    details: "Between 25 and 50",
    name: "Priority: medium",
    section: "priority",
  },
  {
    details: "Smaller than 25",
    name: "Priority: low",
    section: "priority",
  },
  {
    details: "are you sure about this?",
    name: "Status: can't reproduce",
    section: "status",
  },
  {
    name: "Status: confirmed",
    section: "status",
  },
  {
    count: 3,
    name: "Status: duplicate",
    section: "status",
  },
  {
    name: "Status: needs information",
    section: "status",
  },
  {
    details: "This will not be worked on",
    name: "Status: wont do/fix",
    section: "status",
  },
  {
    name: "Type: bug",
    section: "type",
  },
  {
    name: "Type: discussion",
    section: "type",
  },
  {
    name: "Type: documentation",
    section: "type",
  },
  {
    name: "Type: enhancement",
    section: "type",
  },
  {
    name: "Type: epic",
    section: "type",
  },
  {
    name: "Type: feature request",
    section: "type",
  },
  {
    name: "Type: question",
    section: "type",
  },
  {
    count: "3",
    name: "Good first issue",
    section: "uncategorized",
  },
  {
    name: "Help wanted",
    section: "uncategorized",
  },
];

const LIVE_PREVIEW_LABELS = [
  {
    count: "",
    details: "",
    name: "Menu Item 1",
    section: "Section 1",
  },
  {
    count: "",
    details: "",
    name: "Menu Item 2",
    section: "Section 1",
  },
  {
    count: "",
    details: "",
    name: "Menu Item 3",
    section: "Section 1",
  },
  {
    count: "",
    details: "",
    name: "Menu Item 4",
    section: "Section 2",
  },
  {
    count: "",
    details: "",
    name: "Menu Item 5",
    section: "Section 2",
  },
  {
    count: "",
    details: "",
    name: "Menu Item 6",
    section: "Section 2",
  },
];
