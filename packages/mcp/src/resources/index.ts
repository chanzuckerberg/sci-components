import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dataDir = join(__dirname, "../../data");

export function initializeResources(server: McpServer) {
  // List available resources
  server.setRequestHandler("resources/list", async () => ({
    resources: [
      {
        uri: "sds://rules/figma",
        name: "Figma to Code Translation Rules",
        mimeType: "text/markdown",
        description: "Rules for translating Figma designs to SDS code"
      },
      {
        uri: "sds://rules/components",
        name: "SDS Component Usage Rules", 
        mimeType: "text/markdown",
        description: "Guidelines for using SDS components correctly"
      },
      {
        uri: "sds://rules/zeroheight",
        name: "Zeroheight Documentation Rules",
        mimeType: "text/markdown", 
        description: "Rules for following Zeroheight documentation"
      }
    ]
  }));

  // Handle resource reading
  server.setRequestHandler("resources/read", async (request) => {
    const { uri } = request.params;
    
    let filePath: string;
    let content: string;
    
    try {
      switch (uri) {
        case "sds://rules/figma":
          filePath = join(dataDir, "figma-rules.md");
          content = readFileSync(filePath, "utf-8");
          break;
          
        case "sds://rules/components":
          filePath = join(dataDir, "sds-component-rules.md");
          content = readFileSync(filePath, "utf-8");
          break;
          
        case "sds://rules/zeroheight":
          filePath = join(dataDir, "zeroheight-rules.md");
          content = readFileSync(filePath, "utf-8");
          break;
          
        default:
          throw new Error("Unknown resource: " + uri);
      }
      
      return {
        contents: [
          {
            uri,
            mimeType: "text/markdown",
            text: content
          }
        ]
      };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      throw new Error("Failed to read resource " + uri + ": " + message);
    }
  });
}
