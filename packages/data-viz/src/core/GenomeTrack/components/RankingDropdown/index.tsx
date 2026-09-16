import { ButtonDropdown, Menu, MenuItem } from "@czi-sds/components";
import { useCallback, useState } from "react";
import { ActivationRanking } from "../../GenomeTrack.types";
import { TrackRankingControl } from "../../style";

export const RANKING_TEST_ID = "genome-track-ranking";
export const RANKING_OPTION_TEST_ID = {
  peak: "genome-track-ranking-peak",
  zscore: "genome-track-ranking-zscore",
} as const;

/**
 * Display names for the two rankings.
 *
 * The wire values are the tool's — `zscore` and `peak`, which is what
 * `rank_by` takes — and these are the designer's words for them. "Raw" rather
 * than "Peak" because that is what the label says in the design; the mapping is
 * spelled out here so nobody reads "Raw" and sends `raw` to the server, which
 * the tool would reject.
 */
const RANKING_LABEL: Record<ActivationRanking, string> = {
  peak: "Raw",
  zscore: "Z-Score",
};

/** The order the menu lists them, z-score first because it is the default. */
const RANKINGS: ActivationRanking[] = ["zscore", "peak"];

interface RankingDropdownProps {
  value: ActivationRanking;
  onChange: (ranking: ActivationRanking) => void;
  /** Top of the features section's header line, in px. */
  top: number;
  /** Height of that line, so the control can centre on it. */
  height: number;
}

/**
 * Chooses how the features are ranked: by z-score or by raw activation.
 *
 * **This does not transform anything on screen.** `rank_by` is an input to the
 * tool, not a view option: it changes which features come back and in what
 * order, so selecting one is a request for different data rather than a
 * different rendering of the data in hand. The component reports the choice and
 * waits, exactly as it does for the viewport.
 *
 * That is also why it is controlled with no internal fallback. Held locally the
 * label would change and nothing else would, which reads as a broken control —
 * worse than no control. It is rendered only when a caller is listening.
 *
 * Beside the plot rather than inside it, like the sequence copy control: the
 * plot is `role="img"`, which cannot contain a control.
 */
export const RankingDropdown = ({
  height,
  onChange,
  top,
  value,
}: RankingDropdownProps): JSX.Element => {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);

  const select = useCallback(
    (ranking: ActivationRanking) => {
      setAnchor(null);
      onChange(ranking);
    },
    [onChange]
  );

  return (
    <TrackRankingControl style={{ height, top }}>
      <ButtonDropdown
        aria-expanded={anchor !== null}
        aria-haspopup="menu"
        aria-label={`Rank features by ${RANKING_LABEL[value]}`}
        data-testid={RANKING_TEST_ID}
        onClick={(event) => setAnchor(event.currentTarget)}
        sdsStyle="minimal"
        sdsType="secondary"
        // Small: 11 px, the smallest the SDS button scale goes, which is the
        // closest it gets to the 10 px section label beside it. The chevron
        // comes down to `xxs` with it.
        size="small"
      >
        {RANKING_LABEL[value]}
      </ButtonDropdown>

      <Menu
        anchorEl={anchor}
        onClose={() => setAnchor(null)}
        open={anchor !== null}
      >
        {RANKINGS.map((ranking) => (
          <MenuItem
            data-testid={RANKING_OPTION_TEST_ID[ranking]}
            key={ranking}
            onClick={() => select(ranking)}
            selected={ranking === value}
          >
            {RANKING_LABEL[ranking]}
          </MenuItem>
        ))}
      </Menu>
    </TrackRankingControl>
  );
};

export default RankingDropdown;
