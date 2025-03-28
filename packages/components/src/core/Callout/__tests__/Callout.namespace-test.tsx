import { Callout, CalloutProps, CalloutTitle } from "@czi-sds/components";
import React from "react";

const CalloutNameSpaceTest = (props: CalloutProps) => {
  return (
    <Callout
      {...props}
      autoDismiss
      intent="info"
      dismissed
      title="Title"
      body="This is a callout!"
    />
  );
};
