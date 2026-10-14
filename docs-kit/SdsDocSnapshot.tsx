import styled from "@emotion/styled";
import type { ReactElement, ReactNode } from "react";
import { create } from "storybook/theming";
import { DOC_WIDTH } from "./SdsDoc";

/**
 * Storybook's docs container, as much of it as a page is dressed in: the
 * surface, the width its prose wraps at, and the size that prose is set in.
 *
 * A documentation page and the story generated from it (see
 * `docs-kit/scripts/generate-doc-snapshots.mjs`) render the same `<SdsDoc />`,
 * but only the page renders inside that container — the preview iframe loads
 * its stylesheet when a docs page asks for it, and never for a story. Left as
 * it is, the same page comes out narrower and a size smaller, which is not the
 * page anyone is being asked to review.
 *
 * So the container is restated here, in two parts as it has: a wrapper holding
 * the page off the edges of the frame, and the column the content is centred
 * in. The measurements are its own, read off a rendered page.
 */
const DOCS_THEME = create({ base: "light" });
const WRAPPER_PADDING = "64px 40px";
const PROSE_SIZE = 14;

const Wrapper = styled.div`
  background: ${DOCS_THEME.appContentBg};
  color: ${DOCS_THEME.textColor};
  font-size: ${PROSE_SIZE}px;
  padding: ${WRAPPER_PADDING};
`;

const Column = styled.div`
  margin: 0 auto;
  max-width: ${DOC_WIDTH}px;
`;

export function SdsDocSnapshot({
  children,
}: {
  children: ReactNode;
}): ReactElement {
  return (
    <Wrapper>
      <Column>{children}</Column>
    </Wrapper>
  );
}

export default SdsDocSnapshot;
