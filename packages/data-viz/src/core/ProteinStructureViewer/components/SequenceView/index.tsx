import { Tooltip } from "@czi-sds/components";
import { ThemeProvider } from "@mui/material/styles";
import { CheckIcon, CopyIcon } from "@phosphor-icons/react";
import { useMolstarTheme } from "../../hooks/useMolstarTheme";
import { ThemeModeSubject, residueColorsForMode } from "../../utils/theme";
import Sequence from "./components/Sequence";
import { useCopySequence } from "./hooks/useCopySequence";
import { useSequenceWrappers } from "./hooks/useSequenceWrappers";
import {
  CopyButton,
  EmptyState,
  PanelHeader,
  PanelTitle,
  ResidueCount,
  ResidueCountLabel,
  ResidueCountValue,
  SequencePanel,
  SequenceScrollArea,
  SequenceScroller,
} from "./style";

/**
 * Builds the Mol* sequence panel view.
 *
 * Like the viewport, Mol* renders this inside its own React root, so the theme
 * mode arrives through `themeMode` and is watched for changes rather than read
 * once, then re-supplied through a local `ThemeProvider` for the Emotion styles
 * and the SDS `Tooltip` below.
 */
export function createSequenceView(
  themeMode: ThemeModeSubject
): () => JSX.Element {
  return function SequenceView() {
    const { mode, theme } = useMolstarTheme(themeMode);
    const { entries, isEmpty, residueCount } = useSequenceWrappers();
    const { copied, copySequence } = useCopySequence(entries);

    if (isEmpty) {
      return (
        <ThemeProvider theme={theme}>
          <EmptyState className="msp-sequence">
            No structure available
          </EmptyState>
        </ThemeProvider>
      );
    }

    const residueColors = residueColorsForMode(mode);

    return (
      <ThemeProvider theme={theme}>
        <SequencePanel>
          <PanelHeader>
            <PanelTitle>Sequence</PanelTitle>
            <Tooltip arrow placement="top" title={copied ? "Copied!" : "Copy"}>
              <CopyButton
                aria-label="Copy sequence to clipboard"
                onClick={copySequence}
                type="button"
              >
                {copied ? <CheckIcon size={16} /> : <CopyIcon size={16} />}
              </CopyButton>
            </Tooltip>
            <ResidueCount>
              <ResidueCountLabel>Residues</ResidueCountLabel>
              <ResidueCountValue>{residueCount}</ResidueCountValue>
            </ResidueCount>
          </PanelHeader>
          <SequenceScroller>
            <SequenceScrollArea className="msp-sequence msp-sequence-wrapper-non-empty">
              {entries.map((s, i) =>
                typeof s.wrapper === "string" ? (
                  <div className="msp-sequence-wrapper" key={i}>
                    {s.wrapper}
                  </div>
                ) : (
                  <Sequence
                    key={i}
                    residueColors={residueColors}
                    sequenceWrapper={s.wrapper}
                  />
                )
              )}
            </SequenceScrollArea>
          </SequenceScroller>
        </SequencePanel>
      </ThemeProvider>
    );
  };
}
