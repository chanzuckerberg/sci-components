/*
 * The icon types come from Phosphor and are re-exported here as a convenience:
 * typing a prop that takes an icon needs `Icon`, and a type-only re-export costs
 * nothing at runtime. The values they belong to stay where they are, so
 * `IconBase` and `IconContext` have one home, `@phosphor-icons/react`, rather
 * than two.
 */
export type { Icon, IconProps, IconWeight } from "@phosphor-icons/react";

export { createSdsIcon } from "./lib/createSdsIcon";

export { AtlasIcon } from "./icons/Atlas";
export { BiohubIcon } from "./icons/Biohub";
export { ChartPieFilledIcon } from "./icons/ChartPieFilled";
export { ChartPieXIcon } from "./icons/ChartPieX";
export { CollapseIcon } from "./icons/Collapse";
export { ExpandIcon } from "./icons/Expand";
export { FoldIcon } from "./icons/Fold";
export { GenerateIcon } from "./icons/Generate";
export { GitHubIcon } from "./icons/GitHub";
export { MaximizeSmallIcon } from "./icons/MaximizeSmall";
export { MinimizeSmallIcon } from "./icons/MinimizeSmall";
export { PredictIcon } from "./icons/Predict";
export { SparkleIcon } from "./icons/Sparkle";
export { SparklesIcon } from "./icons/Sparkles";
export { UmapIcon } from "./icons/Umap";
export { WandSparkleIcon } from "./icons/WandSparkle";
