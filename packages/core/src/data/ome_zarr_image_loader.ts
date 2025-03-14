import * as zarr from "zarrita";
import { Slice } from "@zarrita/indexing";

import { Region } from "../data/region";
import { ImageChunk, isImageChunkData } from "../data/image_chunk";
import { isTextureUnpackRowAlignment } from "../objects/textures/texture";
import { PromiseScheduler } from "./promise_scheduler";

import { Image as OmeNgffImage } from "../data/ome_ngff/0.4/image";
type Axis = OmeNgffImage["multiscales"][number]["axes"][number];

// Implements the interface required for getting array chunks in zarrita:
// https://github.com/manzt/zarrita.js/blob/c15c1a14e42a83516972368ac962ebdf56a6dcdb/packages/indexing/src/types.ts#L52
export class PromiseQueue<T> {
  private promises_: Array<() => Promise<T>> = [];
  private scheduler_: PromiseScheduler;

  constructor(scheduler: PromiseScheduler) {
    this.scheduler_ = scheduler;
  }

  add(promise: () => Promise<T>): void {
    this.promises_.push(promise);
  }

  onIdle(): Promise<Array<T>> {
    return Promise.all(this.promises_.map((p) => this.scheduler_.submit(p)));
  }
}

// Loads chunks from a multiscale zarr image implementing OME-NGFF v0.4:
// https://ngff.openmicroscopy.org/0.4/#image-layout
export class OmeZarrImageLoader {
  root_: zarr.Group<zarr.FetchStore>;
  metadata_: OmeNgffImage;

  constructor(root: zarr.Group<zarr.FetchStore>) {
    this.root_ = root;
    const attrs = this.root_.attrs;
    // TODO: silly fix for removing top-level identity transform,
    // which is not allowed by spec but may have been written by
    // some writers.
    // This may need to be done for top-level `coordinateTransformations` as well.
    // https://github.com/ome/ngff/pull/152
    if (
      Array.isArray(attrs?.multiscales) &&
      Array.isArray(attrs.multiscales[0]?.coordinateTransformations) &&
      attrs.multiscales[0].coordinateTransformations[0]?.type === "identity"
    ) {
      delete attrs.multiscales[0].coordinateTransformations;
    }
    this.metadata_ = OmeNgffImage.parse(this.root_.attrs);
    if (this.metadata_.multiscales.length !== 1) {
      throw new Error(
        `Can only handle one multiscale image. Found ${this.metadata_.multiscales.length}`
      );
    }
  }

  async loadChunk(
    region: Region,
    scheduler?: PromiseScheduler
  ): Promise<ImageChunk> {
    const image = this.metadata_.multiscales[0];
    // TODO: use the input to determine what level to load.
    // https://github.com/chanzuckerberg/imaging-active-learning/issues/37
    const lowestResolutionIndex = image.datasets.length - 1;
    const dataset = image.datasets[lowestResolutionIndex];
    const scale = dataset.coordinateTransformations[0].scale;
    // TODO: fix zod to generate this type information.
    const axes = image.axes;
    const translation =
      dataset.coordinateTransformations.length === 2
        ? dataset.coordinateTransformations[1].translation
        : new Array(axes.length).fill(0);

    const indices = regionToIndices(region, axes, scale, translation);
    console.debug("loading dataset with indices", dataset, indices);

    const array = await zarr.open.v2(this.root_.resolve(dataset.path), {
      kind: "array",
      attrs: false,
    });

    let options = {};
    if (scheduler !== undefined) {
      options = {
        create_queue: () => new PromiseQueue(scheduler),
        opts: { signal: scheduler.abortSignal },
      };
    }
    const subarray = await zarr.get(array, indices, options);

    if (!isImageChunkData(subarray.data)) {
      throw new Error(
        `Subarray has an unsupported data type ${subarray.data.constructor.name}`
      );
    }

    if (subarray.shape.length !== 2 && subarray.shape.length !== 3) {
      throw new Error(
        `Expected to receive a 2D or 3D subarray. Instead chunk has shape ${subarray.shape}`
      );
    }

    const rowAlignment = subarray.data.BYTES_PER_ELEMENT;
    if (!isTextureUnpackRowAlignment(rowAlignment)) {
      throw new Error(
        "Invalid row alignment value. Possible values are 1, 2, 4, or 8"
      );
    }

    const calculateOffset = (i: number) => {
      const index = indices[i];
      if (typeof index === "number" || index.start === null) return 0;
      return index.start * scale[i] + translation[i];
    };
    const xOffset = calculateOffset(indices.length - 1);
    const yOffset = calculateOffset(indices.length - 2);

    const chunk = {
      data: subarray.data,
      shape: {
        x: subarray.shape[subarray.shape.length - 1],
        y: subarray.shape[subarray.shape.length - 2],
        c: subarray.shape.length === 3 ? subarray.shape[0] : 1,
      },
      rowStride: subarray.stride[subarray.stride.length - 2],
      rowAlignmentBytes: rowAlignment,
      scale: { x: scale[indices.length - 1], y: scale[indices.length - 2] },
      offset: { x: xOffset, y: yOffset },
    };
    console.debug("loaded chunk ", chunk);
    return chunk;
  }
}

// Converts a region to indices within an OME-Zarr image array.
function regionToIndices(
  region: Region,
  axes: Array<Axis>,
  scale: number[],
  translation: number[]
): Array<Slice | number> {
  const indices: Array<Slice | number> = [];
  for (const [i, axis] of Array.from(axes.entries())) {
    const match = region.find((s) => s.dimension == axis.name);
    // If a match was not found use a null slice which represents
    // the complete extent of a dimension like Python's `slice(None)`.
    let index: Slice | number = zarr.slice(null);
    if (match) {
      const regionIndex = match.index;
      if (typeof regionIndex === "number") {
        index = Math.round(translation[i] + regionIndex / scale[i]);
      } else {
        index = zarr.slice(
          Math.floor(translation[i] + regionIndex.start / scale[i]),
          Math.ceil(translation[i] + regionIndex.stop / scale[i])
        );
      }
    }
    indices.push(index);
  }
  return indices;
}
