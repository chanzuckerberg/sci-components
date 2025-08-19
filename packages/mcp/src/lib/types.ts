/* eslint-disable import/extensions */
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

export interface ToolConfig {
  apiKey?: string;
}

export interface Tool<T = unknown> {
  name: string;
  description: string;
  ctx?(): Promise<T> | void;
  disabled?(config: ToolConfig): boolean;
  exec(
    server: McpServer,
    opts: { ctx: T; name: string; description: string; config: ToolConfig }
  ): Promise<void> | void;
}

export interface ComponentList {
  components: string[];
  "data-viz": string[];
}

export interface TailwindTokens {
  fontFamily?: Record<string, string>;
  fontSize?: Record<string, string>;
  fontVariantNumeric?: Record<string, string>;
  letterSpacing?: Record<string, string>;
  lineHeight?: Record<string, string>;
  textDecoration?: Record<string, string>;
  textTransform?: Record<string, string>;
  height?: Record<string, string>;
  width?: Record<string, string>;
  spacing?: Record<string, string>;
  borderRadius?: Record<string, string>;
  boxShadow?: Record<string, string>;
  breakpoints?: Record<string, string>;
  colors?: {
    light?: Record<string, string>;
    dark?: Record<string, string>;
  };
  typography?: Record<
    string,
    {
      css?: {
        fontFamily?: string;
        fontSize?: string;
        fontStyle?: string;
        fontVariantNumeric?: string;
        fontWeight?: string;
        letterSpacing?: string;
        lineHeight?: string;
        textDecoration?: string;
        textTransform?: string;
      };
    }
  >;
}
