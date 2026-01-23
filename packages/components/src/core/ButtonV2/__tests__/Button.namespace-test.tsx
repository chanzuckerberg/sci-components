import React from "react";
import { Button, ButtonProps } from "@czi-sds/components";

const ButtonNameSpaceTest = (props: ButtonProps) => {
  return (
    <>
      <Button sdsType="primary" sdsStyle="square">
        Primary Square Button
      </Button>

      <Button sdsType="secondary" sdsStyle="square">
        Secondary Square Button
      </Button>

      <Button sdsType="destructive" sdsStyle="square">
        Destructive Square Button
      </Button>

      <Button sdsType="primary" sdsStyle="rounded">
        Primary Rounded Button
      </Button>

      <Button sdsType="secondary" sdsStyle="square">
        Secondary Rounded Button
      </Button>

      <Button sdsType="destructive" sdsStyle="square">
        Destructive Rounded Button
      </Button>

      <Button sdsType="primary" sdsStyle="minimal">
        Primary Minimal Button
      </Button>

      <Button sdsType="secondary" sdsStyle="minimal">
        Secondary Minimal Button
      </Button>

      <Button sdsType="primary" sdsStyle="icon" icon="Bacteria">
        Primary Icon Button
      </Button>

      <Button sdsType="secondary" sdsStyle="icon" icon="Bacteria">
        Secondary Icon Button
      </Button>

      <Button sdsType="tertiary" sdsStyle="icon" icon="Bacteria">
        Tertiary Icon Button
      </Button>
    </>
  );
};
