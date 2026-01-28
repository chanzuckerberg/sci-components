import React from "react";
import Button, { ButtonProps } from "../index";

const ButtonNameSpaceTest = (props: ButtonProps) => {
  return (
    <>
      <Button sdsType="primary" sdsStyle="solid">
        Primary Square Button
      </Button>

      <Button sdsType="secondary" sdsStyle="solid">
        Secondary Square Button
      </Button>

      <Button sdsType="destructive" sdsStyle="solid">
        Destructive Square Button
      </Button>

      <Button sdsType="primary" sdsStyle="minimal">
        Primary Minimal Button
      </Button>

      <Button sdsType="secondary" sdsStyle="minimal">
        Secondary Minimal Button
      </Button>
    </>
  );
};
