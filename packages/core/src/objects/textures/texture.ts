import { Node } from "../../core/node";

export type TextureFilter = "nearest" | "linear";

export type TextureWrapMode = "repeat" | "clamp_to_edge";

export type TextureDataFormat = "scalar" | "rgb" | "rgba";

export type TextureDataType = "unsigned_byte" | "unsigned_short" | "float";

export type TextureUnpackRowAlignment = 1 | 2 | 4 | 8;

export type DataTextureTypedArray = Uint8Array | Uint16Array | Float32Array;

export function isTextureUnpackRowAlignment(
  value: number
): value is TextureUnpackRowAlignment {
  return value === 1 || value === 2 || value === 4 || value === 8;
}

export function bufferToDataType(
  buffer: DataTextureTypedArray
): TextureDataType {
  if (buffer instanceof Uint8Array) {
    return "unsigned_byte";
  } else if (buffer instanceof Uint16Array) {
    return "unsigned_short";
  } else if (buffer instanceof Float32Array) {
    return "float";
  }
  throw new Error("Unsupported buffer type.");
}

export abstract class Texture extends Node {
  public dataFormat: TextureDataFormat = "rgba";
  public dataType: TextureDataType = "unsigned_byte";
  public maxFilter: TextureFilter = "nearest";
  public minFilter: TextureFilter = "nearest";
  public mipmapLevels = 1;
  public unpackAlignment: TextureUnpackRowAlignment = 4;
  public unpackRowLength = 0;
  public wrapR: TextureWrapMode = "repeat";
  public wrapS: TextureWrapMode = "repeat";
  public wrapT: TextureWrapMode = "repeat";
  public needsUpdate = true;

  public abstract get width(): number;
  public abstract get height(): number;
  public abstract get data(): TexImageSource | ArrayBufferView | null;

  public get type() {
    return "Texture";
  }
}
