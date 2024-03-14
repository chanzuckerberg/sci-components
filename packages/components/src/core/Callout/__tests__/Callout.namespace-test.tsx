import { Callout, CalloutProps, CalloutTitle } from "@czi-sds/components";
import React from "react";

const CalloutNameSpaceTest = (props: CalloutProps) => {
  return (
    <Callout {...props} autoDismiss intent="info" dismissed>
      <CalloutTitle>Title</CalloutTitle>
      This is a callout!
    </Callout>
  );
};
