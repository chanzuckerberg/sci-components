import React from "react";
import { Button, ButtonProps } from "@czi-sds/components";

const ButtonNameSpaceTest = (props: ButtonProps) => {
  return (
    <Button sdsType="primary" sdsStyle="icon" {...props}>
      Button
    </Button>
  );
};
