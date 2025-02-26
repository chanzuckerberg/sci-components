import { z } from "zod";

/**JSON from OME-NGFF .zattrs*/
export const Well = z
  .object({
    well: z
      .object({
        /**The fields of view for this well*/
        images: z
          .array(
            z.object({
              /**A unique identifier within the context of the plate*/
              acquisition: z
                .number()
                .int()
                .describe("A unique identifier within the context of the plate")
                .optional(),
              /**The path for this field of view subgroup*/
              path: z
                .string()
                .regex(new RegExp("^[A-Za-z0-9]+$"))
                .describe("The path for this field of view subgroup"),
            })
          )
          .min(1)
          .describe("The fields of view for this well"),
        /**The version of the specification*/
        version: z
          .literal("0.4")
          .describe("The version of the specification")
          .optional(),
      })
      .optional(),
  })
  .describe("JSON from OME-NGFF .zattrs");
export type Well = z.infer<typeof Well>;
