# IntentMessage

## Source Code

The IntentMessage component's source code in the SDS codebase can be found [here](https://github.com/chanzuckerberg/sci-components/blob/main/packages/components/src/core/IntentMessage/index.tsx).

## Import

**React TypeScript**

```tsx
import { IntentMessage } from "@czi-sds/components";
```

## Code examples

### Default Intent Message

The usual shape: the Input as `children`, one message, and the border turned on. The Input carries the same intent so its own styling matches.

**Example: DefaultIntentMessage**

```tsx
// IntentMessage wraps the input it describes: children render first, then the
// messages. Set the input's own intent to match the message.

import { InputText, IntentMessage } from "@czi-sds/components";

function App() {
  return (
    <div className="app" style={{ width: "400px" }}>
      <IntentMessage
        border
        messages={[
          { intent: "negative", text: "Enter a valid email address." },
        ]}
      >
        <InputText
          id="default-intent-input"
          label="Email"
          placeholder="name@example.org"
          intent="negative"
        />
      </IntentMessage>
    </div>
  );
}

export default App;
```

### The Three Intents

Each intent has its own color and default icon. These are rendered without children to show the message row on its own.

**Example: IntentMessageIntents**

```tsx
// The three intents each come with a default icon: CheckCircle for positive,
// ExclamationMarkCircle for negative and notice. The text and the icon take the
// intent's foreground color, and the border takes its border color.

import { IntentMessage } from "@czi-sds/components";

const INTENTS = [
  { intent: "negative", text: "This is a negative message" },
  { intent: "notice", text: "This is a notice message" },
  { intent: "positive", text: "This is a positive message" },
] as const;

function App() {
  return (
    <div
      className="app"
      style={{ display: "flex", flexDirection: "column", gap: "24px" }}
    >
      {INTENTS.map(({ intent, text }) => (
        <IntentMessage key={intent} border messages={[{ intent, text }]} />
      ))}
    </div>
  );
}

export default App;
```

### Stacked Messages

Several messages can describe one Input. Both of these are given the same array; the first sorts by severity, the second has `autoOrder` off and keeps the order as written.

**Example: StackedIntentMessages**

```tsx
// Messages are sorted by severity by default, so the array order does not
// matter. Turn autoOrder off to keep the order you passed. The border takes the
// color of the most severe intent in the list either way.

import { IntentMessage, IntentMessageItem } from "@czi-sds/components";

const MESSAGES: IntentMessageItem[] = [
  { intent: "positive", text: "Password is at least 12 characters long" },
  { intent: "negative", text: "Password needs one number" },
  { intent: "notice", text: "Avoid reusing a password from another site" },
];

function App() {
  return (
    <div
      className="app"
      style={{ display: "flex", flexDirection: "column", gap: "32px" }}
    >
      <IntentMessage border messages={MESSAGES} />
      <IntentMessage border autoOrder={false} messages={MESSAGES} />
    </div>
  );
}

export default App;
```

### Custom Ordering

`orderBy` changes the ranking. Reversing it here moves the positive message to the top and switches the border to the positive color.

**Example: IntentMessageOrderBy**

```tsx
// orderBy replaces the default severity ranking. It also decides which intent
// colors the border, since that is the first intent in the ranking that is
// present, so it applies even when autoOrder is off.

import { IntentMessage, IntentMessageItem } from "@czi-sds/components";

const MESSAGES: IntentMessageItem[] = [
  { intent: "negative", text: "Two samples failed to upload" },
  { intent: "notice", text: "Three samples are still processing" },
  { intent: "positive", text: "Twelve samples uploaded" },
];

function App() {
  return (
    <div
      className="app"
      style={{ display: "flex", flexDirection: "column", gap: "32px" }}
    >
      <IntentMessage border messages={MESSAGES} />
      <IntentMessage
        border
        orderBy={["positive", "notice", "negative"]}
        messages={MESSAGES}
      />
    </div>
  );
}

export default App;
```

### Custom Icons

An icon can be given by name or as an element. Names are rendered at xs, so pass an element when you need a different size.

**Example: IntentMessageCustomIcons**

```tsx
// icon takes either an SDS icon name or an element. A name is always rendered at
// xs, so it has to be an icon that offers that size. Either way the fill is
// forced to the intent color.

import { Icon, IntentMessage, IntentMessageItem } from "@czi-sds/components";

const MESSAGES: IntentMessageItem[] = [
  { icon: "Github", intent: "notice", text: "Named SDS icon, rendered at xs" },
  {
    icon: <Icon sdsIcon="Sparkle" sdsSize="s" />,
    intent: "positive",
    text: "An Icon element, so you choose the size",
  },
  {
    icon: <Icon sdsIcon="Lock" sdsSize="xs" />,
    intent: "negative",
    text: "The icon color follows the intent, not the Icon color prop",
  },
];

function App() {
  return (
    <div className="app">
      <IntentMessage border messages={MESSAGES} />
    </div>
  );
}

export default App;
```

