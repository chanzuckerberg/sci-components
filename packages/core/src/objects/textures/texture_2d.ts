import { Texture } from "./texture";

export class Texture2D extends Texture {
  private readonly image_ = new Image();
  private loaded_ = false;

  constructor(imagePath: string) {
    super();
    this.image_.src = imagePath;

    // using bind to ensure that the callbacks have the correct context
    this.image_.onload = this.onLoad.bind(this);
    this.image_.onerror = this.onError.bind(this);
  }

  public get type() {
    return "Texture2D";
  }

  private onLoad() {
    this.loaded_ = true;
  }

  private onError() {
    throw new Error("Failed to load texture image");
  }

  public get width() {
    return this.image_.width;
  }

  public get height() {
    return this.image_.height;
  }

  public get data() {
    return this.image_;
  }

  public get loaded() {
    return this.loaded_;
  }
}
