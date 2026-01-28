import React from "react";
import { ButtonLegacy, ButtonLegacyProps } from "@czi-sds/components";

const ButtonLegacyNameSpaceTest = (props: ButtonLegacyProps) => {
  return (
    <>
      <ButtonLegacy sdsType="primary" sdsStyle="square">
        Primary Square Button
      </ButtonLegacy>

      <ButtonLegacy sdsType="secondary" sdsStyle="square">
        Secondary Square Button
      </ButtonLegacy>

      <ButtonLegacy sdsType="destructive" sdsStyle="square">
        Destructive Square Button
      </ButtonLegacy>

      <ButtonLegacy sdsType="primary" sdsStyle="rounded">
        Primary Rounded Button
      </ButtonLegacy>

      <ButtonLegacy sdsType="secondary" sdsStyle="square">
        Secondary Rounded Button
      </ButtonLegacy>

      <ButtonLegacy sdsType="destructive" sdsStyle="square">
        Destructive Rounded Button
      </ButtonLegacy>

      <ButtonLegacy sdsType="primary" sdsStyle="minimal">
        Primary Minimal Button
      </ButtonLegacy>

      <ButtonLegacy sdsType="secondary" sdsStyle="minimal">
        Secondary Minimal Button
      </ButtonLegacy>

      <ButtonLegacy sdsType="primary" sdsStyle="icon" icon="Bacteria">
        Primary Icon Button
      </ButtonLegacy>

      <ButtonLegacy sdsType="secondary" sdsStyle="icon" icon="Bacteria">
        Secondary Icon Button
      </ButtonLegacy>

      <ButtonLegacy sdsType="tertiary" sdsStyle="icon" icon="Bacteria">
        Tertiary Icon Button
      </ButtonLegacy>
    </>
  );
};
