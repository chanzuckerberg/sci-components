import type { PluginUISpec } from "molstar/lib/mol-plugin-ui/spec";
import { PluginConfig } from "molstar/lib/mol-plugin/config";
import { mergeMolstarSpec } from "../utils/molstarSpec";

/**
 * How a consumer reaches the whole of Mol*'s configuration without the viewer
 * growing a prop per setting. The rules are worth pinning: object-valued keys
 * merge with the consumer winning, list-valued keys append, and appending is
 * what makes `config` overridable, since Mol* folds that list into a Map in
 * order and a later entry wins.
 */
function baseSpec(): PluginUISpec {
  return {
    behaviors: [{ transformer: "ours" } as never],
    canvas3d: {
      camera: { helper: { axes: { name: "on", params: {} } } },
      renderer: { backgroundColor: 0xffffff as never, colorMarker: true },
    },
    components: { remoteState: "none" },
    config: [[PluginConfig.Viewport.ShowExpand, false]],
    layout: { initial: { isExpanded: false } },
  };
}

describe("mergeMolstarSpec", () => {
  it("returns the viewer's spec untouched when nothing is overridden", () => {
    const base = baseSpec();

    expect(mergeMolstarSpec(base)).toBe(base);
  });

  it("lets a consumer override one nested setting without losing its siblings", () => {
    const merged = mergeMolstarSpec(baseSpec(), {
      canvas3d: { renderer: { backgroundColor: 0x101010 as never } },
    });

    expect(merged.canvas3d?.renderer?.backgroundColor).toBe(0x101010);
    // Not named, so it survives.
    expect(merged.canvas3d?.renderer?.colorMarker).toBe(true);
    expect(merged.canvas3d?.camera?.helper?.axes?.name).toBe("on");
  });

  it("adds a setting the viewer says nothing about", () => {
    const merged = mergeMolstarSpec(baseSpec(), {
      canvas3d: { postprocessing: { occlusion: { name: "off" } } as never },
    });

    expect(merged.canvas3d?.postprocessing).toEqual({
      occlusion: { name: "off" },
    });
    expect(merged.canvas3d?.renderer?.colorMarker).toBe(true);
  });

  /**
   * Mol* reads `config` in order into a Map, so the consumer's entry has to
   * land after the viewer's to take effect.
   */
  it("appends config so a consumer's entry wins", () => {
    const merged = mergeMolstarSpec(baseSpec(), {
      config: [[PluginConfig.Viewport.ShowExpand, true]],
    });

    expect(merged.config).toHaveLength(2);
    expect(merged.config?.[1]).toEqual([
      PluginConfig.Viewport.ShowExpand,
      true,
    ]);
  });

  it("appends behaviors rather than replacing them", () => {
    const merged = mergeMolstarSpec(baseSpec(), {
      behaviors: [{ transformer: "theirs" } as never],
    });

    expect(merged.behaviors).toHaveLength(2);
    expect(merged.behaviors[0]).toEqual({ transformer: "ours" });
  });

  it("keeps the viewer's lists when the consumer names none", () => {
    const merged = mergeMolstarSpec(baseSpec(), { canvas3d: {} });

    expect(merged.behaviors).toHaveLength(1);
    expect(merged.config).toHaveLength(1);
  });

  it("takes a list the consumer supplies that the viewer has none of", () => {
    const merged = mergeMolstarSpec(baseSpec(), {
      animations: ["theirs" as never],
    });

    expect(merged.animations).toEqual(["theirs"]);
  });

  /**
   * The spec carries React components and Mol* class instances. Merging into
   * one would take it apart, so anything that is not an object literal is
   * replaced whole.
   */
  it("replaces a component rather than merging into it", () => {
    const ours = () => null;
    const theirs = () => null;
    const merged = mergeMolstarSpec(
      { ...baseSpec(), components: { viewport: { view: ours } } },
      { components: { viewport: { view: theirs } } }
    );

    expect(merged.components?.viewport?.view).toBe(theirs);
  });

  it("leaves the viewer's spec object unmodified", () => {
    const base = baseSpec();
    mergeMolstarSpec(base, {
      canvas3d: { renderer: { backgroundColor: 0x101010 as never } },
    });

    expect(base.canvas3d?.renderer?.backgroundColor).toBe(0xffffff);
    expect(base.config).toHaveLength(1);
  });
});
