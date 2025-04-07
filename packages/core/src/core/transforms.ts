import { mat4, vec3, quat } from "gl-matrix";

export class AffineTransform {
  private dirty_ = true;

  private matrix_ = mat4.create();

  private rotation_ = quat.create();

  private translation_ = vec3.create();

  private scale_ = vec3.fromValues(1, 1, 1);

  public rotate(q: quat) {
    quat.multiply(this.rotation_, this.rotation_, q);
    vec3.transformQuat(this.translation_, this.translation_, q);
    this.dirty_ = true;
  }

  public translate(vec: vec3) {
    vec3.add(this.translation_, this.translation_, vec);
    this.dirty_ = true;
  }

  public setTranslation(vec: vec3) {
    vec3.copy(this.translation_, vec);
    this.dirty_ = true;
  }

  public get translation() {
    return vec3.clone(this.translation_);
  }

  public scale(vec: vec3) {
    vec3.multiply(this.scale_, this.scale_, vec);
    vec3.multiply(this.translation_, this.translation_, vec);
    this.dirty_ = true;
  }

  public get matrix() {
    if (this.dirty_) {
      this.computeMatrix();
      this.dirty_ = false;
    }
    return this.matrix_;
  }

  public get inverse() {
    return mat4.invert(mat4.create(), this.matrix);
  }

  private computeMatrix() {
    mat4.fromRotationTranslationScale(
      this.matrix_,
      this.rotation_,
      this.translation_,
      this.scale_
    );
  }
}
