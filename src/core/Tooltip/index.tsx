import {
  makeStyles,
  Tooltip as RawTooltip,
  TooltipProps,
} from "@material-ui/core";
import React from "react";
import { AppThemeOptions } from "../styles";

export { TooltipProps };

const useStyles = makeStyles((theme: AppThemeOptions) => {
  return {
    arrow: {
      "&::before": {
        border: `1px solid ${theme?.app?.colors.gray["300"]}`,
      },
      color: "white",
    },
    tooltip: {
      backgroundColor: "white",
      border: `1px solid ${theme?.app?.colors.gray["300"]}`,
      boxShadow: theme?.app?.shadows["m"],
      color: "black",
      padding: theme?.app?.spacing.l,
      fontSize: "13px",
      lineHeight: "20px",
      letterSpacing: "0.3px",
      fontWeight: theme?.app?.fontWeights.regular,
    },
  };
});

const TooltipInfo = (props: TooltipProps): JSX.Element => {
  const classes = useStyles();

  return <RawTooltip arrow classes={classes} {...props} />;
};

export default TooltipInfo;