### Announcing the Message

To connect the message to the Input for assistive technology, keep them as siblings and reference the message container from the Input's `aria-describedby`.

**Example: AccessibleIntentMessage**

```tsx
// The messages are plain text with no programmatic link to the input. To have
// them announced, render IntentMessage next to the input and point the input's
// aria-describedby at it. IntentMessageProps takes no id, so the id goes on a
// wrapper element, and the ARIA attributes go through slotProps.htmlInput so
// they land on the input rather than on the field wrapper.

import { InputText, IntentMessage } from "@czi-sds/components";

function App() {
  return (
    <div
      className="app"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        width: "400px",
      }}
    >
      <InputText
        id="accessible-intent-input"
        label="Sample ID"
        placeholder="SAMP-0001"
        intent="negative"
        slotProps={{
          htmlInput: {
            "aria-describedby": "sample-id-messages",
            "aria-invalid": true,
          },
        }}
      />
      <div id="sample-id-messages">
        <IntentMessage
          messages={[{ intent: "negative", text: "Use the format SAMP-0000." }]}
        />
      </div>
    </div>
  );
}

export default App;
```

## How it differs from Figma

The guidelines above describe two Figma constructs: an Intent Message built into every Input, and a standalone Intent Indicator that wraps an Input. In code both are the same component, **IntentMessage**, and no Input has an `intentMessage` prop:

- Wrap the Input in IntentMessage and pass the copy through the `messages` prop. The children render first, then the messages below them.

- The Intent Indicator is the `border` prop. Because it stretches the full height of the wrapper, wrapping a group of Checkboxes or Radios gives you one border across the whole group.

- IntentMessage does not color the Input itself. Set the Input's own `intent` prop to the matching value so the two agree.

## Behavior notes

- There are three intents, `"negative"`, `"notice"`, and `"positive"`. There is no neutral or informational intent.

- Messages are sorted by severity by default, so the order of the array does not matter unless you turn `autoOrder` off.

- The border takes its color from the most severe intent present, which is the first intent in the ranking that appears in `messages`. With no messages the border renders transparent, so `border` does nothing on a wrapper that only has children.

- The border is drawn just outside the wrapper, 8px to the left of its edge. Leave room for it, or a parent with no left padding will clip it.

- An icon passed by name always renders at the xs size, so it has to be an icon that offers xs. A name that does not logs an error and renders nothing. Pass an Icon element instead when you need another size.

- The icon fill is forced to the intent color, so the `color` prop on an Icon element you pass in has no effect.

- The messages are plain text with no ARIA wiring, so assistive technology does not connect them to the Input. When a message needs to be announced, render IntentMessage beside the Input and point the Input's `aria-describedby` at a wrapper around it, as in the last example below.

## Props

### IntentMessage Props

| Name        | Type                                          | Default                              | Description                                                                                                                                                                                              |
| ----------- | --------------------------------------------- | ------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `messages`  | `IntentMessageItem[]`                         | `[]`                                 | The messages to display, each with its own intent. See the table below for the shape of an item.                                                                                                         |
| `children`  | `ReactNode`                                   | -                                    | Rendered above the messages, inside the same wrapper. This is where the Input, or a group of Inputs, goes.                                                                                               |
| `border`    | `boolean`                                     | `false`                              | Draws a 2px vertical bar to the left of the wrapper, colored by the most severe intent in `messages`. This is the Intent Indicator from the guidelines.                                                  |
| `autoOrder` | `boolean`                                     | `true`                               | Sorts the messages by intent rather than using the order of the array. Set it to `false` to preserve your order.                                                                                         |
| `orderBy`   | `Array<"negative" \| "notice" \| "positive">` | `["negative", "notice", "positive"]` | Replaces the default severity ranking. It affects the sort order and, because it defines what counts as most severe, the border color as well, which means it still applies when `autoOrder` is `false`. |

That is the whole prop surface. `IntentMessageProps` does not extend the DOM attributes, so `id`, `className`, and `style` are all type errors even though the component would spread them onto its wrapper. Put them on an element of your own around it instead.

### IntentMessageItem

| Name     | Type                                    | Default                                                               | Description                                                                                                                                |
| -------- | --------------------------------------- | --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `intent` | `"negative" \| "notice" \| "positive"`  | -                                                                     | Required. Sets the text color, the icon color, and this message's place in the ranking.                                                    |
| `text`   | `string`                                | -                                                                     | Required. The message copy. Long text wraps.                                                                                               |
| `icon`   | `keyof IconNameToSizes \| ReactElement` | `"CheckCircle"` for `"positive"`, `"ExclamationMarkCircle"` otherwise | Replaces the default icon. A name renders at xs; an element is rendered as given, though its fill is still overridden by the intent color. |
