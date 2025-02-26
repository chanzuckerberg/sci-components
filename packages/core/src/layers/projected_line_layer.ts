import { vec3 } from "gl-matrix";
import { Layer } from "src/core/layer";
import { ProjectedLine } from "../objects/renderable/projected_line";
import { ProjectedLineGeometry } from "../objects/geometry/projected_line_geometry";

type LineParameters = {
  path: vec3[];
  color: vec3;
  width: number;
};

export class ProjectedLineLayer extends Layer {
  private paths_: vec3[][] = [];

  constructor(lines: LineParameters[] = []) {
    super();
    lines.forEach((line) => this.addLine(line));
    this.setState("ready");
  }

  private addLine(line: LineParameters) {
    const { path, color, width } = line;
    this.paths_.push(path);
    const geometry = new ProjectedLineGeometry(path);
    this.addObject(new ProjectedLine({ geometry, color, width }));
  }

  public update(): void {}

  // TODO: this is temporary - we may want to generalize this to all layers
  // for now it is used to set the initial camera position to be centered on the tracks
  public get extent() {
    return getPathBoundingBox(this.paths_.flat());
  }
}

type BoundingBox3D = {
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
  zMin: number;
  zMax: number;
};

function getPathBoundingBox(path: vec3[]): BoundingBox3D {
  function getAxisBounds(index: number): [number, number] {
    const values = path.map((point) => point[index]);
    return [Math.min(...values), Math.max(...values)];
  }

  const [xMin, xMax] = getAxisBounds(0);
  const [yMin, yMax] = getAxisBounds(1);
  const [zMin, zMax] = getAxisBounds(2);

  return { xMin, xMax, yMin, yMax, zMin, zMax };
}
