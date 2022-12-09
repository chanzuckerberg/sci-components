export enum SDSWarningTypes {
  ButtonMissingSDSProps = "buttonMissingProps",
  ChipDeprecated = "chipDeprecated",
  MenuSelectDeprecated = "menuSelectDeprecated",
  ButtonIconMediumSize = "buttonIconMediumSize",
}

const SDS_WARNINGS = {
  [SDSWarningTypes.ButtonMissingSDSProps]: {
    hasWarned: false,
    message:
      "Warning: Buttons without sdsStyle or sdsType props will be deprecated.",
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
  [SDSWarningTypes.ButtonIconMediumSize]: {
    hasWarned: false,
    message: "Warning: A medium size ButtonIcon can only be of type tertiary!",
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
