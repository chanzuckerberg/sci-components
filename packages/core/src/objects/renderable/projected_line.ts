import { vec3 } from "gl-matrix";
import { RenderableObject } from "../../core/renderable_object";
import { ProjectedLineGeometry } from "../../objects/geometry/projected_line_geometry";

type LineParameters = {
  geometry: ProjectedLineGeometry;
  color: vec3;
  width: number;
  taperOffset?: number;
  taperPower?: number;
};

export class ProjectedLine extends RenderableObject {
  private color_: vec3;
  private width_: number;
  private taperOffset_: number = 0.5;
  private taperPower_: number = 0.0;

  constructor({
    geometry,
    color,
    width,
    taperOffset,
    taperPower,
  }: LineParameters) {
    super();
    this.geometry = geometry;
    this.color_ = color;
    this.width_ = width;
    this.taperOffset_ = taperOffset ?? this.taperOffset_;
    this.taperPower_ = taperPower ?? this.taperPower_;
    this.programName = "projectedLine";
  }

  public get type() {
    return "ProjectedLine";
  }

  public get color() {
    return this.color_;
  }

  public set color(value: vec3) {
    this.color_ = value;
  }

  public get width() {
    return this.width_;
  }

  public set width(value: number) {
    this.width_ = value;
  }

  public get taperOffset() {
    return this.taperOffset_;
  }

  public set taperOffset(value: number) {
    this.taperOffset_ = value;
  }

  public get taperPower() {
    return this.taperPower_;
  }

  public set taperPower(value: number) {
    this.taperPower_ = value;
  }

  public override getUniforms() {
    return {
      LineColor: this.color,
      LineWidth: this.width,
      TaperOffset: this.taperOffset,
      TaperPower: this.taperPower,
    };
  }
}
