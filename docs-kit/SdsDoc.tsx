import {
  Global,
  ThemeProvider as EmotionThemeProvider,
  type CSSObject,
} from "@emotion/react";
import styled from "@emotion/styled";
import { ThemeProvider } from "@mui/material/styles";
import { useEffect, useMemo, useRef, useState, type ReactElement } from "react";
import { createPortal } from "react-dom";
import NavigationJumpTo from "@components/src/core/NavigationJumpTo";
import {
  Theme,
  getSemanticColors,
  type CommonThemeProps,
} from "@components/src/core/styles";
import { CodeFigure } from "./CodeFigure";
import {
  CODE_ACTION_CLASS,
  PREVIEW_CLASS,
  SB_UNSTYLED_CLASS,
  TOGGLE_CLASS,
} from "./constants";
import { highlightBlock } from "./highlight";
import { SdsExample, type ExamplePadding } from "./SdsExample";

/**
 * Live previews are portaled into this container, so the prose styles below
 * would otherwise cascade onto the real components inside them (a card title is
 * a `<p>`, an icon is an `<svg>`). Every bare element selector carries this
 * guard so previews render exactly as the components do in a story.
 * `:where()` keeps the guard at zero specificity, leaving the prose cascade as
 * it was.
 */
const OUTSIDE_PREVIEW = `:where(:not(.${PREVIEW_CLASS} *))`;

/** Column count of a labelled design-upload grid, set from its header row. */
const UPLOAD_COLUMNS_PROPERTY = "--sds-doc-upload-columns";

/** Name, Type, Default, Description: the shape every props table is written in. */
const PROPS_TABLE_COLUMNS = 4;

/**
 * Sections a page needs before its contents are worth a sidebar of their own.
 * Under this the nav lists most of what is on screen already.
 */
const MIN_CONTENTS_ITEMS = 3;

const SIDEBAR_WIDTH = 176;
const SIDEBAR_GAP = 40;
const PROSE_WIDTH = 960;

/** Below this the sidebar has nowhere left to go, so the two columns stack. */
const STACK_BELOW = 840;

/**
 * Scoped container for rendering raw documentation HTML inside a Storybook docs
 * page. Styles are intentionally theme-agnostic (colors inherit, borders use
 * translucent `currentColor`) so the content reads correctly regardless of the
 * docs background or the light/dark theme toggle.
 */
