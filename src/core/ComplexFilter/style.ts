import { Paper } from "@mui/material";
import { autocompleteClasses } from "@mui/material/Autocomplete";
import Popper from "@mui/material/Popper";
import { styled } from "@mui/material/styles";
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
  & {
    ${fontHeaderXs}

    .${autocompleteClasses.popperDisablePortal} {
      /* (thuang): !important is needed to fight inline style */
      position: relative !important;
      transform: none !important;
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
        z-index: 1400; // allows the dropdown to be used in modals
    `;
    }}
  }
`;

export const StyledPaper = styled(Paper)`
  & {
    box-shadow: none;
    margin: 0;

    .${autocompleteClasses.listbox} {
      background-color: white;
      padding: 0;
    }

    .${autocompleteClasses.option} {
      padding: 0;
      min-height: 30px;

      ${(props) => {
        const spaces = getSpaces(props);

        return `
          margin: 0 ${spaces?.s}px;
          padding: ${spaces?.s}px ${spaces?.m}px;
        `;
      }}
    }
  }
`;
