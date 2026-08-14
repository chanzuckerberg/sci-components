import React from "react";
import LoadingIndicator from "./index";
import figma from "@figma/code-connect";

figma.connect(
  LoadingIndicator,
  "https://www.figma.com/design/zedDsBDlmkLrKBTuJ4FAz7/Science-Design-System--v2-?node-id=387%3A14",
  {
    props: {
      // sdsStyle ("minimal" | "tag") — matches the code enum exactly. This is
      // the component's only prop.
      sdsStyle: figma.enum("sdsStyle", {
        minimal: "minimal",
        tag: "tag",
      }),
      // Intentionally unmapped:
      // - "Loading" text layer + Icon: both are hardcoded in the component
      //   (<StyledText>Loading</StyledText>, <Icon sdsIcon="Loading" .../>),
      //   not props. The only text-ish prop is aria-label, which isn't authored
      //   in the design.
    },
    example: ({ sdsStyle }) => <LoadingIndicator sdsStyle={sdsStyle} />,
  }
);
