import { type MockInstance } from "vitest";
import {
  SDSWarningTypes,
  showWarningIfFirstOccurence,
} from "@components/src/common/warnings";

export {};

describe("showWarningIfFirstOccurence", () => {
  let consoleWarnSpy: MockInstance;

  beforeEach(() => {
    consoleWarnSpy = vi.spyOn(console, "warn");
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
