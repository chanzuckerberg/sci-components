# Notification

## Source Code

The component's source code in the SDS codebase can be found [here](https://github.com/chanzuckerberg/sci-components/blob/main/packages/components/src/core/Notification/index.tsx).

## Import

**React TypeScript**

```tsx
import { Notification } from "@czi-sds/components";
```

## Code examples

### Default Notification

This example has the minimum props needed for the Notification component. With no `onClose` and no `autoDismiss` it is persistent: it stays until the surrounding page stops rendering it.

**Example: DefaultNotification**

```tsx
// Most minimal Notification (just has the basic requirements)

import { Notification } from "@czi-sds/components";

function App() {
  return (
    <div className="app">
      <Notification intent="info" slideDirection="left">
        The Notification component has been rendered successfully!
      </Notification>
    </div>
  );
}

export default App;
```

### Notification intents

This example shows the five intents, each with the icon the Notification picks by default.

**Example: NotificationIntents**

```tsx
// Every intent, each with the icon the Notification picks by default

import { Notification } from "@czi-sds/components";

function App() {
  return (
    <div className="app">
      <Notification intent="info" slideDirection="left">
        Info: lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Notification>
      <Notification intent="accent" slideDirection="left">
        Accent: lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Notification>
      <Notification intent="positive" slideDirection="left">
        Positive: lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Notification>
      <Notification intent="notice" slideDirection="left">
        Notice: lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Notification>
      <Notification intent="negative" slideDirection="left">
        Negative: lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Notification>
    </div>
  );
}

export default App;
```

### Dismissible Notification

Passing `onClose` adds a close button in the top right corner, giving users a familiar way to remove the Notification from view. The Notification hides itself when that button is clicked, so `onClose` is for keeping your own state in sync; setting `dismissed` back to `false` is what brings it back.

**Example: DismissibleNotification**

```tsx
// Closable Notification

import { useState } from "react";
import { Button, Notification } from "@czi-sds/components";

function App() {
  const [dismissed, setDismissed] = useState(false);

  return (
    <div className="app">
      <Notification
        intent="negative"
        slideDirection="left"
        dismissed={dismissed}
        onClose={() => setDismissed(true)}
      >
        Something went wrong while saving your changes.
      </Notification>
      {dismissed && (
        <Button onClick={() => setDismissed(false)} sdsType="primary">
          Reset Notification
        </Button>
      )}
    </div>
  );
}

export default App;
```

### Notification with a button

A Notification can carry a single action button beneath its content, most often to dismiss it or to send the user somewhere related. The button appears as soon as `buttonOnClick` is given, sits on the right unless `buttonPosition` says otherwise, and leaves dismissing to the handler.

**Example: NotificationWithAButton**

```tsx
// Notification with an action button beneath its message

import { useState } from "react";
import { Button, Notification } from "@czi-sds/components";

function App() {
  const [dismissed, setDismissed] = useState(false);

  return (
    <div className="app">
      <Notification
        intent="notice"
        slideDirection="left"
        dismissed={dismissed}
        buttonText="Dismiss"
        buttonPosition="right"
        buttonOnClick={() => setDismissed(true)}
      >
        Your session expires in five minutes.
      </Notification>
      {dismissed && (
        <Button onClick={() => setDismissed(false)} sdsType="primary">
          Reset Notification
        </Button>
      )}
    </div>
  );
}

export default App;
```

### Notification with extra content

This example passes more than a single line as `children`. The first line reads as the title, and the element beneath it holds the rest of the message; any component can go there in place of the text.

**Example: NotificationWithExtraContent**

```tsx
// Notification whose children carry more than a single line of text

import { Notification } from "@czi-sds/components";

function App() {
  return (
    <div className="app">
      <Notification intent="positive" slideDirection="left">
        Your export is ready
        <div>
          The file will stay available for 24 hours. Anyone with access to the
          project can download it from the downloads page.
        </div>
      </Notification>
    </div>
  );
}

export default App;
```

### Notification with a custom icon

This example replaces the icon that the `intent` would otherwise choose. The `icon` prop takes either an SDS icon name or an element.

**Example: NotificationWithACustomIcon**

```tsx
// Replacing the intent's default icon with any SDS icon

import { Notification } from "@czi-sds/components";

function App() {
  return (
    <div className="app">
      <Notification intent="accent" slideDirection="left" icon="Book">
        Pass an icon name to swap the icon the intent would otherwise pick.
      </Notification>
    </div>
  );
}

export default App;
```

### Notification with auto dismiss

This example dismisses itself after four seconds. Pass `true` instead of a number to use the default delay of `8000` milliseconds.

**Example: NotificationWithAutoDismiss**

```tsx
// The Notification dismisses itself once the timeout elapses. Remounting it
// with a new key restarts the countdown.

import { useState } from "react";
import { Button, Notification } from "@czi-sds/components";

function App() {
  const [runId, setRunId] = useState(0);

  return (
    <div className="app">
      <Notification
        key={runId}
        intent="positive"
        slideDirection="left"
        autoDismiss={4000}
      >
        This Notification slides away on its own after four seconds.
      </Notification>
      <Button onClick={() => setRunId((prev) => prev + 1)} sdsType="primary">
        Show again
      </Button>
    </div>
  );
}

export default App;
```

