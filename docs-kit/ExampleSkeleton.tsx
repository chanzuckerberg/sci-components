import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { type ReactElement } from "react";
import {
  getCorners,
  getSemanticColors,
  type CommonThemeProps,
} from "@components/src/core/styles";

/**
 * What stands in for an example until the example is there, shared by the two
 * places that wait on one: a catalog card, whose component is built only once
 * the card comes near the window and the queue reaches it, and a full preview,
 * whose module is fetched the first time the page asks for it.
 *
 * The same arrangement in both, deliberately — a circle, a couple of lines and a
 * panel, in roughly the proportions a component is built from. Placeholders each
 * shaped like the component they stand in for would be a page of noise, and the
 * heading an example sits under already says what is coming.
 *
 * The group positions nothing: where it goes is the frame's business, since a
 * card overlays a box of fixed height and a preview sits in the flow of one that
 * is still finding its own.
 */

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.45; }
`;

/**
 * The shapes are drawn at the size they appear at rather than scaled with
 * anything, so these are sizes and not proportions: a circle the size of an
 * avatar or an icon, and lines the weight of small type.
 */
const DOT_SIZE = 20;
const LINE_HEIGHT = 8;
const BLOCK_HEIGHT = 40;

const Shape = styled.div<CommonThemeProps>`
  background-color: ${(props) => getSemanticColors(props)?.base?.fillSecondary};
`;

const Dot = styled(Shape)`
  flex: none;
  width: ${DOT_SIZE}px;
  height: ${DOT_SIZE}px;
  border-radius: 50%;
`;

const Line = styled(Shape)`
  flex: 1;
  height: ${LINE_HEIGHT}px;
  border-radius: ${LINE_HEIGHT / 2}px;
`;

/** A line ending short of the edge, the way a last line of text does. */
const LastLine = styled(Line)`
  width: 55%;
  flex: none;
`;

const Block = styled(Shape)`
  height: ${BLOCK_HEIGHT}px;
  border-radius: ${(props) => getCorners(props)?.m}px;
`;

const Heading = styled.div`
  display: flex;
  align-items: center;
  gap: ${LINE_HEIGHT}px;
`;

/** One animation, on the group, so the shapes breathe together. */
const Shapes = styled.div<{ maxWidth: number }>`
  display: flex;
  flex-direction: column;
  gap: ${LINE_HEIGHT}px;
  width: min(70%, ${(props) => props.maxWidth}px);
  animation: ${pulse} 1.6s ease-in-out infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export interface ExampleSkeletonProps {
  /** The widest the group draws; in a narrower box it takes 70% of it. */
  maxWidth?: number;
}

export function ExampleSkeleton({
  maxWidth = 200,
}: ExampleSkeletonProps): ReactElement {
  return (
    <Shapes maxWidth={maxWidth}>
      <Heading>
        <Dot />
        <Line />
      </Heading>
      <Block />
      <LastLine />
    </Shapes>
  );
}

export default ExampleSkeleton;
