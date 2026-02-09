/* eslint-disable import/extensions */
/* eslint-disable sort-keys */
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

export const server = new McpServer({
  name: "sds-mcp",
  version: "0.1.0",
  capabilities: {
    prompts: {},
    resources: {
      subscribe: true,
      listChanged: true,
    },
    tools: {},
  },
});
