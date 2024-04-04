import {
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  YAxisContainer,
  YAxisLabel,
  GeneButtonStyle,
  YAxisGeneName,
  InfoButtonWrapper,
  HoverContainer,
} from "./style";
import { SELECTED_STYLE, Y_AXIS_WIDTH, formatLabel } from "../utils";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

export interface Gene {
  name: string;
  index: number;
}

interface Props {
  geneNames: Gene[];
  labelClicked: (gene: Gene) => void;
  reverse?: boolean;
}

export const GENE_LABEL_HOVER_CONTAINER_ID = "gene-hover-container";

function GeneButton({
  active,
  gene,
  handleGeneClick,
}: {
  active?: boolean;
  gene: Gene;
  genesToDelete: string[];
  handleGeneClick: (gene: Gene) => void;
}): JSX.Element {
  const { name: geneName, index: geneIndex } = gene;
  const currentFont = `
      normal
      ${active ? SELECTED_STYLE.fontWeight : "normal"}
      ${SELECTED_STYLE.fontSize}px ${SELECTED_STYLE.fontFamily}
    `;

  const formattedLabel = useMemo(() => {
    return formatLabel(
      `${geneName}`,
      Y_AXIS_WIDTH - 40, // Gene label length is capped to this value
      currentFont
    ).text;
  }, [geneName, currentFont]);

  const memoizedHandleGeneClick = useCallback(() => {
    handleGeneClick(gene);
  }, [handleGeneClick, gene]);

  return (
    <GeneButtonStyle
      id={`gene-label-${geneName}`}
      onClick={memoizedHandleGeneClick}
      active={active}
    >
      <HoverContainer
        className="y-axis-hover-container"
        id={GENE_LABEL_HOVER_CONTAINER_ID}
      >
        <InfoButtonWrapper>{geneIndex}</InfoButtonWrapper>
      </HoverContainer>
      <YAxisLabel className={"gene-label-container"} index={geneIndex}>
        <YAxisGeneName font={currentFont}>{formattedLabel}</YAxisGeneName>
      </YAxisLabel>
    </GeneButtonStyle>
  );
}

export interface YAxisRefType {
  changeActiveLabel: (label: number | null) => void;
  getWrapperRef: () => React.RefObject<HTMLDivElement | null>;
}

const YAxisChart = forwardRef(
  (
    { geneNames, labelClicked, reverse = false }: Props,
    ref: React.Ref<YAxisRefType>
  ): JSX.Element => {
    const finalGeneNames = reverse ? [...geneNames].reverse() : geneNames;

    const heatmapCanvasSize = useSelector(
      (state: RootState) => state.dataReducer.heatmapCanvasSize
    );

    const wrapperRef = useRef<HTMLDivElement | null>(null);

    useImperativeHandle(ref, () => {
      return {
        changeActiveLabel(label) {
          setActiveGene(label);
        },
        getWrapperRef() {
          return wrapperRef;
        },
      };
    });

    const [activeGene, setActiveGene] = useState<number | null>(null);

    return (
      <YAxisContainer
        className="gene-labels"
        width={Y_AXIS_WIDTH}
        height={heatmapCanvasSize.width}
        ref={wrapperRef}
      >
        {finalGeneNames.map((gene) => (
          <GeneButton
            key={gene.name}
            gene={gene}
            genesToDelete={[""]}
            active={activeGene === gene.index}
            handleGeneClick={(theGene) => {
              if (activeGene === theGene.index) {
                setActiveGene(null);
              } else {
                setActiveGene(theGene.index);
              }
              labelClicked(theGene);
            }}
          />
        ))}
      </YAxisContainer>
    );
  }
);

export default memo(YAxisChart);
