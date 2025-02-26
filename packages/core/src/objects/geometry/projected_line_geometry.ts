import { vec3 } from "gl-matrix";

import { Geometry } from "../../core/geometry";

export class ProjectedLineGeometry extends Geometry {
  // this creates the geometry for a screen-space projected line
  // each point on the input path is split into two vertices
  // these are pushed in opposite directions in screen-space to create width
  // this is done in the vertex shader by moving the vertices along the path normal
  // See:
  //  https://mattdesl.svbtle.com/drawing-lines-is-hard#screenspace-projected-lines_2
  //  https://github.com/spite/THREE.MeshLine
  constructor(path: vec3[]) {
    super();
    this.vertexData_ = this.createVertices(path);
    this.indexData_ = this.createIndex(path.length);
    this.addAttribute({
      type: "position",
      itemSize: 3,
      offset: 0,
    });
    this.addAttribute({
      type: "previous_position",
      itemSize: 3,
      offset: 3 * Float32Array.BYTES_PER_ELEMENT,
    });
    this.addAttribute({
      type: "next_position",
      itemSize: 3,
      offset: 6 * Float32Array.BYTES_PER_ELEMENT,
    });
    this.addAttribute({
      type: "direction",
      itemSize: 1,
      offset: 9 * Float32Array.BYTES_PER_ELEMENT,
    });
    this.addAttribute({
      type: "path_proportion",
      itemSize: 1,
      offset: 10 * Float32Array.BYTES_PER_ELEMENT,
    });
  }

  private createVertices(path: vec3[]): Float32Array {
    const vertices = new Float32Array(2 * path.length * (3 + 3 + 3 + 1 + 1));

    let c = 0;
    let path_proportion = 0.0;
    const total_distance = path.reduce((acc, curr, i) => {
      return acc + vec3.distance(curr, path[i + 1] ?? curr);
    }, 0.0);
    for (const i of Array.from(Array(path.length).keys())) {
      for (const direction of [-1.0, 1.0]) {
        const current = path[i];
        vertices[c++] = current[0];
        vertices[c++] = current[1];
        vertices[c++] = current[2];

        const previous = path[i - 1] ?? path[i];
        vertices[c++] = previous[0];
        vertices[c++] = previous[1];
        vertices[c++] = previous[2];

        const next = path[i + 1] ?? path[i];
        vertices[c++] = next[0];
        vertices[c++] = next[1];
        vertices[c++] = next[2];

        vertices[c++] = direction;
        vertices[c++] = path_proportion;
      }
      path_proportion +=
        vec3.distance(path[i], path[i + 1] ?? path[i]) / total_distance;
    }

    return vertices;
  }

  private createIndex(length: number): Uint32Array {
    // each line segment is a quad split into two triangles
    //       0 ----- 2
    //       |     / |      ^
    //       |    /  |  +direction
    // point a   /   point b
    //       |  /    |  -direction
    //       | /     |      v
    //       1 ----- 3

    const indices = new Uint32Array((length - 1) * 6);
    let c = 0;

    for (let i = 0; i < 2 * length; i += 2) {
      indices[c++] = i + 0;
      indices[c++] = i + 1;
      indices[c++] = i + 2;

      indices[c++] = i + 2;
      indices[c++] = i + 1;
      indices[c++] = i + 3;
    }
    return indices;
  }
}
