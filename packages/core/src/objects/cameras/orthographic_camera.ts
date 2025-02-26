import { Camera } from "./camera";
import { mat4 } from "gl-matrix";

export class OrthographicCamera extends Camera {
  private width_: number;
  private height_: number;
  private viewportAspectRatio_: number = 1;

  constructor(
    left: number,
    right: number,
    top: number,
    bottom: number,
    near = 0,
    far = 100.0
  ) {
    super();

    // this keeps the camera frame centered at the origin
    // use camera.pan or set its *position* (this.transform) to move the center
    this.width_ = Math.abs(right - left);
    this.height_ = Math.abs(top - bottom);
    const centerX = 0.5 * (left + right);
    const centerY = 0.5 * (bottom + top);
    this.transform.setTranslation([centerX, centerY, 0]);
    this.setFrame(left, right, bottom, top);

    this.near_ = near;
    this.far_ = far;

    this.updateProjectionMatrix();
  }

  public setViewportAspectRatio(aspectRatio: number) {
    this.viewportAspectRatio_ = aspectRatio;
  }

  public setFrame(left: number, right: number, bottom: number, top: number) {
    this.width_ = Math.abs(right - left);
    this.height_ = Math.abs(top - bottom);
    const centerX = 0.5 * (left + right);
    const centerY = 0.5 * (bottom + top);
    this.transform.setTranslation([centerX, centerY, 0]);
    this.zoom_ = 1.0;
  }

  public get type() {
    return "OrthographicCamera";
  }

  protected updateProjectionMatrix() {
    // The following code ensures that the orthographic projection matrix
    // is updated so that the aspect ratio of renderable objects is respected
    // (e.g. image pixels are isotropic) by padding the camera frame to form
    // the viewport frame.
    const width = this.width_ / this.zoom_;
    const height = this.height_ / this.zoom_;
    const frameAspectRatio = width / height;
    // When the viewport is wider than the camera frame, add horizontal
    // padding such that the height is unchanged. Otherwise, add vertical
    // padding such that the width is unchanged.
    let viewportHalfWidth = 0.5 * width;
    let viewportHalfHeight = 0.5 * height;
    if (this.viewportAspectRatio_ > frameAspectRatio) {
      viewportHalfWidth *= this.viewportAspectRatio_ / frameAspectRatio;
    } else {
      viewportHalfHeight *= frameAspectRatio / this.viewportAspectRatio_;
    }
    // Center the camera frame in the padded viewport frame.
    mat4.ortho(
      this.projectionMatrix_,
      -viewportHalfWidth,
      viewportHalfWidth,
      -viewportHalfHeight,
      viewportHalfHeight,
      this.near_,
      this.far_
    );
  }
}
