import { readFile } from "fs/promises";
import { join } from "path";
import { z } from "zod";
import { type Tool } from "../lib/types.js";

export const getTailwindTokensTool: Tool = {
  name: "get_tailwind_tokens",
  description:
    "Get all available Tailwind tokens from the SDS design system. Returns design tokens including colors, typography, spacing, borders, shadows, and other design system values formatted for Tailwind CSS.",
  async ctx() {
    return {};
  },
  exec(server, { name, description }) {
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
          const dataPath = join(process.cwd(), "data", "tailwind.json");
          const fileContent = await readFile(dataPath, "utf-8");
          const tokens = JSON.parse(fileContent);

          let result = tokens;
          if (category && category !== "all") {
            result = tokens[category] || {};
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
