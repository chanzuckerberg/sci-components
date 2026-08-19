// subItems nest one level and render indented under their parent. onChange
// reports the index of the highlighted item, counting sub-items in the order
// they render, along with whether a click or a scroll caused the change: click
// an item, then scroll the panel by hand to see the other kind arrive.
//
// The sub-sections are siblings of Methods rather than children of it. Nested
// inside, Methods would be in view whenever they were, and since the highlight
// goes to the first item in view, the sub-items would never take it on scroll.
//
// Bringing a section into view scrolls every container around it, this page
// included, so holdPageStill pins the page while the panel moves. A page that
// scrolls its own sections wants none of that.

import {
  NavigationJumpTo,
  fontBodyS,
  fontBodyXs,
  fontHeaderM,
  fontHeaderS,
  getSemanticColors,
  getSpaces,
  type CommonThemeProps,
} from "@czi-sds/components";
import styled from "@emotion/styled";
import { useRef, useState } from "react";

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

      h4 {
        ${fontHeaderS(props)}
        margin: 0 0 8px 0;
      }
    `;
  }}
`;

const Sidebar = styled.p<CommonThemeProps>`
  ${(props) => {
    const spaces = getSpaces(props);

    return `
      display: flex;
      flex-direction: column;
      gap: ${spaces?.xl}px;
    `;
  }}
`;

const Readout = styled.p<CommonThemeProps>`
  ${fontBodyXs}

  ${(props) => {
    const semanticColors = getSemanticColors(props);

    return `
      color: ${semanticColors?.base?.textSecondary};
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
  const [lastChange, setLastChange] = useState("none yet");
  const methodsRef = useRef<HTMLElement | null>(null);
  const samplePrepRef = useRef<HTMLElement | null>(null);
  const sequencingRef = useRef<HTMLElement | null>(null);
  const resultsRef = useRef<HTMLElement | null>(null);
  const discussionRef = useRef<HTMLElement | null>(null);

  return (
    <div className="app">
      <Layout>
        <Sidebar>
          <NavigationJumpTo
            items={[
              {
                elementRef: methodsRef,
                subItems: [
                  { elementRef: samplePrepRef, title: "Sample prep" },
                  { elementRef: sequencingRef, title: "Sequencing" },
                ],
                title: "Methods",
              },
              { elementRef: resultsRef, title: "Results" },
              { elementRef: discussionRef, title: "Discussion" },
            ]}
            onChange={(value, _event, type) => {
              setLastChange(`index ${value}, from ${type}`);
              if (type === "click") holdPageStill();
            }}
            width="160px"
          />

          <Readout>
            Last change: <br />
            {lastChange}
          </Readout>
        </Sidebar>

        <ScrollArea>
          <Section id="methods" ref={methodsRef}>
            <h3>Methods</h3>
            <p>How the samples were collected and processed.</p>
          </Section>
          <Section id="sample-prep" ref={samplePrepRef}>
            <h4>Sample prep</h4>
            <p>Dissociation, staining, and quality gates.</p>
          </Section>
          <Section id="sequencing" ref={sequencingRef}>
            <h4>Sequencing</h4>
            <p>Library construction and read depth per sample.</p>
          </Section>
          <Section id="results" ref={resultsRef}>
            <h3>Results</h3>
            <p>What came out of the analysis.</p>
          </Section>
          <Section id="discussion" ref={discussionRef}>
            <h3>Discussion</h3>
            <p>What the numbers do and do not support.</p>
          </Section>
        </ScrollArea>
      </Layout>
    </div>
  );
}

export default App;
