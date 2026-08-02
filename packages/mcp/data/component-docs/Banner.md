# Banner

## Source Code

The component's source code in the SDS codebase can be found [here](https://github.com/chanzuckerberg/sci-components/blob/main/packages/components/src/core/Banner/index.tsx).

## Props

Any custom SDS props and MUI props required for implementation are found on the table below. See the MUI documentation for additional optional props.

| Name           | Type                                                                 | Default  | Description                                                                                                                                                                                                                                                  |
| -------------- | -------------------------------------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `sdsType`      | `"primary"` \| `"secondary"`                                         | -        | Required. The primary variant fills the Banner with the intent's primary surface color and uses the on-fill text color. The secondary variant uses the intent's secondary surface color with the standard primary text color.                                |
| `intent`       | `"accent"` \| `"info"` \| `"negative"` \| `"notice"` \| `"positive"` | `"info"` | The intent color of the Banner component, which also selects the default icon.                                                                                                                                                                               |
| `dismissible`  | `bool`                                                               | `true`   | If `true`, the banner can be dismissed by the user. This is what controls whether the close button is rendered.                                                                                                                                              |
| `dismissed`    | `bool`                                                               | -        | If `true`, the banner has been dismissed and renders nothing. Leave this unset to let the Banner keep track of its own dismissed state; pass a value to control it yourself.                                                                                 |
| `onClose`      | `fn`                                                                 | -        | Callback fired when the user clicks the close button. **Signature:** `function(event: React.MouseEvent) => void` - `event` The event source of the callback.                                                                                                 |
| `icon`         | `keyof IconNameToSizes` \| `ReactElement<CustomSVGProps>`            | -        | The name of an SDS icon, or a custom SVG element, shown in place of the icon the intent would pick. Without it, `"positive"` shows `"CheckCircle"`, `"negative"` and `"notice"` show `"ExclamationMarkCircle"`, and every other intent shows `"InfoCircle"`. |
| `sdsIconProps` | `Partial<IconProps>`                                                 | -        | Additional props to be passed to the icon component.                                                                                                                                                                                                         |

## Code examples

### Default Banner

This example has the minimum props needed for the Banner component.

**Example: DefaultBanner**

```tsx
import { Banner } from "@czi-sds/components";

function App() {
  return (
    <div className="app">
      <Banner sdsType="primary">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Banner>
    </div>
  );
}

export default App;
```

### Persistent Banner

This example showcases a Banner component that cannot be closed or dismissed.

**Example: PersistentBanner**

```tsx
import { Banner } from "@czi-sds/components";

function App() {
  return (
    <div className="app">
      <Banner sdsType="primary" dismissible={false}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Banner>
    </div>
  );
}

export default App;
```

### Secondary Banner

This example pairs a primary Banner with the secondary variant that follows it.

**Example: SecondaryBanner**

```tsx
// The secondary variant, meant to follow a primary Banner

import { Banner } from "@czi-sds/components";

function App() {
  return (
    <div className="app">
      <Banner sdsType="primary" intent="notice">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Banner>
      <Banner sdsType="secondary" intent="notice">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Banner>
    </div>
  );
}

export default App;
```

### Banner intents

This example shows every intent the Banner supports, each with the icon it picks by default.

**Example: BannerIntents**

```tsx
// Every intent, each with the icon the Banner picks by default

import { Banner } from "@czi-sds/components";

function App() {
  return (
    <div className="app">
      <Banner sdsType="primary" intent="info" dismissible={false}>
        Info: lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Banner>
      <Banner sdsType="primary" intent="accent" dismissible={false}>
        Accent: lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Banner>
      <Banner sdsType="primary" intent="positive" dismissible={false}>
        Positive: lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Banner>
      <Banner sdsType="primary" intent="notice" dismissible={false}>
        Notice: lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Banner>
      <Banner sdsType="primary" intent="negative" dismissible={false}>
        Negative: lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Banner>
    </div>
  );
}

export default App;
```

### Banner with a custom icon

This example replaces the icon chosen by the intent with a named SDS icon.

**Example: BannerWithACustomIcon**

```tsx
// Replacing the intent's default icon with any SDS icon

import { Banner } from "@czi-sds/components";

function App() {
  return (
    <div className="app">
      <Banner sdsType="secondary" intent="accent" icon="Bacteria">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Banner>
    </div>
  );
}

export default App;
```

### Banner with a custom background color

This example shows how to implement a Banner component with a custom background color.

**Example: BannerWithACustomBackgroundColor**

```tsx
import { styled } from "@mui/material/styles";
import { Banner } from "@czi-sds/components";

const StyledBanner = styled(Banner)`
  background-color: Crimson;
`;

function App() {
  return (
    <div className="app">
      <StyledBanner sdsType="primary">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </StyledBanner>
    </div>
  );
}

export default App;
```
