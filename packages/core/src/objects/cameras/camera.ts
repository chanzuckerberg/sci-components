import { RenderableObject } from "../../core/renderable_object";
import { mat4, quat, vec3, vec4 } from "gl-matrix";

export abstract class Camera extends RenderableObject {
  protected projectionMatrix_ = mat4.create();
  protected near_ = 0;
  protected far_ = 0;
  protected zoom_ = 1;

  protected abstract updateProjectionMatrix(): void;

  public get type() {
    return "Camera";
  }

  public update() {
    this.updateProjectionMatrix();
  }

  get projectionMatrix() {
    return this.projectionMatrix_;
  }

  public get zoom() {
    return this.zoom_;
  }

  public set zoom(zoom: number) {
    this.zoom_ = zoom;
    this.updateProjectionMatrix();
  }

  public pan(vec: vec3) {
    this.transform.translate(vec);
  }

  public get position() {
    return this.transform.translation;
  }

  public clipToWorld(position: vec3): vec3 {
    const clipPos = vec4.fromValues(position[0], position[1], position[2], 1);
    const projectionInverse = mat4.invert(mat4.create(), this.projectionMatrix);
    const worldPos = vec4.transformMat4(
      vec4.create(),
      clipPos,
      projectionInverse
    );
    const rotation = mat4.getRotation(quat.create(), this.transform.matrix);
    vec4.transformQuat(worldPos, worldPos, rotation);
    vec4.scale(worldPos, worldPos, 1 / worldPos[3]);
    return vec3.fromValues(worldPos[0], worldPos[1], worldPos[2]);
  }
}
