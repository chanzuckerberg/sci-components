import { FC } from "react";
import { ReactComponent as IconBarChartHorizontal3Small } from "../../common/svgs/IconBarChartHorizontal3Small.svg";
import { ReactComponent as IconBarChartVertical3Small } from "../../common/svgs/IconBarChartVertical3Small.svg";
import { ReactComponent as IconBarChartVertical4Small } from "../../common/svgs/IconBarChartVertical4Small.svg";
import { ReactComponent as IconCheckCircleLarge } from "../../common/svgs/IconCheckCircleLarge.svg";
import { ReactComponent as IconCheckCircleSmall } from "../../common/svgs/IconCheckCircleSmall.svg";
import { ReactComponent as IconCheckSmall } from "../../common/svgs/IconCheckSmall.svg";
import { ReactComponent as IconChevronDownLarge } from "../../common/svgs/IconChevronDownLarge.svg";
import { ReactComponent as IconChevronDownSmall } from "../../common/svgs/IconChevronDownSmall.svg";
import { ReactComponent as IconChevronRightLarge } from "../../common/svgs/IconChevronRightLarge.svg";
import { ReactComponent as IconChevronRightSmall } from "../../common/svgs/IconChevronRightSmall.svg";
import { ReactComponent as IconChevronUpLarge } from "../../common/svgs/IconChevronUpLarge.svg";
import { ReactComponent as IconChevronUpSmall } from "../../common/svgs/IconChevronUpSmall.svg";
import { ReactComponent as IconCopyLarge } from "../../common/svgs/IconCopyLarge.svg";
import { ReactComponent as IconCopySmall } from "../../common/svgs/IconCopySmall.svg";
import { ReactComponent as IconDownloadLarge } from "../../common/svgs/IconDownloadLarge.svg";
import { ReactComponent as IconDownloadSmall } from "../../common/svgs/IconDownloadSmall.svg";
import { ReactComponent as IconEditSmall } from "../../common/svgs/IconEditSmall.svg";
import { ReactComponent as IconExclamationMarkCircleLarge } from "../../common/svgs/IconExclamationMarkCircleLarge.svg";
import { ReactComponent as IconExclamationMarkCircleSmall } from "../../common/svgs/IconExclamationMarkCircleSmall.svg";
import { ReactComponent as IconEyeOpenSmall } from "../../common/svgs/IconEyeOpenSmall.svg";
import { ReactComponent as IconFlaskLarge } from "../../common/svgs/IconFlaskLarge.svg";
import { ReactComponent as IconFlaskPrivateLarge } from "../../common/svgs/IconFlaskPrivateLarge.svg";
import { ReactComponent as IconFlaskPublicLarge } from "../../common/svgs/IconFlaskPublicLarge.svg";
import { ReactComponent as IconGlobeSmall } from "../../common/svgs/IconGlobeSmall.svg";
import { ReactComponent as IconGridLarge } from "../../common/svgs/IconGridLarge.svg";
import { ReactComponent as IconGridPrivateLarge } from "../../common/svgs/IconGridPrivateLarge.svg";
import { ReactComponent as IconGridPublicLarge } from "../../common/svgs/IconGridPublicLarge.svg";
import { ReactComponent as IconInfoCircleLarge } from "../../common/svgs/IconInfoCircleLarge.svg";
import { ReactComponent as IconInfoCircleSmall } from "../../common/svgs/IconInfoCircleSmall.svg";
import { ReactComponent as IconInfoSpeechBubbleLarge } from "../../common/svgs/IconInfoSpeechBubbleLarge.svg";
import { ReactComponent as IconLightBulbSmall } from "../../common/svgs/IconLightBulbSmall.svg";
import { ReactComponent as IconLinesHorizontalSmall } from "../../common/svgs/IconLinesHorizontalSmall.svg";
import { ReactComponent as IconLinkSmall } from "../../common/svgs/IconLinkSmall.svg";
import { ReactComponent as IconListSmall } from "../../common/svgs/IconListSmall.svg";
import { ReactComponent as IconLoadingLarge } from "../../common/svgs/IconLoadingLarge.svg";
import { ReactComponent as IconLoadingSmall } from "../../common/svgs/IconLoadingSmall.svg";
import { ReactComponent as IconLockCircleSmall } from "../../common/svgs/IconLockCircleSmall.svg";
import { ReactComponent as IconLockSmall } from "../../common/svgs/IconLockSmall.svg";
import { ReactComponent as IconMinusSmall } from "../../common/svgs/IconMinusSmall.svg";
import { ReactComponent as IconOpenSmall } from "../../common/svgs/IconOpenSmall.svg";
import { ReactComponent as IconPeopleLarge } from "../../common/svgs/IconPeopleLarge.svg";
import { ReactComponent as IconPeopleSmall } from "../../common/svgs/IconPeopleSmall.svg";
import { ReactComponent as IconPercentageSmall } from "../../common/svgs/IconPercentageSmall.svg";
import { ReactComponent as IconPlusCircleSmall } from "../../common/svgs/IconPlusCircleSmall.svg";
import { ReactComponent as IconPlusSmall } from "../../common/svgs/IconPlusSmall.svg";
import { ReactComponent as IconProjectPrivateLarge } from "../../common/svgs/IconProjectPrivateLarge.svg";
import { ReactComponent as IconProjectPublicLarge } from "../../common/svgs/IconProjectPublicLarge.svg";
import { ReactComponent as IconPuzzlePieceSmall } from "../../common/svgs/IconPuzzlePieceSmall.svg";
import { ReactComponent as IconQuestionMarkLarge } from "../../common/svgs/IconQuestionMarkLarge.svg";
import { ReactComponent as IconRefreshLarge } from "../../common/svgs/IconRefreshLarge.svg";
import { ReactComponent as IconRefreshSmall } from "../../common/svgs/IconRefreshSmall.svg";
import { ReactComponent as IconSaveLarge } from "../../common/svgs/IconSaveLarge.svg";
import { ReactComponent as IconSearchLarge } from "../../common/svgs/IconSearchLarge.svg";
import { ReactComponent as IconSearchSmall } from "../../common/svgs/IconSearchSmall.svg";
import { ReactComponent as IconShareLarge } from "../../common/svgs/IconShareLarge.svg";
import { ReactComponent as IconSlidersHorizontalLarge } from "../../common/svgs/IconSlidersHorizontalLarge.svg";
import { ReactComponent as IconTableSmall } from "../../common/svgs/IconTableSmall.svg";
import { ReactComponent as IconTreeDendogramLarge } from "../../common/svgs/IconTreeDendogramLarge.svg";
import { ReactComponent as IconTreeHorizontalLarge } from "../../common/svgs/IconTreeHorizontalLarge.svg";
import { ReactComponent as IconTreeHorizontalPrivateLarge } from "../../common/svgs/IconTreeHorizontalPrivateLarge.svg";
import { ReactComponent as IconTreeHorizontalPublicLarge } from "../../common/svgs/IconTreeHorizontalPublicLarge.svg";
import { ReactComponent as IconTreeHorizontalSmall } from "../../common/svgs/IconTreeHorizontalSmall.svg";
import { ReactComponent as IconTreeVerticalSmall } from "../../common/svgs/IconTreeVerticalSmall.svg";
import { ReactComponent as IconXMarkCircleSmall } from "../../common/svgs/IconXMarkCircleSmall.svg";
import { ReactComponent as IconXMarkLarge } from "../../common/svgs/IconXMarkLarge.svg";
import { ReactComponent as IconXMarkSmall } from "../../common/svgs/IconXMarkSmall.svg";

