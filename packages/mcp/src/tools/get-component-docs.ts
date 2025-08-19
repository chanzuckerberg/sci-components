/* eslint-disable sort-keys */
import { z } from "zod";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { getAllComponentNames } from "../lib/fetch.js";
import type { ComponentList, Tool } from "../lib/types.js";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

interface ComponentDocsContext {
  componentsWithDocs: string[];
  exportedFiles: string[];
}

/**
 * Maps a component name to the corresponding Zeroheight file using manual mapping
 */
function mapComponentToFile(componentName: string, exportedFiles: string[]): string | null {
  // Manual mapping of component names to Zeroheight file names
  const componentToFileMap: Record<string, string> = {
    // Button components
    'Button': 'Buttons',
    'ButtonDropdown': 'Buttons', 
    'ButtonIcon': 'Buttons',
    'ButtonToggle': 'Buttons',
    
    // Table components
    'TableHeader': 'Table',
    'TableRow': 'Table',
    
    // Input components
    'InputCheckbox': 'Control-Inputs',
    'InputRadio': 'Control-Inputs',
    'InputToggle': 'Control-Inputs',
    'InputText': 'Field-Inputs',
    'InputDropdown': 'Dropdown-Input',
    'InputSearch': 'Search-Input',
    'InputSlider': 'Control-Inputs',
    
    // Dropdown components
    'Dropdown': 'Dropdown-Menu',
    'DropdownMenu': 'Dropdown-Menu',
    
    // Content components
    'ContentCard': 'Content-Card',
    'LoadingIndicator': 'Loading-Indicator',
    
    // Navigation components
    'NavigationFooter': 'Navigation',
    'NavigationHeader': 'Navigation',
    'NavigationJumpTo': 'Navigation',
    
    // Control components
    'SegmentedControl': 'Segmented-Control',
    
    // List and menu components
    'List': 'Lists',
    'Menu': 'Dropdown-Menu',
    'MenuItem': 'Dropdown-Menu',
    'MenuSelect': 'Dropdown-Menu',
    
    // Tag components
    'Tag': 'Tags',
    'TagFilter': 'Tags',
    
    // Tooltip components
    'Tooltip': 'Tooltips',
    'TooltipCondensed': 'Tooltips',
    'TooltipTable': 'Tooltips',
    
    // Cell components (likely in Table or Lists)
    'CellBasic': 'Table',
    'CellComponent': 'Table', 
    'CellHeader': 'Table',
    
    // Filter components
    'ComplexFilter': 'Filters',
    
    // Other components
    'Icon': 'Icons',
    'Chip': 'Tags', // Chips are often similar to tags
    'Pagination': 'Navigation', // Pagination is often part of navigation
  };
  
  // Check manual mapping first
  const mappedFile = componentToFileMap[componentName];
  if (mappedFile && exportedFiles.includes(mappedFile)) {
    return `${mappedFile}.md`;
  }
  
  // Fallback to exact match only
  if (exportedFiles.includes(componentName)) {
    return `${componentName}.md`;
  }
  
  return null; // No match found
}

/**
 * Get list of exported documentation files
 */
function getExportedFiles(): string[] {
  try {
    // Try multiple paths to support both dev (tsx) and prod (built) environments
    const possiblePaths = [
      path.join(dirname, "../../data/zeroheight-exports"), // From src/lib in dev
      path.join(dirname, "../data/zeroheight-exports"), // From dist in prod
      path.join(process.cwd(), "data/zeroheight-exports"), // From current working directory
    ];

    let exportDir = "";
    for (const p of possiblePaths) {
      if (fs.existsSync(p)) {
        exportDir = p;
        break;
      }
    }

    if (!exportDir) {
      console.warn('Export directory not found in any expected location. Please run Zeroheight export first.');
      return [];
    }
    
    const files = fs.readdirSync(exportDir)
      .filter(file => file.endsWith('.md') && file !== 'README.md')
      .map(file => file.replace('.md', ''));
    
    return files;
  } catch (error) {
    console.warn('Could not read exported files:', error);
    return [];
  }
}

/**
 * Get list of components that have documentation available
 */
function getComponentsWithDocs(allComponents: string[], exportedFiles: string[]): string[] {
  return allComponents.filter(component => {
    const mappedFile = mapComponentToFile(component, exportedFiles);
    return mappedFile !== null;
  });
}

export const getComponentDocsTool: Tool<ComponentDocsContext> = {
  name: "get_component_docs",
  description:
    "Get design system documentation for a specific component. Retrieves the corresponding Zeroheight documentation file for the given component name. Supports all SDS components and maps them to their appropriate documentation files.",
  async ctx() {
    try {
      const componentList = await getAllComponentNames();
      const allComponents = [
        ...componentList.components,
        ...componentList["data-viz"],
      ];
      const exportedFiles = getExportedFiles();
      const componentsWithDocs = getComponentsWithDocs(allComponents, exportedFiles);
      
      return { 
        componentsWithDocs,
        exportedFiles 
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
          .enum(ctx.componentsWithDocs as [string, ...string[]])
          .describe("The name of the SDS component to get documentation for"),
      },
      async ({ component }) => {
        try {
          // Map component to documentation file
          const mappedFile = mapComponentToFile(component, ctx.exportedFiles);
          
          if (!mappedFile) {
            return {
              content: [
                {
                  type: "text",
                  text: `No documentation found for component '${component}'. This component may not have design system documentation available.`,
                },
              ],
            };
          }

          // Read the documentation file using multiple paths
          const possiblePaths = [
            path.join(dirname, "../../data/zeroheight-exports", mappedFile), // From src/lib in dev
            path.join(dirname, "../data/zeroheight-exports", mappedFile), // From dist in prod
            path.join(process.cwd(), "data/zeroheight-exports", mappedFile), // From current working directory
          ];

          let filePath = "";
          for (const p of possiblePaths) {
            if (fs.existsSync(p)) {
              filePath = p;
              break;
            }
          }

          if (!filePath) {
            throw new Error(`Documentation file ${mappedFile} not found`);
          }
          
          const documentation = fs.readFileSync(filePath, 'utf8');
          
          return {
            content: [
              {
                type: "text",
                text: `# Documentation for ${component}\n\nSource: ${mappedFile}\n\n${documentation}`,
              },
            ],
          };
        } catch (error) {
          return {
            content: [
              {
                type: "text",
                text: `Error reading documentation file for '${component}': ${error instanceof Error ? error.message : "Unknown error"}`,
              },
            ],
          };
        }
      }
    );
  },
};