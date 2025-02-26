import { DataTexture2D } from "../objects/textures/data_texture_2d";
import { Texture } from "../objects/textures/texture";
import { Texture2DArray } from "../objects/textures/texture_2d_array";
import { ImageChunk } from "../data/image_chunk";
import { PlaneGeometry } from "../objects/geometry/plane_geometry";
import { ChannelProps } from "../objects/textures/channel";
import { ImageRenderable } from "../objects/renderable/image_renderable";

export function makeImageTexture(chunk: ImageChunk) {
  const texture = new DataTexture2D(chunk.data, chunk.shape.x, chunk.shape.y);
  texture.unpackRowLength = chunk.rowStride;
  texture.unpackAlignment = chunk.rowAlignmentBytes;
  return texture;
}

export function makeImageTextureArray(chunk: ImageChunk) {
  const texture = new Texture2DArray(chunk.data, chunk.shape.x, chunk.shape.y);
  texture.unpackRowLength = chunk.rowStride;
  texture.unpackAlignment = chunk.rowAlignmentBytes;
  return texture;
}

export function makeImageRenderable(
  chunk: ImageChunk,
  texture: Texture,
  channelProps?: ChannelProps[]
): ImageRenderable {
  const geometry = new PlaneGeometry(chunk.shape.x, chunk.shape.y, 1, 1);
  const imageRenderable = new ImageRenderable(geometry, texture, channelProps);
  imageRenderable.transform.scale([chunk.scale.x, chunk.scale.y, 1]);
  imageRenderable.transform.translate([chunk.offset.x, chunk.offset.y, 0]);
  return imageRenderable;
}
