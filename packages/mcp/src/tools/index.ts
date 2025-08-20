/* eslint-disable import/extensions */
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { Tool, ToolConfig } from "../lib/types.js";
import { getComponentPropsTool } from "./get-component-props.js";
import { listComponentsTool } from "./list-components.js";
import { getTailwindTokensTool } from "./get-tailwind-tokens.js";

const tools: Tool[] = [
  getComponentPropsTool,
  listComponentsTool,
  getTailwindTokensTool,
];

const registeredToolCache = new Map<string, Tool>();

export const initializeTools = async (
  server: McpServer,
  config: ToolConfig
) => {
  const enabledTools = tools.filter((tool) => !tool.disabled?.(config));

  await Promise.all(
    enabledTools.map(async (tool) => {
      const toolCtx = await tool.ctx?.();
      if (registeredToolCache.has(tool.name)) {
        return;
      }
      registeredToolCache.set(tool.name, tool);
      tool.exec(server, {
        config,
        ctx: toolCtx,
        description: tool.description,
        name: tool.name,
      });
    })
  );
};
