import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import { ThemeProvider } from "@mui/material/styles";
import { useEffect, useState, type ReactElement } from "react";
import Button from "@components/src/core/Button";
import Icon from "@components/src/core/Icon";
import Tooltip from "@components/src/core/Tooltip";
import { Theme } from "@components/src/core/styles";
import { CODE_COPY_CLASS } from "./constants";

/**
 * How long the button reports a copy for, in milliseconds. Long enough to be
 * read, short enough that the tooltip is back to offering the action by the
 * time a reader returns to it.
 */
const REPORT_FOR = 2000;

/**
 * The docs' prose and code surfaces are light in both modes — see the theme
 * <SdsDoc /> pins itself to — and this control sits on one of them. Left to
 * inherit, it would take the theme from the toolbar instead and put a dark
 * button on a light block.
 *
 * Built once for all of them: a theme apiece would be one to build, and one set
 * of styles for Emotion to hash and keep, for every code block on the page.
 */
const codeTheme = Theme("light");

export interface CopyCodeButtonProps {
  /**
   * The code to copy, read at the moment it is asked for rather than passed in.
   * A block is rewritten as it is highlighted, and what the reader sees is what
   * should land on their clipboard.
   */
  getCode: () => string;
}

/**
 * Copies the block it sits in the corner of, and says so afterwards.
 *
 * The label doubles as the accessible name, which is set by hand: SDS tooltips
 * pass an element as MUI's `title`, so MUI cannot lift the text out of one and
 * an icon button would otherwise have no name at all.
 */
export function CopyCodeButton({ getCode }: CopyCodeButtonProps): ReactElement {
  const [copied, setCopied] = useState(false);
  const label = copied ? "Copied" : "Copy";

  useEffect(() => {
    if (!copied) return;

    const timer = window.setTimeout(() => setCopied(false), REPORT_FOR);
    return () => clearTimeout(timer);
  }, [copied]);

  async function copy(): Promise<void> {
    try {
      await navigator.clipboard.writeText(getCode());
      setCopied(true);
    } catch {
      // The clipboard was refused, which a page served over plain HTTP is. Say
      // nothing rather than report a copy that did not happen.
    }
  }

  return (
    <ThemeProvider theme={codeTheme}>
      <EmotionThemeProvider theme={codeTheme}>
        <div className={CODE_COPY_CLASS}>
          <Tooltip placement="top" title={label}>
            <Button
              aria-label={label}
              onClick={copy}
              sdsStyle="minimal"
              sdsType="secondary"
              size="medium"
            >
              <Icon sdsIcon="Copy" sdsSize="s" />
            </Button>
          </Tooltip>
        </div>
      </EmotionThemeProvider>
    </ThemeProvider>
  );
}

export default CopyCodeButton;
