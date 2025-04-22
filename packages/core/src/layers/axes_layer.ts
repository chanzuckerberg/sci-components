import { Layer } from "src/core/layer";
import { ProjectedLineGeometry } from "../objects/geometry/projected_line_geometry";
import { ProjectedLine } from "../objects/renderable/projected_line";

export class AxesLayer extends Layer {
  constructor(params: { length: number; width: number }) {
    super();
    const { length, width } = params;
    this.addObject(
      makeAxis({
        end: [length, 0, 0],
        width: width,
        color: [1, 0, 0],
      })
    );
    this.addObject(
      makeAxis({
        end: [0, length, 0],
        width: width,
        color: [0, 1, 0],
      })
    );
    this.addObject(
      makeAxis({
        end: [0, 0, length],
        width: width,
        color: [0, 0, 1],
      })
    );
    this.setState("ready");
  }

  public update(): void {}
}

function makeAxis(params: {
  end: [number, number, number];
  width: number;
  color: [number, number, number];
}) {
  const { end, width, color } = params;
  const geometry = new ProjectedLineGeometry([[0, 0, 0], end]);
  return new ProjectedLine({
    geometry: geometry,
    color: color,
    width: width,
  });
}
