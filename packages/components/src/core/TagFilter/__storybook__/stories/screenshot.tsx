import { Args } from "@storybook/react-vite";
import { Fragment } from "react";
import RawTagFilter from "@components/src/core/TagFilter";
import {
  TAG_FILTER_GRID_STYLE,
  TAG_FILTER_PSEUDO_STATES,
  TAG_FILTER_SDS_STYLES,
} from "../constants";

export const ScreenshotTestDemo = (props: Args): JSX.Element => {
  const { label } = props;

  return (
    <div style={TAG_FILTER_GRID_STYLE}>
      <span />
      {TAG_FILTER_PSEUDO_STATES.map((state) => (
        <b key={state}>{state}</b>
      ))}
      {TAG_FILTER_SDS_STYLES.map((sdsStyle) => (
        <Fragment key={sdsStyle}>
          <b>{sdsStyle}</b>
          {TAG_FILTER_PSEUDO_STATES.map((state) => (
            <div key={state}>
              <RawTagFilter
                className={`pseudo-${state}`}
                data-testid="tag-filter"
                label={label}
                onDelete={() => {}}
                sdsStyle={sdsStyle as "solid" | "outline"}
              />
            </div>
          ))}
        </Fragment>
      ))}
    </div>
  );
};
