# SDS MCP Server

An MCP server providing AI assistants with access to SDS components,
examples, design tokens and migration patterns.

## Features

- **Component Library**: Get components, props, and usage examples
- **Migration Support**: Upgrade guidance with before/after code
  snippets
- **Design Tokens**: Access semantic tokens and font styles for consistent
  theming

## Available Tools

- `get_components` - List all Chakra UI components
- `get_component_props` - Get component properties and configuration
- `get_component_example` - Retrieve usage examples and code patterns
- `get_theme` - Get theme tokens, semantic tokens, text styles and layer styles

## Setup

### Claude Desktop / Cursor

```json
{
  "mcpServers": {
    "sds-mcp": {
      "command": "npx",
      "args": ["-y", "@czi-sds/mcp"]
    }
  }
}
```
