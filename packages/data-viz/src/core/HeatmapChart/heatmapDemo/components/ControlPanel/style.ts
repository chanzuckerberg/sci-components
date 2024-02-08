import { styled } from "@mui/material";

export const StyledControlPanelWrapper = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

export const StyledForm = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;

  button {
    margin-bottom: 15px;
    width: 100%;
  }

  h5 {
    margin-bottom: 15px;
    font-weight: 500;
  }
`;

export const StyledLabel = styled("span")`
  font-family: Open Sans;
  font-size: 12px;
  margin-bottom: 2px;
  line-height: 18px;
  font-weight: 600;
  letter-spacing: 0.3px;
  font-variant: small-caps;
  color: #888;
`;

export const FormControl = styled("div")`
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  width: 100%;
`;
