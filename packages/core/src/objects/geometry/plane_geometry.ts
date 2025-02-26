import { Geometry } from "../../core/geometry";

export class PlaneGeometry extends Geometry {
  constructor(
    width: number,
    height: number,
    widthSegments: number,
    heightSegments: number
  ) {
    super();
    const vertex: number[] = [];
    const index: number[] = [];

    const gridX = widthSegments;
    const gridY = heightSegments;
    const gridX1 = gridX + 1;
    const gridY1 = gridY + 1;
    const segmentW = width / gridX;
    const segmentH = height / gridY;

    for (let iy = 0; iy < gridY1; ++iy) {
      const y = iy * segmentH;
      for (let ix = 0; ix < gridX1; ++ix) {
        const x = ix * segmentW;
        const u = ix / gridX;
        const v = iy / gridY;

        const position = [x, y, 0];
        const normals = [0, 0, 1];
        const uvs = [u, v];

        vertex.push(...position, ...normals, ...uvs);
      }
    }

    for (let iy = 0; iy < gridY; ++iy) {
      for (let ix = 0; ix < gridX; ++ix) {
        const a = ix + gridX1 * iy;
        const b = ix + gridX1 * (iy + 1);
        const c = ix + 1 + gridX1 * (iy + 1);
        const d = ix + 1 + gridX1 * iy;

        index.push(a, b, d);
        index.push(b, c, d);
      }
    }

    this.vertexData_ = new Float32Array(vertex);
    this.indexData_ = new Uint32Array(index);

    this.addAttribute({
      type: "position",
      itemSize: 3,
      offset: 0,
    });

    this.addAttribute({
      type: "normal",
      itemSize: 3,
      offset: 3 * Float32Array.BYTES_PER_ELEMENT,
    });

    this.addAttribute({
      type: "uv",
      itemSize: 2,
      offset: 6 * Float32Array.BYTES_PER_ELEMENT,
    });
  }
}
