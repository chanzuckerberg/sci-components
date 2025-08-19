/**
 * Tailwind token usage guidance and examples for MCP tools
 */

export interface TokenGuidance {
  category: string;
  description: string;
  prefixes: string[];
  examples: {
    description: string;
    code: string;
  }[];
  tips?: string[];
}

export const TAILWIND_TOKEN_GUIDANCE: Record<string, TokenGuidance> = {
  colors: {
    category: "Colors",
    description:
      "Theme-aware color tokens with light/dark mode support. Both light and dark mode colors are using the same token name. Use the dark:color-token-name to use the dark mode color.",
    prefixes: [
      "bg-",
      "border-",
      "divide-",
      "outline-",
      "ring-",
      "ring-offset-",
      "text-",
      "placeholder-",
      "caret-",
      "decoration-",
      "accent-",
      "shadow-",
      "fill-",
      "stroke-",
      "from-",
      "via-",
      "to-",
    ],
    examples: [
      {
        description: "Basic text and background colors",
        code: `<div className="bg-sds-color-semantic-base-background-primary dark:bg-sds-color-semantic-base-background-primary text-sds-color-semantic-base-text-primary dark:text-sds-color-semantic-base-text-primary">
  Content with semantic colors
</div>`,
      },
      {
        description: "Dark mode with hover states",
        code: `<button className="bg-sds-color-semantic-accent-fill-primary dark:bg-sds-color-semantic-accent-fill-primary
        hover:bg-sds-color-semantic-accent-fill-hover dark:hover:bg-sds-color-semantic-accent-fill-hover">
  Click me
</button>`,
      },
      {
        description: "Border and focus states",
        code: `<input className="
  border-sds-color-semantic-base-border-primary
  hover:border-sds-color-semantic-base-border-primary-hover
  focus:border-sds-color-semantic-base-border-primary-pressed
"/>`,
      },
    ],
    tips: [
      "Always use semantic colors (e.g., 'sds-color-semantic-base-background-primary') over primitive colors when possible",
      "Include both light and dark variants for proper theme support",
    ],
  },

  typography: {
    category: "Typography",
    description:
      "Complete text styling presets including font, size, weight, and spacing",
    prefixes: ["font-", "text-", "leading-", "tracking-"],
    examples: [
      {
        description:
          "Typography presets (recommended). SDS typography tokens come in narrow and wide variants: use token-narrow on screens smaller than md, and token-wide on md and up.",
        code: `<!-- Use typography tokens for complete text styling -->
<h1 className="prose-sds-title-l-700-wide">Title</h1>     
<h1 className="prose-sds-header-xl-600-wide">Heading</h1>
<p className="prose-sds-body-m-500-wide">Body text</p>
<span className="prose-sds-caps-xxs-600-wide">SMALL CAPS TEXT</span>
<span className="prose-sds-tabular-xxs-600-wide">Tabular Numbers</span>
<span className="prose-sds-code-s-500-wide">Code</span>
<span className="prose-sds-link-l-500-wide">Link style</span>`,
      },
      {
        description: "Individual typography properties",
        code: `<!-- Or use individual properties when needed -->
<p className="
  font-sds-body
  text-sds-body-m-400-wide
  leading-sds-body-m-400-wide
  tracking-sds-body-m-400-wide
">
  Custom styled text
</p>`,
      },
    ],
    tips: [
      "Use 'narrow' variants for mobile/compact layouts",
      "Use 'wide' variants for desktop/spacious layouts",
      "Font weights: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)",
    ],
  },

  spacing: {
    category: "Spacing",
    description: "Consistent spacing scale for padding, margin, and gaps",
    prefixes: [
      "p-",
      "px-",
      "py-",
      "pt-",
      "pr-",
      "pb-",
      "pl-",
      "m-",
      "mx-",
      "my-",
      "mt-",
      "mr-",
      "mb-",
      "ml-",
      "gap-",
      "gap-x-",
      "gap-y-",
      "space-x-",
      "space-y-",
    ],
    examples: [
      {
        description: "Padding and margin",
        code: `<div className="p-sds-m mx-sds-l my-sds-s">
  Content with medium padding and different margins
</div>`,
      },
      {
        description: "Flexbox and grid gaps",
        code: `<div className="flex gap-sds-m">
  <div>Item 1</div>
  <div>Item 2</div>
</div>

<div className="grid grid-cols-3 gap-sds-l">
  <div>Grid item</div>
</div>`,
      },
      {
        description: "Negative margins for overlapping",
        code: `<div className="-mt-sds-s">
  Overlapping element
</div>`,
      },
    ],
    tips: [
      "Scale: sds-s (small), sds-default (default), sds-m (medium), sds-l (large), sds-xl (extra large)",
      "Use consistent spacing throughout your component",
      "Combine with responsive prefixes: sm:p-sds-m lg:p-sds-l",
    ],
  },

  borderRadius: {
    category: "Border Radius",
    description: "Corner radius values for rounded elements",
    prefixes: [
      "rounded-",
      "rounded-t-",
      "rounded-r-",
      "rounded-b-",
      "rounded-l-",
    ],
    examples: [
      {
        description: "Basic rounded corners",
        code: `<div className="rounded-sds-default">
  Standard rounded corners
</div>

<button className="rounded-sds-m">
  More rounded button
</button>`,
      },
      {
        description: "Directional radius",
        code: `<div className="rounded-t-sds-l rounded-b-none">
  Only top corners rounded
</div>`,
      },
    ],
    tips: [
      "Use sds-default for most UI elements",
      "Larger values (sds-l, sds-xl) for prominent elements",
      "Combine with borders: border rounded-sds-m",
    ],
  },

  boxShadow: {
    category: "Box Shadow",
    description: "Elevation shadows for depth and hierarchy",
    prefixes: ["shadow-", "hover:shadow-", "focus:shadow-"],
    examples: [
      {
        description: "Basic shadows",
        code: `<div className="shadow-sds-s">
  Subtle shadow
</div>

<div className="shadow-sds-m">
  Medium elevation
</div>`,
      },
      {
        description: "Interactive shadows",
        code: `<button className="
  shadow-sds-s
  hover:shadow-sds-m
  active:shadow-sds-xs
  transition-shadow
">
  Interactive element
</button>`,
      },
    ],
    tips: [
      "Use smaller shadows (sds-xs, sds-s) for subtle depth",
      "Use larger shadows (sds-l, sds-xl) for modals and popovers",
      "Combine with hover states for interactive feedback",
    ],
  },
};

