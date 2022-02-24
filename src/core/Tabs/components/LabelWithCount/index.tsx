import React, { forwardRef, useContext } from "react";
import { TabsContext } from "../common";
import { Count, Label, Wrapper } from "./style";

interface Props {
  label: React.ReactNode;
  count: number;
}

export default forwardRef<HTMLSpanElement, Props>(function LabelWithCount(
  props,
  ref
): JSX.Element {
  const { sdsSize = "large" } = useContext(TabsContext);
  const { label, count } = props;

  return (
    <Wrapper ref={ref}>
      <Label sdsSize={sdsSize}>{label}</Label>
      <Count sdsSize={sdsSize}>{count}</Count>
    </Wrapper>
  );
});
