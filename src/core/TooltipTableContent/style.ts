import { css } from "@emotion/css";
import {
  fontBodyXs,
  fontBodyXxs,
  fontCapsXxxxs,
  fontHeaderXs,
  getColors,
  getSpacings,
  Props,
} from "../styles";

export interface ExtraProps extends Props {
  data?: Array<{
    label: string;
    dataRows: {
      label: any;
      value: any;
    }[];
    disabled?: boolean;
  }>;
  alert?: string | Element;
}

export const alertCss = (props: ExtraProps): string => {
  return css`
    ${fontBodyXxs(props)};
  `;
};

export const disabledCss = (props: ExtraProps): string => {
  const colors = getColors(props);

  return css`
    color: ${colors?.gray["300"]};
  `;
};

export const sectionCss = (props: ExtraProps): string => {
  const colors = getColors(props);
  const spacings = getSpacings(props);

  return css`
    &:not(:last-child) {
      padding-bottom: ${spacings?.l}px;
      border-bottom: 1px solid ${colors?.gray["200"]};
    }

    &:not(:first-child) {
      padding-top: ${spacings?.l}px;
    }
  `;
};

export const sectionLabelCss = (props: ExtraProps): string => {
  const colors = getColors(props);
  const spacings = getSpacings(props);

  return css`
    ${fontCapsXxxxs(props)};
    margin-bottom: ${spacings?.m}px;
    color: ${colors?.gray["500"]};

    &.disabled {
      color: ${colors?.gray["300"]};
    }
  `;
};

export const rowLabelCss = (props: ExtraProps): string => {
  return css`
    ${fontHeaderXs(props)};
    padding: 0;
  `;
};

export const rowValueCss = (props: ExtraProps): string => {
  return css`
    ${fontBodyXs(props)};
    padding-top: 0;
    padding-bottom: 0;
  `;
};
