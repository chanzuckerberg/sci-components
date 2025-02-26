import { Region } from "../data/region";
import { TextureUnpackRowAlignment } from "../objects/textures/texture";
import { PromiseScheduler } from "./promise_scheduler";

const imageChunkDataTypes = [Uint8Array, Uint16Array, Float32Array] as const;
type ImageChunkData = InstanceType<(typeof imageChunkDataTypes)[number]>;
export function isImageChunkData(value: unknown): value is ImageChunkData {
  if (
    imageChunkDataTypes.some(
      (ImageChunkData) => value instanceof ImageChunkData
    )
  ) {
    return true;
  }
  const supportedDataTypeNames = imageChunkDataTypes.map((dtype) => dtype.name);
  console.debug(
    `Unsupported image chunk data type: ${value}. Supported data types: ${supportedDataTypeNames}`
  );
  return false;
}

// One 2D chunk of n-dimensional image data.
// TODO: include the region of this chunk.
// https://github.com/chanzuckerberg/imaging-active-learning/issues/34
export type ImageChunk = {
  data: ImageChunkData;
  shape: {
    x: number;
    y: number;
    c: number;
  };
  rowStride: number;
  rowAlignmentBytes: TextureUnpackRowAlignment;
  scale: {
    x: number;
    y: number;
  };
  offset: {
    x: number;
    y: number;
  };
};

export type ImageChunkSource = {
  open(): Promise<ImageChunkLoader>;
};

export type ImageChunkLoader = {
  loadChunk(input: Region, scheduler?: PromiseScheduler): Promise<ImageChunk>;
};
