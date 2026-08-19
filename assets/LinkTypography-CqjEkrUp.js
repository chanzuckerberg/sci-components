import{i as e}from"./preload-helper-xPQekRTU.js";var t;e((()=>{t=`// The recommended link: a plain anchor carrying the link type style and the
// accent text action colors. The underline is part of the type style, so it is
// there in every state.

import {
  fontBodyS,
  fontLinkS,
  focusVisibleA11yStyle,
  getSemanticColors,
} from "@czi-sds/components";
import styled from "@emotion/styled";

const Paragraph = styled.p\`
  \${fontBodyS}
  margin: 0;
\`;

const StyledLink = styled.a\`
  \${fontLinkS}
  \${focusVisibleA11yStyle}

  \${(props) => {
    const semanticColors = getSemanticColors(props);

    return \`
      color: \${semanticColors?.accent?.textAction};
      text-underline-offset: 2.5px;
      cursor: pointer;

      &:hover {
        color: \${semanticColors?.accent?.textActionHover};
      }

      &:active {
        color: \${semanticColors?.accent?.textActionPressed};
      }
    \`;
  }}
\`;

function App() {
  return (
    <div className="app">
      <Paragraph>
        The <StyledLink href="#">Science Design System</StyledLink> is the
        shared design language behind CZI&apos;s science products.
      </Paragraph>
    </div>
  );
}

export default App;
`}))();export{t as default};