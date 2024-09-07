import styled from "@emotion/styled";
import InputDropdown from "src/core/InputDropdown";

export const StyledInputDropdownLive1 = styled(InputDropdown)`
  position: relative !important;
  min-width: unset;
  &.MuiButtonBase-root {
    margin: 0 !important;

    & > span {
      font-size: 13px;
    }
  }
`;

export const StyledInputDropdownLive3 = styled(InputDropdown)`
  position: relative !important;
  min-width: 160px;
  &.MuiButtonBase-root {
    margin: 0 !important;

    & > span {
      font-size: 13px;
    }
  }
`;
