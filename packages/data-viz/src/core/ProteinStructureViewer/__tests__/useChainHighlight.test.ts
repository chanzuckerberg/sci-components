import { componentChainId } from "../hooks/useChainHighlight";

function component(key: string, ref = key) {
  return { cell: { transform: { ref } }, key };
}

describe("componentChainId", () => {
  it("reads the chain id off a polymer or ligand tag", () => {
    expect(componentChainId(component("structure-component-polymer-A"))).toBe(
      "A"
    );
    expect(componentChainId(component("structure-component-ligand-B"))).toBe(
      "B"
    );
  });

  it("does not treat a prefix of another chain id as a match", () => {
    expect(componentChainId(component("structure-component-polymer-AA"))).toBe(
      "AA"
    );
  });

  it("falls back to the transform ref when the key is missing", () => {
    expect(
      componentChainId({
        cell: { transform: { ref: "structure-component-polymer-C" } },
      })
    ).toBe("C");
  });
});