export function getTokenGuidance(category?: string): string {
  if (!category || category === "all") {
    return `SDS Design System Tokens for Tailwind CSS

The Science Design System provides a comprehensive set of design tokens that map directly to Tailwind utilities.

QUICK START:
1. Request specific categories for detailed guidance: fontFamily, fontSize, fontVariantNumeric, letterSpacing, lineHeight, textDecoration, textTransform, typography, height, width, borderRadius, boxShadow, breakpoints, colors, spacing
2. Use semantic tokens over primitive ones when available
3. Include responsive and theme variants for robust implementations
4. Use the @czi-sds/components/dist/tailwind.json file to get the exact token name and value
5. To use the typography tokens, you need to add the @tailwindcss/typography plugin to your tailwind.config.js file and then use the typography tokens in your tailwind classes like prose-[typography-token-name] for example prose-sds-body-m-400-wide.
6. Colors have been defined in light and dark mode with the same name. Use the dark:color-token-name to use the dark mode color.
7. Use spacing tokens like sds-m for paddings, margins, etc. for example p-sds-m for padding-medium.
8. Use borderRadius tokens like sds-default for rounded corners for example rounded-sds-default.
9. Use boxShadow tokens like sds-s for subtle shadows for example shadow-sds-s.
10. Use breakpoints tokens like sds-m for medium breakpoints for example md:sds-m.
11. Use fontFamily tokens like sds-body for body font for example font-sds-body.
12. Use fontSize tokens like sds-body-m-400-wide for body font size for example text-sds-body-m-400-wide.
13. Use fontVariantNumeric tokens like sds-body-m-400-wide for body font variant numeric for example font-variant-numeric-sds-body-m-400-wide.
14. Use letterSpacing tokens like sds-body-m-400-wide for body letter spacing for example tracking-sds-body-m-400-wide.

For detailed examples, request a specific category.`;
  }

  const guidance = TAILWIND_TOKEN_GUIDANCE[category];
  if (!guidance) {
    return `Category "${category}" not found. Available categories: ${Object.keys(
      TAILWIND_TOKEN_GUIDANCE
    ).join(", ")}`;
  }

  let output = `## ${guidance.category} Tokens\n\n`;
  output += `${guidance.description}\n\n`;
  output += `**Tailwind Prefixes:** ${guidance.prefixes.join(", ")}\n\n`;

  output += `### Examples:\n\n`;
  guidance.examples.forEach((example, index) => {
    output += `${index + 1}. **${example.description}**\n\`\`\`jsx\n${example.code}\n\`\`\`\n\n`;
  });

  if (guidance.tips && guidance.tips.length > 0) {
    output += `### Tips:\n`;
    guidance.tips.forEach((tip) => {
      output += `- ${tip}\n`;
    });
  }

  return output;
}
