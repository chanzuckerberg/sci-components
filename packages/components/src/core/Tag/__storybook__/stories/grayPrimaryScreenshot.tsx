// Gray Primary only
// Tags with `color` of `gray` and `sdsType` of `primary` have their own story
// here because they do not currently pass the a11y tests. However, design has
// manually tested them with APCA, and they are accessible; our tests just do
// not use APCA yet. In the meantime, the a11y tests are currently disabled for
// this story, but enabled for the remaining colors in the ScreenshotTest story,
// so they can be tested properly.

import { Args } from "@storybook/react-webpack5";
import {
  TAG_GRAY_PRIMARY_COLORS,
  TAG_GRAY_PRIMARY_TYPES,
  TAG_SANS_SERIF_STYLE,
} from "../constants";
import { CommonScreenshotTestDemo } from "./commonScreenshot";

export function GrayPrimaryScreenshotTestDemo(props: Args): JSX.Element {
  return (
    <>
      <p style={TAG_SANS_SERIF_STYLE}>
        Tags with `color` of `gray` and `sdsType` of `primary` have their own
        story here because they do not currently pass the a11y tests. However,
        design has manually tested them with APCA, and they are accessible; our
        tests just do not use APCA yet. In the meantime, the a11y tests are
        currently disabled for this story, but enabled for the remaining colors
        in the ScreenshotTest story, so they can be tested properly.
      </p>
      <CommonScreenshotTestDemo
        props={props}
        colors={TAG_GRAY_PRIMARY_COLORS}
        types={TAG_GRAY_PRIMARY_TYPES}
      />
    </>
  );
}
