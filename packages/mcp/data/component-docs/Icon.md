# Icon

## Source Code

The Icon component's source code in the SDS codebase can be found [here](https://github.com/chanzuckerberg/sci-components/blob/main/packages/components/src/core/Icon/index.tsx). The list of icon names and the sizes each one supports lives in [map.ts](https://github.com/chanzuckerberg/sci-components/blob/main/packages/components/src/core/Icon/map.ts).

## How it works

Icon renders an SVG through MUI's SvgIcon, picking one of two drawings based on the size you ask for: xxs, xs, and s use the 16px artwork, while l and xl use the 24px artwork. Both are then scaled to the exact dimensions of the size. This is why the sizes are not interchangeable across icons; an icon that only ships the large artwork cannot be rendered at s.

- The types tie the two props together. Passing a size an icon does not support is a TypeScript error, and at runtime it logs an error to the console and renders nothing at all rather than falling back to another size.

- The icon is wrapped in a div with display: contents, so it does not add a box to the layout and the SVG behaves as a direct child of whatever contains it.

- The color comes from the SDS palette, not from the surrounding text color, and it defaults to indigo. Pair Icon with a component like Button or MenuItem when the icon should follow that component's state colors.

- The SVG has no title or label of its own. When an icon carries meaning on its own, put the label on the interactive element around it, for example an aria-label on an icon-only Button.

## Props

| Name      | Type                                                                     | Default                             | Description                                                                                                            |
| --------- | ------------------------------------------------------------------------ | ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| sdsIcon   | keyof IconNameToSizes                                                    | -                                   | Required. The name of the icon, as listed in the Icon Bank. Names are case-sensitive, for example XMark and LightBulb. |
| sdsSize   | "xxs" (10px) \| "xs" (12px) \| "s" (16px) \| "l" (24px) \| "xl" (32px)   | -                                   | Required. Which sizes are accepted depends on the icon named in sdsIcon.                                               |
| color     | "blue" \| "gray" \| "green" \| "purple" \| "indigo" \| "red" \| "yellow" | "indigo"                            | A hue from the SDS palette. Note that this is the SDS color prop, not the MUI one, and it does not accept a CSS color. |
| shade     | 100 \| 200 \| 300 \| 400 \| 500 \| 600 \| 700 \| 800                     | 500 in light mode, 600 in dark mode | The step within the chosen hue.                                                                                        |
| className | string                                                                   | -                                   | Applied to the SVG. Useful for overriding the fill from a parent component.                                            |

## Code examples

### Default Icon

sdsIcon and sdsSize are the only required props. With no color set, the icon renders in indigo.

**Example: DefaultIcon**

```tsx
import { Icon } from "@czi-sds/components";

function App() {
  return (
    <div className="app">
      <Icon sdsIcon="InfoCircle" sdsSize="l" />
    </div>
  );
}

export default App;
```

### Icon Sizes

The five sizes, shown with an icon that supports all of them. Below s the 16px artwork is scaled down, and at l and xl a separate, more detailed drawing is used.

**Example: IconSizes**

```tsx
// Search is one of the icons that ships both drawings, so it covers all five
// sizes: 10, 12, 16, 24, and 32px.

import { Icon } from "@czi-sds/components";

const SIZES = ["xxs", "xs", "s", "l", "xl"] as const;

function App() {
  return (
    <div
      className="app"
      style={{ alignItems: "flex-end", display: "flex", gap: "24px" }}
    >
      {SIZES.map((size) => (
        <div
          key={size}
          style={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <Icon sdsIcon="Search" sdsSize={size} />
          <span style={{ fontSize: "12px" }}>{size}</span>
        </div>
      ))}
    </div>
  );
}

export default App;
```

### Sizes Are Per Icon

Some icons ship only the small artwork and some only the large. Asking for a size an icon does not have fails to compile, and renders nothing at runtime.

**Example: IconAvailableSizes**

