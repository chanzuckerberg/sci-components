import { Button, SDSTheme } from "@czi-sds/components";
import { ThemeContext } from "@emotion/react";
import styled from "@emotion/styled";
import { useContext } from "react";

export const StyledHeader = styled("div")`
  ${() => {
    const theme = useContext(ThemeContext) as SDSTheme;

    return `
      background-color: ${theme?.palette?.sds?.base?.surfaceBackground};
    `;
  }}
  grid-area: 1 / 1 / 2 / 6;
  border-bottom: solid 1px #c3c3c347;
  width: 100%;
  padding: 0 15px;
  height: 70px;
  position: fixed;
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: space-between;

  h3 {
    margin: 0;
    line-height: 32px;
  }
`;

export const HeaderLeft = styled("div")`
  display: flex;
`;

export const HeaderRight = styled("div")`
  display: block;
`;

export const StyledButton = styled(Button)`
  margin: 0 10px;
`;
