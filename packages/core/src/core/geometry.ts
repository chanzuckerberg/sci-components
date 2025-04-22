import { Node } from "./node";

type GeometryAttributeType =
  | "position"
  | "normal"
  | "uv"
  | "next_position"
  | "previous_position"
  | "direction"
  | "path_proportion";

type GeometryAttribute = {
  type: GeometryAttributeType;
  itemSize: number;
  offset: number;
};

export class Geometry extends Node {
  protected vertexData_: Float32Array;
  protected indexData_: Uint32Array;
  private attributes_: GeometryAttribute[];

  constructor(vertexData: number[] = [], indexData: number[] = []) {
    super();
    this.vertexData_ = new Float32Array(vertexData);
    this.indexData_ = new Uint32Array(indexData);
    this.attributes_ = [];
  }

  public addAttribute(attr: GeometryAttribute) {
    this.attributes_.push(attr);
  }

  public get itemSize() {
    return this.vertexData_.length / this.stride;
  }

  public get stride() {
    return (
      this.attributes_.reduce((acc, curr) => {
        return (acc += curr.itemSize);
      }, 0) * Float32Array.BYTES_PER_ELEMENT
    );
  }

  public get vertexData() {
    return this.vertexData_;
  }

  public get indexData() {
    return this.indexData_;
  }

  public get attributes() {
    return this.attributes_;
  }

  public get type() {
    return "Geometry";
  }
}
