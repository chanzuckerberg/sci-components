import { NavigationJumpTo, NavigationJumpToProps } from "@czi-sds/components";
import React from "react";

const CellBasicNameSpaceTest = (props: NavigationJumpToProps) => {
  const sectionRef0 = React.useRef(null);
  const sectionRef1 = React.useRef(null);
  const sectionRef2 = React.useRef(null);
  const sectionRef3 = React.useRef(null);
  const sectionRef4 = React.useRef(null);

  return (
    <NavigationJumpTo
      indicatorColor="primary"
      items={[
        { elementRef: sectionRef0, title: "Section 1" },
        { elementRef: sectionRef1, title: "Section 2" },
        { elementRef: sectionRef2, title: "Section 3" },
        { elementRef: sectionRef3, title: "Section 4" },
        { elementRef: sectionRef4, title: "Section 5" },
      ]}
    />
  );
};
