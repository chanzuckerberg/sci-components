// href turns a tag into a link: it renders as an <a>, takes a tab stop, and
// follows its href on click and on Enter. showLinkIcon adds an arrow after the
// label to say the tag leads somewhere. The arrow is optional; a tag with an
// href is a link either way.
//
// target="_blank" also sets rel="noopener noreferrer". For client-side routing,
// pass your router's link component as component and the tag renders that
// instead of a plain anchor.

import { Tag, getSpaces, type CommonThemeProps } from "@czi-sds/components";
import styled from "@emotion/styled";

const Row = styled.div<CommonThemeProps>`
  ${(props) => {
    const spaces = getSpaces(props);

    return `
      align-items: center;
      display: flex;
      flex-wrap: wrap;
      gap: ${spaces?.m}px;
    `;
  }}
`;

function App() {
  return (
    <div className="app">
      <Row>
        <Tag
          color="info"
          href="https://sds.czi.design"
          label="SDS website"
          showLinkIcon
          target="_blank"
        />

        <Tag
          color="info"
          href="https://sds.czi.design"
          label="SDS website"
          sdsStyle="outline"
          showLinkIcon
          target="_blank"
        />

        <Tag
          color="info"
          href="https://sds.czi.design"
          label="Without the arrow"
          target="_blank"
        />
      </Row>
    </div>
  );
}

export default App;
