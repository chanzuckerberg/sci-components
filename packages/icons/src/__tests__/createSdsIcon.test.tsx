import { IconContext } from "@phosphor-icons/react";
import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import * as icons from "..";
import type { Icon } from "..";
import { AtlasIcon, SparkleIcon, UmapIcon } from "..";

/** The icon components, as opposed to the `createSdsIcon` factory beside them. */
const ALL_ICONS = Object.entries(icons).filter(
  (entry): entry is [string, Icon] => entry[0] !== "createSdsIcon"
);

/**
 * `IconBase` renders no role and no accessible name unless `alt` is given, so
 * the assertions below reach for the `<svg>` element itself.
 */
function renderIcon(ui: React.ReactElement): SVGSVGElement {
  const { container } = render(ui);
  return container.querySelector("svg") as SVGSVGElement;
}

const RED = "rgb(255, 0, 0)";

describe("SDS icons", () => {
  /**
   * The artwork is stored on Phosphor's 256 unit grid, as bare paths under the
   * `<svg>` that `IconBase` renders. Design draws on a 16 or 32 unit grid, so the
   * coordinates are scaled when an icon is added rather than at render time, and
   * nothing wraps or transforms them here.
   */
  it.each([
    ["Atlas", <AtlasIcon key="atlas" />],
    ["Umap", <UmapIcon key="umap" />],
  ])("draws %s on Phosphor's 256 grid, with no wrapper", (_name, element) => {
    const svg = renderIcon(element);

    expect(svg.getAttribute("viewBox")).toBe("0 0 256 256");
    expect(svg.querySelector("svg")).toBeNull();
    expect(svg.querySelector("[transform]")).toBeNull();
    expect(svg.querySelectorAll("path").length).toBeGreaterThan(0);
  });

  /**
   * Artwork scaled by the wrong factor is the one way a new icon could go wrong
   * and still render something, so this holds every icon to the 256 grid. A
   * drawing left at its 32 unit source would peak near 32, and one scaled by 16
   * instead of 8 would peak near 480; both are far outside the band below.
   *
   * The upper bound carries a little slack because artwork may bleed past its own
   * canvas: `SparklesIcon` reaches 256.75, exactly as its source does.
   */
  it.each(ALL_ICONS)("%s is drawn on the 256 grid", (_name, SdsIcon) => {
    const svg = renderIcon(<SdsIcon />);

    const numbers = Array.from(svg.querySelectorAll("path")).flatMap((path) =>
      (path.getAttribute("d") ?? "")
        .split(/[^\d.-]+/)
        .filter(Boolean)
        .map(Number)
    );

    expect(numbers.length).toBeGreaterThan(0);
    expect(Math.max(...numbers)).toBeGreaterThan(128);
    expect(Math.max(...numbers)).toBeLessThan(264);
  });

  it("takes size, color, mirrored and alt", () => {
    const svg = renderIcon(
      <AtlasIcon size={32} color="rgb(56, 103, 250)" mirrored alt="An atlas" />
    );

    expect(svg.getAttribute("width")).toBe("32");
    expect(svg.getAttribute("height")).toBe("32");
    expect(svg.getAttribute("fill")).toBe("rgb(56, 103, 250)");
    expect(svg.getAttribute("transform")).toBe("scale(-1, 1)");
    expect(screen.getByTitle("An atlas")).toBeInTheDocument();
  });

  it("defaults to currentColor so CSS can drive it", () => {
    const svg = renderIcon(<AtlasIcon />);

    expect(svg.getAttribute("fill")).toBe("currentColor");
  });

  /**
   * The artwork ships with no fill of its own, which is what lets `color` reach
   * it: a `fill` left on a path would win over the one `IconBase` sets on the
   * wrapper, and the icon would ignore the prop.
   */
  it("leaves the artwork's fill to the wrapper", () => {
    const svg = renderIcon(<AtlasIcon color={RED} />);

    expect(svg.getAttribute("fill")).toBe(RED);
    svg.querySelectorAll("path").forEach((path) => {
      expect(path.getAttribute("fill")).toBeNull();
    });
  });

  it("passes arbitrary SVG props through", () => {
    const svg = renderIcon(
      <AtlasIcon className="custom" data-testid="atlas" aria-hidden />
    );

    expect(svg).toHaveClass("custom");
    expect(svg.getAttribute("data-testid")).toBe("atlas");
    expect(svg.getAttribute("aria-hidden")).toBe("true");
  });

  it("renders every weight, since the artwork is registered under all six", () => {
    const weights = [
      "thin",
      "light",
      "regular",
      "bold",
      "fill",
      "duotone",
    ] as const;

    weights.forEach((weight) => {
      const svg = renderIcon(<SparkleIcon weight={weight} />);
      expect(svg.querySelector("path")).toBeInTheDocument();
    });
  });

  it("forwards a ref to the svg element", () => {
    const ref = createRef<SVGSVGElement>();
    render(<AtlasIcon ref={ref} />);

    expect(ref.current).toBeInstanceOf(SVGElement);
    expect(ref.current?.tagName).toBe("svg");
  });

  it("names itself for React DevTools", () => {
    expect(AtlasIcon.displayName).toBe("AtlasIcon");
  });

  /**
   * The assertion that the peer-dependency arrangement holds. Our icons and a
   * consumer's Phosphor icons have to read the same context instance, which they
   * only do while Phosphor resolves to a single copy. Bundling it, or listing it
   * as a dependency rather than a peer, would give this test a second context to
   * read and it would fail.
   */
  it("inherits defaults from Phosphor's IconContext", () => {
    const svg = renderIcon(
      <IconContext.Provider value={{ color: RED, size: 20 }}>
        <AtlasIcon />
      </IconContext.Provider>
    );

    expect(svg.getAttribute("width")).toBe("20");
    expect(svg.getAttribute("fill")).toBe(RED);
  });

  it("lets its own props win over the context", () => {
    const svg = renderIcon(
      <IconContext.Provider value={{ color: RED, size: 20 }}>
        <AtlasIcon size={40} color="rgb(0, 128, 0)" />
      </IconContext.Provider>
    );

    expect(svg.getAttribute("width")).toBe("40");
    expect(svg.getAttribute("fill")).toBe("rgb(0, 128, 0)");
  });
});
