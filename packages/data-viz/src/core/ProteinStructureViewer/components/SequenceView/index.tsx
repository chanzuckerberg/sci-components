import { Tooltip } from "@czi-sds/components";
import { ThemeProvider } from "@mui/material/styles";
import { CheckIcon, CopyIcon } from "@phosphor-icons/react";
import { Fragment } from "react";
import { useMolstarTheme } from "../../hooks/useMolstarTheme";
import { useViewSetting } from "../../hooks/useViewSetting";
import {
  MolstarViewSettingsSubject,
  residueColorsForMode,
} from "../../utils/theme";
import Sequence from "./components/Sequence";
import { useCopySequence } from "./hooks/useCopySequence";
import { useSequenceWrappers } from "./hooks/useSequenceWrappers";
import {
  ChainLabel,
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
 * mode and the panel's background arrive through `viewSettings` and are watched
 * for changes rather than read once. The theme is re-supplied through a local
 * `ThemeProvider` for the Emotion styles and the SDS `Tooltip` below.
 */
export function createSequenceView(
  viewSettings: MolstarViewSettingsSubject
): () => JSX.Element {
  return function SequenceView() {
    const { mode, theme } = useMolstarTheme(viewSettings);
    const backgroundColor = useViewSetting(
      viewSettings,
      (s) => s.sequenceViewerBackgroundColor
    );
    const { entries, isEmpty, residueCount } = useSequenceWrappers();
    const { copied, copySequence } = useCopySequence(entries);

    if (isEmpty) {
      return (
        <ThemeProvider theme={theme}>
          <EmptyState
            backgroundColor={backgroundColor}
            className="msp-sequence"
          >
            No structure available
          </EmptyState>
        </ThemeProvider>
      );
    }

    const residueColors = residueColorsForMode(mode);
    // A single chain needs no caption: the panel title already names what is on
    // screen, and a lone "A | 1" label reads as noise.
    const showChainLabels = entries.length > 1;

    return (
      <ThemeProvider theme={theme}>
        <SequencePanel backgroundColor={backgroundColor}>
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
          <SequenceScroller backgroundColor={backgroundColor}>
            <SequenceScrollArea className="msp-sequence msp-sequence-wrapper-non-empty">
              {entries.map((s) => (
                <Fragment key={s.id}>
                  {showChainLabels && <ChainLabel>{s.label}</ChainLabel>}
                  {typeof s.wrapper === "string" ? (
                    <div className="msp-sequence-wrapper">{s.wrapper}</div>
                  ) : (
                    <Sequence
                      chainLabel={showChainLabels ? s.label : undefined}
                      residueColors={residueColors}
                      sequenceWrapper={s.wrapper}
                    />
                  )}
                </Fragment>
              ))}
            </SequenceScrollArea>
          </SequenceScroller>
        </SequencePanel>
      </ThemeProvider>
    );
  };
}
