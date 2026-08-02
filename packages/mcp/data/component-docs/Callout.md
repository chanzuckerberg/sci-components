# Callout

## Source Code

The component's source code in the SDS codebase can be found [here](https://github.com/chanzuckerberg/sci-components/blob/main/packages/components/src/core/Callout/index.tsx).

## SDS vs MUI

The SDS Callout component is built upon the MUI Alert component (as is the SDS Notification component), but there are some important differences:

- **Color:** SDS's Callout component has its own `intent` prop designed for setting both the color and default icon, and takes the values of `"accent"`, `"info"`, `"negative"`, `"notice"`, or `"positive"`. MUI's Alert instead uses the `severity` prop for this purpose (`severity` can also be used for SDS's Notification, and will take the same values as `intent`; this is not recommended)

- **Title and body:** Rather than composing an AlertTitle and text as children the way MUI's Alert does, SDS's Callout takes its content through the `title` and `body` props and renders the stylized CalloutTitle for you. Children are reserved for the extra content of an expandable Callout, and are ignored by the other styles.

- **Expanding and closing:** Both behaviors come from the `sdsStyle` prop rather than from separate props. Setting it to `"expandable"` adds a chevron in the top right that toggles the children in and out of view, and setting it to `"dismissible"` adds a close button that hides the Callout and fires `onClose`. An expandable Callout should only be used when there really is extra content to reveal, since the chevron is rendered either way. SDS uses MUI's Alert `action` prop under the hood, in case there is a need to further override the behavior.

- **Transitions:** SDS's Callout uses the Grow transition component by default

- **Icons:** Like with MUI's Alert, SDS's Callout also shows an icon to the left of the title text. It is chosen automatically from the `intent` (see the first bullet) and can be overridden with the `icon` prop, which takes either the name of an SDS icon or a custom SVG element:

**React TypeScript**

```tsx
icon="Book"
icon={<Icon sdsSize="s" sdsIcon="Book" />}
```

Additionally, setting `icon={false}` has no effect, and `iconMapping` does not work to change icons associated to `intent` or `severity`.

- **Variants:** The `variant` prop is not available for SDS's Callout component.

## MUI Documentation

Documentation for the underlying MUI Alert component can be found [here](https://mui.com/material-ui/react-alert/).

## Props

Any custom SDS props and MUI props required for implementation are found on the table below. See the MUI documentation for additional optional props.

| Name           | Type                                                                 | Default        | Description                                                                                                                                                                                                                                                                                   |
| -------------- | -------------------------------------------------------------------- | -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `intent`       | `"accent"` \| `"info"` \| `"negative"` \| `"notice"` \| `"positive"` | -              | **Required.** Sets both the color of the component and the icon it defaults to.                                                                                                                                                                                                               |
| `sdsStyle`     | `"persistent"` \| `"expandable"` \| `"dismissible"`                  | `"persistent"` | Defines the style of the Callout: - `"persistent"`: Cannot be closed. - `"expandable"`: Includes a chevron icon that toggles the children in and out of view. - `"dismissible"`: Includes an “x” icon for manual dismissal.                                                                   |
| `title`        | `string`                                                             | -              | The Callout title.                                                                                                                                                                                                                                                                            |
| `body`         | `ReactNode`                                                          | -              | The Callout body, shown beneath the title.                                                                                                                                                                                                                                                    |
| `children`     | `ReactNode`                                                          | -              | Extra content revealed when an expandable Callout is open. The other styles ignore `children`, so use `body` for the main message.                                                                                                                                                            |
| `hideTitle`    | `bool`                                                               | `false`        | If set to `true`, hides the Callout title.                                                                                                                                                                                                                                                    |
| `hideBody`     | `bool`                                                               | `false`        | If set to `true`, hides the Callout body and centers the icon against the remaining content.                                                                                                                                                                                                  |
| `icon`         | `SDSIcon \| React.ReactElement<CustomSVGProps>`                      | -              | Icon displayed to the left of the Callout title, given either as an SDS icon name or as an element. Defaults to the icon for the current `intent`: `"CheckCircle"` for `"positive"`, `"InfoCircle"` for `"info"`, and `"ExclamationMarkCircle"` for `"accent"`, `"notice"`, and `"negative"`. |
| `sdsIconProps` | `Partial<IconProps>`                                                 | -              | Props forwarded to the Icon component when `icon` is given as a name.                                                                                                                                                                                                                         |
| `sdsStage`     | `"open" \| "closed"`                                                 | `"open"`       | The stage an expandable Callout starts in. It is only the initial value; the chevron takes over from there.                                                                                                                                                                                   |
| `dismissed`    | `bool`                                                               | -              | Hides the Callout when set to `true`. Changing it back to `false` brings the Callout back, which is how a dismissed Callout is restored.                                                                                                                                                      |
| `autoDismiss`  | `bool \| number`                                                     | -              | Dismisses the Callout on a timer. A number sets the delay in milliseconds, and `true` uses `8000`. Leave it unset to keep the Callout visible until it is dismissed another way.                                                                                                              |
| `onClose`      | `(event: React.SyntheticEvent) => void`                              | -              | Callback fired when the Callout is closed. The Callout hides itself regardless, so use this to sync your own state rather than to perform the hiding.                                                                                                                                         |

## Code examples

### Default Callout

This example has the minimum props needed for the Callout component. Only `intent` is required, but a Callout with no `title` or `body` renders as an empty box, so both are given here.

**Example: DefaultCallout**

```tsx
// Most minimal Callout (just has the basic requirements)

import { Callout } from "@czi-sds/components";

function App() {
  return (
    <div className="app">
      <Callout
        intent="info"
        title="Callout box"
        body="The Callout component is a versatile UI element designed to draw attention to important information or messages within your interface."
      />
    </div>
  );
}

export default App;
```

### Callout intents

This example shows the five intents, each with the icon the Callout picks by default.

**Example: CalloutIntents**

```tsx
// Every intent, each with the icon the Callout picks by default

import { Callout } from "@czi-sds/components";

function App() {
  return (
    <div className="app">
      <Callout
        intent="info"
        title="Info"
        body="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      />
      <Callout
        intent="accent"
        title="Accent"
        body="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      />
      <Callout
        intent="positive"
        title="Positive"
        body="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      />
      <Callout
        intent="notice"
        title="Notice"
        body="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      />
      <Callout
        intent="negative"
        title="Negative"
        body="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      />
    </div>
  );
}

export default App;
```

### Expandable Callout

The Expandable Callout component provides an interactive and space-efficient way to present information. By default, it displays a brief summary, however, users can expand it to reveal more detailed content, similar to an accordion. This feature is particularly useful for sharing additional context or insights while keeping the initial interface clutter-free. The extra content is passed as `children`, and `sdsStage` sets whether the Callout starts open or closed.

**Example: ExpandableCallout**

```tsx
// Expandable Callout: children are the extra content revealed by the chevron

import { Callout } from "@czi-sds/components";

function App() {
  return (
    <div className="app">
      <Callout
        intent="notice"
        sdsStyle="expandable"
        sdsStage="closed"
        title="Attention Required"
        body="The Callout serves as a visual alert to draw immediate attention to information that requires action or consideration."
      >
        Use the expandable style strategically, and only when there really is
        extra content to reveal. The chevron is rendered either way, so an
        expandable Callout with no children toggles to an empty section.
      </Callout>
    </div>
  );
}

export default App;
```

### Dismissible Callout

The dismissible Callout variant provides users with the ability to dismiss it at their convenience. It includes a close button located in the top right corner, offering a familiar interaction pattern for users to remove the Callout from view. The Callout hides itself when that button is clicked, so `onClose` is for keeping your own state in sync; setting `dismissed` back to `false` is what brings the Callout back.

**Example: DismissibleCallout**

```tsx
// Closable Callout

import { useState } from "react";
import { Button, Callout } from "@czi-sds/components";

function App() {
  const [dismissed, setDismissed] = useState(false);

  return (
    <div className="app">
      <Callout
        intent="negative"
        sdsStyle="dismissible"
        dismissed={dismissed}
        onClose={() => setDismissed(true)}
        title="An Error Occurred"
        body="The Error Callout is a crucial component for communicating critical errors or issues to users."
      />
      {dismissed && (
        <Button onClick={() => setDismissed(false)} sdsType="primary">
          Reset Callout
        </Button>
      )}
    </div>
  );
}

export default App;
```

### Callout with a custom icon

This example replaces the icon that the `intent` would otherwise choose. The `icon` prop takes either an SDS icon name or an element.

**Example: CalloutWithACustomIcon**

```tsx
// Replacing the intent's default icon with any SDS icon

import { Callout } from "@czi-sds/components";

function App() {
  return (
    <div className="app">
      <Callout
        intent="accent"
        icon="Bacteria"
        title="Custom icon"
        body="Pass an icon name to swap the icon the intent would otherwise pick."
      />
    </div>
  );
}

export default App;
```

### Callout with auto dismiss

This example dismisses itself after four seconds. Pass `true` instead of a number to use the default delay of `8000` milliseconds.

**Example: CalloutWithAutoDismiss**

```tsx
// The Callout dismisses itself once the timeout elapses. Remounting it with a
// new key restarts the countdown.

import { useState } from "react";
import { Button, Callout } from "@czi-sds/components";

function App() {
  const [runId, setRunId] = useState(0);

  return (
    <div className="app">
      <Callout
        key={runId}
        intent="positive"
        autoDismiss={4000}
        title="Saved"
        body="This Callout disappears on its own after four seconds."
      />
      <Button onClick={() => setRunId((prev) => prev + 1)} sdsType="primary">
        Show again
      </Button>
    </div>
  );
}

export default App;
```
