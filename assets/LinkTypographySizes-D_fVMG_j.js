import{i as e}from"./preload-helper-xPQekRTU.js";var t;e((()=>{t=`// Link type styles come in the same sizes as body copy, in three weights. Match
// the size and weight to the text the link sits in.

import {
  fontLinkM,
  fontLinkS,
  fontLinkSemiboldS,
  fontLinkXs,
  getSemanticColors,
  type CommonThemeProps,
} from "@czi-sds/components";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

const linkColors = (props: CommonThemeProps) => {
  const semanticColors = getSemanticColors(props);

  return css\`
    color: \${semanticColors?.accent?.textAction};
    text-underline-offset: 2.5px;

    &:hover {
      color: \${semanticColors?.accent?.textActionHover};
    }
  \`;
};

const MediumLink = styled.a\`
  \${fontLinkM}
  \${linkColors}
\`;

const SmallLink = styled.a\`
  \${fontLinkS}
  \${linkColors}
\`;

const SemiboldSmallLink = styled.a\`
  \${fontLinkSemiboldS}
  \${linkColors}
\`;

const ExtraSmallLink = styled.a\`
  \${fontLinkXs}
  \${linkColors}
\`;

function App() {
  return (
    <div
      className="app"
      style={{ display: "flex", flexDirection: "column", gap: "12px" }}
    >
      <MediumLink href="#">fontLinkM, 16px</MediumLink>
      <SmallLink href="#">fontLinkS, 14px</SmallLink>
      <SemiboldSmallLink href="#">fontLinkSemiboldS, 14px</SemiboldSmallLink>
      <ExtraSmallLink href="#">fontLinkXs, 13px</ExtraSmallLink>
    </div>
  );
}

export default App;
`}))();export{t as default};