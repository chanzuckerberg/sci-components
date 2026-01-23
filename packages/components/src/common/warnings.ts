export enum SDSWarningTypes {
  ButtonMinimalIsAllCaps = "buttonMinimalIsAllCaps",
  ButtonMissingSDSProps = "buttonMissingProps",
  ButtonIconMissingIconProp = "buttonIconMissingIconProp",
  ButtonDropdownMinimal = "buttonDropdownMinimal",
  ButtonDropdownV2Destructive = "buttonDropdownV2Destructive",
  ButtonToggleMissingIconProp = "buttonToggleMissingIconProp",
  ChipDeprecated = "chipDeprecated",
  MenuSelectDeprecated = "menuSelectDeprecated",
  TooltipSubtitle = "tooltipSubtitle",
  TooltipWidth = "tooltipWidth",
  TooltipInvertStyle = "tooltipInvertStyle",
  ContentCardActionsOnlyButtons = "contentCardActionsOnlyButtons",
  ClickableContentCardNumberOfButtons = "clickableContentCardNumberOfButtons",
}

export const SDS_WARNINGS = {
  [SDSWarningTypes.ButtonMinimalIsAllCaps]: {
    hasWarned: false,
    message:
      "Warning: isAllCaps can not be applied to buttons with sdsStyle='icon'.",
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
  [SDSWarningTypes.ButtonDropdownMinimal]: {
    hasWarned: false,
    message: "Warning: Button Dropdowns can not be of type minimal!",
  },
  [SDSWarningTypes.ButtonDropdownV2Destructive]: {
    hasWarned: false,
    message:
      "Warning: ButtonDropdownV2 does not support sdsType='destructive'. Use 'primary' or 'secondary' instead.",
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
  [SDSWarningTypes.TooltipInvertStyle]: {
    hasWarned: false,
    message:
      "Warning: Tooltips using the inverted or sdsStyle prop will be deprecated. Please use hasInvertedStyle instead!",
  },
  [SDSWarningTypes.ContentCardActionsOnlyButtons]: {
    hasWarned: false,
    message:
      "Warning: Only SDS buttons could be used within ContentCard Actions component slot!",
  },
  [SDSWarningTypes.ClickableContentCardNumberOfButtons]: {
    hasWarned: false,
    message:
      "Warning: Clickable Content Cards can only have one or no buttons!",
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
