import { z } from "zod";

/**JSON from OME-NGFF .zattrs*/
export const Bf2raw = z
  .object({
    /**The top-level identifier metadata added by bioformats2raw*/
    "bioformats2raw.layout": z
      .literal(3)
      .describe("The top-level identifier metadata added by bioformats2raw")
      .optional(),
  })
  .describe("JSON from OME-NGFF .zattrs");
export type Bf2raw = z.infer<typeof Bf2raw>;