```tsx
// Gear only ships the small artwork, so xxs, xs, and s are its only sizes.
// Rocket only ships the large artwork, so it starts at l. Passing Gear an "l"
// would be a TypeScript error and would render nothing.

import { Icon } from "@czi-sds/components";

function App() {
  return (
    <div
      className="app"
      style={{ display: "flex", flexDirection: "column", gap: "16px" }}
    >
      <div style={{ alignItems: "center", display: "flex", gap: "16px" }}>
        <Icon sdsIcon="Gear" sdsSize="xxs" />
        <Icon sdsIcon="Gear" sdsSize="xs" />
        <Icon sdsIcon="Gear" sdsSize="s" />
        <span style={{ fontSize: "12px" }}>Gear: xxs, xs, s</span>
      </div>

      <div style={{ alignItems: "center", display: "flex", gap: "16px" }}>
        <Icon sdsIcon="Rocket" sdsSize="l" />
        <Icon sdsIcon="Rocket" sdsSize="xl" />
        <span style={{ fontSize: "12px" }}>Rocket: l, xl</span>
      </div>
    </div>
  );
}

export default App;
```

### Icon Colors

color picks the hue and shade picks the step within it. Both come from the SDS palette rather than from the surrounding text color.

**Example: IconColors**

```tsx
// color chooses the hue and shade the step within it. Both are SDS palette
// values, so a CSS color is not accepted here.

import { Icon } from "@czi-sds/components";

const COLORS = [
  "blue",
  "gray",
  "green",
  "purple",
  "indigo",
  "red",
  "yellow",
] as const;

const SHADES = [300, 400, 500, 600, 700] as const;

function App() {
  return (
    <div
      className="app"
      style={{ display: "flex", flexDirection: "column", gap: "24px" }}
    >
      <div style={{ display: "flex", gap: "16px" }}>
        {COLORS.map((color) => (
          <Icon key={color} sdsIcon="CheckCircle" sdsSize="l" color={color} />
        ))}
      </div>

      <div style={{ display: "flex", gap: "16px" }}>
        {SHADES.map((shade) => (
          <Icon
            key={shade}
            sdsIcon="CheckCircle"
            sdsSize="l"
            color="green"
            shade={shade}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
```

### Icons in Components

When an icon is passed to another SDS component, that component controls the size and the color, so leave color off and let it inherit the component's states.

**Example: IconsInComponents**

```tsx
// Components that take an icon set the size themselves and color it from their
// own states, so pass a bare Icon without a color.

import { Button, Callout, Icon, Tag } from "@czi-sds/components";

function App() {
  return (
    <div
      className="app"
      style={{ display: "flex", flexDirection: "column", gap: "16px" }}
    >
      <div style={{ display: "flex", gap: "8px" }}>
        <Button
          sdsStyle="solid"
          sdsType="primary"
          startIcon={<Icon sdsIcon="Download" sdsSize="s" />}
        >
          Download
        </Button>
        <Button
          sdsStyle="outline"
          sdsType="primary"
          startIcon={<Icon sdsIcon="Search" sdsSize="s" />}
        >
          Search
        </Button>
      </div>

      <div style={{ display: "flex" }}>
        <Tag
          label="Filtered"
          color="info"
          icon={<Icon sdsIcon="Filter" sdsSize="xs" />}
        />
      </div>

      <Callout
        intent="info"
        icon={<Icon sdsIcon="LightBulb" sdsSize="s" />}
        title="Swapping the icon"
        body="Callout picks an icon from its intent, and the icon prop replaces it."
      />
    </div>
  );
}

export default App;
```

### Accessible Icon-only Controls

The SVG carries no accessible name, so an icon on its own needs a label on the control around it. Next to visible text the icon is decorative and needs nothing.

**Example: AccessibleIcons**

```tsx
// An icon-only control needs an accessible name on the control itself. Beside
// visible text the icon is decorative and adds nothing for a screen reader.

import { Button, Icon } from "@czi-sds/components";

function App() {
  return (
    <div className="app" style={{ display: "flex", gap: "16px" }}>
      <Button sdsStyle="minimal" sdsType="secondary" aria-label="Delete file">
        <Icon sdsIcon="TrashCan" sdsSize="l" />
      </Button>

      <Button
        sdsStyle="outline"
        sdsType="primary"
        startIcon={<Icon sdsIcon="TrashCan" sdsSize="s" />}
      >
        Delete file
      </Button>
    </div>
  );
}

export default App;
```
