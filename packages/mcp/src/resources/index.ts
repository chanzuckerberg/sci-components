/* eslint-disable import/extensions */
import { readFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

const FILENAME = fileURLToPath(import.meta.url);
const DIRNAME = dirname(FILENAME);

const MIME_TYPE_MARKDOWN = "text/markdown";
const UNKNOWN_ERROR = "Unknown error";

/**
 * Finds the resource file by trying multiple paths
 * to support both dev and production environments
 */
function findResourceFile(fileName: string): string {
  const possiblePaths = [
    join(DIRNAME, "../../data/resources", fileName), // From src/resources in dev
    join(DIRNAME, "../data/resources", fileName), // From dist/resources in prod
    join(process.cwd(), "data/resources", fileName), // From current working directory
  ];

  for (const p of possiblePaths) {
    if (existsSync(p)) {
      return p;
    }
  }

  throw new Error(
    `Resource file '${fileName}' not found in any expected location`
  );
}

export function initializeResources(server: McpServer) {
  // Register Figma rules resource
  server.resource(
    "Figma to Code Translation Rules",
    "sds://rules/figma",
    {
      mimeType: MIME_TYPE_MARKDOWN,
      description: "Rules for translating Figma designs to SDS code",
    },
    async () => {
      try {
        const filePath = findResourceFile("figma-rules.md");
        const content = readFileSync(filePath, "utf-8");

        return {
          contents: [
            {
              uri: "sds://rules/figma",
              mimeType: MIME_TYPE_MARKDOWN,
              text: content,
            },
          ],
        };
      } catch (err) {
        const message = err instanceof Error ? err.message : UNKNOWN_ERROR;
        throw new Error("Failed to read Figma rules: " + message);
      }
    }
  );

  // Register SDS component rules resource
  server.resource(
    "SDS Component Usage Rules",
    "sds://rules/components",
    {
      mimeType: MIME_TYPE_MARKDOWN,
      description: "Guidelines for using SDS components correctly",
    },
    async () => {
      try {
        const filePath = findResourceFile("sds-component-rules.md");
        const content = readFileSync(filePath, "utf-8");

        return {
          contents: [
            {
              uri: "sds://rules/components",
              mimeType: MIME_TYPE_MARKDOWN,
              text: content,
            },
          ],
        };
      } catch (err) {
        const message = err instanceof Error ? err.message : UNKNOWN_ERROR;
        throw new Error("Failed to read component rules: " + message);
      }
    }
  );

  // Register Zeroheight rules resource
  server.resource(
    "Zeroheight Documentation Rules",
    "sds://rules/zeroheight",
    {
      mimeType: MIME_TYPE_MARKDOWN,
      description: "Rules for following Zeroheight documentation",
    },
    async () => {
      try {
        const filePath = findResourceFile("zeroheight-rules.md");
        const content = readFileSync(filePath, "utf-8");

        return {
          contents: [
            {
              uri: "sds://rules/zeroheight",
              mimeType: MIME_TYPE_MARKDOWN,
              text: content,
            },
          ],
        };
      } catch (err) {
        const message = err instanceof Error ? err.message : UNKNOWN_ERROR;
        throw new Error("Failed to read Zeroheight rules: " + message);
      }
    }
  );
}
