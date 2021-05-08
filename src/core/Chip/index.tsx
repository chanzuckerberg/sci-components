import React from "react";
import { ExtraProps, StyledChip } from "./style";

type ChipProps = ExtraProps;

export { ChipProps };

const Chip = (props: ChipProps): JSX.Element => {
  return <StyledChip {...props} />;
};

export default Chip;
