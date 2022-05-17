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
import Chips from "./components/Chips";
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

      <div style={{ marginTop: 8, width: 300 }}>
        <Chips value={value} multiple={multiple} onDelete={handleDelete} />
      </div>
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

  function handleDelete(option: DefaultDropdownMenuOption) {
    if (!multiple) {
      return setValue(null);
    }

    const newValue = (value as DefaultDropdownMenuOption[]).filter(
      (item) => item !== option
    );

    setValue(newValue);
  }
};

export default {
  argTypes: {
    hasSections: {
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
  hasSections: false,
  multiple: false,
  search: false,
  title: false,
};

// Live Preview

const storyRow = {
  display: "grid",
  gridColumnGap: 24,
  gridRowGap: 0,
  gridTemplateColumns: "repeat(4, 160px)",
  gridTemplateRows: "1fr",
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
  const [value3, setValue3] = useState<null | DefaultDropdownMenuOption[]>([]);
  const [value4, setValue4] = useState<null | DefaultDropdownMenuOption[]>([]);

  const [pendingValue3, setPendingValue3] = useState<
    DefaultDropdownMenuOption[]
  >([]);
  const [pendingValue4, setPendingValue4] = useState<
    DefaultDropdownMenuOption[]
  >([]);

  return (
    <div style={storyRow as React.CSSProperties}>
      <div style={{ gridArea: "1/1/2/2" }}>
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

        <div style={{ marginTop: 8, width: 160 }}>
          <Chips value={value1} multiple={false} onDelete={handleDelete1} />
        </div>
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

        <div style={{ marginTop: 8, width: 160 }}>
          <Chips value={value2} multiple={false} onDelete={handleDelete2} />
        </div>
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

        <div style={{ marginTop: 8, width: 160 }}>
          <Chips value={value3} multiple onDelete={handleDelete3} />
        </div>
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

        <div style={{ marginTop: 8, width: 160 }}>
          <Chips value={value4} multiple onDelete={handleDelete4} />
        </div>
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

  function handleDelete1() {
    return setValue1(null);
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

  function handleDelete2() {
    return setValue2(null);
  }

  function handleClickAway3() {
    setValue3(pendingValue3);
    return open3 && setOpen3(false);
  }

  function handleClick3(event: React.MouseEvent<HTMLElement>) {
    if (open3) {
      setOpen3(false);

      setValue3(pendingValue3);

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

  function handleDelete3(option: DefaultDropdownMenuOption) {
    const newValue = (value3 as DefaultDropdownMenuOption[]).filter(
      (item) => item !== option
    );

    setValue3(newValue);
    setPendingValue3(newValue);
  }

  function handleClickAway4() {
    setValue4(pendingValue4);
    return open4 && setOpen4(false);
  }

  function handleClick4(event: React.MouseEvent<HTMLElement>) {
    if (open4) {
      setOpen4(false);

      setValue3(pendingValue3);

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

  function handleDelete4(option: DefaultDropdownMenuOption) {
    const newValue = (value4 as DefaultDropdownMenuOption[]).filter(
      (item) => item !== option
    );

    setValue4(newValue);
    setPendingValue4(newValue);
  }
};

const LivePreviewTemplate: Story = (args) => <LivePreviewDemo {...args} />;

export const LivePreview = LivePreviewTemplate.bind({});

LivePreview.args = {
  hasSections: false,
  multiple: false,
  search: false,
  title: false,
};

LivePreview.parameters = {
  snapshot: {
    skip: true,
  },
};

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

/*
 * From https://github.com/abdonrd/github-labels
 * Edited to have Sections and sorted to fix the MUI warning
 * for unsorted and groupedBy options
 */
const GITHUB_LABELS = [
  {
    color: "#b60205",
    count: 12,
    description: "",
    details: "Bigger than 85",
    name: "priority: critical",
    section: "priority",
  },
  {
    color: "#d93f0b",
    description: "",
    details: "Between 50 and 85",
    name: "priority: high",
    section: "priority",
  },
  {
    color: "#fbca04",
    count: 4,
    description: "",
    details: "Between 25 and 50",
    name: "priority: medium",
    section: "priority",
  },
  {
    color: "#0e8a16",
    count: 1,
    description: "",
    details: "Smaller than 25",
    name: "priority: low",
    section: "priority",
  },
  {
    color: "#fec1c1",
    description: "",
    name: "status: can't reproduce",
    section: "status",
  },
  {
    color: "#215cea",
    description: "",
    name: "status: confirmed",
    section: "status",
  },
  {
    color: "#cfd3d7",
    count: 3,
    description: "This issue or pull request already exists",
    name: "status: duplicate",
    section: "status",
  },
  {
    color: "#fef2c0",
    description: "",
    name: "status: needs information",
    section: "status",
  },
  {
    color: "#eeeeee",
    description: "This will not be worked on",
    details: "This will not be worked on",
    name: "status: wont do/fix",
    section: "status",
  },
  {
    color: "#d73a4a",
    description: "Something isn't working",
    name: "type: bug",
    section: "type",
  },
  {
    color: "#d4c5f9",
    description: "",
    name: "type: discussion",
    section: "type",
  },
  {
    color: "#006b75",
    description: "",
    name: "type: documentation",
    section: "type",
  },
  {
    color: "#84b6eb",
    description: "",
    name: "type: enhancement",
    section: "type",
  },
  {
    color: "#3e4b9e",
    description: "A theme of work that contain sub-tasks",
    name: "type: epic",
    section: "type",
  },
  {
    color: "#fbca04",
    description: "New feature or request",
    name: "type: feature request",
    section: "type",
  },
  {
    color: "#d876e3",
    description: "Further information is requested",
    name: "type: question",
    section: "type",
  },
  {
    color: "#7057ff",
    count: "3",
    description: "Good for newcomers",
    name: "good first issue",
    section: "uncategorized",
  },
  {
    color: "#008672",
    description: "Extra attention is needed",
    name: "help wanted",
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
