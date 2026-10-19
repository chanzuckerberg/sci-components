import { Args } from "@storybook/react-vite";
import RawChip from "@components/src/core/Chip";

export const TestDemo = (props: Args): JSX.Element => {
  const { label } = props;

  return (
    <RawChip data-testid="chip" label={label} onDelete={() => {}} {...props} />
  );
};
