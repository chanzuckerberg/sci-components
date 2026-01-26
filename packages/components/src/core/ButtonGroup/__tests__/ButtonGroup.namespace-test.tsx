import React from "react";
// Note: This will need to be updated when ButtonGroup is exported from @czi-sds/components
import ButtonGroup, { ButtonGroupProps } from "../index";
import ButtonV2 from "src/core/ButtonV2";

const ButtonGroupNameSpaceTest = (props: ButtonGroupProps) => {
  return (
    <>
      <ButtonGroup sdsType="primary" size="large">
        <ButtonV2>One</ButtonV2>
        <ButtonV2>Two</ButtonV2>
        <ButtonV2>Three</ButtonV2>
      </ButtonGroup>

      <ButtonGroup sdsType="secondary" size="medium">
        <ButtonV2>One</ButtonV2>
        <ButtonV2>Two</ButtonV2>
        <ButtonV2>Three</ButtonV2>
      </ButtonGroup>

      <ButtonGroup sdsType="primary" size="small">
        <ButtonV2>One</ButtonV2>
        <ButtonV2>Two</ButtonV2>
        <ButtonV2>Three</ButtonV2>
      </ButtonGroup>

      <ButtonGroup sdsType="primary" orientation="vertical">
        <ButtonV2>One</ButtonV2>
        <ButtonV2>Two</ButtonV2>
        <ButtonV2>Three</ButtonV2>
      </ButtonGroup>

      <ButtonGroup sdsType="secondary" disabled>
        <ButtonV2>One</ButtonV2>
        <ButtonV2>Two</ButtonV2>
        <ButtonV2>Three</ButtonV2>
      </ButtonGroup>
    </>
  );
};

export default ButtonGroupNameSpaceTest;
