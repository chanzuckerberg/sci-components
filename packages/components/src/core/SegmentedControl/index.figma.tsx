import React from "react";
import SegmentedControl from "./index";
import figma from "@figma/code-connect";

figma.connect(
  SegmentedControl,
  "https://www.figma.com/design/zedDsBDlmkLrKBTuJ4FAz7/Science-Design-System--v2-?node-id=14148%3A10042",
  {
    props: {
      // REMOVED (drift fix): `disabled` mapped the Figma property "state", which
      // no longer exists at the parent level — `state` now lives only on the
      // nested Segment instances. There is no top-level property to map to it.
      //
      // SegmentedControl's content is driven by `buttonDefinition` (a data
      // array), which has no Figma equivalent, so no props are mapped here.
    },
    example: () => <SegmentedControl buttonDefinition={[]} />,
  }
);
