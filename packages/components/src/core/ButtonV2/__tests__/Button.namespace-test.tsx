import React from "react";
import ButtonV2, { ButtonV2Props } from "../index";

const ButtonNameSpaceTest = (props: ButtonV2Props) => {
  return (
    <>
      <ButtonV2 sdsType="primary" sdsStyle="solid">
        Primary Square Button
      </ButtonV2>

      <ButtonV2 sdsType="secondary" sdsStyle="solid">
        Secondary Square Button
      </ButtonV2>

      <ButtonV2 sdsType="destructive" sdsStyle="solid">
        Destructive Square Button
      </ButtonV2>

      <ButtonV2 sdsType="primary" sdsStyle="minimal">
        Primary Minimal Button
      </ButtonV2>

      <ButtonV2 sdsType="secondary" sdsStyle="minimal">
        Secondary Minimal Button
      </ButtonV2>
    </>
  );
};
