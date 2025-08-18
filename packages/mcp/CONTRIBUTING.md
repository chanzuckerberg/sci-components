# Contributing to SDS MCP Server

Welcome to the Science Design System (SDS) MCP Server! This guide will help you understand the architecture, create new tools, test your changes, and publish the server.

## Table of Contents

- [Architecture Overview](#architecture-overview)
- [Setting Up Development Environment](#setting-up-development-environment)
- [Creating a New Tool](#creating-a-new-tool)
- [Testing Your Changes](#testing-your-changes)
- [Publishing to NPM](#publishing-to-npm)
- [Real-World Testing](#real-world-testing)
- [Best Practices](#best-practices)

## Architecture Overview

### Project Structure

```
packages/mcp/
├── src/
│   ├── tools/              # Tool implementations
│   │   ├── index.ts        # Tool registry and initialization
│   │   └── *.ts            # Individual tool files
│   ├── lib/
│   │   ├── types.ts        # TypeScript type definitions
│   │   └── fetch.ts        # Data fetching utilities
│   ├── server.ts           # Core MCP server setup
│   ├── stdio.ts            # STDIO transport implementation
│   └── http.ts             # HTTP transport implementation
├── data/                   # Static data files
│   ├── component-list.json
│   ├── component-props/
│   ├── component-props-storybook/
│   └── tailwind.json
├── scripts/                # Build and generation scripts
│   ├── generate-*.ts       # Data generation scripts
│   └── inspect.js          # Inspector helper
└── dist/                   # Built output
```

### Core Concepts

#### 1. **MCP Server**

The Model Context Protocol (MCP) server provides tools to AI assistants for interacting with the SDS component library. It supports two transport methods:

- **STDIO**: For local CLI usage (primary method)
- **HTTP**: For web-based integrations

#### 2. **Tools**

Tools are functions that AI assistants can call to retrieve information or perform actions. Each tool:

- Has a unique name and description
- Defines input parameters using Zod schemas
- Returns structured data to the assistant
- Can have initialization context (`ctx`)

#### 3. **Data Layer**

The `data/` directory contains pre-generated JSON files with component information:

- Component lists and properties
- Storybook metadata
- Design tokens (Tailwind config)

## Setting Up Development Environment

### Prerequisites

1. Clone the repository:

```bash
git clone https://github.com/chanzuckerberg/sci-components.git
cd sci-components
```

2. Install/Use the correct NodeJs version

```bash
nvm use
```

3. Install dependencies:

```bash
yarn install
```

4. Build packages (required for data generation):

```bash
yarn build
```

5. Navigate to the MCP package:

```bash
cd packages/mcp
```

## Creating a New Tool

### Step 1: Create the Tool File

Create a new file in `src/tools/` (e.g., `src/tools/my-new-tool.ts`):

```typescript
import { z } from "zod";
import { type Tool } from "../lib/types.js";

// Define the tool's context type (optional)
type MyToolContext = {
  // Any data needed during initialization
  availableOptions?: string[];
};

export const myNewTool: Tool<MyToolContext> = {
  name: "my_new_tool",
  description: "Brief description of what this tool does for AI assistants",

  // Optional: Initialize context data
  async ctx() {
    // Load any necessary data at startup
    const availableOptions = await loadOptions();
    return { availableOptions };
  },

  // Optional: Conditionally disable the tool
  disabled(config) {
    return config.someFeatureFlag === false;
  },

  // Register and implement the tool
  exec(server, { ctx, name, description }) {
    server.tool(
      name,
      description,
      {
        // Define input parameters using Zod
        param1: z.string().describe("Description of param1"),
        param2: z
          .enum(["option1", "option2"])
          .optional()
          .describe("Optional parameter with enum values"),
      },
      async ({ param1, param2 }) => {
        try {
          // Tool implementation
          const result = await processData(param1, param2);

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
                text: `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
              },
            ],
          };
        }
      }
    );
  },
};
```

### Step 2: Register the Tool

Add your tool to `src/tools/index.ts`:

```typescript
import { myNewTool } from "./my-new-tool.js";

const tools: Tool[] = [
  getComponentPropsTool,
  getComponentPropsStorybookTool,
  listComponentsTool,
  getTailwindTokensTool,
  myNewTool, // Add your tool here
];
```

### Step 3: Add TypeScript Types (if needed)

If your tool requires custom types, add them to `src/lib/types.ts`:

```typescript
export interface MyToolData {
  // Define your data structure
}
```

### Step 4: Add Data Generation Script (if needed)

If your tool requires pre-generated data, create a script in `scripts/`:

```typescript
// scripts/generate-my-data.ts
import { writeFileSync } from "fs";
import { join } from "path";

