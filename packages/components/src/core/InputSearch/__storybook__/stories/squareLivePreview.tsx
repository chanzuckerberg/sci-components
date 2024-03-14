import { action } from "@storybook/addon-actions";
import { Args } from "@storybook/react";
import RawInputSearch from "src/core/InputSearch";

export const SquareLivePreviewDemo = (props: Args): JSX.Element => {
  return (
    <RawInputSearch
      {...props}
      id="squareSearchPreview"
      label="Search"
      sdsStyle="square"
      placeholder="Search"
      handleSubmit={action("onSubmit")}
      name="square-input-search"
    />
  );
};
