import { z } from "zod";
import { TailwindTokens, type Tool } from "../lib/types.js";
import { fetchTailwindTokens } from "../lib/fetch.js";

export const getTailwindTokensTool: Tool<{
  tailwindTokens: TailwindTokens;
}> = {
  name: "get_tailwind_tokens",
  description:
    "Get all available Tailwind tokens from the SDS design system. Available design tokens include fontFamily, fontSize, fontVariantNumeric, letterSpacing, lineHeight, textDecoration, textTransform, typography, height, width, borderRadius, boxShadow, breakpoints, colors, spacing, and more.",
  async ctx() {
    try {
      const tailwindTokens = await fetchTailwindTokens();
      return { tailwindTokens };
    } catch (error) {
      throw new Error(
        `Failed to initialize tailwind tokens tool: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    }
  },
  exec(server, { ctx, name, description }) {
    server.tool(
      name,
      description,
      {
        category: z
          .enum([
            "all",
            "fontFamily",
            "fontSize",
            "fontVariantNumeric",
            "letterSpacing",
            "lineHeight",
            "textDecoration",
            "textTransform",
            "typography",
            "height",
            "width",
            "borderRadius",
            "boxShadow",
            "breakpoints",
            "colors",
            "spacing",
          ])
          .optional()
          .describe(
            "Optional category of tokens to retrieve. If not specified, returns all tokens."
          ),
      },
      async ({ category }) => {
        try {
          const tokens = ctx.tailwindTokens;
          let result: TailwindTokens | TailwindTokens[keyof TailwindTokens];

          if (!category || category === "all") {
            result = tokens;
          } else {
            result = tokens[category as keyof TailwindTokens] || {};
          }

          return {
            content: [
              {
                type: "text",
                text: JSON.stringify(result, null, 2),
              },
            ],
          };
        } catch (error) {
          return {
            content: [
              {
                type: "text",
                text: `Failed to get Tailwind tokens: ${error instanceof Error ? error.message : "Unknown error"}`,
              },
            ],
          };
        }
      }
    );
  },
};
