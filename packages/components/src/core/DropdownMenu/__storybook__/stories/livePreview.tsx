import { AutocompleteValue } from "@mui/base";
import { useState } from "react";
import { DefaultAutocompleteOption } from "src/core/Autocomplete/components/AutocompleteBase";
import { StyledInputDropdownLive1, StyledInputDropdownLive3 } from "../style";
import {
  DROPDOWN_MENU_LIVE_PREVIEW_LABELS,
  DROPDOWN_MENU_LIVE_PREVIEW_ROW_STYLES,
  DROPDOWN_MENU_POPPER_POSITION,
  DROPDOWN_MENU_POPPER_WIDTH,
} from "../constants";
import RawDropdownMenu from "src/core/DropdownMenu";
import ButtonIcon from "src/core/ButtonIcon";

export const LivePreviewDemo = <
  T extends DefaultAutocompleteOption,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
>(): JSX.Element => {
  const options = DROPDOWN_MENU_LIVE_PREVIEW_LABELS;

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
    <div style={DROPDOWN_MENU_LIVE_PREVIEW_ROW_STYLES as React.CSSProperties}>
      <div style={{ alignSelf: "end" }}>
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
              placement: DROPDOWN_MENU_POPPER_POSITION,
            }}
            search={false}
            multiple={false as Multiple}
            value={value1}
            onClickAway={handleClickAway1}
            width={DROPDOWN_MENU_POPPER_WIDTH}
          />
        ) : null}
      </div>

      <div>
        <ButtonIcon
          aria-describedby="live2"
          aria-label="Open menu"
          onClick={handleClick2}
          sdsSize="large"
          sdsType="secondary"
          icon="InfoSpeechBubble"
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
              placement: DROPDOWN_MENU_POPPER_POSITION,
            }}
            value={value2}
            title="Title Lorem Ipsum"
            onClickAway={handleClickAway2}
            width={DROPDOWN_MENU_POPPER_WIDTH}
          />
        ) : null}
      </div>

      <div>
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
              placement: DROPDOWN_MENU_POPPER_POSITION,
            }}
            value={pendingValue3}
            onClickAway={handleClickAway3}
            width={DROPDOWN_MENU_POPPER_WIDTH}
          />
        ) : null}
      </div>

      <div>
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
              placement: DROPDOWN_MENU_POPPER_POSITION,
            }}
            value={pendingValue4}
            onClickAway={handleClickAway4}
            width={DROPDOWN_MENU_POPPER_WIDTH}
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
