import { Node } from "./node";
import { Geometry } from "./geometry";
import { Texture } from "../objects/textures/texture";
import { AffineTransform } from "./transforms";

import { Shader } from "../renderers/shaders";

export abstract class RenderableObject extends Node {
  private geometry_ = new Geometry();

  private textures_: Texture[] = [];

  private transform_ = new AffineTransform();

  private programName_: Shader | null = null;

  public addTexture(texture: Texture) {
    this.textures_.push(texture);
  }

  public get geometry() {
    return this.geometry_;
  }

  public get textures() {
    return this.textures_;
  }

  public get transform() {
    return this.transform_;
  }

  public set geometry(geometry: Geometry) {
    this.geometry_ = geometry;
  }

  public get programName(): Shader {
    if (this.programName_ === null) {
      throw new Error("Program name not set");
    }
    return this.programName_;
  }

  protected set programName(programName: Shader) {
    this.programName_ = programName;
  }

  /**
   * Get uniforms for shader program. Override in derived classes that need custom uniforms.
   * @returns Object containing uniform name-value pairs
   */
  public getUniforms(): Record<string, unknown> {
    return {}; // Default implementation returns no uniforms
  }
}
