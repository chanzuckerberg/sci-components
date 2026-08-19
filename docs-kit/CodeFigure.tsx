import {
  useEffect,
  useRef,
  useState,
  type ReactElement,
  type ReactNode,
} from "react";
import { CODE_BODY_CLASS, TOGGLE_CLASS } from "./constants";
import { CopyCodeButton } from "./CopyCodeButton";
import { highlightBlock } from "./highlight";

export interface CodeFigureProps {
  /** Caption bar text. The bar doubles as the expand/collapse control. */
  label: string;
  /** `null` while the source is still loading. */
  code: string | null;
  /** highlight.js language, e.g. `tsx` or `json`. */
  language: string;
  collapsedByDefault?: boolean;
  /** See `highlightBlock`: on for snippets inlined in the docs, off for files. */
  compact?: boolean;
  /**
   * Rendered at the trailing edge of the caption bar, for something to do with
   * the code beyond reading it. Giving one up shortens the toggle to its label,
   * so the bar no longer expands from a click anywhere along it.
   */
  action?: ReactNode;
}

/**
 * A block of source code with a caption bar that expands and collapses it, and
 * a control in the corner of the code that copies it.
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
  action,
}: CodeFigureProps): ReactElement {
  const [collapsed, setCollapsed] = useState(collapsedByDefault);
  const codeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (code === null || !codeRef.current) return;
    highlightBlock(codeRef.current, { compact });
  }, [code, compact]);

  return (
    <figure {...(collapsed ? { "data-collapsed": "" } : {})}>
      <figcaption {...(action ? { "data-has-action": "" } : {})}>
        <button
          type="button"
          className={TOGGLE_CLASS}
          aria-expanded={!collapsed}
          onClick={() => setCollapsed((previous) => !previous)}
        >
          {label}
        </button>
        {action}
      </figcaption>
      <div className={CODE_BODY_CLASS}>
        <pre>
          <code className={`language-${language}`} ref={codeRef}>
            {code ?? ""}
          </code>
        </pre>
        {code === null ? null : (
          <CopyCodeButton
            getCode={() => codeRef.current?.textContent ?? code}
          />
        )}
      </div>
    </figure>
  );
}

export default CodeFigure;
