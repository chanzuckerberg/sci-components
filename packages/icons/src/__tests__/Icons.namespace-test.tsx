import {
  createSdsIcon,
  Icon,
  IconProps,
  IconWeight,
  AtlasIcon,
  BiohubIcon,
  ChartPieFilledIcon,
  ChartPieXIcon,
  CollapseIcon,
  ExpandIcon,
  FoldIcon,
  GenerateIcon,
  GitHubIcon,
  MaximizeSmallIcon,
  MinimizeSmallIcon,
  PredictIcon,
  SparkleIcon,
  SparklesIcon,
  UmapIcon,
  WandSparkleIcon,
} from "@czi-sds/icons";
import React from "react";

const IconsNameSpaceTest = (props: IconProps) => {
  const weight: IconWeight = "bold";
  const CustomIcon: Icon = createSdsIcon(
    "CustomIcon",
    <path d="M0 0H256V256H0Z" />
  );

  return (
    <>
      <AtlasIcon />
      <BiohubIcon size={24} />
      <ChartPieFilledIcon color="#3867fa" />
      <ChartPieXIcon weight={weight} />
      <CollapseIcon mirrored />
      <ExpandIcon alt="Expand" />
      <FoldIcon size="1.5rem" />
      <GenerateIcon className="custom" />
      <GitHubIcon onClick={() => undefined} />
      <MaximizeSmallIcon {...props} />
      <MinimizeSmallIcon size={32} color="currentColor" weight="duotone" />
      <PredictIcon />
      <SparkleIcon />
      <SparklesIcon />
      <UmapIcon />
      <WandSparkleIcon />
      <CustomIcon size={16} />
    </>
  );
};
