import {
  SDSWarningTypes,
  showWarningIfFirstOccurence,
} from "src/common/warnings";

export {};

describe("showWarningIfFirstOccurence", () => {
  let consoleWarnSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleWarnSpy = jest.spyOn(console, "warn");
  });

  it("shows warning on first call", () => {
    showWarningIfFirstOccurence(SDSWarningTypes.ChipDeprecated);

    expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
  });

  it("does not show warning on subsequent calls", () => {
    showWarningIfFirstOccurence(SDSWarningTypes.ChipDeprecated);
    showWarningIfFirstOccurence(SDSWarningTypes.ChipDeprecated);
    showWarningIfFirstOccurence(SDSWarningTypes.ChipDeprecated);

    expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
  });
});
