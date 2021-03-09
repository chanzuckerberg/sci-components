import { Card as RawCard, CardProps } from "@material-ui/core";
import { StylesProvider } from "@material-ui/core/styles";
import React from "react";

export const Card = (props: CardProps) => {
  return (
    <StylesProvider injectFirst>
      <RawCard {...props} />
    </StylesProvider>
  );
};

export default Card;
