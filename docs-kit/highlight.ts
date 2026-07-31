import hljs from "highlight.js/lib/core";
import bash from "highlight.js/lib/languages/bash";
import css from "highlight.js/lib/languages/css";
import javascript from "highlight.js/lib/languages/javascript";
import json from "highlight.js/lib/languages/json";
import typescript from "highlight.js/lib/languages/typescript";
import xml from "highlight.js/lib/languages/xml";

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

export interface HighlightBlockOptions {
  /**
   * Compact ZeroHeight-exported code (drop blank lines, rescale indentation).
   * Leave off for already well-formatted sources such as the extracted example
   * files, whose blank lines and 2-space indentation are intentional.
   */
  compact?: boolean;
}

/** Clean up and syntax-highlight a single `<pre><code>` block in place. */
export function highlightBlock(
  block: HTMLElement,
  { compact = true }: HighlightBlockOptions = {}
): void {
  if (block.dataset.highlighted) return;

  if (compact) {
    // ZeroHeight exports code with a blank line between nearly every statement;
    // strip whitespace-only lines (and trailing whitespace) so snippets read
    // compactly before we highlight them.
    const compacted = (block.textContent ?? "")
      .split("\n")
      .map((line) => line.replace(/\s+$/, ""))
      .filter((line) => line.trim() !== "")
      .join("\n");

    // Normalize the (often 1–2 space) indentation to 4 spaces per level.
    block.textContent = reindentToFour(compacted);
  } else {
    block.textContent = (block.textContent ?? "").replace(/\s+$/, "");
  }

  hljs.highlightElement(block);
}
