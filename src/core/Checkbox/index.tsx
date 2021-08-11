import styled from "@emotion/styled";
import { Checkbox as RawCheckbox, CheckboxProps } from "@material-ui/core";
import React from "react";
import { ReactComponent as IconCheckboxChecked } from "../../common/svgs/IconCheckboxChecked.svg";
import { ReactComponent as IconCheckboxIndeterminate } from "../../common/svgs/IconCheckboxIndeterminate.svg";
import { ReactComponent as IconCheckboxUnchecked } from "../../common/svgs/IconCheckboxUnchecked.svg";
import { getColors } from "../styles";

export { CheckboxProps };

const StyledCheckbox = styled(RawCheckbox)`
  ${(props) => {
    const colors = getColors(props);
    return `
      color: ${colors?.gray[300]};
      &:hover {
        color: ${colors?.gray[400]};
        background-color: transparent;
      }
      &.Mui-checked {
        background-color: transparent;
      }
    `;
  }}
`;

const Checkbox = (props: CheckboxProps): JSX.Element => (
  <StyledCheckbox
    {...props}
    checkedIcon={<IconCheckboxChecked />}
    icon={<IconCheckboxUnchecked />}
    indeterminateIcon={<IconCheckboxIndeterminate />}
  />
);

export default Checkbox;
