// Each item points at a section through a ref, and the component keeps the
// highlight on whichever section is showing. Clicking an item scrolls its
// section into view, which here means scrolling the panel on the right.
//
// Give the sections ids: the tabs point their aria-controls at them, and
// without ids they reference elements that do not exist.
//
// "Into view" means every scroll container around the section, so this page
// scrolls along with the panel. holdPageStill pins it for the length of the
// animation, which a page that scrolls its own sections would not want.

import {
  NavigationJumpTo,
  fontBodyS,
  fontHeaderM,
  getSemanticColors,
  type CommonThemeProps,
} from "@czi-sds/components";
import styled from "@emotion/styled";
import { useRef } from "react";

const Layout = styled.div`
  display: flex;
  gap: 16px;
`;

const ScrollArea = styled.div<CommonThemeProps>`
  ${(props) => {
    const semanticColors = getSemanticColors(props);

    return `
      border: 1px solid ${semanticColors?.base?.divider};
      border-radius: 4px;
      flex: 1;
      height: 280px;
      overflow-y: auto;
      padding: 16px;
    `;
  }}
`;

const Section = styled.section<CommonThemeProps>`
  ${fontBodyS}

  ${(props) => {
    const semanticColors = getSemanticColors(props);

    return `
      color: ${semanticColors?.base?.textPrimary};
      min-height: 320px;

      h3 {
        ${fontHeaderM(props)}
        margin: 0 0 8px 0;
      }
    `;
  }}
`;

function holdPageStill() {
  const { scrollX, scrollY } = window;
  const until = performance.now() + 500;

  const pin = () => {
    window.scrollTo({ behavior: "instant", left: scrollX, top: scrollY });
    if (performance.now() < until) requestAnimationFrame(pin);
  };

  requestAnimationFrame(pin);
}

function App() {
  const overviewRef = useRef<HTMLElement | null>(null);
  const methodsRef = useRef<HTMLElement | null>(null);
  const resultsRef = useRef<HTMLElement | null>(null);

  return (
    <div className="app">
      <Layout>
        <NavigationJumpTo
          items={[
            { elementRef: overviewRef, title: "Overview" },
            { elementRef: methodsRef, title: "Methods" },
            { elementRef: resultsRef, title: "Results" },
          ]}
          onChange={(_value, _event, type) => {
            if (type === "click") holdPageStill();
          }}
          width="160px"
        />

        <ScrollArea>
          <Section id="overview" ref={overviewRef}>
            <h3>Overview</h3>
            <p>What the study set out to measure and why.</p>
          </Section>
          <Section id="methods" ref={methodsRef}>
            <h3>Methods</h3>
            <p>How the samples were collected and processed.</p>
          </Section>
          <Section id="results" ref={resultsRef}>
            <h3>Results</h3>
            <p>What came out of the analysis.</p>
          </Section>
        </ScrollArea>
      </Layout>
    </div>
  );
}

export default App;
