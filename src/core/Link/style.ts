import styled from "@emotion/styled";
import { Link } from "@material-ui/core";
import { getColors } from "../styles";

export const StyledLink = styled(Link)`
  ${(props) => {
    const colors = getColors(props);

    return `
      .MuiLink-root {
        color: pink;
        text-decoration: none;

        &:hover {
          color: ${colors?.primary["600"]}
          text-decoration: none;
          cursor: pointer;
        }
      }
    `;
  }}
`;
