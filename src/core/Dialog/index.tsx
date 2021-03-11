import styled from "@emotion/styled";
import {
  Dialog as RawDialog,
  DialogContent,
  DialogProps as RawDialogProps,
  DialogTitle,
} from "@material-ui/core";
import { StylesProvider } from "@material-ui/core/styles";
import React from "react";

export interface DialogProps extends RawDialogProps {
  width?: WIDTHS;
  height?: HEIGHTS;
}

export enum WIDTHS {
  NARROW = "Narrow",
  DEFAULT = "Default",
  WIDE = "Wide",
  WIDEST = "Widest",
}

export enum HEIGHTS {
  NONE = "None",
  DEFAULT = "Default",
  TALL = "Tall",
}

const Dialog_CONTENT_CLASSNAME = "Dialog-content";

// Values here are to be generalized from either appTheme.ts or defaultTheme.ts
const StyledDialog = styled(RawDialog)<DialogProps>`
  & > .${Dialog_CONTENT_CLASSNAME} {
    width: ${({ width }) => {
      switch (width) {
        case WIDTHS.NARROW:
          return "400px";
        case WIDTHS.DEFAULT:
          return "600px";
        case WIDTHS.WIDE:
          return "900px";
        case WIDTHS.WIDEST:
          return "1080px";
      }
    }};
    height: ${({ height }) => {
      switch (height) {
        case HEIGHTS.DEFAULT:
          return "70vh";
        case HEIGHTS.TALL:
          return "85vh";
      }
    }};
    min-height: ${({ height }) => (height === HEIGHTS.NONE ? "0px" : "400px")};
    background-color: white;
    padding: 38px;
  }
`;

const Dialog = ({
  width = WIDTHS.DEFAULT,
  height = HEIGHTS.DEFAULT,
  ...props
}: DialogProps): JSX.Element => {
  return (
    <StylesProvider injectFirst>
      {/*  eslint-disable-next-line react/jsx-props-no-spreading -- disable prop spread for extension */}
      <StyledDialog width={width} height={height} {...props}>
        <DialogTitle>This is a title</DialogTitle>
        <DialogContent>
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
        </DialogContent>

        {/* <div className={Dialog_CONTENT_CLASSNAME}>{props.children}</div> */}
      </StyledDialog>
    </StylesProvider>
  );
};

export default Dialog;
