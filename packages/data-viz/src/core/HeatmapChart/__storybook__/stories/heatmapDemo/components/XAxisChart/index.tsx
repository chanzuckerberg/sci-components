import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  XAxisContainer,
  XAxisLabel,
  GeneButtonStyle,
  XAxisGeneName,
  InfoButtonWrapper,
  HoverContainer,
} from "./style";
import { SELECTED_STYLE, X_AXIS_WIDTH, formatLabel } from "../utils";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

export interface Gene {
  name: string;
  index: number;
}
interface Props {
  geneNames: Gene[];
  labelClicked: (gene: Gene) => void;
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
      X_AXIS_WIDTH - 30, // Gene label length is capped to this value
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
        className="x-axis-hover-container"
        id={GENE_LABEL_HOVER_CONTAINER_ID}
      >
        <InfoButtonWrapper>{geneIndex}</InfoButtonWrapper>
      </HoverContainer>
      <XAxisLabel className={"gene-label-container"}>
        <XAxisGeneName font={currentFont}>{formattedLabel}</XAxisGeneName>
      </XAxisLabel>
    </GeneButtonStyle>
  );
}

export interface XAxisRefType {
  changeActiveLabel: (label: number | null) => void;
  getWrapperRef: () => React.RefObject<HTMLDivElement | null>;
}

const XAxisChart = forwardRef(
  (
    { geneNames, labelClicked }: Props,
    ref: React.Ref<XAxisRefType>
  ): JSX.Element => {
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
      <XAxisContainer
        className="gene-labels"
        width={heatmapCanvasSize.width}
        height={X_AXIS_WIDTH}
        ref={wrapperRef}
      >
        {geneNames.map((gene) => (
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
      </XAxisContainer>
    );
  }
);

export default XAxisChart;
