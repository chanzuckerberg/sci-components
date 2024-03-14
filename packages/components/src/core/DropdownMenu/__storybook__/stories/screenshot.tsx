import { Args } from "@storybook/react";
import Tag from "src/core/Tag";
import { DROPDOWN_MENU_LIVE_PREVIEW_LABELS } from "../constants";
import { DropdownMenu } from "./default";
import { DefaultAutocompleteOption } from "src/core/Autocomplete";

export const ScreenshotTestDemo = (props: Args): JSX.Element => {
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
            color="negative"
          />
          <Tag
            label="feature"
            sdsStyle="rounded"
            sdsType="secondary"
            color="notice"
          />
          <Tag
            label="refactor"
            sdsStyle="rounded"
            sdsType="secondary"
            color="neutral"
          />
        </div>
      </div>
    ),
    name: "custom 2",
    section: "custom component",
  };
  const SCREENSHOT_TEST_OPTIONS = DROPDOWN_MENU_LIVE_PREVIEW_LABELS.concat(
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
      {TITLE_OPTIONS.map((title, index) => {
        return <DropdownMenuTitle title={title} key={String(title) + index} />;
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
        {GROUP_BY_OPTIONS.map((groupBy, index) => {
          const groupByFinal = groupBy
            ? (option: (typeof SCREENSHOT_TEST_OPTIONS)[number]) =>
                option.section as string
            : undefined;
          return (
            <div style={LEVEL_STYLE} key={`level-${index})}`}>
              <>
                <p style={GROUP_BY_LABEL}>
                  Grouped: <b>{groupBy ? "yes" : "no"}</b>
                </p>
                <DropdownMenu
                  {...props}
                  groupBy={groupByFinal}
                  options={
                    SCREENSHOT_TEST_OPTIONS as DefaultAutocompleteOption[]
                  }
                  title={title}
                  search={search}
                  key={String(groupBy)}
                  open
                  width={250}
                />
              </>
            </div>
          );
        })}
      </div>
    );
  }
};
