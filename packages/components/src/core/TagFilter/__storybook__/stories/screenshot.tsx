import { Args } from "@storybook/react-webpack5";
import { Fragment } from "react";
import RawTagFilter from "src/core/TagFilter";
import { TAG_FILTER_LABEL_STYLE, TAG_FILTER_PSEUDO_STATES } from "../constants";

export const ScreenshotTestDemo = (props: Args): JSX.Element => {
  const { label } = props;

  // loop through all TAG_FILTER_PSEUDO_STATES + create headers for TAG_FILTER_PSEUDO_STATES
  return (
    <>
      {TAG_FILTER_PSEUDO_STATES.map((state) => {
        return (
          <Fragment key={state}>
            <p style={TAG_FILTER_LABEL_STYLE}>
              State: <b>{state}</b>
            </p>
            <RawTagFilter
              data-testid="button"
              label={label}
              onDelete={() => {}}
              className={`pseudo-${state}`}
              key={state}
              {...props}
            />
          </Fragment>
        );
      })}
    </>
  );
};
