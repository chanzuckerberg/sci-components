import styled from "@emotion/styled";
import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";
import Card from ".";

export const actions = {
  onClick: action("onClick"),
};

const StyledCard = styled(Card)`
  padding: 32px;
  background-color: blue;
  font-size: 24px;
  border-radius: 10px;
  color: black;
  font-weight: bold;
  &:hover {
    color: white;
  }
`;

storiesOf("Card", module).add("default", () => (
  <StyledCard variant="outlined" {...actions}>
    {"text"}
  </StyledCard>
));
