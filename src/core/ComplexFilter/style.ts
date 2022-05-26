import styled from "@emotion/styled";
import Popper from "@material-ui/core/Popper";
import {
  fontHeaderXs,
  getColors,
  getCorners,
  getShadows,
  getSpaces,
} from "../styles";

export const Wrapper = styled.div`
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
      padding: ${spacings?.s}px;
      min-width: 244px;
      margin-top: ${spacings?.s}px;
      z-index: 1400; // allows the dropdown to be used in modals
    `;
  }}
`;

export const StyledChipsWrapper = styled("div")`
  ${(props) => {
    const spacings = getSpaces(props);

    return `
      margin-top: ${spacings?.s}px;
    `;
  }}
`;
