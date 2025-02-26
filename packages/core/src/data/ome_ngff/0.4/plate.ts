import { z } from "zod";

/**JSON from OME-NGFF .zattrs*/
export const Plate = z
  .object({
    plate: z
      .object({
        /**The acquisitions for this plate*/
        acquisitions: z
          .array(
            z.object({
              /**A unique identifier within the context of the plate*/
              id: z
                .number()
                .int()
                .gte(0)
                .describe(
                  "A unique identifier within the context of the plate"
                ),
              /**The maximum number of fields of view for the acquisition*/
              maximumfieldcount: z
                .number()
                .int()
                .gt(0)
                .describe(
                  "The maximum number of fields of view for the acquisition"
                )
                .optional(),
              /**The name of the acquisition*/
              name: z
                .string()
                .describe("The name of the acquisition")
                .optional(),
              /**The description of the acquisition*/
              description: z
                .string()
                .describe("The description of the acquisition")
                .optional(),
              /**The start timestamp of the acquisition, expressed as epoch time i.e. the number seconds since the Epoch*/
              starttime: z
                .number()
                .int()
                .gte(0)
                .describe(
                  "The start timestamp of the acquisition, expressed as epoch time i.e. the number seconds since the Epoch"
                )
                .optional(),
              /**The end timestamp of the acquisition, expressed as epoch time i.e. the number seconds since the Epoch*/
              endtime: z
                .number()
                .int()
                .gte(0)
                .describe(
                  "The end timestamp of the acquisition, expressed as epoch time i.e. the number seconds since the Epoch"
                )
                .optional(),
            })
          )
          .describe("The acquisitions for this plate")
          .optional(),
        /**The version of the specification*/
        version: z
          .literal("0.4")
          .describe("The version of the specification")
          .optional(),
        /**The maximum number of fields per view across all wells*/
        field_count: z
          .number()
          .int()
          .gt(0)
          .describe("The maximum number of fields per view across all wells")
          .optional(),
        /**The name of the plate*/
        name: z.string().describe("The name of the plate").optional(),
        /**The columns of the plate*/
        columns: z
          .array(
            z.object({
              /**The column name*/
              name: z
                .string()
                .regex(new RegExp("^[A-Za-z0-9]+$"))
                .describe("The column name"),
            })
          )
          .min(1)
          .describe("The columns of the plate"),
        /**The rows of the plate*/
        rows: z
          .array(
            z.object({
              /**The row name*/
              name: z
                .string()
                .regex(new RegExp("^[A-Za-z0-9]+$"))
                .describe("The row name"),
            })
          )
          .min(1)
          .describe("The rows of the plate"),
        /**The wells of the plate*/
        wells: z
          .array(
            z.object({
              /**The path to the well subgroup*/
              path: z
                .string()
                .regex(new RegExp("^[A-Za-z0-9]+/[A-Za-z0-9]+$"))
                .describe("The path to the well subgroup"),
              /**The index of the well in the rows list*/
              rowIndex: z
                .number()
                .int()
                .gte(0)
                .describe("The index of the well in the rows list"),
              /**The index of the well in the columns list*/
              columnIndex: z
                .number()
                .int()
                .gte(0)
                .describe("The index of the well in the columns list"),
            })
          )
          .min(1)
          .describe("The wells of the plate"),
      })
      .optional(),
  })
  .describe("JSON from OME-NGFF .zattrs");
export type Plate = z.infer<typeof Plate>;
