import { NavigationJumpTo, NavigationJumpToProps } from "@czi-sds/components";
import React from "react";

const NavigationJumpToNameSpaceTest = (props: NavigationJumpToProps) => {
  return (
    <NavigationJumpTo
      indicatorColor="primary"
      items={[
        { elementRef: { current: null }, title: "Item 1" },
        { elementRef: { current: null }, title: "Item 2" },
        { elementRef: { current: null }, title: "Item 3" },
        { elementRef: { current: null }, title: "Item 4" },
        { elementRef: { current: null }, title: "Item 5" },
      ]}
      onChange={(event: React.SyntheticEvent, value: number) => {}}
      offsetTop={0}
    />
  );
};
