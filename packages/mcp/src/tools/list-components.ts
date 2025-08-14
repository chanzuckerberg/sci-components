/* eslint-disable sort-keys */
import { getAllComponentNames } from "../lib/fetch.js";
import type { Tool } from "../lib/types.js";

export const listComponentsTool: Tool<{ componentList: string[] }> = {
  name: "list_components",
  description:
    "List all available components in SDS. This tool retrieves the names of all available SDS components.",
  async ctx() {
    try {
      const componentList = await getAllComponentNames();
      return { componentList };
    } catch (error) {
      throw new Error(
        `Failed to initialize list components tool: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    }
  },
  exec(server, { ctx, name, description }) {
    server.tool(name, description, {}, async () => {
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(ctx.componentList, null, 2),
          },
        ],
      };
    });
  },
};
