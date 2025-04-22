import { RenderableObject } from "src/core/renderable_object";
import { Geometry } from "src/core/geometry";
import { Texture } from "src/objects/textures/texture";
import {
  Channel,
  ChannelProps,
  validateChannel,
  validateChannels,
} from "src/objects/textures/channel";

type SingleUniformValues = {
  Color: [number, number, number];
  ValueOffset: number;
  ValueScale: number;
};

type ArrayUniformValues = {
  "Visible[0]": boolean[];
  "Color[0]": number[];
  "ValueOffset[0]": number[];
  "ValueScale[0]": number[];
};

export class ImageRenderable extends RenderableObject {
  private channels_: Required<Channel>[];

  constructor(
    geometry: Geometry | null,
    texture: Texture | null = null,
    channels: ChannelProps[] = []
  ) {
    super();

    if (geometry) {
      this.geometry = geometry;
    }

    if (texture) {
      this.addTexture(texture);
    }

    this.channels_ = validateChannels(texture, channels);
  }

  public get type() {
    return "ImageRenderable";
  }

  public addTexture(texture: Texture) {
    super.addTexture(texture);
    this.setProgramName();
  }

  public setChannelProps(channels: ChannelProps[]): void {
    this.channels_ = validateChannels(this.textures[0], channels);
  }

  // TODO: validate the properties when setting this way?
  public setChannelProperty<K extends keyof ChannelProps>(
    channelIndex: number,
    property: K,
    value: Required<ChannelProps>[K]
  ): void {
    if (channelIndex < 0 || channelIndex >= this.channels_.length) {
      throw new Error(`Invalid channel index: ${channelIndex}`);
    }
    this.channels_[channelIndex][property] = value;
  }

  public override getUniforms(): SingleUniformValues | ArrayUniformValues {
    const texture = this.textures[0];
    if (!texture) {
      throw new Error("No texture set");
    }

    if (texture.type === "DataTexture2D") {
      const { color, contrastLimits } =
        this.channels_[0] ?? validateChannel(texture, {});
      return {
        Color: color,
        ValueOffset: -contrastLimits[0],
        ValueScale: 1 / (contrastLimits[1] - contrastLimits[0]),
      };
    } else {
      // Texture2DArray case
      const visible: boolean[] = [];
      const color: number[] = [];
      const valueOffset: number[] = [];
      const valueScale: number[] = [];

      // All channels (including defaults) are already in this.channels_
      this.channels_.forEach((channel) => {
        visible.push(channel.visible);
        color.push(...channel.color);
        valueOffset.push(-channel.contrastLimits[0]);
        valueScale.push(
          1 / (channel.contrastLimits[1] - channel.contrastLimits[0])
        );
      });

      return {
        "Visible[0]": visible,
        "Color[0]": color,
        "ValueOffset[0]": valueOffset,
        "ValueScale[0]": valueScale,
      };
    }
  }

  private setProgramName() {
    const texture = this.textures[0];
    if (!texture) {
      throw new Error("un-textured image not implemented");
    } else if (texture.type == "Texture2D") {
      this.programName = "mesh";
    } else if (texture.type == "DataTexture2D") {
      this.programName =
        texture.dataType == "float" ? "floatImage" : "uintImage";
    } else if (texture.type == "Texture2DArray") {
      this.programName =
        texture.dataType == "float" ? "floatImageArray" : "uintImageArray";
    }
  }
}
