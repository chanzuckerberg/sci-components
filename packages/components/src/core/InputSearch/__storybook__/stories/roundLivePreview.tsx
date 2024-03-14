import { action } from "@storybook/addon-actions";
import { Args } from "@storybook/react";
import RawInputSearch from "src/core/InputSearch";

export const RoundLivePreviewDemo = (props: Args): JSX.Element => {
  return (
    <RawInputSearch
      {...props}
      id="squareSearchPreview"
      label="Search"
      sdsStyle="rounded"
      placeholder="Search"
      handleSubmit={action("onSubmit")}
      name="round-input-search"
    />
  );
};
