import { useEffect, useRef, useState, type ReactElement } from "react";
import { TOGGLE_CLASS } from "./constants";
import { highlightBlock } from "./highlight";

export interface CodeFigureProps {
  /** Caption bar text. The bar doubles as the expand/collapse control. */
  label: string;
  /** `null` while the source is still loading. */
  code: string | null;
  /** highlight.js language, e.g. `tsx` or `json`. */
  language: string;
  collapsedByDefault?: boolean;
  /** See `highlightBlock`: on for ZeroHeight-exported snippets, off for files. */
  compact?: boolean;
}

/**
 * A block of source code with a caption bar that expands and collapses it.
 *
 * Every code block in the docs renders through this, whether it came from the
 * imported HTML as a static snippet or from a live example's source file, so
 * the two are indistinguishable. Callers must render it inside a
 * `SB_UNSTYLED_CLASS` subtree; otherwise Storybook's docs stylesheet overrides
 * the code surface these styles depend on.
 */
export function CodeFigure({
  label,
  code,
  language,
  collapsedByDefault = false,
  compact = false,
}: CodeFigureProps): ReactElement {
  const [collapsed, setCollapsed] = useState(collapsedByDefault);
  const codeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (code === null || !codeRef.current) return;
    highlightBlock(codeRef.current, { compact });
  }, [code, compact]);

  return (
    <figure {...(collapsed ? { "data-collapsed": "" } : {})}>
      <figcaption>
        <button
          type="button"
          className={TOGGLE_CLASS}
          aria-expanded={!collapsed}
          onClick={() => setCollapsed((previous) => !previous)}
        >
          {label}
        </button>
      </figcaption>
      <pre>
        <code className={`language-${language}`} ref={codeRef}>
          {code ?? ""}
        </code>
      </pre>
    </figure>
  );
}

export default CodeFigure;