async function generateMyData() {
  const data = await collectData();

  const outputPath = join(process.cwd(), "data", "my-data.json");
  writeFileSync(outputPath, JSON.stringify(data, null, 2));

  console.log("✓ Generated my-data.json");
}

generateMyData().catch(console.error);
```

Add the script to `package.json`:

```json
{
  "scripts": {
    "generate:my-data": "tsx scripts/generate-my-data.ts",
    "generate:all": "... && yarn generate:my-data"
  }
}
```

## Testing Your Changes

### Using the MCP Inspector

The MCP Inspector provides an interactive UI for testing your tools:

1. **Start the inspector from monorepo root with your local server:**

```bash
yarn mcp:inspect:dev
```

You can also navigate to the MCP package directory first and then run the commands directly from there:

```bash
cd packages/mcp
yarn inspect:dev
```

This will open a web interface where you can:

- See all available tools
- Test tool invocations with different parameters
- View responses in real-time
- Debug any issues

2. **Test your specific tool:**

- Click "Connect" in the left sidebar to connect to the MCP server.
- Click "List Tools" to view all available tools.
- Fill in the required parameters.
- Click "Run Tool" to execute it and view the response.
- Verify both the output format and the content.

### Manual Testing with the Built Server

1. **Build the server:**

```bash
cd packages/mcp
yarn build
```

2. **Run the inspector with the built version:**

```bash
cd packages/mcp
yarn inspect
```

## Publishing to NPM

### Pre-publish Checklist

Navigate to the MCP package directory first and then run the following commands:

1. **Ensure all data is generated:**

```bash
yarn generate:all
```

2. **Build the package:**

```bash
yarn build
```

3. **Test the built package:**

```bash
yarn inspect
```

### Publishing Process

The SDS monorepo uses Lerna for publishing. From the repository root:

1. **Commit all changes:**

```bash
git add .
git commit
```

2. **Push to main branch** (after PR approval):

```bash
git push origin main
```

3. **Publish via CI/CD:**
   The automated workflow handles publishing when changes are pushed to the `prod` branch:

```bash
# Sync prod with main
git checkout prod
git pull origin main
git push origin prod
```

## Real-World Testing

### Testing in Claude Desktop

1. **Configure Claude Desktop:**

Add to your Claude Desktop configuration file:

- macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
- Windows: `%APPDATA%\Claude\claude_desktop_config.json`

For local MCP testing, make sure the path to your sci-components project matches your setup.

```json
{
  "mcpServers": {
    "sds-mcp": {
      "command": "node",
      "args": ["/sci-components/packages/mcp/dist/stdio.js"]
    }
  }
}
```

To test the published version simply use npx to run the mcp server package:

```json
{
  "mcpServers": {
    "sds-mcp": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@mui/sds-mcp"]
    }
  }
}
```

3. **Restart Claude Desktop** and test your tool in conversations

### Testing in Other MCP Clients

The server can be integrated with any MCP-compatible client:

1. **Via NPX (without installation):**

```json
{
  "mcpServers": {
    "sds-mcp": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@mui/sds-mcp"]
    }
  }
}
```

## Best Practices

### Tool Design

1. **Clear Naming**: Use descriptive, snake_case names (e.g., `get_component_props`)
2. **Comprehensive Descriptions**: Help AI assistants understand when to use your tool
3. **Error Handling**: Always wrap async operations in try-catch blocks
4. **Structured Output**: Return consistent JSON structures
5. **Parameter Validation**: Use Zod schemas to validate inputs

### Performance

1. **Lazy Loading**: Load data only when needed using the `ctx()` function
2. **Caching**: Cache expensive operations in the tool context
3. **Data Size**: Keep responses under reasonable size limits
4. **Async Operations**: Use async/await for all I/O operations

## Common Issues and Solutions

### Issue: Tool not appearing in inspector

**Solution**: Ensure the tool is properly registered in `src/tools/index.ts` and rebuild

### Issue: Data files not found

**Solution**: Run `yarn generate:all` before building

### Issue: Permission denied when running built script

**Solution**: Run `chmod +x dist/stdio.js` after building

## Getting Help

- **GitHub Issues**: [Report bugs or request features](https://github.com/chanzuckerberg/sci-components/issues)
- **Design System Docs**: [sds.czi.design](https://sds.czi.design)
- **MCP Documentation**: [Model Context Protocol](https://modelcontextprotocol.io)

## Contributing Guidelines

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-tool`)
3. Make your changes
4. Write/update tests if applicable
5. Submit a pull request

Thank you for contributing to the SDS MCP Server!