const Container = styled.div<CommonThemeProps>`
  font-family:
    "Inter",
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    sans-serif !important;
  line-height: 1.6 !important;
  color: inherit;
  /* Shrinks below its ideal width rather than crowding the sidebar, which is
     what keeps the pair readable on a narrow window. */
  flex: 1 1 auto;
  min-width: 0;
  max-width: ${PROSE_WIDTH}px;

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
    border-bottom: none;
  }
  h3${OUTSIDE_PREVIEW} {
    font-size: 1.25rem;
  }

  p${OUTSIDE_PREVIEW} {
    margin: 0.75em 0;
  }

  /* A design page opens with its title followed by a one-line summary. The two
     read as a unit, so the title loses its top margin and the summary is set
     larger and dimmer than body copy to separate it from the prose below. */
  > h1:first-child {
    font-size: 2.75rem;
    margin-top: 0;
  }
  > h1:first-child + p {
    font-family: "Inter", sans-serif;
    font-weight: 300;
    font-size: 1.5rem;
    line-height: 1.2;
    color: #888;
    margin: 0.5em 0 1.5em;
  }

  /* The cover the documentation opens on: the design system's name and summary
     set in the clear half of the SDS illustration. The artwork fills the panel
     and is anchored by its centre, so the drawing holds the same place in it at
     any page width, and the copy is kept to the space beside it.

     Doubling the container class outbids Storybook's own docs rules, which
     reach these pages because the imported HTML sits outside .sb-unstyled. */
  && .sds-doc-cover {
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 420px;
    margin: 0 0 1.5em;
    padding: 0 56px;
    border-radius: 8px;
    /* The illustration is drawn on a white plate, so the panel carries that
       surface and sets its own dark copy rather than inheriting the page's. */
    background: url("/design-assets/sds-cover.png") center / cover no-repeat
      #fff;
    color: #14161a;
  }
  /* The drawing starts 58% of the way across the artwork, so the copy stops
     short of that and the two never meet. */
  && .sds-doc-cover > * {
    max-width: 56%;
  }
  && .sds-doc-cover h1 {
    /* Storybook's docs stylesheet reaches the headings on these pages, so the
       system's own typeface is named here rather than left to inherit. */
    font-family: "Inter", sans-serif;
    font-size: 3rem;
    line-height: 1.1;
    letter-spacing: -0.02em;
    margin: 0;
    text-wrap: balance;
  }
  && .sds-doc-cover p {
    font-size: 1.125rem;
    line-height: 1.6;
    color: #4a4f54;
    margin: 1em 0 0;
  }

  /* Half a panel this narrow no longer holds a readable line, so the cover goes
     typographic and the illustration steps aside. */
  @media (max-width: 700px) {
    && .sds-doc-cover {
      min-height: 0;
      padding: 40px 32px;
      background-image: none;
    }
    && .sds-doc-cover > * {
      max-width: 100%;
    }
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

  /* Inline code keeps a subtle, theme-agnostic chip look.

     Storybook's docs stylesheet dresses every code element inside a paragraph,
     list item or table cell in a chip of its own, and holds it on one line.
     That rule reaches these pages because the imported HTML sits outside
     .sb-unstyled, and nowrap is the wrong answer for a props table: a type as
     long as ReactElement<CustomSVGProps> runs out of its column instead of
     wrapping inside it. So the chip is restated here in full, and allowed to
     break. Doubling the container class outbids that rule. */
  && code${OUTSIDE_PREVIEW} {
    font-family: "IBM Plex Mono", "SFMono-Regular", Menlo, Consolas, monospace;
    background: rgba(128, 128, 128, 0.15);
    color: inherit;
    margin: 0;
    padding: 0.15em 0.35em;
    border: none;
    border-radius: 3px;
    font-size: 0.9em;
    line-height: inherit;
    white-space: normal;
    /* Wrap at the spaces first, and split the word itself only when a single
       identifier is wider than the column holding it. */
    overflow-wrap: break-word;
  }

  /* Snippets are written as
     .sds-doc-code-snippet > figure > (figcaption + pre). Normalize the
     wrapper spacing (figure carries a large default browser margin) and let
     the snippet own the vertical rhythm. */
  .sds-doc-code-snippet,
  .sds-doc-live-code,
  .sds-doc-example-block {
    margin: 1.25em 0;
    border-radius: 6px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    gap: 0px;
  }
  .sds-doc-code-snippet figure {
    border-radius: 6px;
    border: 1px solid #dfdfdf;
  }
  .sds-doc-live-code figure,
  .sds-doc-example-block figure {
    border-radius: 0 0 6px 6px;
    border: 1px solid #dfdfdf;
  }

  /* A group of design screenshots. Only the class names came across with the
     markup, so the layout they describe is rebuilt here: the "column" variant
     sets the figures side by side, "row" stacks them. */
  .sds-doc-design-uploads {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 16px 24px;
    margin: 1.25em 0;
  }
  .sds-doc-design-uploads.sds-doc-item-layout-row {
    flex-direction: column;
  }
  /* A block introduced by a row of column labels ("Light Mode" | "Dark Mode")
     becomes a real grid, so each figure sits under the cell that names it. The
     column count is read off that header row by layoutDesignUploads below. */
  .sds-doc-design-uploads[data-sds-doc-headed] {
    display: grid;
    grid-template-columns: repeat(
      var(${UPLOAD_COLUMNS_PROPERTY}, 1),
      minmax(0, 1fr)
    );
    justify-items: center;
  }
  /* One figure under a multi-column header is a single wide image, not the
     first of a set. */
  .sds-doc-design-uploads[data-sds-doc-headed]
    > .sds-doc-design-upload:only-child {
    grid-column: 1 / -1;
  }
  .sds-doc-design-upload {
    min-width: 0;
    max-width: 100%;
  }
  .sds-doc-design-upload figcaption {
    display: none !important;
  }
  .sds-doc-design-upload-image {
    display: flex;
    justify-content: center;
  }
  /* The labels belong to the figures directly beneath them, so the pair closes
     up into one unit. */
  table[data-sds-doc-upload-header] {
    margin-bottom: 0;
  }
  table[data-sds-doc-upload-header="even"] {
    table-layout: fixed;
  }
  table[data-sds-doc-upload-header] + .sds-doc-design-uploads {
    margin-top: 0.5em;
  }

  /* An inline reference to a design token: a colour swatch followed by the
     token's name. */
  .sds-doc-token-mention {
    display: inline-flex;
    align-items: center;
    gap: 0.3em;
  }
  .sds-doc-token-mention svg {
    flex: none;
    border-radius: 0;
  }

  /* The row of statuses an element's page opens with: "In Figma", "In Code"
     and the like, each marked by an icon saying how far along that part of the
     element is. A status is written as data — <li data-status="ready"> — and
     the mark is drawn from here, so the three states the pages use are named
     in one place and read as the key on the Element Status Tracker page has
     them: ready to use, some variants available, work happening currently.

     Doubling the container class outbids Storybook's own docs list rules,
     which reach these pages because the imported HTML sits outside
     .sb-unstyled. */
  && .sds-doc-status {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 0.5em 2.3em;
    margin: 1.5em 0 2em;
    padding: 0;
    list-style: none;
  }
  && .sds-doc-status > li {
    display: flex;
    align-items: center;
    gap: 1.25em;
    margin: 0;
  }
  && .sds-doc-status > li::before {
    content: "";
    flex: none;
    width: 0.9em;
    height: 0.9em;
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
  }
  && .sds-doc-status > li[data-status="ready"]::before {
    background-image: url("/design-assets/status-ready.svg");
  }
  && .sds-doc-status > li[data-status="partial"]::before {
    background-image: url("/design-assets/status-partial.svg");
  }
  && .sds-doc-status > li[data-status="in-progress"]::before {
    background-image: url("/design-assets/status-in-progress.svg");
  }

  .sds-doc-example-error {
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
    color: rgb(49, 49, 49);
    padding: 0.7em 1.5em;
    border: none;
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
    color: #000;
  }
  .${TOGGLE_CLASS}:focus-visible {
    outline: 2px solid #58a6ff;
    outline-offset: 2px;
  }
  /* An action shares the bar, so the toggle gives up the width it was using to
     push its chevron to the far edge and shrinks back to its label. */
  figcaption[data-has-action] .${TOGGLE_CLASS} {
    width: auto;
  }
  .${CODE_ACTION_CLASS} {
    flex: none;
    margin-left: 1.5em;
    color: inherit;
    text-decoration: none;
    white-space: nowrap;
    border: none;
  }
  .${CODE_ACTION_CLASS}:hover {
    color: #000;
    border: none !important;
    text-decoration: none !important;
  }
  .${CODE_ACTION_CLASS}:focus-visible {
    outline: 2px solid #58a6ff;
    outline-offset: 2px;
  }
  .${CODE_ACTION_CLASS} svg {
    max-width: 10px;
    margin-left: 4px;
    color: inherit;
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
    border-radius: 0 0 6px 6px;
  }

  /* Fenced code blocks use a light "editor" surface, a shade off the docs page
     so highlighted snippets still read as code. */
  pre${OUTSIDE_PREVIEW} {
    margin: 1.25em 0;
    background: rgba(246, 248, 250, 0.6);
    color: #24292f;
    padding: 1.25em 1.5em;
    border-radius: 6px;
    border: 1px solid #dfdfdf;
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
    .sds-doc-code-snippet
    pre${OUTSIDE_PREVIEW},
    .sds-doc-live-code
    pre${OUTSIDE_PREVIEW} {
    margin: 0;
    padding: 16px 20px;
    /* The figure already draws the block's outline. */
    border: none;
  }
  figcaption + pre${OUTSIDE_PREVIEW} {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
  /* Code in a block is not a chip: it drops the surface and keeps the
     whitespace and horizontal scrolling of the pre around it. Matched with the
     same doubled class as the chip above so it outranks it. */
  && pre code${OUTSIDE_PREVIEW} {
    font-family: "IBM Plex Mono", "SFMono-Regular", Menlo, Consolas, monospace;
    background: none;
    padding: 0;
    color: inherit;
    font-size: inherit;
    line-height: inherit;
    white-space: inherit;
    overflow-wrap: normal;
  }

  /* highlight.js token palette (GitHub Light), scoped to this container. */
  .hljs-comment,
  .hljs-code,
  .hljs-quote {
    color: #6e7781;
    font-style: italic;
  }
  .hljs-keyword,
  .hljs-doctag,
  .hljs-formula {
    color: #cf222e;
  }
  .hljs-subst {
    color: #24292f;
  }
  .hljs-string,
  .hljs-meta .hljs-string,
  .hljs-regexp,
  .hljs-addition {
    color: #0a3069;
  }
  .hljs-title,
  .hljs-title.class_,
  .hljs-title.function_,
  .hljs-section {
    color: #8250df;
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
    color: #0550ae;
  }
  .hljs-built_in,
  .hljs-symbol,
  .hljs-bullet {
    color: #953800;
  }
  .hljs-tag,
  .hljs-name,
  .hljs-selector-tag {
    color: #116329;
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
  /* Most cell text is wrapped in <p>; drop its margins so rows stay tight. */
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

  /* Storybook's docs stylesheet stripes these tables for us, but against a grey
     of its own choosing. Restate the band as the SDS surface the design system
     stripes with. The layout tables below opt out, their rows carrying no
     background at all.

     Doubling the container class outbids that rule, which reaches these pages
     because the imported HTML sits outside .sb-unstyled. */
  && table${OUTSIDE_PREVIEW}:not(.sds-doc-table-borderless) tr:nth-of-type(2n) {
    background-color: ${(props) =>
      getSemanticColors(props)?.base?.backgroundSecondary};
  }

  /* Opt-in modifier for tables used purely for layout (an icon beside a block of
     text, say) rather than to present data. Add it alongside the base class:
     <table class="sds-doc-table sds-doc-table-borderless">. The grid drops
     away and the first column lines up with the surrounding prose.

     Doubling the container class outbids Storybook's own docs table rules, which
     reach these pages because the imported HTML sits outside .sb-unstyled. */
  && .sds-doc-table-borderless tr,
  && .sds-doc-table-borderless th,
  && .sds-doc-table-borderless td {
    border: none;
    background: none;
  }
  && .sds-doc-table-borderless th,
  && .sds-doc-table-borderless td {
    padding: 0.5em 0.6em;
  }
  && .sds-doc-table-borderless th:first-child,
  && .sds-doc-table-borderless td:first-child {
    padding-left: 0;
  }
  /* Rows that pair an icon with a block of text, the icon alone in its cell.
     Centre them, so a tall paragraph does not leave its icon stranded up at the
     top. Rows holding prose in every cell keep the top alignment set above,
     which is what lines their opening words up with each other. */
  && .sds-doc-table-borderless tr:has(> td > img:only-child) > td {
    vertical-align: middle;
  }

  /* Props tables, marked by the pass below. Left to size themselves they follow
     their content, so a component whose defaults happen to be long (a code
     sample, a path into the source) hands that column half the table and leaves
     the descriptions in a gutter. Fixing the layout spends the width on the
     column that carries the prose, and gives every component's table the same
     proportions. Breaking words is what keeps the narrow columns honest, since
     a fixed column cannot widen to fit an unbroken path or type union. */
  && table[data-sds-doc-props] {
    table-layout: fixed;
  }
  && table[data-sds-doc-props] th,
  && table[data-sds-doc-props] td {
    overflow-wrap: break-word;
  }
  /* Name and type are the columns whose content cannot be abbreviated: a prop
     is as long as it is named, and a type as long as it is declared. Both are
     given room for the longest the docs actually carry, measured in the
     monospace face they are set in: a twenty-five character name, and a type
     the length of ReactElement<CustomSVGProps>. Defaults keep enough for the
     longest of them, "matchBackground". What is left goes to the prose, which
     is the one column that reads just as well narrower. */
  && table[data-sds-doc-props] tr > :nth-child(1),
  && table[data-sds-doc-props] tr > :nth-child(2) {
    width: 22%;
  }
  && table[data-sds-doc-props] tr > :nth-child(3) {
    width: 16%;
  }
  && table[data-sds-doc-props] tr > :nth-child(4) {
    width: 40%;
  }

  hr${OUTSIDE_PREVIEW} {
    border: none;
    border-top: 1px solid rgba(128, 128, 128, 0.3);
    margin: 1.5em 0;
  }
`;

