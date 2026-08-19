import {
  createSdsIcon,
  Icon,
  IconProps,
  IconWeight,
  SdsAtlasIcon,
  SdsBiohubIcon,
  SdsChartPieFilledIcon,
  SdsChartPieXIcon,
  SdsCollapseIcon,
  SdsExpandIcon,
  SdsFoldIcon,
  SdsGenerateIcon,
  SdsGitHubIcon,
  SdsMaximizeSmallIcon,
  SdsMinimizeSmallIcon,
  SdsPredictIcon,
  SdsSparkleIcon,
  SdsSparklesIcon,
  SdsUmapIcon,
  SdsWandSparkleIcon,
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
      <SdsAtlasIcon />
      <SdsBiohubIcon size={24} />
      <SdsChartPieFilledIcon color="#3867fa" />
      <SdsChartPieXIcon weight={weight} />
      <SdsCollapseIcon mirrored />
      <SdsExpandIcon alt="Expand" />
      <SdsFoldIcon size="1.5rem" />
      <SdsGenerateIcon className="custom" />
      <SdsGitHubIcon onClick={() => undefined} />
      <SdsMaximizeSmallIcon {...props} />
      <SdsMinimizeSmallIcon size={32} color="currentColor" weight="duotone" />
      <SdsPredictIcon />
      <SdsSparkleIcon />
      <SdsSparklesIcon />
      <SdsUmapIcon />
      <SdsWandSparkleIcon />
      <CustomIcon size={16} />
    </>
  );
};
