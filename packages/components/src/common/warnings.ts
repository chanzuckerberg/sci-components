export enum SDSWarningTypes {
  ButtonMinimalIsAllCaps = "buttonMinimalIsAllCaps",
  ButtonMissingSDSProps = "buttonMissingProps",
  ButtonIconMissingIconProp = "buttonIconMissingIconProp",
  ButtonToggleMissingIconProp = "buttonToggleMissingIconProp",
  ChipDeprecated = "chipDeprecated",
  MenuSelectDeprecated = "menuSelectDeprecated",
  TooltipSubtitle = "tooltipSubtitle",
  TooltipWidth = "tooltipWidth",
  TooltipInverted = "tooltipInverted",
}

const SDS_WARNINGS = {
  [SDSWarningTypes.ButtonMinimalIsAllCaps]: {
    hasWarned: false,
    message:
      "Warning: isAllCaps is only applied to buttons with sdsStyle='minimal'.",
  },
  [SDSWarningTypes.ButtonMissingSDSProps]: {
    hasWarned: false,
    message:
      "Warning: Buttons without sdsStyle or sdsType props will be deprecated.",
  },
  [SDSWarningTypes.ButtonIconMissingIconProp]: {
    hasWarned: false,
    message:
      "Warning: Buttons with an SDS type of icon require an icon prop to be provided.",
  },
  [SDSWarningTypes.ButtonToggleMissingIconProp]: {
    hasWarned: false,
    message: "Warning: Button Toggles require an icon prop to be provided.",
  },
  [SDSWarningTypes.ChipDeprecated]: {
    hasWarned: false,
    message: "Warning: <Chip /> will be deprecated and replaced with <Tag />",
  },
  [SDSWarningTypes.MenuSelectDeprecated]: {
    hasWarned: false,
    message:
      "Warning: MenuSelect will be deprecated and replaced with <DropdownMenu />",
  },
  [SDSWarningTypes.TooltipSubtitle]: {
    hasWarned: false,
    message:
      "Warning: The 'subtitle' text is only available for dark tooltips!",
  },
  [SDSWarningTypes.TooltipWidth]: {
    hasWarned: false,
    message: "Warning: The 'wide' width is only available for light tooltips!",
  },
  [SDSWarningTypes.TooltipInverted]: {
    hasWarned: false,
    message:
      "Warning: Tooltips using the inverted prop will be deprecated. Please use sdsStyle: 'dark' | 'light' instead!",
  },
};

export const showWarningIfFirstOccurence = (warningType: SDSWarningTypes) => {
  if (!(<string>warningType in SDS_WARNINGS)) {
    // add undefined warning to prevent multiple warnings
    SDS_WARNINGS[warningType] = {
      hasWarned: false,
      message: `Warning: SDSWarningType ${warningType} is not defined in SDS_WARNINGS`,
    };
  }

  if (SDS_WARNINGS[warningType].hasWarned) {
    return;
  }

  // eslint-disable-next-line no-console
  console.warn(SDS_WARNINGS[warningType].message);

  SDS_WARNINGS[warningType].hasWarned = true;
};
