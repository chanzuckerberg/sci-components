import { Paper, Popper } from "@mui/material";
import { styled } from "@mui/material/styles";
import { ReactElement } from "react";
import Autocomplete from "../Autocomplete";
import {
  CommonThemeProps,
  fontHeaderXs,
  getBorders,
  getCorners,
  getShadows,
  getSpaces,
  getTypography,
} from "../styles";

export interface StyleProps extends CommonThemeProps {
  count?: number;
  icon?: ReactElement;
  search?: boolean;
  title?: string;
  isMultiColumn?: boolean;
}

const doNotForwardProps = [
  "anchorEl",
  "count",
  "keepSearchOnSelect",
  "search",
  "InputBaseProps",
  "title",
  "PopperBaseProps",
  "onClickAway",
  "ClickAwayListenerProps",
  "forceOpen",
  "isMultiColumn",
];

const forwardProps = [
  "anchorEl",
  "count",
  "keepSearchOnSelect",
  "search",
  "InputBaseProps",
  "title",
  "PopperBaseProps",
  "onClickAway",
  "ClickAwayListenerProps",
  "forceOpen",
];

export const StyledAutocomplete = styled(Autocomplete, {
  shouldForwardProp: (prop: string) =>
    !doNotForwardProps.includes(prop) || forwardProps.includes(prop),
})`
  ${(props: StyleProps) => {
    const { title, search } = props;
    const spacings = getSpaces(props);
    return `
      opacity: 1;
    `;
    return `
        & + .MuiAutocomplete-popper,
        & + .MuiPopper-root {
          position: relative !important;
          transform: none !important;
          box-shadow: none;
          padding: 0;
          border: none;

          .MuiAutocomplete-paper,
          .MuiPaper-root {
            box-shadow: none !important;
            border: none !important;
            padding: 0;
            box-shadow: none;
            margin: 0;
            border-radius: 0;
            padding-top: 0;
            padding-bottom: 0;
            ${title ? `padding-left: ${spacings?.s}px !important;` : ``}
            
            .MuiAutocomplete-listbox {
              li:first-of-type {
                .MuiAutocomplete-groupLabel {
                  padding-top: ${
                    title || search
                      ? `${spacings?.xxxs}px`
                      : `${spacings?.xxs}px`
                  };
                }
              }
              padding: ${
                title || search ? `0 ${spacings?.s}px ${spacings?.s}px` : `0`
              };
            }
  
            .MuiAutocomplete-groupLabel {
              padding-top: 0;
            }
          }
        }
    `;
  }}
` as typeof Autocomplete;

export const StyledHeaderTitle = styled("div", {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})<{ search: boolean }>`
  ${fontHeaderXs}

  ${(props) => {
    const { search } = props;

    const typography = getTypography(props);
    const spacings = getSpaces(props);

    return `
      font-family: ${typography?.fontFamily};
      color: black;
      padding-top: ${spacings?.xxs}px;
      padding-right: ${spacings?.s}px;
      padding-left: ${spacings?.s}px;
      ${search ? `padding-bottom: 0px;` : `padding-bottom: ${spacings?.xs}px;`}
    `;
  }}
`;

const StyledDropdownMenuAutocompleteWrapperColumnStyles = (
  props: StyleProps
) => {
  const { search, title } = props;
  const spacings = getSpaces(props);

  return `
    .SdsAutocompleteMultiColumn-column-root{
      padding-right: ${
        search || title ? `${spacings?.xxs}px` : `${spacings?.m}px`
      };

      &:not(:last-child) {
        margin-right: ${
          search || title ? `2px` : `${spacings?.m}px`
        } !important;
        padding-right: ${search || title ? `0` : `${spacings?.m}px`} !important;
      }

      .MuiAutocomplete-popper,
      .MuiPopper-root {
        .MuiAutocomplete-paper,
        .MuiPaper-root {
          .MuiAutocomplete-listbox {
            padding: ${
              title || search
                ? `0 ${spacings?.m}px ${spacings?.s}px ${spacings?.s}px`
                : `0`
            } !important;
          }

          .MuiAutocomplete-groupLabel {
            padding: ${
              title || search ? `0` : `${spacings?.xxs}px ${spacings?.s}px`
            } !important;
          }

          .MuiAutocomplete-groupUl {
            margin: ${
              title || search
                ? `0 0 ${spacings?.m}px`
                : `0 ${spacings?.s}px ${spacings?.m}px`
            } !important;
          }
        }
      }
    }
  `;
};

export const StyledDropdownMenuAutocompleteWrapper = styled("div", {
  shouldForwardProp: (prop: string) =>
    !doNotForwardProps.includes(prop) || prop === "anchorEl",
})`
  ${(props: StyleProps) => {
    const { search, title, isMultiColumn } = props;
    const spacings = getSpaces(props);

    return `
      .SdsAutocompleteMultiColumn-column-title,
      .SdsAutocompleteMultiColumn-column-relation-icon {
        padding-top: ${search || title ? spacings?.xxxs : 0}px;
      }

      .MuiAutocomplete-popper,
      .MuiPopper-root {
        position: relative !important;
        transform: none !important;
        box-shadow: none;
        padding: 0;
        border: none;
        width: 100% !important;

        .MuiAutocomplete-paper,
        .MuiPaper-root {
          box-shadow: none !important;
          border: none !important;
          border-radius: 0;
          margin: 0;
          padding: ${
            (title || search) && !isMultiColumn ? `0 ${spacings?.s}px` : `0`
          } !important;

          .MuiAutocomplete-listbox {
            ${
              title || search
                ? `padding: : 0 ${spacings?.s}px !important;`
                : null
            }
            li:first-of-type {
              .MuiAutocomplete-groupLabel {
                padding-top: ${
                  title || search ? `${spacings?.xxxs}px` : `${spacings?.xxs}px`
                };
              }
            }
          }

          .MuiAutocomplete-groupLabel {
            padding: ${
              title || search ? `0` : `${spacings?.xxs}px ${spacings?.s}px`
            } !important;
          }
  
          .MuiAutocomplete-groupUl {
            margin: ${
              title || search
                ? `0 0 ${spacings?.m}px`
                : `0 ${spacings?.s}px ${spacings?.m}px`
            } !important;
          }
        }
      }

      ${StyledDropdownMenuAutocompleteWrapperColumnStyles(props)}
    `;
  }}
`;

export const StyledPopper = styled(Popper, {
  shouldForwardProp: (prop: string) =>
    !doNotForwardProps.includes(prop) || prop === "anchorEl",
})`
  ${(props) => {
    const borders = getBorders(props);
    const corners = getCorners(props);
    const shadows = getShadows(props);
    const spacings = getSpaces(props);

    return `
      // background-color: yellow !important;
      background-color: white;
      border: ${borders?.gray[100]};
      border-radius: ${corners?.m}px;
      box-shadow: ${shadows?.m};
      // padding: ${spacings?.xs}px;
      box-sizing: border-box;
      z-index: 1400;
      
      .MuiFormControl-root.MuiTextField-root {
        padding: ${spacings?.s}px;
        margin-right: ${spacings?.xs}px;
      }
    `;
  }}
`;

export const StyledPaper = styled(Paper, {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})`
  ${(props: StyleProps) => {
    const { title } = props;
    const spacings = getSpaces(props);
    return `
      box-shadow: none;
      margin: 0;
      border-radius: 0;
      padding-top: 0;
      padding-bottom: 0;
      ${title ? `padding-left: ${spacings?.s}px !important;` : ``}
    `;
  }}
`;