/**
 * Prose and, where a page declares one, its jump-to sidebar. The columns are
 * left to stretch to the taller of the two: the nav sticks itself, and a column
 * only as tall as the nav would give it nothing to travel down.
 */
const Layout = styled.div`
  display: flex;
  justify-content: center;
  gap: ${SIDEBAR_GAP}px;

  @media (max-width: ${STACK_BELOW}px) {
    flex-direction: column;
  }
`;

const Sidebar = styled.aside`
  flex: 0 0 ${SIDEBAR_WIDTH}px;

  /* A long contents list would otherwise run past the bottom of a short window
     with its last sections out of reach, so the stuck nav scrolls on its own. */
  > * {
    max-height: calc(100vh - 48px);
    overflow-y: auto;
  }

  /* Stacked, the nav leads the page rather than trailing the whole of it. */
  @media (max-width: ${STACK_BELOW}px) {
    display: none;
    flex: none;
    order: -1;
    width: 100%;
  }
`;

/**
 * Storybook sizes a docs page for prose alone, leaving the sidebar no room of
 * its own. Widen the column that holds it, and only there: the selector matches
 * the marker the layout carries, so a page with no sidebar keeps its width.
 */
const wideDocsColumn: CSSObject = {
  ".sbdocs-content:has([data-sds-contents])": {
    maxWidth: PROSE_WIDTH + SIDEBAR_GAP + SIDEBAR_WIDTH,
  },
};

