import styled from "@emotion/styled";
import { useEffect, useMemo, useRef, useState, type ReactElement } from "react";
import { createPortal } from "react-dom";
import { PREVIEW_CLASS, SB_UNSTYLED_CLASS, TOGGLE_CLASS } from "./constants";
import { highlightBlock } from "./highlight";
import { ZeroheightExample } from "./ZeroheightExample";

/**
 * Live previews are portaled into this container, so the prose styles below
 * would otherwise cascade onto the real components inside them (a card title is
 * a `<p>`, an icon is an `<svg>`). Every bare element selector carries this
 * guard so previews render exactly as the components do in a story.
 * `:where()` keeps the guard at zero specificity, leaving the prose cascade as
 * it was.
 */
const OUTSIDE_PREVIEW = `:where(:not(.${PREVIEW_CLASS} *))`;

/**
 * Scoped container for rendering raw ZeroHeight HTML inside a Storybook docs
 * page. Styles are intentionally theme-agnostic (colors inherit, borders use
 * translucent `currentColor`) so the content reads correctly regardless of the
 * docs background or the light/dark theme toggle.
 */
const Container = styled.div`
  font-family:
    "Inter",
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    sans-serif;
  line-height: 1.6;
  color: inherit;
  max-width: 960px;
  margin: 0 auto;

  h1${OUTSIDE_PREVIEW},
    h2${OUTSIDE_PREVIEW},
    h3${OUTSIDE_PREVIEW},
    h4${OUTSIDE_PREVIEW},
    h5${OUTSIDE_PREVIEW},
    h6${OUTSIDE_PREVIEW} {
    line-height: 1.25;
    margin: 1.6em 0 0.6em;
    font-weight: 600;
  }

  h1${OUTSIDE_PREVIEW} {
    font-size: 2rem;
  }
  h2${OUTSIDE_PREVIEW} {
    font-size: 1.5rem;
    padding-bottom: 0.3em;
    border-bottom: 1px solid rgba(128, 128, 128, 0.3);
  }
  h3${OUTSIDE_PREVIEW} {
    font-size: 1.25rem;
  }

  p${OUTSIDE_PREVIEW} {
    margin: 0.75em 0;
  }

  a${OUTSIDE_PREVIEW} {
    color: #0b6cccff;
    text-decoration: none;
  }
  a${OUTSIDE_PREVIEW}:hover {
    text-decoration: underline;
  }

  img${OUTSIDE_PREVIEW}, svg${OUTSIDE_PREVIEW}, video${OUTSIDE_PREVIEW} {
    max-width: 100%;
    height: auto;
    border-radius: 4px;
  }

  ul${OUTSIDE_PREVIEW}, ol${OUTSIDE_PREVIEW} {
    padding-left: 1.5em;
    margin: 0.75em 0;
  }
  li${OUTSIDE_PREVIEW} {
    margin: 0.25em 0;
  }

  /* Inline code keeps a subtle, theme-agnostic chip look. */
  code${OUTSIDE_PREVIEW} {
    font-family: "IBM Plex Mono", "SFMono-Regular", Menlo, Consolas, monospace;
    background: rgba(128, 128, 128, 0.15);
    padding: 0.15em 0.35em;
    border-radius: 3px;
    font-size: 0.9em;
  }

  /* ZeroHeight wraps snippets as
     .zeroheight-code-snippet > figure > (figcaption + pre). Normalize the
     wrapper spacing (figure carries a large default browser margin) and let
     the snippet own the vertical rhythm. */
  .zeroheight-code-snippet,
  .zeroheight-live-code,
  .zeroheight-example-block {
    margin: 1.25em 0;
    border-radius: 6px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    gap: 0px;
  }
  .zeroheight-code-snippet figure,
  .zeroheight-live-code figure,
  .zeroheight-example-block figure {
    background: rgb(31, 41, 56);
    border-radius: 6px;
  }

  .zeroheight-design-upload figcaption {
    display: none !important;
  }

  .zeroheight-example-error {
    border: 1px solid rgba(248, 81, 73, 0.4);
    border-radius: 6px;
    padding: 0.75em 1em;
  }
  figure${OUTSIDE_PREVIEW} {
    margin: 0;
  }

  figure > pre${OUTSIDE_PREVIEW} {
    padding: 20px !important;
  }

  /* The language label sits as a compact header bar on top of the code and
     doubles as an expand/collapse toggle. */
  figcaption${OUTSIDE_PREVIEW} {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-family: "IBM Plex Mono", "SFMono-Regular", Menlo, Consolas, monospace;
    font-size: 0.72rem;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: #8b949e;
    background: rgb(22, 28, 39);
    padding: 0.7em 1.5em;
    border: 1px solid rgba(240, 246, 252, 0.1);
    border-bottom: none;
    border-radius: 0;
  }
  /* The caption bar's contents become a button so the block can be expanded and
     collapsed from the keyboard. */
  .${TOGGLE_CLASS} {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0;
    border: none;
    background: none;
    font: inherit;
    letter-spacing: inherit;
    text-transform: inherit;
    color: inherit;
    cursor: pointer;
    user-select: none;
  }
  .${TOGGLE_CLASS}:hover {
    color: #c9d1d9;
  }
  .${TOGGLE_CLASS}:focus-visible {
    outline: 2px solid #58a6ff;
    outline-offset: 2px;
  }
  /* Chevron affordance: points down when expanded, right when collapsed. */
  .${TOGGLE_CLASS}::after {
    content: "";
    flex: none;
    width: 0.5em;
    height: 0.5em;
    margin-left: 0.75em;
    border-top: 1.5px solid currentColor;
    border-right: 1.5px solid currentColor;
    transform: rotate(135deg);
    transition: transform 0.15s ease;
  }
  figure[data-collapsed] .${TOGGLE_CLASS}::after {
    transform: rotate(45deg);
  }
  /* Collapsed: hide the code and round the caption into a standalone bar. */
  figure[data-collapsed] > pre {
    display: none;
  }
  figure[data-collapsed] > figcaption {
    border-bottom: 1px solid rgba(240, 246, 252, 0.1);
    border-radius: 0 0 6px 6px;
  }

  /* Fenced code blocks use a fixed dark "editor" surface in both light and
     dark docs so highlighted snippets read consistently and clearly as code. */
  pre${OUTSIDE_PREVIEW} {
    margin: 1.25em 0;
    background: #0d1117;
    color: #c9d1d9;
    padding: 1.25em 1.5em;
    border-radius: 6px;
    border: 1px solid rgba(240, 246, 252, 0.1);
    overflow: auto;
    font-size: 0.85rem;
    line-height: 1.5;
    tab-size: 4;
    -moz-tab-size: 4;
  }
  /* Reset margins when the pre lives inside a snippet/figure so the caption
     bar and code read as one seamless block. */
  figure
    pre${OUTSIDE_PREVIEW},
    .zeroheight-code-snippet
    pre${OUTSIDE_PREVIEW},
    .zeroheight-live-code
    pre${OUTSIDE_PREVIEW} {
    margin: 0;
    padding: 16px 20px;
  }
  figcaption + pre${OUTSIDE_PREVIEW} {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
  pre code${OUTSIDE_PREVIEW} {
    font-family: "IBM Plex Mono", "SFMono-Regular", Menlo, Consolas, monospace;
    background: none;
    padding: 0;
    color: inherit;
    font-size: inherit;
  }

  /* highlight.js token palette (GitHub Dark), scoped to this container. */
  .hljs-comment,
  .hljs-code,
  .hljs-quote {
    color: #8b949e;
    font-style: italic;
  }
  .hljs-keyword,
  .hljs-doctag,
  .hljs-formula {
    color: #ff7b72;
  }
  .hljs-subst {
    color: #c9d1d9;
  }
  .hljs-string,
  .hljs-meta .hljs-string,
  .hljs-regexp,
  .hljs-addition {
    color: #a5d6ff;
  }
  .hljs-title,
  .hljs-title.class_,
  .hljs-title.function_,
  .hljs-section {
    color: #d2a8ff;
  }
  .hljs-attr,
  .hljs-attribute,
  .hljs-variable,
  .hljs-template-variable,
  .hljs-literal,
  .hljs-number,
  .hljs-operator,
  .hljs-selector-attr,
  .hljs-selector-class,
  .hljs-selector-id,
  .hljs-meta,
  .hljs-property {
    color: #79c0ff;
  }
  .hljs-built_in,
  .hljs-symbol,
  .hljs-bullet {
    color: #ffa657;
  }
  .hljs-tag,
  .hljs-name,
  .hljs-selector-tag {
    color: #7ee787;
  }
  .hljs-emphasis {
    font-style: italic;
  }
  .hljs-strong {
    font-weight: 600;
  }

  blockquote${OUTSIDE_PREVIEW} {
    margin: 1em 0;
    padding: 0.25em 1em;
    border-left: 3px solid rgba(128, 128, 128, 0.4);
    color: inherit;
    opacity: 0.9;
  }

  table${OUTSIDE_PREVIEW} {
    border-collapse: collapse;
    width: 100%;
    margin: 1em 0;
    font-size: 0.9rem;
  }
  th${OUTSIDE_PREVIEW}, td${OUTSIDE_PREVIEW} {
    border: 1px solid rgba(128, 128, 128, 0.3);
    padding: 0.35em 0.6em;
    text-align: left;
    vertical-align: top;
  }
  /* ZeroHeight wraps most cell text in <p>; drop its margins so rows stay tight. */
  th > p${OUTSIDE_PREVIEW}, td > p${OUTSIDE_PREVIEW} {
    margin: 0.15em 0;
  }
  th
    > p${OUTSIDE_PREVIEW}:first-of-type,
    td
    > p${OUTSIDE_PREVIEW}:first-of-type {
    margin-top: 0;
  }
  th > p${OUTSIDE_PREVIEW}:last-of-type, td > p${OUTSIDE_PREVIEW}:last-of-type {
    margin-bottom: 0;
  }
  th${OUTSIDE_PREVIEW} {
    background: rgba(128, 128, 128, 0.12);
    font-weight: 600;
  }

  hr${OUTSIDE_PREVIEW} {
    border: none;
    border-top: 1px solid rgba(128, 128, 128, 0.3);
    margin: 1.5em 0;
  }
`;

