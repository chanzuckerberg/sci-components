export enum SDSWarningTypes {
  ButtonMissingSDSProps = "buttonMissingProps",
  ChipDeprecated = "chipDeprecated",
  MenuSelectDeprecated = "menuSelectDeprecated",
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
};

export const showWarningIfFirstOccurence = (warningType: SDSWarningTypes) => {
  if (SDS_WARNINGS[warningType].hasWarned) return;

  // eslint-disable-next-line no-console
  console.warn(SDS_WARNINGS[warningType].message);

  SDS_WARNINGS[warningType].hasWarned = true;
};