export interface SdsDocProps {
  html: string;
}

/**
 * A section of the page, as <NavigationJumpTo /> takes it. The component binds
 * an item to its section through a ref rather than an id, and these sections
 * live in HTML that is injected wholesale, so the "refs" are made by hand from
 * the elements found in it.
 */
interface JumpToTarget {
  elementRef: { current: HTMLElement | null };
  title: string;
}

interface JumpToItem extends JumpToTarget {
  subItems?: JumpToTarget[];
}

interface ExampleSlot {
  id: string;
  node: HTMLElement;
  padding: ExamplePadding;
}

interface SnippetSlot {
  code: string;
  key: string;
  label: string;
  language: string;
  node: HTMLElement;
}

/**
 * Take over the static code snippets in the imported HTML so they render
 * through the same <CodeFigure /> as a live example's source, rather than
 * through markup we patch by hand. Their content moves into React's keeping,
 * which is what earns them the `SB_UNSTYLED_CLASS` the examples get: without it
 * Storybook's docs stylesheet overrides the code surface.
 */
function claimSnippets(root: HTMLElement): SnippetSlot[] {
  return Array.from(
    root.querySelectorAll<HTMLElement>(
      ".sds-doc-code-snippet, .sds-doc-live-code"
    )
  ).flatMap((node, index) => {
    const block = node.querySelector("code");
    if (!block) return [];

    const slot = {
      code: block.textContent ?? "",
      key: `snippet-${index}`,
      label: node.querySelector("figcaption")?.textContent?.trim() || "Code",
      language: /language-([\w-]+)/.exec(block.className)?.[1] ?? "plaintext",
      node,
    } satisfies SnippetSlot;

    node.textContent = "";
    node.classList.add(SB_UNSTYLED_CLASS);
    return [slot];
  });
}

