#!/usr/bin/env node
/* eslint-disable import/extensions */
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { server } from "./server.js";
import { initializeTools } from "./tools/index.js";
import { initializeResources } from "./resources/index.js";

async function main() {
  await initializeTools(server, {});
  initializeResources(server);

  const transport = new StdioServerTransport();
  await server.connect(transport);

  // Don't log to stdout as it interferes with the JSON-RPC protocol
  // console.info("SDS MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
