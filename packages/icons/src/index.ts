/*
 * The icon types come from Phosphor and are re-exported here as a convenience:
 * typing a prop that takes an icon needs `Icon`, and a type-only re-export costs
 * nothing at runtime. The values they belong to stay where they are, so
 * `IconBase` and `IconContext` have one home, `@phosphor-icons/react`, rather
 * than two.
 */
export type { Icon, IconProps, IconWeight } from "@phosphor-icons/react";

export { createSdsIcon } from "./lib/createSdsIcon";

export { SdsAtlasIcon } from "./icons/Atlas";
export { SdsBiohubIcon } from "./icons/Biohub";
export { SdsChartPieFilledIcon } from "./icons/ChartPieFilled";
export { SdsChartPieXIcon } from "./icons/ChartPieX";
export { SdsCollapseIcon } from "./icons/Collapse";
export { SdsExpandIcon } from "./icons/Expand";
export { SdsFoldIcon } from "./icons/Fold";
export { SdsGenerateIcon } from "./icons/Generate";
export { SdsGitHubIcon } from "./icons/GitHub";
export { SdsMaximizeSmallIcon } from "./icons/MaximizeSmall";
export { SdsMinimizeSmallIcon } from "./icons/MinimizeSmall";
export { SdsPredictIcon } from "./icons/Predict";
export { SdsSparkleIcon } from "./icons/Sparkle";
export { SdsSparklesIcon } from "./icons/Sparkles";
export { SdsUmapIcon } from "./icons/Umap";
export { SdsWandSparkleIcon } from "./icons/WandSparkle";
