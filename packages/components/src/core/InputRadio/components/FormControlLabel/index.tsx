import { FormControlLabelProps as RawFormControlLabelProps } from "@mui/material";
import { forwardRef } from "react";
import {
  StyledFormControlCaption,
  StyledFormControlLabel,
  StyledFormControlLabelWrapper,
} from "./style";

export type FormControlLabelProps = RawFormControlLabelProps & {
  caption?: string;
};

/**
 * @see https://mui.com/material-ui/api/form-control-label/
 */
const FormControlLabel = forwardRef<HTMLLabelElement, FormControlLabelProps>(
  function FormControlLabel(props, ref) {
    const { caption, disabled } = props;

    return (
      <StyledFormControlLabelWrapper disabled={disabled}>
        <StyledFormControlLabel ref={ref} {...props} />
        <StyledFormControlCaption disabled={disabled}>
          {caption}
        </StyledFormControlCaption>
      </StyledFormControlLabelWrapper>
    );
  }
);

export default FormControlLabel;