## SDS vs MUI

The SDS Notification component is built upon the MUI Alert component (as is the SDS Callout component ), but there are some important differences:

- **Color:** SDS's Notification component has its own `intent` prop designed for setting both the color and default icon, and takes the values of `"accent"`, `"info"`, `"negative"`, `"notice"`, or `"positive"`. MUI's Alert instead uses the `severity` prop for this purpose (`severity` can also be used for SDS's Notification, and will take the same values as `intent`; this is not recommended)

- **Title and body:** MUI's Alert composes an AlertTitle with the text that follows it. SDS's Notification takes everything as children instead: the first line reads as the title, and any extra content goes in an element beneath it. An AlertTitle is accepted but does not change the style of the text it wraps.

- **Closing:** A close button appears in the top right as soon as `onClose` is given, which is what makes a Notification dismissible. The Notification hides itself when that button is clicked, and `dismissed` hides it from the outside. SDS uses MUI's Alert `action` prop for the close button, in case there is a need to further override the behavior.

- **Transitions:** SDS's Notification uses the Slide transition component, sliding in and out towards the side named by `slideDirection`.

- **Placement:** A Notification is meant to sit above the page rather than in its flow, usually in the top right corner, but it does not place itself. Position it with the surrounding layout, and reach for the Callout when the message belongs in the flow of the page instead.

- **Icons:** Like with MUI's Alert, SDS's Notification also shows an icon to the left of the message. It is chosen automatically from the `intent` (see the first bullet) and can be overridden with the `icon` prop, which takes either the name of an SDS icon or a custom SVG element:

**React TypeScript**

```tsx
icon="Book"
icon={<Icon sdsSize="s" sdsIcon="Book" />}
```

Additionally, setting `icon={false}` has no effect, and `iconMapping` does not work to change icons associated to `intent` or `severity`.

- **Variants:** The `variant` prop is not supported. Setting `variant="outlined"` adds the colored border but keeps the background color, rather than removing it the way MUI's Alert does.

## MUI Documentation

Documentation for the underlying MUI Alert component can be found [here](https://mui.com/material-ui/react-alert/).

## Props

Any custom SDS props and MUI props required for implementation are found on the table below. See the MUI documentation for additional optional props.

| Name             | Type                                                                 | Default   | Description                                                                                                                                                                                                                                                                             |
| ---------------- | -------------------------------------------------------------------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `intent`         | `"accent"` \| `"info"` \| `"negative"` \| `"notice"` \| `"positive"` | -         | **Required.** Sets both the color of the component and the icon it defaults to.                                                                                                                                                                                                         |
| `slideDirection` | `"left" \| "right"`                                                  | `"left"`  | **Required.** The side the Notification slides in from and back out towards. The component falls back to `"left"`, but the prop is not optional, so pass it explicitly.                                                                                                                 |
| `children`       | `ReactNode`                                                          | -         | The content of the Notification. The first line reads as the title; put anything further in an element of its own beneath it.                                                                                                                                                           |
| `onClose`        | `(event: React.SyntheticEvent) => void`                              | -         | Callback fired when the Notification is closed. Passing it is what adds the close button. The Notification hides itself regardless, so use this to sync your own state rather than to perform the hiding.                                                                               |
| `dismissed`      | `bool`                                                               | -         | Hides the Notification when set to `true`. Changing it back to `false` brings the Notification back, which is how a dismissed Notification is restored.                                                                                                                                 |
| `autoDismiss`    | `bool \| number`                                                     | -         | Dismisses the Notification on a timer. A number sets the delay in milliseconds, and `true` uses `8000`. Leave it unset to keep the Notification visible until it is dismissed another way.                                                                                              |
| `buttonText`     | `string`                                                             | -         | The label of the action button shown beneath the content. It only renders alongside `buttonOnClick`.                                                                                                                                                                                    |
| `buttonOnClick`  | `(event: React.SyntheticEvent) => void`                              | -         | Callback fired when the action button is clicked. Passing it is what renders the button, and the Notification does nothing else in response, so dismissing it is up to this handler.                                                                                                    |
| `buttonPosition` | `"left" \| "right"`                                                  | `"right"` | Which side of the Notification the action button sits on.                                                                                                                                                                                                                               |
| `icon`           | `SDSIcon \| React.ReactElement<CustomSVGProps>`                      | -         | Icon displayed to the left of the content, given either as an SDS icon name or as an element. Defaults to the icon for the current `intent`: `"CheckCircle"` for `"positive"`, `"InfoCircle"` for `"info"`, and `"ExclamationMarkCircle"` for `"accent"`, `"notice"`, and `"negative"`. |
| `sdsIconProps`   | `Partial<IconProps>`                                                 | -         | Props forwarded to the Icon component when `icon` is given as a name.                                                                                                                                                                                                                   |
