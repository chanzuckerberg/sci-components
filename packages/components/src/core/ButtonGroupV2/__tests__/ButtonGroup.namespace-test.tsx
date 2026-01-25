import React from "react";
import { Button } from "@mui/material";
// Note: This will need to be updated when ButtonGroupV2 is exported from @czi-sds/components
import ButtonGroupV2, { ButtonGroupV2Props } from "../index";

const ButtonGroupNameSpaceTest = (props: ButtonGroupV2Props) => {
  return (
    <>
      <ButtonGroupV2 sdsType="primary" size="large">
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </ButtonGroupV2>

      <ButtonGroupV2 sdsType="secondary" size="medium">
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </ButtonGroupV2>

      <ButtonGroupV2 sdsType="primary" size="small">
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </ButtonGroupV2>

      <ButtonGroupV2 sdsType="primary" orientation="vertical">
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </ButtonGroupV2>

      <ButtonGroupV2 sdsType="secondary" disabled>
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </ButtonGroupV2>
    </>
  );
};

export default ButtonGroupNameSpaceTest;
