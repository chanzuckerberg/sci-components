import { Button, ButtonProps } from "@czifui/sci-components";
import React from "react";

const ButtonNameSpaceTest = (props: ButtonProps) => {
  return (
    <Button sdsType="primary" sdsStyle="rounded" {...props}>
      Button
    </Button>
  );
};
