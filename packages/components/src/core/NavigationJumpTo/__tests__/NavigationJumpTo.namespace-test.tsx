import { NavigationJumpTo, NavigationJumpToProps } from "@czi-sds/components";

const NavigationJumpToNameSpaceTest = (props: NavigationJumpToProps) => {
  return (
    <NavigationJumpTo
      items={[
        { elementRef: { current: null }, title: "Item 1" },
        { elementRef: { current: null }, title: "Item 2" },
        { elementRef: { current: null }, title: "Item 3" },
        { elementRef: { current: null }, title: "Item 4" },
        { elementRef: { current: null }, title: "Item 5" },
      ]}
      onChange={(value: number) => {}}
      offsetTop={0}
    />
  );
};
