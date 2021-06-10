import styled from "@emotion/styled";
import { Alert } from "@material-ui/lab";
import { defaultTheme } from "../styles/common/defaultTheme";

export const StyledAlert = styled(Alert)`
  margin: ${defaultTheme.spacing(5)}px 0;
  border-radius: ${defaultTheme.spacing(1)};
  color: ${defaultTheme.palette.text.primary};
  padding: ${defaultTheme.spacing(6)}px ${defaultTheme.spacing(6)}px
    ${defaultTheme.spacing(6)}px 9px;

  &.elevated {
    border-left: 5px solid;
    box-shadow: ${defaultTheme.shadows[1]};
    border-color: ${(props) => {
      switch (props.severity) {
        case "info":
          return defaultTheme.palette.primary.main;
        case "warning":
          return defaultTheme.palette.warning.main;
        case "error":
          return defaultTheme.palette.error.main;
        case "success":
          return defaultTheme.palette.success.main;
        default:
          return defaultTheme.palette.primary.main;
      }
    }};
  }
`;