export interface IconNameToSizes {
  barChartHorizontal3: "xs" | "s";
  barChartVertical3: "xs" | "s";
  barChartVertical4: "xs" | "s";
  check: "xs" | "s";
  checkCircle: "xs" | "s" | "l" | "xl";
  chevronDown: "xs" | "s" | "l" | "xl";
  chevronRight: "xs" | "s" | "l" | "xl";
  chevronUp: "xs" | "s" | "l" | "xl";
  copy: "xs" | "s" | "l" | "xl";
  download: "xs" | "s" | "l" | "xl";
  edit: "xs" | "s" | "l" | "xl";
  exclamationMarkCircle: "xs" | "s" | "l" | "xl";
  eyeOpen: "xs" | "s";
  flask: "l" | "xl";
  flaskPrivate: "xl";
  flaskPublic: "xl";
  globe: "xs" | "s";
  grid: "l" | "xl";
  gridPrivate: "xl";
  gridPublic: "xl";
  infoCircle: "xs" | "s" | "l" | "xl";
  infoSpeechBubble: "l" | "xl";
  lightBulb: "xs" | "s";
  linesHorizontal: "xs" | "s";
  link: "xs" | "s";
  list: "xs" | "s";
  loading: "xs" | "s" | "l" | "xl";
  lock: "xs" | "s";
  lockCircle: "xs" | "s";
  minus: "xs" | "s";
  open: "xs" | "s";
  people: "xs" | "s" | "l" | "xl";
  percentage: "xs" | "s";
  plus: "xs" | "s";
  plusCircle: "xs" | "s";
  projectPrivate: "xl";
  projectPublic: "xl";
  puzzlePiece: "xs" | "s";
  questionMark: "l" | "xl";
  refresh: "xs" | "s" | "l" | "xl";
  save: "l" | "xl";
  search: "xs" | "s" | "l" | "xl";
  share: "l" | "xl";
  slidersHorizontal: "l" | "xl";
  table: "xs" | "s";
  treeDendogram: "l" | "xl";
  treeHorizontal: "xs" | "s" | "l" | "xl";
  treeHorizontalPrivate: "xl";
  treeHorizontalPublic: "xl";
  treeVertical: "xs" | "s";
  xMark: "xs" | "s" | "l" | "xl";
  xMarkCircle: "xs" | "s";
}

