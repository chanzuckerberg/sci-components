import React from "react";
// Note: This will need to be updated when ButtonGroup is exported from @czi-sds/components
import ButtonGroup, { ButtonGroupProps } from "../index";
import Button from "src/core/Button";

const ButtonGroupNameSpaceTest = (props: ButtonGroupProps) => {
  return (
    <>
      <ButtonGroup sdsType="primary" size="large">
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </ButtonGroup>

      <ButtonGroup sdsType="secondary" size="medium">
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </ButtonGroup>

      <ButtonGroup sdsType="primary" size="small">
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </ButtonGroup>

      <ButtonGroup sdsType="primary" orientation="vertical">
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </ButtonGroup>

      <ButtonGroup sdsType="secondary" disabled>
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </ButtonGroup>
    </>
  );
};

export default ButtonGroupNameSpaceTest;
