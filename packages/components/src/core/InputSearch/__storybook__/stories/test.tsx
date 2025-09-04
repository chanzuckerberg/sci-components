import { action } from "storybook/actions";
import RawInputSearch from "src/core/InputSearch";
import { Args } from "@storybook/react-webpack5";

export const TestDemo = (props: Args): JSX.Element => {
  return (
    <>
      <RawInputSearch
        id="test-round"
        sdsStyle="rounded"
        label="Round Search"
        placeholder="Search"
        data-testid="inputSearchRound"
        handleSubmit={action("onSubmit")}
        name="round-search"
        sx={{ width: "200px" }}
        {...props}
      />
      <RawInputSearch
        id="test-square"
        sdsStyle="square"
        label="Square Search"
        placeholder="Search"
        data-testid="inputSearchSquare"
        handleSubmit={action("onSubmit")}
        name="square-search"
        sx={{ width: "200px" }}
        {...props}
      />
      {/* @ts-expect-error testing fail state */}
      <RawInputSearch
        sdsStyle="square"
        placeholder="Search"
        data-testid="inputSearchFail"
        handleSubmit={action("onSubmit")}
        name="with-error"
      />
    </>
  );
};
