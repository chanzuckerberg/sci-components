import styled from "@emotion/styled";
import hljs from "highlight.js/lib/core";
import bash from "highlight.js/lib/languages/bash";
import css from "highlight.js/lib/languages/css";
import javascript from "highlight.js/lib/languages/javascript";
import json from "highlight.js/lib/languages/json";
import typescript from "highlight.js/lib/languages/typescript";
import xml from "highlight.js/lib/languages/xml";
import { useEffect, useRef, type ReactElement } from "react";

// Register only the languages the imported ZeroHeight docs actually use
// (tsx, json, html, css, js, sh) to keep the Storybook bundle lean.
hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("xml", xml); // provides the `html` alias
hljs.registerLanguage("css", css);
hljs.registerLanguage("json", json);
hljs.registerLanguage("bash", bash); // provides the `sh` alias
// ZeroHeight tags React snippets as `tsx`; map it onto the TypeScript grammar.
hljs.registerAliases(["tsx"], { languageName: "typescript" });

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

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.25;
    margin: 1.6em 0 0.6em;
    font-weight: 600;
  }

  h1 {
    font-size: 2rem;
  }
  h2 {
    font-size: 1.5rem;
    padding-bottom: 0.3em;
    border-bottom: 1px solid rgba(128, 128, 128, 0.3);
  }
  h3 {
    font-size: 1.25rem;
  }

  p {
    margin: 0.75em 0;
  }

  a {
    color: #0b6cccff;
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
  }

  img,
  svg,
  video {
    max-width: 100%;
    height: auto;
    border-radius: 4px;
  }

  ul,
  ol {
    padding-left: 1.5em;
    margin: 0.75em 0;
  }
  li {
    margin: 0.25em 0;
  }

  /* Inline code keeps a subtle, theme-agnostic chip look. */
  code {
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
  .zeroheight-live-code {
    margin: 1.25em 0;
    border-radius: 6px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .zeroheight-code-snippet figure,
  .zeroheight-live-code figure {
    background: #0d1117;
    border-radius: 6px;
  }
  figure {
    margin: 0;
  }

  /* The language label sits as a compact header bar on top of the code and
     doubles as an expand/collapse toggle. */
  figcaption {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-family: "IBM Plex Mono", "SFMono-Regular", Menlo, Consolas, monospace;
    font-size: 0.72rem;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: #8b949e;
    background: #161b22;
    padding: 0.7em 1.5em;
    border: 1px solid rgba(240, 246, 252, 0.1);
    border-bottom: none;
    border-radius: 6px 6px 0 0;
  }
  figcaption[role="button"] {
    cursor: pointer;
    user-select: none;
  }
  figcaption[role="button"]:hover {
    color: #c9d1d9;
  }
  figcaption[role="button"]:focus-visible {
    outline: 2px solid #58a6ff;
    outline-offset: -2px;
  }
  /* Chevron affordance: points down when expanded, right when collapsed. */
  figcaption[role="button"]::after {
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
  figure[data-collapsed] > figcaption[role="button"]::after {
    transform: rotate(45deg);
  }
  /* Collapsed: hide the code and round the caption into a standalone bar. */
  figure[data-collapsed] > pre {
    display: none;
  }
  figure[data-collapsed] > figcaption {
    border-bottom: 1px solid rgba(240, 246, 252, 0.1);
    border-radius: 6px;
  }

  /* Fenced code blocks use a fixed dark "editor" surface in both light and
     dark docs so highlighted snippets read consistently and clearly as code. */
  pre {
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
  figure pre,
  .zeroheight-code-snippet pre,
  .zeroheight-live-code pre {
    margin: 0;
    padding: 16px 20px;
  }
  figcaption + pre {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
  pre code {
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

  blockquote {
    margin: 1em 0;
    padding: 0.25em 1em;
    border-left: 3px solid rgba(128, 128, 128, 0.4);
    color: inherit;
    opacity: 0.9;
  }

  table {
    border-collapse: collapse;
    width: 100%;
    margin: 1em 0;
    font-size: 0.9rem;
  }
  th,
  td {
    border: 1px solid rgba(128, 128, 128, 0.3);
    padding: 0.35em 0.6em;
    text-align: left;
    vertical-align: top;
  }
  /* ZeroHeight wraps most cell text in <p>; drop its margins so rows stay tight. */
  th > p,
  td > p {
    margin: 0.15em 0;
  }
  th > p:first-of-type,
  td > p:first-of-type {
    margin-top: 0;
  }
  th > p:last-of-type,
  td > p:last-of-type {
    margin-bottom: 0;
  }
  th {
    background: rgba(128, 128, 128, 0.12);
    font-weight: 600;
  }

  hr {
    border: none;
    border-top: 1px solid rgba(128, 128, 128, 0.3);
    margin: 1.5em 0;
  }
`;

export interface ZeroheightDocProps {
  html: string;
}

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

/**
 * ZeroHeight exports code with tight, inconsistent indentation (often 1–2
 * spaces per level). Detect a block's base indent unit and re-scale every line
 * to 4 spaces per level so nesting reads clearly.
 */
function reindentToFour(code: string): string {
  const lines = code.split("\n");
  const indents = lines
    .filter((line) => line.trim() !== "")
    .map((line) => /^ */.exec(line)?.[0].length ?? 0)
    .filter((count) => count > 0);

  const unit = indents.reduce((acc, count) => gcd(acc, count), 0);
  if (unit === 0) return code; // no indentation to normalize

  return lines
    .map((line) => {
      const [, spaces = "", rest = ""] = /^( *)(.*)$/.exec(line) ?? [];
      if (rest === "") return "";
      const level = Math.round(spaces.length / unit);
      return " ".repeat(level * 4) + rest;
    })
    .join("\n");
}

/** Clean up and syntax-highlight a single `<pre><code>` block in place. */
function highlightBlock(block: HTMLElement): void {
  if (block.dataset.highlighted) return;

  // ZeroHeight exports code with a blank line between nearly every statement;
  // strip whitespace-only lines (and trailing whitespace) so snippets read
  // compactly before we highlight them.
  const compact = (block.textContent ?? "")
    .split("\n")
    .map((line) => line.replace(/\s+$/, ""))
    .filter((line) => line.trim() !== "")
    .join("\n");

  // Normalize the (often 1–2 space) indentation to 4 spaces per level.
  block.textContent = reindentToFour(compact);

  hljs.highlightElement(block);
}

/** Turn a code figure's caption bar into an accessible expand/collapse toggle. */
function makeFigureCollapsible(figure: HTMLElement): void {
  const caption = figure.querySelector<HTMLElement>(":scope > figcaption");
  if (!caption || caption.dataset.collapsible) return;
  caption.dataset.collapsible = "true";
  caption.setAttribute("role", "button");
  caption.setAttribute("tabindex", "0");
  caption.setAttribute("aria-expanded", "true");

  const toggle = (): void => {
    const collapsed = figure.toggleAttribute("data-collapsed");
    caption.setAttribute("aria-expanded", String(!collapsed));
  };

  caption.addEventListener("click", toggle);
  caption.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggle();
    }
  });
}

/**
 * Renders full-fidelity ZeroHeight page HTML (with locally-served images) that
 * was imported by `scripts/import-zeroheight-storybook.ts`.
 */
export function ZeroheightDoc({ html }: ZeroheightDocProps): ReactElement {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    // The HTML is injected via dangerouslySetInnerHTML, so highlight.js can't
    // auto-run on mount; enhance the freshly-rendered code blocks by hand.
    root.querySelectorAll<HTMLElement>("pre code").forEach(highlightBlock);
    root
      .querySelectorAll<HTMLElement>(
        ".zeroheight-code-snippet > figure, .zeroheight-live-code > figure"
      )
      .forEach(makeFigureCollapsible);
  }, [html]);

  // eslint-disable-next-line react/no-danger -- content is generated at build
  // time from our own trusted ZeroHeight export, not user input.
  return (
    <Container ref={containerRef} dangerouslySetInnerHTML={{ __html: html }} />
  );
}

export default ZeroheightDoc;
