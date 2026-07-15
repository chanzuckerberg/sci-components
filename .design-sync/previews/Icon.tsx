// Owned Icon preview for claude.ai/design.
//
// The generated preview couldn't build: the storybook IconBank story imports
// the raw SVG map (`@components/src/core/Icon/map` — svgr `ReactComponent`
// named exports), which esbuild's dataurl loader can't provide, so the whole
// story module failed to compile and Icon fell back to the floor card.
//
// This owned preview renders icons through the PUBLIC API only —
// `<Icon sdsIcon="Name" />` resolves against the full icon map already compiled
// into window.SDS, so no raw .svg import is needed. The name→size map is
// mirrored from the IconNameToSizes interface in the component's map.ts (each
// icon only supports a subset of sizes; rendering an unsupported size throws).
import * as React from "react";
import RawIcon from "@components/src/core/Icon";

const ICON_SIZES: Record<string, string> = {"ArrowsDiagonalIn":"s","ArrowsDiagonalOut":"s","ArrowsUpDown":"s","Bacteria":"s","BarChartHorizontal3":"s","BarChartVertical3":"s","BarChartVertical4":"s","Book":"s","Check":"s","CheckCircle":"s","ChevronDown":"s","ChevronDown2":"s","ChevronLeft2":"s","ChevronLeft":"s","ChevronRight2":"s","ChevronRight":"s","ChevronUp":"s","ChevronUp2":"s","CirclesOverlap2":"s","Cli":"l","Code":"s","Compass":"l","Copy":"s","Cube":"s","DNA":"l","Document":"s","DotPlot":"s","DotsHorizontal":"s","Download":"s","Droplet":"s","Edit":"s","Envelope":"s","ExclamationMarkCircle":"s","ExclamationMarkSpeechBubble":"l","EyeClosed":"s","EyeOpen":"s","Filter":"s","FlagCheck":"s","FlagOutline":"s","FlagQuestionMark":"s","FlagXMark":"s","Flask":"l","FlaskPrivate":"l","FlaskPublic":"l","Gear":"s","Gene":"s","Github":"s","Globe":"s","GlobeBasic":"l","Grid":"l","GridDots3":"l","GridPrivate":"l","GridPublic":"l","House":"s","Hand":"s","HandOpen":"s","HandPointer":"s","Image":"s","InfoCircle":"s","InfoSpeechBubble":"l","Label":"s","Lasso":"s","LifeRing":"s","LightBulb":"s","LinesDashed3Solid1":"s","LinesHorizontal3":"s","Link":"s","List":"s","Loading":"s","Lock":"s","LockCircle":"s","Maximize":"s","Minimize":"s","Minus":"s","Open":"s","Package":"l","Pause":"l","People":"s","Percentage":"s","Person":"s","PieChart":"s","PieChartXMark":"s","Pin":"s","PinLocation":"s","Play":"l","Plus":"s","PlusCircle":"s","ProjectPrivate":"l","ProjectPublic":"l","PuzzlePiece":"s","QuestionMark":"l","QuestionMarkCircle":"s","Quote":"l","Read":"l","Refresh":"s","Report":"l","Rocket":"l","RotateLeft":"s","RotateRight":"s","Save":"l","Scale":"s","ScatterPlot":"s","Search":"s","SearchLinesHorizontal3":"s","Send":"l","Share":"l","SlidersHorizontal":"l","Sparkle":"s","Sparkles":"s","SpeechBubbles":"l","SquareOnDashedSquare":"l","SquareOnSquareArrowDownRight":"s","Starburst":"s","Star":"l","Table":"s","ThumbsDown":"s","ThumbsUp":"s","TrashCan":"s","TreeDendogram":"l","TreeHorizontal":"s","TreeHorizontalPrivate":"l","TreeHorizontalPublic":"l","TreeHorizontalTopRightFilled":"l","TreeVertical":"s","TriangleDown":"s","TriangleLeft":"s","TriangleRight":"s","TriangleUp":"s","Update":"l","Umap":"s","Upload":"l","Virus":"l","VirusCircleS":"l","Widget":"l","XMark":"s","XMarkCircle":"s"};
const ICON_NAMES = Object.keys(ICON_SIZES);

// Default story: single large indigo icon (mirrors the repo's Default args).
export function Default() {
  return <RawIcon sdsIcon="CheckCircle" sdsSize="xl" color="indigo" />;
}

// Test story: mirrors the repo's Test render (medium indigo CheckCircle).
export function Test() {
  return <RawIcon sdsIcon="CheckCircle" sdsSize="l" color="indigo" />;
}

// IconBank story: the full icon set as a labelled grid — the same content the
// repo's searchable IconBank shows, via the public API. Each icon renders at a
// size it actually supports.
export function IconBank() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(96px, 1fr))",
        gap: 8,
        padding: 16,
        fontFamily: "Inter, sans-serif",
      }}
    >
      {ICON_NAMES.map((name) => (
        <div
          key={name}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            padding: "16px 8px",
            border: "1px solid rgba(0,0,0,0.1)",
            borderRadius: 6,
          }}
        >
          <RawIcon sdsIcon={name as never} sdsSize={ICON_SIZES[name] as never} color="gray" shade={500 as never} />
          <span style={{ fontSize: 11, color: "#6c6c6c", textAlign: "center", wordBreak: "break-word" }}>
            {name}
          </span>
        </div>
      ))}
    </div>
  );
}
