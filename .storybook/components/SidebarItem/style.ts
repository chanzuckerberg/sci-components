import styled from "@emotion/styled";

export const StyledSidebarItem = styled("div")`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  background-color: blue !important;

  & > button {
    background-color: red !important;
  }

  & > button > div {
    margin-right: 0 !important;
  }
`;
