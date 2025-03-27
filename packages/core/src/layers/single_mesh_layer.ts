import { Layer } from "src/core/layer";
import { ImageRenderable } from "../objects/renderable/image_renderable";
import { PlaneGeometry } from "../objects/geometry/plane_geometry";
import { Texture2D } from "../objects/textures/texture_2d";

export class SingleMeshLayer extends Layer {
  private texture_ = new Texture2D("/texture_test.png");

  constructor() {
    super();
    this.setState("loading");
  }

  public update(): void {
    if (this.texture_.loaded && this.state !== "ready") {
      const plane = new PlaneGeometry(
        this.texture_.width,
        this.texture_.height,
        1,
        1
      );
      const mesh = new ImageRenderable(plane, this.texture_);
      this.addObject(mesh);
      this.setState("ready");
    }
  }
}
