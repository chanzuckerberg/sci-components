import { Layer } from "src/core/layer";
import { Interval, Region } from "../data/region";
import { ImageChunk, ImageChunkSource } from "../data/image_chunk";
import { Texture2DArray } from "../objects/textures/texture_2d_array";
import { AbortError, PromiseScheduler } from "../data/promise_scheduler";
import { makeImageTextureArray, makeImageRenderable } from "./image_utils";
import { ChannelProps } from "../objects/textures/channel";
import { ImageRenderable } from "../objects/renderable/image_renderable";

type ImageSeriesLayerProps = {
  source: ImageChunkSource;
  region: Region;
  timeDimension: string;
  channelProps?: ChannelProps[];
};

// Loads 2D+t image data from an image source into renderable objects.
export class ImageSeriesLayer extends Layer {
  private readonly source_: ImageChunkSource;

  private readonly region_: Region;

  private readonly timeInterval_: Interval;

  private readonly timeDimensionIndex_: number;

  private texture_: Texture2DArray | null = null;

  private dataChunks_: ImageChunk[] = [];

  private scheduler_: PromiseScheduler = new PromiseScheduler(16);

  private channelProps_?: ChannelProps[];

  private renderable_?: ImageRenderable;

  constructor({
    source,
    region,
    timeDimension,
    channelProps,
  }: ImageSeriesLayerProps) {
    super();
    this.setState("initialized");
    this.source_ = source;
    this.region_ = region;
    this.timeDimensionIndex_ = region.findIndex(
      (x) => x.dimension == timeDimension
    );
    if (this.timeDimensionIndex_ === -1) {
      throw new Error(
        `Could not find dimension ${timeDimension} in ${JSON.stringify(region)}`
      );
    }
    const timeIndex = this.region_[this.timeDimensionIndex_].index;
    if (typeof timeIndex === "number") {
      throw new Error(
        `Time index is a number (${timeIndex}). It should be an interval.`
      );
    }
    this.timeInterval_ = timeIndex;
    this.channelProps_ = channelProps;
  }

  public get channelProps(): ChannelProps[] | undefined {
    return this.channelProps_;
  }

  public setChannelProps(channelProps: ChannelProps[]): void {
    this.channelProps_ = channelProps;
    this.renderable_?.setChannelProps(channelProps);
  }

  public update(): void {
    switch (this.state) {
      case "initialized":
        this.load();
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

  public setTimeIndex(index: number) {
    if (this.state !== "ready") {
      console.warn(`Trying to set time index before ready: ${this.state}`);
      return;
    }
    const { start, stop } = this.timeInterval_;
    const chunkIndex = index - start;
    if (chunkIndex < 0) {
      throw new Error(`Time index ${index} is before the start time: ${start}`);
    } else if (chunkIndex >= this.dataChunks_.length) {
      throw new Error(`Time index ${index} is after the stop time: ${stop}.`);
    }
    const chunk = this.dataChunks_[chunkIndex];
    if (this.texture_ === null) {
      this.texture_ = makeImageTextureArray(chunk);
      this.renderable_ = makeImageRenderable(
        chunk,
        this.texture_,
        this.channelProps_
      );
      this.addObject(this.renderable_);
    } else {
      this.texture_.data = chunk.data;
    }
  }

  public close(): void {
    this.scheduler_.shutdown();
  }

  private async load() {
    if (this.state !== "initialized") {
      throw new Error(`Trying to open chunk loader more than once.`);
    }
    this.setState("loading");
    const loader = await this.source_.open();
    // Wait to load the whole region over all time points.
    this.dataChunks_ = [];
    const loadPromises = [];
    const { start, stop } = this.timeInterval_;
    // TODO: this assumes that time-steps are unitary when they might
    // have a scale associated with them. We could instead load the
    // whole region in and map back the chunks appropriately.
    // https://github.com/chanzuckerberg/imaging-active-learning/issues/75
    for (let t = start; t < stop; ++t) {
      const region = structuredClone(this.region_);
      region[this.timeDimensionIndex_].index = t;
      loadPromises.push(
        loader
          .loadChunk(region, this.scheduler_)
          .then((chunk) => (this.dataChunks_[t - start] = chunk))
      );
    }
    await Promise.all(loadPromises).catch((error) => {
      if (error instanceof AbortError) {
        console.debug("Loading aborted.");
        return;
      }
    });
    this.setState("ready");
  }
}
