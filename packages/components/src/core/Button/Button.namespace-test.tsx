import { Button, ButtonProps } from "@czi-sds/components";
import React from "react";

const ButtonNameSpaceTest = (props: ButtonProps) => {
  return (
    <Button sdsType="primary" sdsStyle="rounded" {...props}>
      Button
    </Button>
  );
};
