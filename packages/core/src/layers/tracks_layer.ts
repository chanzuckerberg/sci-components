import { vec3 } from "gl-matrix";
import { Layer } from "src/core/layer";
import { ProjectedLine } from "../objects/renderable/projected_line";
import { ProjectedLineGeometry } from "../objects/geometry/projected_line_geometry";

type TrackParameters = {
  path: vec3[];
  interpolation?: { pointsPerSegment: number; tangentFactor?: number };
  time?: number[];
  color: vec3;
  width: number;
};

export class TracksLayer extends Layer {
  private tracks_: TrackParameters[] = [];

  constructor(tracks: TrackParameters[] = []) {
    super();
    tracks.forEach((track) => this.addLine(track));
    this.setState("ready");
  }

  private addLine(track: TrackParameters) {
    this.tracks_.push(track);
    let geometry;
    if (track.interpolation) {
      const interpolatedPath = cubicBezierInterpolation({
        path: track.path,
        pointsPerSegment: track.interpolation.pointsPerSegment,
        tangentFactor: track.interpolation.tangentFactor,
      });
      geometry = new ProjectedLineGeometry(interpolatedPath);
    } else {
      geometry = new ProjectedLineGeometry(track.path);
    }
    const { color, width } = track;
    const taperOffset = 0.5;
    const taperPower = 1.5;
    this.addObject(
      new ProjectedLine({ geometry, color, width, taperOffset, taperPower })
    );
  }

  public setTimeIndex(index: number) {
    for (const [i, track] of Array.from(this.tracks_.entries())) {
      if (!track.time) {
        continue;
      }
      let offset = 0.5;
      if (index < track.time[0]) {
        offset = -1.5;
      } else if (index > track.time[track.time.length - 1]) {
        offset = 1.5;
      }
      const timeIndex = track.time.findIndex((time) => time === index);
      if (track.time && timeIndex !== -1) {
        offset = timeIndex / (track.time.length - 1);
      }
      const object = this.objects[i] as ProjectedLine;
      object.taperOffset = offset;
    }
  }

  public update(): void {}

  // TODO: this is temporary - we may want to generalize this to all layers
  // for now it is used to set the initial camera position to be centered on the tracks
  public get extent() {
    const paths = this.tracks_.map((track) => track.path);
    return getPathBoundingBox(paths.flat());
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

type BezierParams = {
  path: vec3[];
  pointsPerSegment: number;
  tangentFactor?: number;
};

function cubicBezierInterpolation({
  path,
  pointsPerSegment,
  tangentFactor = 1.0 / 3.0,
}: BezierParams): vec3[] {
  const tangents = pathTangents(path);

  const out = Array((path.length - 1) * pointsPerSegment);

  // a cubic bezier curve is defined by 4 control points: a, b, c, d
  // for interpolation of a segment:
  // * a and d are the endpoints of the curve segment
  // * b and c are control points that define curvature
  // default is 1/3 of the tangent at each endpoint as the control points
  // this is equivalent to a cubic Hermite spline
  for (let i = 0; i < path.length - 1; i++) {
    const a = path[i];
    const d = path[i + 1];
    const b = vec3.clone(tangents[i]);
    vec3.scaleAndAdd(b, a, b, tangentFactor);
    const c = vec3.clone(tangents[i + 1]);
    vec3.scaleAndAdd(c, d, c, -tangentFactor);
    for (let p = 0; p < pointsPerSegment; p++) {
      const t = p / pointsPerSegment;
      const o = (out[i * pointsPerSegment + p] = vec3.create());
      vec3.bezier(o, a, b, c, d, t);
    }
  }

  return out;
}

function pathTangents(path: vec3[]): vec3[] {
  if (path.length < 2) {
    throw new Error("Path must contain at least 2 points");
  }

  const tangents: vec3[] = Array(path.length);
  const m0 = vec3.create();
  const m1 = vec3.create();
  for (let i = 0; i < path.length; i++) {
    const curr = path[i];
    const next = path[i + 1] ?? path[i];

    tangents[i] = vec3.create();

    if (i !== 0) {
      vec3.copy(m0, m1);
    }

    if (i !== path.length - 1) {
      vec3.sub(m1, next, curr);
    }

    if (i === 0) {
      vec3.copy(tangents[i], m1);
    } else if (i == path.length - 1) {
      vec3.copy(tangents[i], m0);
    } else {
      vec3.add(tangents[i], m0, m1);
      vec3.scale(tangents[i], tangents[i], 0.5);
    }
  }

  return tangents;
}
