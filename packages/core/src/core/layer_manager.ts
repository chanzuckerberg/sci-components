import { Layer } from "src/core/layer";

export class LayerManager {
  private layers_: Layer[] = [];

  public add(layer: Layer) {
    this.layers_.push(layer);
  }

  public get layers() {
    return this.layers_;
  }
}
