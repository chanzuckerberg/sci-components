export enum SDSWarningTypes {
  ButtonMissingSDSProps = "buttonMissingProps",
}

const SDS_WARNINGS = {
  [SDSWarningTypes.ButtonMissingSDSProps]: {
    hasWarned: false,
    message:
      "Warning: Buttons without sdsStyle or sdsType props will be deprecated.",
  },
};

export const showWarningIfFirstOccurence = (warningType: SDSWarningTypes) => {
  if (SDS_WARNINGS[warningType].hasWarned) return;

  // eslint-disable-next-line no-console
  console.warn(SDS_WARNINGS[warningType].message);

  SDS_WARNINGS[warningType].hasWarned = true;
};
