import { ButtonDropdown, Menu, MenuItem } from "@czi-sds/components";
import { useCallback, useState } from "react";
import { ActivationRanking } from "../../GenomeTrack.types";
import { TrackOverlayControl } from "../../style";

export const RANKING_TEST_ID = "genome-track-ranking";
export const RANKING_OPTION_TEST_ID = {
  peak: "genome-track-ranking-peak",
  zscore: "genome-track-ranking-zscore",
} as const;

/** Display names for the rankings; the values stay `peak` and `zscore`. */
const RANKING_LABEL: Record<ActivationRanking, string> = {
  peak: "Raw",
  zscore: "Z-Score",
};

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
 * Chooses how the features are ranked. It only reports the choice; the caller
 * supplies the re-ranked data.
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
    <TrackOverlayControl style={{ height, top }}>
      <ButtonDropdown
        aria-expanded={anchor !== null}
        aria-haspopup="menu"
        aria-label={`Rank features by ${RANKING_LABEL[value]}`}
        data-testid={RANKING_TEST_ID}
        onClick={(event) => setAnchor(event.currentTarget)}
        sdsStyle="minimal"
        sdsType="secondary"
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
    </TrackOverlayControl>
  );
};

export default RankingDropdown;
