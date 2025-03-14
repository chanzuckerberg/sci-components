import { z } from "zod";

/**JSON from OME-NGFF .zattrs*/
export const Label = z
  .object({
    "image-label": z
      .object({
        /**The colors for this label image*/
        colors: z
          .array(
            z.object({
              /**The value of the label*/
              "label-value": z.number().describe("The value of the label"),
              /**The RGBA color stored as an array of four integers between 0 and 255*/
              rgba: z
                .array(z.number().int().gte(0).lte(255))
                .min(4)
                .max(4)
                .describe(
                  "The RGBA color stored as an array of four integers between 0 and 255"
                )
                .optional(),
            })
          )
          .min(1)
          .describe("The colors for this label image")
          .optional(),
        /**The properties for this label image*/
        properties: z
          .array(
            z.object({
              /**The pixel value for this label*/
              "label-value": z
                .number()
                .int()
                .describe("The pixel value for this label"),
            })
          )
          .min(1)
          .describe("The properties for this label image")
          .optional(),
        /**The source of this label image*/
        source: z
          .object({ image: z.string().optional() })
          .describe("The source of this label image")
          .optional(),
        /**The version of the specification*/
        version: z
          .literal("0.4")
          .describe("The version of the specification")
          .optional(),
      })
      .optional(),
  })
  .describe("JSON from OME-NGFF .zattrs");
export type Label = z.infer<typeof Label>;
