import { Layer } from "src/core/layer";
import { Region } from "../data/region";
import { ImageChunkSource } from "../data/image_chunk";
import { Texture2DArray } from "../objects/textures/texture_2d_array";
import {
  makeImageTextureArray,
  makeImageRenderable,
} from "../layers/image_utils";
import { ChannelProps } from "../objects/textures/channel";
import { ImageRenderable } from "../objects/renderable/image_renderable";

export type ImageLayerProps = {
  source: ImageChunkSource;
  region: Region;
  channelProps?: ChannelProps[];
};

// Loads data from an image source into renderable objects.
export class ImageLayer extends Layer {
  private readonly source_: ImageChunkSource;

  // TODO: remove this when region is passed through to update.
  // https://github.com/chanzuckerberg/imaging-active-learning/issues/33
  private readonly region_: Region;

  private channelProps_?: ChannelProps[];

  private texture_?: Texture2DArray;

  private renderable_?: ImageRenderable;

  constructor({ source, region, channelProps }: ImageLayerProps) {
    super();
    this.setState("initialized");
    this.source_ = source;
    this.region_ = region;
    this.channelProps_ = channelProps;
  }

  public update(): void {
    switch (this.state) {
      case "initialized":
        this.load(this.region_);
        break;
      case "loading":
      case "ready":
        break;
      default: {
        const exhaustiveCheck: never = this.state;
        throw new Error(`Unhandled LayerState case: ${exhaustiveCheck}`);
      }
    }
  }

  public get channelProps(): ChannelProps[] | undefined {
    return this.channelProps_;
  }

  public setChannelProps(channelProps: ChannelProps[]): void {
    this.channelProps_ = channelProps;
    this.renderable_?.setChannelProps(channelProps);
  }

  private async load(region: Region) {
    if (this.state !== "initialized") {
      throw new Error(`Trying to load chunks more than once.`);
    }
    this.setState("loading");
    const loader = await this.source_.open();
    const chunk = await loader.loadChunk(region);
    this.texture_ = makeImageTextureArray(chunk);
    this.renderable_ = makeImageRenderable(
      chunk,
      this.texture_,
      this.channelProps_
    );
    this.addObject(this.renderable_);
    this.setState("ready");
  }
}
