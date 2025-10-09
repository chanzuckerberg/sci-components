import { Args } from "@storybook/react-webpack5";
import RawInputSearch from "src/core/InputSearch";

export const InputSearch = (props: Args): JSX.Element => {
  const { id, placeholder, label, disabled, sdsStyle, intent } = props;
  const handleSubmit = (value: string) => {
    // eslint-disable-next-line no-console
    console.log(value);
  };
  return (
    <RawInputSearch
      id={id}
      placeholder={placeholder}
      label={label}
      disabled={disabled}
      sdsStyle={sdsStyle}
      intent={intent}
      handleSubmit={handleSubmit}
      name="input-search-name"
      sx={{ width: "200px" }}
    />
  );
};
