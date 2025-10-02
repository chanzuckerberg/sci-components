import { Args } from "@storybook/types";
import { TAG_COLORS, TAG_SANS_SERIF_STYLE, TAG_SDS_TYPES } from "../constants";
import { CommonScreenshotTestDemo } from "./commonScreenshot";

export function ScreenshotTestDemo(props: Args): JSX.Element {
  return (
    <>
      <p style={TAG_SANS_SERIF_STYLE}>
        This story currently excludes Tags with both `sdsType` of `primary` and
        `color` of `gray`, and those with `color` of `success` and `primary`,
        because they do not pass the a11y tests. They have their own stories
        wherein the a11y tests are disabled until the a11y tests are updated to
        accommodate APCA (for gray x primary) or until the Tag colors are
        updated by design (for success and primary).
      </p>
      <CommonScreenshotTestDemo
        props={props}
        colors={TAG_COLORS}
        types={TAG_SDS_TYPES}
      />
    </>
  );
}
