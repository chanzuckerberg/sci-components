import { EXTRA_SHORT_LOREM_IPSUM } from "src/common/storybook/loremIpsum";
import { Args } from "@storybook/react";
import RawLink from "src/core/Link";
import { StyledWrapper } from "../style";

export const LivePreviewDemo = (props: Args): JSX.Element => {
  return (
    <StyledWrapper>
      <div>
        <p>{EXTRA_SHORT_LOREM_IPSUM}</p>
        <RawLink href="/" sdsStyle="default" {...props}>
          Learn More
        </RawLink>
      </div>
      <div>
        <p style={{ backgroundColor: "#EFF2FC", padding: "10px" }}>
          Lorem ipsum{" "}
          <RawLink href="/" sdsStyle="dashed" sdsSize="s" {...props}>
            dolor sit apsidy
          </RawLink>{" "}
          consectetur, adipisicing elit.
        </p>
      </div>
      <div>
        <p style={{ backgroundColor: "#EFF2FC", padding: "10px" }}>
          Lorem ipsum{" "}
          <RawLink href="/" sdsStyle="dashed" component="button" {...props}>
            button element
          </RawLink>{" "}
          consectetur, adipisicing elit.
        </p>
      </div>
    </StyledWrapper>
  );
};