export interface ZeroheightDocProps {
  html: string;
}

/** Turn a code figure's caption bar into an accessible expand/collapse toggle. */
function makeFigureCollapsible(figure: HTMLElement): void {
  const caption = figure.querySelector<HTMLElement>(":scope > figcaption");
  if (!caption || caption.dataset.collapsible) return;
  caption.dataset.collapsible = "true";

  const button = document.createElement("button");
  button.type = "button";
  button.className = TOGGLE_CLASS;
  button.setAttribute("aria-expanded", "true");
  button.append(...Array.from(caption.childNodes));
  caption.append(button);

  button.addEventListener("click", () => {
    const collapsed = figure.toggleAttribute("data-collapsed");
    button.setAttribute("aria-expanded", String(!collapsed));
  });
}

interface ExampleSlot {
  id: string;
  node: HTMLElement;
}

/**
 * Renders full-fidelity ZeroHeight page HTML (with locally-served images) that
 * was imported by `scripts/import-zeroheight-storybook.ts`.
 *
 * Code examples are not part of the HTML: each one is an empty
 * `<div class="zeroheight-example" data-example="...">` placeholder that we
 * portal a live <ZeroheightExample /> into. Portals target nodes inside
 * `Container`, so the scoped styles above still apply to them.
 */
export function ZeroheightDoc({ html }: ZeroheightDocProps): ReactElement {
  const containerRef = useRef<HTMLDivElement>(null);
  const [slots, setSlots] = useState<ExampleSlot[]>([]);

  /**
   * Stable payload: React re-sets `innerHTML` whenever this object's identity
   * changes, which would wipe the highlighted markup and the portalled examples
   * every time the slot state below updates.
   */
  const innerHtml = useMemo(() => ({ __html: html }), [html]);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    // The HTML is injected via dangerouslySetInnerHTML, so highlight.js can't
    // auto-run on mount; enhance the freshly-rendered code blocks by hand.
    root
      .querySelectorAll<HTMLElement>("pre code")
      .forEach((block) => highlightBlock(block));
    root
      .querySelectorAll<HTMLElement>(
        ".zeroheight-code-snippet > figure, .zeroheight-live-code > figure"
      )
      .forEach(makeFigureCollapsible);

    setSlots(
      Array.from(
        root.querySelectorAll<HTMLElement>(".zeroheight-example[data-example]")
      ).flatMap((node) => {
        const { example } = node.dataset;
        if (!example) return [];
        node.classList.add(SB_UNSTYLED_CLASS);
        return [{ id: example, node }];
      })
    );
  }, [html]);

  return (
    <>
      {/* eslint-disable-next-line react/no-danger -- content is generated at
          build time from our own trusted ZeroHeight export, not user input. */}
      <Container ref={containerRef} dangerouslySetInnerHTML={innerHtml} />
      {slots.map(({ id, node }) =>
        createPortal(<ZeroheightExample id={id} />, node, id)
      )}
    </>
  );
}

export default ZeroheightDoc;
