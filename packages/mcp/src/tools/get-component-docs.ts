/* eslint-disable sort-keys */
import { z } from "zod";
import { fetchComponentDocs, getComponentDocsIndex } from "../lib/fetch.js";
import type { ComponentDocsIndex, Tool } from "../lib/types.js";

interface ComponentDocsContext {
  index: ComponentDocsIndex;
  documented: string[];
}

export const getComponentDocsTool: Tool<ComponentDocsContext> = {
  name: "get_component_docs",
  description:
    "Get design system documentation for a specific SDS component. Returns the component's full documentation, including how it differs from the underlying MUI component, its props, and runnable code examples for each supported variation.",
  async ctx() {
    try {
      const index = await getComponentDocsIndex();

      return {
        index,
        documented: Object.keys(index),
      };
    } catch (error) {
      throw new Error(
        `Failed to initialize get component docs tool: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    }
  },
  exec(server, { ctx, name, description }) {
    server.tool(
      name,
      description,
      {
        component: z
          .enum(ctx.documented as [string, ...string[]])
          .describe("The name of the SDS component to get documentation for"),
      },
      async ({ component }) => {
        try {
          const entry = ctx.index[component];

          if (!entry) {
            return {
              content: [
                {
                  type: "text",
                  text: `No documentation found for component '${component}'. This component may not have design system documentation available.`,
                },
              ],
            };
          }

          const documentation = await fetchComponentDocs(entry.file);

          return {
            content: [
              {
                type: "text",
                text: `Package: ${entry.package}\nSource: ${entry.source}\n\n${documentation}`,
              },
            ],
          };
        } catch (error) {
          return {
            content: [
              {
                type: "text",
                text: `Error reading documentation for '${component}': ${error instanceof Error ? error.message : "Unknown error"}`,
              },
            ],
          };
        }
      }
    );
  },
};