/** An id for a section, from its heading, unique within the page. */
function uniqueId(title: string, taken: Set<string>): string {
  const base =
    title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .replace(/^-+|-+$/g, "") || "section";

  let id = base;
  for (let suffix = 2; taken.has(id); suffix += 1) id = `${base}-${suffix}`;

  taken.add(id);
  return id;
}

/**
 * The page's contents, read off its own headings: an `h2` is a section and the
 * `h3`s under it are its subsections, which is the single level of nesting
 * <NavigationJumpTo /> offers. Headings the export left before any `h2` (a page
 * built entirely of `h3`s, say) stand as sections in their own right.
 *
 * Each heading is also given the id it lacks, both to anchor the nav item and
 * to leave the section addressable.
 */
function collectContents(root: HTMLElement): JumpToItem[] {
  const taken = new Set(
    Array.from(root.querySelectorAll<HTMLElement>("[id]"), (node) => node.id)
  );
  const items: JumpToItem[] = [];
  let inSection = false;

  root.querySelectorAll<HTMLElement>("h2, h3").forEach((heading) => {
    const title = heading.textContent?.trim();
    // A live example renders real components, whose own headings belong to the
    // example and not to the page. They mount after this runs, but the
    // placeholders they fill are already here.
    if (!title || heading.closest(`.sds-doc-example, .${PREVIEW_CLASS}`)) {
      return;
    }

    if (!heading.id) heading.id = uniqueId(title, taken);

    const target: JumpToTarget = { elementRef: { current: heading }, title };
    const section = items[items.length - 1];

    if (heading.tagName === "H3" && inSection && section) {
      section.subItems = [...(section.subItems ?? []), target];
      return;
    }

    items.push(target);
    inSection = heading.tagName === "H2";
  });

  return items;
}

