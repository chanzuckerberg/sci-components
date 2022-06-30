import Popper from "@mui/material/Popper";
import { styled } from "@mui/material/styles";
import Button from "../Button";
import {
  fontHeaderXs,
  getColors,
  getCorners,
  getShadows,
  getSpaces,
} from "../styles";

export const Wrapper = styled("div")`
  width: 150px;
`;

export const StyledPopper = styled(Popper)`
  ${fontHeaderXs}

  .MuiAutocomplete-popperDisablePortal {
    position: relative;
    width: 100% !important;
  }

  ${(props) => {
    const colors = getColors(props);
    const corners = getCorners(props);
    const shadows = getShadows(props);
    const spacings = getSpaces(props);

    return `
      background-color: white;
      border: 1px solid ${colors?.gray[100]};
      border-radius: ${corners?.m}px;
      box-shadow: ${shadows?.m};
      color: ${colors?.gray[500]};
      padding: ${spacings?.xs}px;
      min-width: 244px;
      z-index: 1400; // allows the dropdown to be used in modals
    `;
  }}
`;

export const StyledButton = styled(Button)`
  ${(props) => {
    const spacings = getSpaces(props);

    return `
      margin-top: ${spacings?.l}px;
      margin-bottom: ${spacings?.s}px;

      &:first-of-type {
        margin-left: ${spacings?.s}px;
        margin-right: ${spacings?.m}px;
      }

      &:last-child {
        margin-left: 0;
        margin-right: ${spacings?.s}px;
      }
    `;
  }}
`;
