import{i as e}from"./preload-helper-xPQekRTU.js";var t;e((()=>{t=`// On a surface where the accent color has too little contrast, keep the link the
// same color as the paragraph and mark it with a dashed underline that goes
// solid on interaction.

import {
  fontBodyS,
  fontLinkS,
  getSemanticColors,
  type CommonThemeProps,
} from "@czi-sds/components";
import styled from "@emotion/styled";

const Panel = styled.div<CommonThemeProps>\`
  \${fontBodyS}

  \${(props) => {
    const semanticColors = getSemanticColors(props);

    return \`
      background-color: \${semanticColors?.accent?.surfacePrimary};
      color: \${semanticColors?.base?.textPrimaryInverse};
      padding: 16px;
      border-radius: 4px;
      max-width: 460px;
    \`;
  }}
\`;

const DashedLink = styled.a\`
  \${fontLinkS}
  color: inherit;
  text-decoration: underline dashed;
  text-underline-offset: 2.5px;
  cursor: pointer;

  &:hover,
  &:active,
  &:focus-visible {
    text-decoration-style: solid;
  }
\`;

function App() {
  return (
    <div className="app">
      <Panel>
        Uploads are held for 30 days. See the{" "}
        <DashedLink href="#">retention policy</DashedLink> for what happens
        after that.
      </Panel>
    </div>
  );
}

export default App;
`}))();export{t as default};