type Props = Record<
  keyof IconNameToSizes,
  {
    largeIcon: FC<CustomSVGProps> | null;
    smallIcon: FC<CustomSVGProps> | null;
  }
>;

export const iconMap: Props = {
  barChartHorizontal3: {
    largeIcon: null,
    smallIcon: IconBarChartHorizontal3Small,
  },
  barChartVertical3: {
    largeIcon: null,
    smallIcon: IconBarChartVertical3Small,
  },
  barChartVertical4: {
    largeIcon: null,
    smallIcon: IconBarChartVertical4Small,
  },
  check: {
    largeIcon: null,
    smallIcon: IconCheckSmall,
  },
  checkCircle: {
    largeIcon: IconCheckCircleLarge,
    smallIcon: IconCheckCircleSmall,
  },
  chevronDown: {
    largeIcon: IconChevronDownLarge,
    smallIcon: IconChevronDownSmall,
  },
  chevronRight: {
    largeIcon: IconChevronRightLarge,
    smallIcon: IconChevronRightSmall,
  },
  chevronUp: {
    largeIcon: IconChevronUpLarge,
    smallIcon: IconChevronUpSmall,
  },
  copy: {
    largeIcon: IconCopyLarge,
    smallIcon: IconCopySmall,
  },
  download: {
    largeIcon: IconDownloadLarge,
    smallIcon: IconDownloadSmall,
  },
  edit: {
    largeIcon: null,
    smallIcon: IconEditSmall,
  },
  exclamationMarkCircle: {
    largeIcon: IconExclamationMarkCircleLarge,
    smallIcon: IconExclamationMarkCircleSmall,
  },
  eyeOpen: {
    largeIcon: null,
    smallIcon: IconEyeOpenSmall,
  },
  flask: {
    largeIcon: IconFlaskLarge,
    smallIcon: null,
  },
  flaskPrivate: {
    largeIcon: IconFlaskPrivateLarge,
    smallIcon: null,
  },
  flaskPublic: {
    largeIcon: IconFlaskPublicLarge,
    smallIcon: null,
  },
  globe: {
    largeIcon: null,
    smallIcon: IconGlobeSmall,
  },
  grid: {
    largeIcon: IconGridLarge,
    smallIcon: null,
  },
  gridPrivate: {
    largeIcon: IconGridPrivateLarge,
    smallIcon: null,
  },
  gridPublic: {
    largeIcon: IconGridPublicLarge,
    smallIcon: null,
  },
  infoCircle: {
    largeIcon: IconInfoCircleLarge,
    smallIcon: IconInfoCircleSmall,
  },
  infoSpeechBubble: {
    largeIcon: IconInfoSpeechBubbleLarge,
    smallIcon: null,
  },
  lightBulb: {
    largeIcon: null,
    smallIcon: IconLightBulbSmall,
  },
  linesHorizontal: {
    largeIcon: null,
    smallIcon: IconLinesHorizontalSmall,
  },
  link: {
    largeIcon: null,
    smallIcon: IconLinkSmall,
  },
  list: {
    largeIcon: null,
    smallIcon: IconListSmall,
  },
  loading: {
    largeIcon: IconLoadingLarge,
    smallIcon: IconLoadingSmall,
  },
  lock: {
    largeIcon: null,
    smallIcon: IconLockSmall,
  },
  lockCircle: {
    largeIcon: null,
    smallIcon: IconLockCircleSmall,
  },
  minus: {
    largeIcon: null,
    smallIcon: IconMinusSmall,
  },
  open: {
    largeIcon: null,
    smallIcon: IconOpenSmall,
  },
  people: {
    largeIcon: IconPeopleLarge,
    smallIcon: IconPeopleSmall,
  },
  percentage: {
    largeIcon: null,
    smallIcon: IconPercentageSmall,
  },
  plus: {
    largeIcon: null,
    smallIcon: IconPlusSmall,
  },
  plusCircle: {
    largeIcon: null,
    smallIcon: IconPlusCircleSmall,
  },
  projectPrivate: {
    largeIcon: IconProjectPrivateLarge,
    smallIcon: null,
  },
  projectPublic: {
    largeIcon: IconProjectPublicLarge,
    smallIcon: null,
  },
  puzzlePiece: {
    largeIcon: null,
    smallIcon: IconPuzzlePieceSmall,
  },
  questionMark: {
    largeIcon: IconQuestionMarkLarge,
    smallIcon: null,
  },
  refresh: {
    largeIcon: IconRefreshLarge,
    smallIcon: IconRefreshSmall,
  },
  save: {
    largeIcon: IconSaveLarge,
    smallIcon: null,
  },
  search: {
    largeIcon: IconSearchLarge,
    smallIcon: IconSearchSmall,
  },
  share: {
    largeIcon: IconShareLarge,
    smallIcon: null,
  },
  slidersHorizontal: {
    largeIcon: IconSlidersHorizontalLarge,
    smallIcon: null,
  },
  table: {
    largeIcon: null,
    smallIcon: IconTableSmall,
  },
  treeDendogram: {
    largeIcon: IconTreeDendogramLarge,
    smallIcon: null,
  },
  treeHorizontal: {
    largeIcon: IconTreeHorizontalLarge,
    smallIcon: IconTreeHorizontalSmall,
  },
  treeHorizontalPrivate: {
    largeIcon: IconTreeHorizontalPrivateLarge,
    smallIcon: null,
  },
  treeHorizontalPublic: {
    largeIcon: IconTreeHorizontalPublicLarge,
    smallIcon: null,
  },
  treeVertical: {
    largeIcon: null,
    smallIcon: IconTreeVerticalSmall,
  },
  xMark: {
    largeIcon: IconXMarkLarge,
    smallIcon: IconXMarkSmall,
  },
  xMarkCircle: {
    largeIcon: null,
    smallIcon: IconXMarkCircleSmall,
  },
};
