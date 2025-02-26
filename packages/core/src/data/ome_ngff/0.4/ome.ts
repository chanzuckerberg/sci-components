import { z } from "zod";

/**JSON from OME-NGFF OME/.zattrs linked to an OME-XML file*/
export const Ome = z
  .object({
    /**An array of the same length and the same order as the images defined in the OME-XML*/
    series: z
      .array(z.string())
      .describe(
        "An array of the same length and the same order as the images defined in the OME-XML"
      )
      .optional(),
  })
  .describe("JSON from OME-NGFF OME/.zattrs linked to an OME-XML file");
export type Ome = z.infer<typeof Ome>;
