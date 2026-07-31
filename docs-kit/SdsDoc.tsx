import styled from "@emotion/styled";
import { useEffect, useMemo, useRef, useState, type ReactElement } from "react";
import { createPortal } from "react-dom";
import { CodeFigure } from "./CodeFigure";
import { PREVIEW_CLASS, SB_UNSTYLED_CLASS, TOGGLE_CLASS } from "./constants";
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
const UPLOAD_COLUMNS_PROPERTY = "--zh-upload-columns";

/**
 * Scoped container for rendering raw documentation HTML inside a Storybook docs
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
  .zeroheight-code-snippet figure {
    border-radius: 6px;
    border: 1px solid #dfdfdf;
  }
  .zeroheight-live-code figure,
  .zeroheight-example-block figure {
    border-radius: 0 0 6px 6px;
    border: 1px solid #dfdfdf;
  }

  /* A group of exported design screenshots. ZeroHeight's own stylesheet is not
     part of the export, so the layout its class names describe is rebuilt here:
     the "column" variant sets the figures side by side, "row" stacks them. */
  .zeroheight-design-uploads {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 16px 24px;
    margin: 1.25em 0;
  }
  .zeroheight-design-uploads.zeroheight-item-layout-row {
    flex-direction: column;
  }
  /* A block introduced by a row of column labels ("Light Mode" | "Dark Mode")
     becomes a real grid, so each figure sits under the cell that names it. The
     column count is read off that header row by layoutDesignUploads below. */
  .zeroheight-design-uploads[data-zh-headed] {
    display: grid;
    grid-template-columns: repeat(
      var(${UPLOAD_COLUMNS_PROPERTY}, 1),
      minmax(0, 1fr)
    );
    justify-items: center;
  }
  /* One figure under a multi-column header is a single wide image, not the
     first of a set. */
  .zeroheight-design-uploads[data-zh-headed]
    > .zeroheight-design-upload:only-child {
    grid-column: 1 / -1;
  }
  .zeroheight-design-upload {
    min-width: 0;
    max-width: 100%;
  }
  .zeroheight-design-upload figcaption {
    display: none !important;
  }
  .zeroheight-design-upload-image {
    display: flex;
    justify-content: center;
  }
  /* The labels belong to the figures directly beneath them, so the pair closes
     up into one unit. */
  table[data-zh-upload-header] {
    margin-bottom: 0;
  }
  table[data-zh-upload-header="even"] {
    table-layout: fixed;
  }
  table[data-zh-upload-header] + .zeroheight-design-uploads {
    margin-top: 0.5em;
  }

  /* An inline reference to a design token: a colour swatch followed by the
     token's name. */
  .zeroheight-token-mention {
    display: inline-flex;
    align-items: center;
    gap: 0.3em;
  }
  .zeroheight-token-mention svg {
    flex: none;
    border-radius: 0;
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
    .zeroheight-code-snippet
    pre${OUTSIDE_PREVIEW},
    .zeroheight-live-code
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
  pre code${OUTSIDE_PREVIEW} {
    font-family: "IBM Plex Mono", "SFMono-Regular", Menlo, Consolas, monospace;
    background: none;
    padding: 0;
    color: inherit;
    font-size: inherit;
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

  /* Opt-in modifier for tables used purely for layout (an icon beside a block of
     text, say) rather than to present data. Add it alongside the base class:
     <table class="zeroheight-table zeroheight-table-borderless">. The grid drops
     away and the first column lines up with the surrounding prose.

     Doubling the container class outbids Storybook's own docs table rules, which
     reach these pages because the imported HTML sits outside .sb-unstyled. */
  && .zeroheight-table-borderless tr,
  && .zeroheight-table-borderless th,
  && .zeroheight-table-borderless td {
    border: none;
    background: none;
  }
  && .zeroheight-table-borderless th,
  && .zeroheight-table-borderless td {
    padding: 0.5em 0.6em;
  }
  && .zeroheight-table-borderless th:first-child,
  && .zeroheight-table-borderless td:first-child {
    padding-left: 0;
  }

  hr${OUTSIDE_PREVIEW} {
    border: none;
    border-top: 1px solid rgba(128, 128, 128, 0.3);
    margin: 1.5em 0;
  }
`;

export interface SdsDocProps {
  html: string;
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
      ".zeroheight-code-snippet, .zeroheight-live-code"
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
  const figures = uploads.querySelectorAll(".zeroheight-design-upload").length;
  if (columns < 1 || figures < 1 || figures % columns !== 0) return null;

  return columns;
}

/**
 * Restore the two things ZeroHeight's design-upload blocks lost on export,
 * neither of which can be recovered in CSS alone:
 *
 * - The grid a labelled block is laid out on, which the block's header row
 *   defines rather than the block itself.
 * - The scale of the screenshots. They are 2x exports carrying no intrinsic
 *   scale, so at natural size every one of them renders twice as large as it
 *   was designed. Only the rasters are affected; the SVG assets are 1x.
 */
function layoutDesignUploads(root: HTMLElement): void {
  root
    .querySelectorAll<HTMLElement>(".zeroheight-design-uploads")
    .forEach((uploads) => {
      const columns = headerColumns(uploads);
      if (columns === null) return;

      const table = uploads.previousElementSibling as HTMLTableElement;
      uploads.style.setProperty(UPLOAD_COLUMNS_PROPERTY, String(columns));
      uploads.dataset.zhHeaded = "";
      // A label row on its own can be split into even columns to line up with
      // the grid. Where the table has further rows, their content decides the
      // widths and the labels only loosely track the figures.
      table.dataset.zhUploadHeader = table.rows.length === 1 ? "even" : "";
    });

  root
    .querySelectorAll<HTMLImageElement>(
      '.zeroheight-design-upload-image img[src$=".png"]'
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
 * Renders full-fidelity documentation page HTML (with locally-served images),
 * one-time imported from ZeroHeight and now maintained by hand in this repo.
 *
 * Code examples are not part of the HTML: each one is an empty
 * `<div class="zeroheight-example" data-example="...">` placeholder that we
 * portal a live <SdsExample /> into. Portals target nodes inside `Container`, so
 * the scoped styles above still apply to them. A placeholder can add
 * `data-example-padding="none"` to drop the preview's inset, which suits
 * page-width components.
 */
export function SdsDoc({ html }: SdsDocProps): ReactElement {
  const containerRef = useRef<HTMLDivElement>(null);
  const [slots, setSlots] = useState<ExampleSlot[]>([]);
  const [snippets, setSnippets] = useState<SnippetSlot[]>([]);

  /**
   * Stable payload: React re-sets `innerHTML` whenever this object's identity
   * changes, which would wipe the highlighted markup and the portalled examples
   * every time the slot state below updates.
   */
  const innerHtml = useMemo(() => ({ __html: html }), [html]);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    layoutDesignUploads(root);
    setSnippets(claimSnippets(root));

    // Anything left is a bare block the import did not wrap in a snippet, so it
    // has no React owner. The HTML is injected via dangerouslySetInnerHTML and
    // highlight.js cannot auto-run on mount, so highlight it in place.
    root
      .querySelectorAll<HTMLElement>("pre code")
      .forEach((block) => highlightBlock(block));

    setSlots(
      Array.from(
        root.querySelectorAll<HTMLElement>(".zeroheight-example[data-example]")
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
      {/* eslint-disable-next-line react/no-danger -- content is generated at
          build time from our own trusted ZeroHeight export, not user input. */}
      <Container ref={containerRef} dangerouslySetInnerHTML={innerHtml} />
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
