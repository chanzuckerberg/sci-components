# NavigationFooter

## Source Code

The component's source code in the SDS codebase can be found [here](https://github.com/chanzuckerberg/sci-components/tree/main/packages/components/src/core/NavigationFooter).

## Import

**React TypeScript**

```tsx
import { NavigationFooter } from "@czi-sds/components";
```

## Code examples

### Default footer

A footer with all four content areas filled: logo with title and tag, the prominent nav items, the bottom row of links, and an image beside them.

**Example: NavigationFooterDefault**

```tsx
// The footer takes three separate lists: navItems sit beside the logo on the
// top row, navLinks run along the bottom row separated by dividers, and images
// sit opposite them.

import {
  NavigationFooter,
  getSemanticColors,
  type CommonThemeProps,
} from "@czi-sds/components";
import styled from "@emotion/styled";

const Placeholder = styled.div<CommonThemeProps & { boxWidth: number }>`
  ${(props) => {
    const semanticColors = getSemanticColors(props);

    return `
      align-items: center;
      border: 1px dashed ${semanticColors?.base?.borderPrimary};
      color: ${semanticColors?.base?.textSecondary};
      display: flex;
      font-size: 10px;
      height: 24px;
      justify-content: center;
      white-space: nowrap;
      width: ${props.boxWidth}px;
    `;
  }}
`;

function App() {
  return (
    <div className="app">
      <NavigationFooter
        images={[
          {
            image: <Placeholder boxWidth={80}>Partner logo</Placeholder>,
            url: "https://chanzuckerberg.com",
          },
        ]}
        logo={<Placeholder boxWidth={64}>Logo slot</Placeholder>}
        logoUrl="https://chanzuckerberg.com"
        navItems={[
          { label: "Datasets", url: "/datasets" },
          { label: "Documentation", url: "/docs" },
          { label: "Support", url: "/support" },
        ]}
        navLinks={[
          { label: "Privacy", url: "/privacy" },
          { label: "Terms", url: "/terms" },
          { label: "Contact us", url: "/contact" },
        ]}
        tag="Beta"
        tagColor="beta"
        title="Cell Atlas"
      />
    </div>
  );
}

export default App;
```

### Dark footer

The same structure on a dark surface, with the text and dividers inverted.

**Example: NavigationFooterDark**

```tsx
// backgroundAppearance="dark" puts the footer on a dark surface and inverts its
// text and dividers. In dark mode it makes no difference: the footer is already
// dark, so the prop only ever adds darkness, never removes it.

import { NavigationFooter } from "@czi-sds/components";

function App() {
  return (
    <div className="app">
      <NavigationFooter
        backgroundAppearance="dark"
        navItems={[
          { label: "Datasets", url: "/datasets" },
          { label: "Documentation", url: "/docs" },
        ]}
        navLinks={[
          { label: "Privacy", url: "/privacy" },
          { label: "Terms", url: "/terms" },
        ]}
        title="Cell Atlas"
      />
    </div>
  );
}

export default App;
```

## Behavior notes

- The footer is two rows. The top row is the logo, title, and tag on one side with `navItems` beside them; below a divider, the bottom row is `navLinks` on one side and `images` on the other.

- The two link lists are styled differently on purpose. `navItems` are the prominent destinations; the `navLinks` run in a single line with dividers drawn between them, which is where policy and contact links belong.

- Like the header, the footer decides on its own when to go narrow, below 512px or whenever its content no longer fits. In the narrow layout the links wrap into rows and the component drops the divider at the end of each row.

- There is no `hasInvertedStyle` prop here either; `backgroundAppearance` is the one to reach for, and it only changes anything in light mode.

- The props are the whole surface: `NavigationFooterProps` does not extend the DOM attributes, so there is no `className`, `style`, or `ref` to pass.

## Props

| Name                   | Type                                                                                                                            | Default             | Description                                                                                                  |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------- | ------------------- | ------------------------------------------------------------------------------------------------------------ |
| `backgroundAppearance` | `"matchBackground"` \| `"dark"`                                                                                                 | `"matchBackground"` | `"dark"` puts the footer on a dark surface and inverts its text and dividers, in light mode only.            |
| `images`               | `FooterImage[]`                                                                                                                 | -                   | An array of images displayed in the footer. Each item includes an image, optional link URL, and component.   |
| `logo`                 | `ReactNode`                                                                                                                     | -                   | The logo displayed in the footer. Can be any valid React node such as an image, icon, or SVG.                |
| `logoUrl`              | `string`                                                                                                                        | -                   | If provided, clicking the logo will navigate to this URL.                                                    |
| `logoComponent`        | `ElementType`                                                                                                                   | `"a"`               | Specifies the component to use for the logo link. Defaults to an anchor tag.                                 |
| `logoLinkProps`        | `Record<string, unknown>`                                                                                                       | -                   | Additional props passed to the logo link component.                                                          |
| `navItems`             | `NavigationFooterNavItem[]`                                                                                                     | -                   | The prominent links on the top row, next to the logo. They are headings, not body text, and get no dividers. |
| `navLinks`             | `NavigationFooterNavItem[]`                                                                                                     | -                   | The smaller links on the bottom row, drawn in one line with dividers between them.                           |
| `tag`                  | `string`                                                                                                                        | -                   | A small label displayed next to the title.                                                                   |
| `tagColor`             | `"info" \| "positive"` \| `"notice" \| "negative"` \| `"neutral" \| "beta"` \| `[string, string]` \| `[string, string, string]` | -                   | The Tag's color. A tuple sets the label, background, and icon colors by hand.                                |
| `title`                | `string`                                                                                                                        | -                   | The main title displayed in the footer.                                                                      |

## FooterImage

| Name        | Type                      | Default | Description                                                                        |
| ----------- | ------------------------- | ------- | ---------------------------------------------------------------------------------- |
| `image`     | `ReactNode`               | -       | The image element to be displayed. Can be an icon, image, SVG, or any `ReactNode`. |
| `url`       | `string`                  | -       | Optional URL to navigate to when the image is clicked.                             |
| `component` | `ElementType`             | `"a"`   | Custom link component to use for navigation (e.g., a router link).                 |
| `linkProps` | `Record<string, unknown>` | -       | Additional props passed to the link component.                                     |

## NavigationFooterNavItem

| Name        | Type                      | Default | Description                                               |
| ----------- | ------------------------- | ------- | --------------------------------------------------------- |
| `label`     | `string`                  | -       | The text label displayed for the navigation item.         |
| `url`       | `string`                  | -       | Optional URL the item links to.                           |
| `component` | `ElementType`             | `"a"`   | Custom component to render the link (e.g., Next.js Link). |
| `linkProps` | `Record<string, unknown>` | -       | Props forwarded to the link component.                    |
