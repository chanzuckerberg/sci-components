import { Link as RawLink, LinkProps, makeStyles } from "@material-ui/core";
import React from "react";
import { AppThemeOptions } from "../styles";

export { LinkProps };

const useStyles = makeStyles((theme: AppThemeOptions) => {
  return { root: { "&:hover": { color: theme?.app?.colors.primary[600] } } };
});

const Link = (props: LinkProps): JSX.Element => {
  const classes = useStyles();

  return <RawLink classes={classes} underline="none" {...props} />;
};

export default Link;
