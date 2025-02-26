import { z } from "zod";

/**JSON from OME-NGFF .zattrs*/
export const Image = z
  .object({
    /**The multiscale datasets for this image*/
    multiscales: z
      .array(
        z.object({
          name: z.string().optional(),
          datasets: z
            .array(
              z.object({
                path: z.string(),
                coordinateTransformations: z
                  .array(
                    z.any().superRefine((x, ctx) => {
                      const schemas = [
                        z.object({
                          type: z.literal("scale"),
                          scale: z.array(z.number()).min(2),
                        }),
                        z.object({
                          type: z.literal("translation"),
                          translation: z.array(z.number()).min(2),
                        }),
                      ];
                      const errors = schemas.reduce<z.ZodError[]>(
                        (errors, schema) =>
                          ((result) =>
                            result.error ? [...errors, result.error] : errors)(
                            schema.safeParse(x)
                          ),
                        []
                      );
                      if (schemas.length - errors.length !== 1) {
                        ctx.addIssue({
                          path: ctx.path,
                          code: "invalid_union",
                          unionErrors: errors,
                          message: "Invalid input: Should pass single schema",
                        });
                      }
                    })
                  )
                  .min(1),
              })
            )
            .min(1),
          version: z.literal("0.4").optional(),
          axes: z
            .array(
              z.any().superRefine((x, ctx) => {
                const schemas = [
                  z.object({
                    name: z.string(),
                    type: z.enum(["channel", "time", "space"]),
                  }),
                  z.object({
                    name: z.string(),
                    type: z
                      .any()
                      .refine(
                        (value) =>
                          !z.enum(["space", "time", "channel"]).safeParse(value)
                            .success,
                        "Invalid input: Should NOT be valid against schema"
                      )
                      .optional(),
                  }),
                ];
                const errors = schemas.reduce<z.ZodError[]>(
                  (errors, schema) =>
                    ((result) =>
                      result.error ? [...errors, result.error] : errors)(
                      schema.safeParse(x)
                    ),
                  []
                );
                if (schemas.length - errors.length !== 1) {
                  ctx.addIssue({
                    path: ctx.path,
                    code: "invalid_union",
                    unionErrors: errors,
                    message: "Invalid input: Should pass single schema",
                  });
                }
              })
            )
            .min(2)
            .max(5),
          coordinateTransformations: z
            .array(
              z.any().superRefine((x, ctx) => {
                const schemas = [
                  z.object({
                    type: z.literal("scale"),
                    scale: z.array(z.number()).min(2),
                  }),
                  z.object({
                    type: z.literal("translation"),
                    translation: z.array(z.number()).min(2),
                  }),
                ];
                const errors = schemas.reduce<z.ZodError[]>(
                  (errors, schema) =>
                    ((result) =>
                      result.error ? [...errors, result.error] : errors)(
                      schema.safeParse(x)
                    ),
                  []
                );
                if (schemas.length - errors.length !== 1) {
                  ctx.addIssue({
                    path: ctx.path,
                    code: "invalid_union",
                    unionErrors: errors,
                    message: "Invalid input: Should pass single schema",
                  });
                }
              })
            )
            .min(1)
            .optional(),
        })
      )
      .min(1)
      .describe("The multiscale datasets for this image"),
    omero: z
      .object({
        channels: z.array(
          z.object({
            window: z.object({
              end: z.number(),
              max: z.number(),
              min: z.number(),
              start: z.number(),
            }),
            label: z.string().optional(),
            family: z.string().optional(),
            color: z.string(),
            active: z.boolean().optional(),
          })
        ),
      })
      .optional(),
  })
  .describe("JSON from OME-NGFF .zattrs");
export type Image = z.infer<typeof Image>;