/**
 * A design-upload block is often introduced by a small table whose single row
 * labels the columns the figures below fill ("Light Mode" | "Dark Mode"). The
 * label row is the last one in that table.
 *
 * Nothing in the markup distinguishes such a table from an ordinary one that
 * happens to sit above a block, so the figures having to divide evenly into the
 * columns stands in for that: it holds for every labelled block in the docs and
 * rules out the data tables that precede an unrelated block.
 */
function headerColumns(uploads: HTMLElement): number | null {
  const table = uploads.previousElementSibling;
  if (!(table instanceof HTMLTableElement)) return null;

  const columns = table.rows[table.rows.length - 1]?.cells.length ?? 0;
  const figures = uploads.querySelectorAll(".sds-doc-design-upload").length;
  if (columns < 1 || figures < 1 || figures % columns !== 0) return null;

  return columns;
}

/**
 * Restore the two things the design-upload blocks cannot express in their
 * markup, neither of which can be recovered in CSS alone:
 *
 * - The grid a labelled block is laid out on, which the block's header row
 *   defines rather than the block itself.
 * - The scale of the screenshots. They are 2x exports carrying no intrinsic
 *   scale, so at natural size every one of them renders twice as large as it
 *   was designed. Only the rasters are affected; the SVG assets are 1x.
 */
function layoutDesignUploads(root: HTMLElement): void {
  root
    .querySelectorAll<HTMLElement>(".sds-doc-design-uploads")
    .forEach((uploads) => {
      const columns = headerColumns(uploads);
      if (columns === null) return;

      const table = uploads.previousElementSibling as HTMLTableElement;
      uploads.style.setProperty(UPLOAD_COLUMNS_PROPERTY, String(columns));
      uploads.dataset.sdsDocHeaded = "";
      // A label row on its own can be split into even columns to line up with
      // the grid. Where the table has further rows, their content decides the
      // widths and the labels only loosely track the figures.
      table.dataset.sdsDocUploadHeader = table.rows.length === 1 ? "even" : "";
    });

  root
    .querySelectorAll<HTMLImageElement>(
      '.sds-doc-design-upload-image img[src$=".png"]'
    )
    .forEach((image) => {
      const halve = () => {
        if (image.naturalWidth)
          image.style.width = `${image.naturalWidth / 2}px`;
      };

      if (image.complete) halve();
      else image.addEventListener("load", halve, { once: true });
    });
}

/**
 * Mark the tables that document a component's props, so the styles above can
 * give the description column the room it needs.
 *
 * They are not distinguished in the markup: every table carries the same class,
 * and a props table is simply one whose header row ends in "Description". That
 * holds for all of them, and matches nothing else in the docs, the other
 * four-column tables being token and design references with headings of their
 * own.
 */
function markPropsTables(root: HTMLElement): void {
  root
    .querySelectorAll<HTMLTableElement>("table.sds-doc-table")
    .forEach((table) => {
      const header = table.rows[0];
      if (header?.cells.length !== PROPS_TABLE_COLUMNS) return;

      const last = header.cells[header.cells.length - 1];
      if (last?.textContent?.trim().toLowerCase() === "description") {
        table.dataset.sdsDocProps = "";
      }
    });
}

