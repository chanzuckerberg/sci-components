// Success + Warning only
// Tags with `color` of `success` or `warning` have their own story here because
// they do not currently pass the a11y tests. Design is aware of this and will be
// updating their colors. In the meantime, the a11y tests are currently disabled
// for this story, but enabled for the remaining colors in the ScreenshotTest story,
// so they can be tested properly.

import { Args } from "@storybook/react-webpack5";
import {
  TAG_SANS_SERIF_STYLE,
  TAG_SDS_TYPES,
  TAG_SUCCESS_WARNING_PRIMARY_COLORS,
} from "../constants";
import { CommonScreenshotTestDemo } from "./commonScreenshot";

export function SuccessWarningScreenshotTestDemo(props: Args): JSX.Element {
  return (
    <>
      <p style={TAG_SANS_SERIF_STYLE}>
        Tags with `color` of `success` or `warning`have their own story here
        because they do not currently pass the a11y tests. Design is aware of
        this and will be updating their colors. In the meantime the a11y tests
        are currently disabled for this story, but enabled for the remaining
        colors in the ScreenshotTest story, so they can be tested properly.
      </p>
      <CommonScreenshotTestDemo
        props={props}
        colors={TAG_SUCCESS_WARNING_PRIMARY_COLORS}
        types={TAG_SDS_TYPES}
      />
    </>
  );
}