/**
 * Renders full-fidelity documentation page HTML (with locally-served images),
 * which is committed to this repo and maintained by hand.
 *
 * Code examples are not part of the HTML: each one is an empty
 * `<div class="sds-doc-example" data-example="...">` placeholder that we
 * portal a live <SdsExample /> into. Portals target nodes inside `Container`, so
 * the scoped styles above still apply to them. A placeholder can add
 * `data-example-padding="none"` to drop the preview's inset, which suits
 * page-width components.
 */
export function SdsDoc({ html }: SdsDocProps): ReactElement {
  const containerRef = useRef<HTMLDivElement>(null);
  const [slots, setSlots] = useState<ExampleSlot[]>([]);
  const [snippets, setSnippets] = useState<SnippetSlot[]>([]);
  const [jumpTo, setJumpTo] = useState<JumpToItem[]>([]);

  /*
   * Pinned to light: the toolbar's theme reaches the previews (which paint their
   * own surface) but not the docs page around them, whose canvas and prose stay
   * light in both modes. A dark surface here would sit on a light page.
   */
  const theme = useMemo(() => Theme("light"), []);

  /**
   * Stable payload: React re-sets `innerHTML` whenever this object's identity
   * changes, which would wipe the highlighted markup and the portalled examples
   * every time the slot state below updates.
   */
  const innerHtml = useMemo(() => ({ __html: html }), [html]);

  /**
   * Whether to widen the column, decided from the markup rather than from the
   * pass below, which runs too late to spare the page a second layout. The two
   * agree: the nav lists one item per heading.
   */
  const hasContents = useMemo(
    () => (html.match(/<h[23][\s>]/g) ?? []).length >= MIN_CONTENTS_ITEMS,
    [html]
  );

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    layoutDesignUploads(root);
    markPropsTables(root);

    const contents = collectContents(root);
    const listed = contents.reduce(
      (total, item) => total + 1 + (item.subItems?.length ?? 0),
      0
    );
    setJumpTo(listed >= MIN_CONTENTS_ITEMS ? contents : []);
    setSnippets(claimSnippets(root));

    // Anything left is a bare block the import did not wrap in a snippet, so it
    // has no React owner. The HTML is injected via dangerouslySetInnerHTML and
    // highlight.js cannot auto-run on mount, so highlight it in place.
    root
      .querySelectorAll<HTMLElement>("pre code")
      .forEach((block) => highlightBlock(block));

    setSlots(
      Array.from(
        root.querySelectorAll<HTMLElement>(".sds-doc-example[data-example]")
      ).flatMap((node) => {
        const { example, examplePadding } = node.dataset;
        if (!example) return [];
        node.classList.add(SB_UNSTYLED_CLASS);
        return [
          {
            id: example,
            node,
            padding: examplePadding === "none" ? "none" : "default",
          } satisfies ExampleSlot,
        ];
      })
    );
  }, [html]);

  return (
    <>
      <Global styles={wideDocsColumn} />
      <ThemeProvider theme={theme}>
        <EmotionThemeProvider theme={theme}>
          <Layout data-sds-contents={hasContents || undefined}>
            {/* eslint-disable-next-line react/no-danger -- content is bundled
                at build time from documentation committed to this repo, not
                user input. */}
            <Container ref={containerRef} dangerouslySetInnerHTML={innerHtml} />
            {jumpTo.length > 0 && (
              <Sidebar className={SB_UNSTYLED_CLASS}>
                <NavigationJumpTo
                  aria-label="On this page"
                  items={jumpTo}
                  width={`${SIDEBAR_WIDTH}px`}
                />
              </Sidebar>
            )}
          </Layout>
        </EmotionThemeProvider>
      </ThemeProvider>
      {slots.map(({ id, node, padding }) =>
        createPortal(<SdsExample id={id} padding={padding} />, node, id)
      )}
      {snippets.map(({ code, key, label, language, node }) =>
        createPortal(
          <CodeFigure compact code={code} label={label} language={language} />,
          node,
          key
        )
      )}
    </>
  );
}

export default SdsDoc;
