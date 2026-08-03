# Dialog

## Source Code

The Dialog component's source code in the SDS codebase can be found [here](https://github.com/chanzuckerberg/sci-components/blob/main/packages/components/src/core/Dialog/index.tsx).

A Dialog is composed from four accessory components. They all ship from `@czi-sds/components` and live in the Dialog folder:

- DialogTitle renders the overline, title, subtitle, and close button [source code](https://github.com/chanzuckerberg/sci-components/tree/main/packages/components/src/core/Dialog/components/DialogTitle)

- DialogContent holds the body copy and scrolls when the content overflows [source code](https://github.com/chanzuckerberg/sci-components/tree/main/packages/components/src/core/Dialog/components/DialogContent)

- DialogActions lays out the action buttons in the footer [source code](https://github.com/chanzuckerberg/sci-components/tree/main/packages/components/src/core/Dialog/components/DialogActions)

- DialogPaper is the surface the Dialog is drawn on. It is applied for you, so you only need it when you want to restyle the surface [source code](https://github.com/chanzuckerberg/sci-components/tree/main/packages/components/src/core/Dialog/components/DialogPaper)

Dialog passes its `sdsSize` down to DialogPaper, DialogTitle, and DialogActions automatically, so you set the size once on Dialog. DialogContent does not take a size.

## Import

**React TypeScript**

```tsx
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogPaper,
  DialogTitle,
  DialogTitleSubtitle,
  DialogTitleTitle,
} from "@czi-sds/components";
```

## Code examples

### Default Dialog

The minimum setup: a title, some content, and the open state you control. The `onClose` on DialogTitle renders the close button, and the one on Dialog handles the backdrop click and the Esc key.

**Example: DefaultDialog**

```tsx
// A dismissible Dialog: passing `onClose` to DialogTitle renders the close
// button, and `onClose` on Dialog handles the backdrop click and the Esc key.

import { useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@czi-sds/components";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="app" style={{ padding: 20 }}>
      <Button
        sdsStyle="solid"
        sdsType="primary"
        onClick={() => setIsOpen(true)}
      >
        Open Dialog
      </Button>

      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <DialogTitle
          title="Learning Resources"
          subtitle="Tutorials, guides, and articles"
          onClose={() => setIsOpen(false)}
        />
        <DialogContent>
          Embark on a journey of continuous improvement with our treasure trove
          of learning materials. This section hosts an array of tutorials,
          guides, and insightful articles designed to enhance your skills and
          deepen your understanding.
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default App;
```

### Dialog Sizes

Each `sdsSize` sets a fixed width and a minimum height. The height still grows with the content, and the padding and title type scale with the size.

**Example: DialogSizes**

```tsx
// `sdsSize` sets a fixed paper width and a minimum height. It is forwarded to
// DialogPaper, DialogTitle, and DialogActions, so padding and type scale with it.

import { useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@czi-sds/components";

const SIZES = ["xs", "s", "m", "l"] as const;

const DIMENSIONS = {
  l: "1200 × 600px",
  m: "900 × 480px",
  s: "600 × 400px",
  xs: "400 × 160px",
};

function App() {
  const [openSize, setOpenSize] = useState<(typeof SIZES)[number] | null>(null);

  return (
    <div className="app" style={{ display: "flex", gap: "8px", padding: 20 }}>
      {SIZES.map((size) => (
        <Button
          key={size}
          sdsStyle="outline"
          sdsType="primary"
          onClick={() => setOpenSize(size)}
        >
          Open {size.toUpperCase()}
        </Button>
      ))}

      <Dialog
        open={openSize !== null}
        onClose={() => setOpenSize(null)}
        sdsSize={openSize ?? "m"}
      >
        <DialogTitle
          title={`Size ${(openSize ?? "m").toUpperCase()}`}
          subtitle={DIMENSIONS[openSize ?? "m"]}
          onClose={() => setOpenSize(null)}
        />
        <DialogContent>
          The width is fixed per size and the height grows with the content,
          down to the minimum height.
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default App;
```

### Dialog with Action Buttons

DialogActions places the buttons in the footer, right aligned by default, so the primary action is listed last.

**Example: DialogWithActionButtons**

```tsx
// DialogActions aligns its buttons to the right by default, so the primary
// action goes last.

import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@czi-sds/components";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  function handleClose() {
    setIsOpen(false);
  }

  return (
    <div className="app" style={{ padding: 20 }}>
      <Button
        sdsStyle="solid"
        sdsType="primary"
        onClick={() => setIsOpen(true)}
      >
        Open Dialog
      </Button>

      <Dialog open={isOpen} onClose={handleClose} sdsSize="s">
        <DialogTitle
          title="Share this collection"
          subtitle="Anyone with the link can view it"
          onClose={handleClose}
        />
        <DialogContent>
          Sharing generates a public link. You can revoke access at any time
          from the collection settings.
        </DialogContent>
        <DialogActions>
          <Button sdsStyle="outline" sdsType="primary" onClick={handleClose}>
            Cancel
          </Button>
          <Button sdsStyle="solid" sdsType="primary" onClick={handleClose}>
            Share
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default App;
```

### Dialog with Left-Aligned Buttons

Setting `buttonPosition` to `"left"` moves the button row to the other side. List the primary action first so it stays on the outside edge.

**Example: DialogWithLeftAlignedButtons**

```tsx
// `buttonPosition="left"` flips the alignment, so the primary action is listed
// first to keep it closest to the left edge.

import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@czi-sds/components";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  function handleClose() {
    setIsOpen(false);
  }

  return (
    <div className="app" style={{ padding: 20 }}>
      <Button
        sdsStyle="solid"
        sdsType="primary"
        onClick={() => setIsOpen(true)}
      >
        Open Dialog
      </Button>

      <Dialog open={isOpen} onClose={handleClose} sdsSize="s">
        <DialogTitle
          title="Delete this analysis?"
          subtitle="This action cannot be undone"
          onClose={handleClose}
        />
        <DialogContent>
          The analysis and all of its results will be permanently removed from
          the project.
        </DialogContent>
        <DialogActions buttonPosition="left">
          <Button sdsStyle="solid" sdsType="destructive" onClick={handleClose}>
            Delete
          </Button>
          <Button sdsStyle="outline" sdsType="primary" onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default App;
```

### Persistent Dialog

Passing `canClickOutsideClose` as `false` ignores both the backdrop click and the Esc key. Leaving `onClose` off DialogTitle also hides the close button, so the action buttons are the only way out and the Dialog needs at least one.

**Example: PersistentDialog**

```tsx
// `canClickOutsideClose={false}` blocks both the backdrop click and the Esc
// key. Leaving `onClose` off DialogTitle hides the close button, so an action
// button is the only way out.

import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@czi-sds/components";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="app" style={{ padding: 20 }}>
      <Button
        sdsStyle="solid"
        sdsType="primary"
        onClick={() => setIsOpen(true)}
      >
        Open Dialog
      </Button>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        canClickOutsideClose={false}
        sdsSize="s"
      >
        <DialogTitle
          title="Leaving this site"
          subtitle="You are about to open an external resource"
        />
        <DialogContent>
          The link opens a site that is not maintained by us. Any data you enter
          there is subject to that site&apos;s privacy policy.
        </DialogContent>
        <DialogActions>
          <Button
            sdsStyle="outline"
            sdsType="primary"
            onClick={() => setIsOpen(false)}
          >
            Stay here
          </Button>
          <Button
            sdsStyle="solid"
            sdsType="primary"
            onClick={() => setIsOpen(false)}
          >
            Continue
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default App;
```

### Multi-step Dialog

The overline is the place for a step count. Keep every step in the same size Dialog, and make the workflow persistent so progress cannot be lost by accident.

**Example: MultiStepDialog**

```tsx
// `overline` sits above the title and is the recommended place for the step
// count in a multi-step workflow.

import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@czi-sds/components";

const STEPS = [
  {
    body: "Pick the files you want to include. You can add more later.",
    title: "Select your data",
  },
  {
    body: "Choose the reference genome and the quality thresholds for the run.",
    title: "Configure the analysis",
  },
  {
    body: "Everything looks good. Starting the run will queue it immediately.",
    title: "Review and submit",
  },
];

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);

  function handleClose() {
    setIsOpen(false);
    setStep(0);
  }

  const isLastStep = step === STEPS.length - 1;

  return (
    <div className="app" style={{ padding: 20 }}>
      <Button
        sdsStyle="solid"
        sdsType="primary"
        onClick={() => setIsOpen(true)}
      >
        Open Dialog
      </Button>

      <Dialog
        open={isOpen}
        onClose={handleClose}
        canClickOutsideClose={false}
        sdsSize="s"
      >
        <DialogTitle
          overline={`Step ${step + 1} of ${STEPS.length}`}
          title={STEPS[step].title}
          subtitle="New analysis"
        />
        <DialogContent>{STEPS[step].body}</DialogContent>
        <DialogActions>
          <Button
            sdsStyle="outline"
            sdsType="primary"
            onClick={() => (step === 0 ? handleClose() : setStep(step - 1))}
          >
            {step === 0 ? "Cancel" : "Back"}
          </Button>
          <Button
            sdsStyle="solid"
            sdsType="primary"
            onClick={() => (isLastStep ? handleClose() : setStep(step + 1))}
          >
            {isLastStep ? "Start run" : "Next"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default App;
```

### Dialog with a Long Content

The paper is capped at the viewport height, so DialogContent scrolls on its own while the title and the action buttons stay in place.

**Example: DialogWithALongContent**

```tsx
// The paper is capped at the viewport height, so DialogContent scrolls on its
// own and the title and action buttons stay in place.

import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@czi-sds/components";

const PARAGRAPH =
  "Explore a diverse range of topics, from fundamental principles to advanced techniques, as we aim to empower you with knowledge that transcends boundaries. Whether you are a novice eager to build a strong foundation or a seasoned professional staying at the forefront of your industry, this material is your gateway to honing your expertise.";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  function handleClose() {
    setIsOpen(false);
  }

  return (
    <div className="app" style={{ padding: 20 }}>
      <Button
        sdsStyle="solid"
        sdsType="primary"
        onClick={() => setIsOpen(true)}
      >
        Open Dialog
      </Button>

      <Dialog open={isOpen} onClose={handleClose} sdsSize="s">
        <DialogTitle
          title="Terms of use"
          subtitle="Last updated January 2025"
          onClose={handleClose}
        />
        <DialogContent>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((section) => (
            <p key={section}>
              {section}. {PARAGRAPH}
            </p>
          ))}
        </DialogContent>
        <DialogActions>
          <Button sdsStyle="outline" sdsType="primary" onClick={handleClose}>
            Decline
          </Button>
          <Button sdsStyle="solid" sdsType="primary" onClick={handleClose}>
            Accept
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default App;
```

### Dialog with a Custom Title

Passing `children` to DialogTitle replaces the built-in layout, which is how you add artwork above the title. The close button is part of that layout, so it goes away too.

**Example: DialogWithCustomTitle**

```tsx
// Children replace DialogTitle's built-in layout, including the close button.
// DialogTitleTitle and DialogTitleSubtitle keep the SDS type styles, but they
// need their own `sdsSize` because only DialogTitle receives it from Dialog.

import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogTitleSubtitle,
  DialogTitleTitle,
  Icon,
} from "@czi-sds/components";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  function handleClose() {
    setIsOpen(false);
  }

  return (
    <div className="app" style={{ padding: 20 }}>
      <Button
        sdsStyle="solid"
        sdsType="primary"
        onClick={() => setIsOpen(true)}
      >
        Open Dialog
      </Button>

      <Dialog open={isOpen} onClose={handleClose} sdsSize="s">
        <DialogTitle>
          <div
            style={{
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              textAlign: "center",
            }}
          >
            <Icon
              sdsIcon="CheckCircle"
              sdsSize="xl"
              color="green"
              shade={400}
            />
            <DialogTitleTitle sdsSize="s">Upload complete</DialogTitleTitle>
            <DialogTitleSubtitle sdsSize="s">
              24 files processed
            </DialogTitleSubtitle>
          </div>
        </DialogTitle>
        <DialogContent>
          Your files are ready. Results will appear in the project as soon as
          the analysis finishes.
        </DialogContent>
        <DialogActions>
          <Button sdsStyle="solid" sdsType="primary" onClick={handleClose}>
            Done
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default App;
```

## SDS vs MUI

The SDS Dialog is built on top of MUI's Dialog. The following props differ in whether and how they work:

- `fullScreen`: Has no effect in SDS. DialogPaper sets a fixed width per `sdsSize` that wins over the MUI full screen styles.

- `maxWidth` and `fullWidth`: Have no effect in SDS, for the same reason. Use `sdsSize` to pick a width.

- `PaperComponent`: Defaults to DialogPaper. A replacement receives the `sdsSize` prop, so it should accept `DialogPaperProps`.

- `onClose`: Keeps the MUI signature, but SDS swallows the call when `canClickOutsideClose` is `false` and the reason is `"backdropClick"` or `"escapeKeyDown"`.

- `classes`: SDS accepts its own shape here rather than the MUI slot classes. Only `root` and `paper` are applied; the `title` and `actions` keys are declared in the type but never used. Pass a class to DialogTitle or DialogActions directly instead.

- `DialogComponent`: Declared in `DialogExtraProps` but not wired up, so passing it does nothing.

## MUI Documentation

Documentation for the underlying MUI component can be found [here](https://mui.com/material-ui/react-dialog/#scrolling-long-content).

## Props

Any custom SDS props and MUI props required for implementation are found on the table below. See the MUI documentation for additional optional props.

### Dialog Props

Props table for the Dialog component.

| Name                   | Type                                      | Default       | Description                                                                                                                                                                                                                                                  |
| ---------------------- | ----------------------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `open`                 | `bool`                                    | -             | Required. If `true`, the Dialog is shown. The Dialog is a controlled component, so you own this state.                                                                                                                                                       |
| `sdsSize`              | `"xs"` \| `"s"` \| `"m"` \| `"l"`         | `"m"`         | Sets a fixed width and a minimum height: `"xs"` is 400 × 160px, `"s"` is 600 × 400px, `"m"` is 900 × 480px, and `"l"` is 1200 × 600px. It also drives the padding and the title type scale, and is forwarded to DialogPaper, DialogTitle, and DialogActions. |
| `canClickOutsideClose` | `bool`                                    | `true`        | When `false`, `onClose` is not called for a backdrop click or the Esc key, which makes the Dialog persistent. Give those Dialogs an action button that closes them.                                                                                          |
| `onClose`              | `(event: object, reason: string) => void` | -             | Called when the Dialog requests to be closed. It receives: - `event` The event source of the callback. - `reason` Can be: `"escapeKeyDown"`, `"backdropClick"`                                                                                               |
| `PaperComponent`       | `ComponentType<DialogPaperProps>`         | `DialogPaper` | The surface the Dialog is drawn on. A replacement receives `sdsSize` along with the usual Paper props.                                                                                                                                                       |
| `classes`              | `{ root?: string; paper?: string }`       | `{}`          | Class names for the Dialog root and the paper surface. The `title` and `actions` keys exist in the type but are not applied.                                                                                                                                 |

### DialogTitle Props

Props table for the DialogTitle component.

| Name       | Type                                                                                            | Default     | Description                                                                                                                                                                                                                                               |
| ---------- | ----------------------------------------------------------------------------------------------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `title`    | `string`                                                                                        | -           | The title text of the Dialog.                                                                                                                                                                                                                             |
| `subtitle` | `string`                                                                                        | -           | Secondary text rendered below the title.                                                                                                                                                                                                                  |
| `overline` | `string`                                                                                        | -           | Small text rendered above the title. Use it for the step count in a multi-step workflow.                                                                                                                                                                  |
| `onClose`  | `() => void`                                                                                    | -           | Setting this renders the close button in the top-right corner and calls the function when it is clicked. Omit it for a persistent Dialog. This signature takes no arguments, unlike `onClose` on Dialog.                                                  |
| `children` | `ReactNode`                                                                                     | -           | Replaces the entire built-in layout, including the close button, so `title`, `subtitle`, `overline`, and `onClose` are ignored when children are present. Use DialogTitleOverline, DialogTitleTitle, and DialogTitleSubtitle to keep the SDS type styles. |
| `sdsSize`  | `"xs"` \| `"s"` \| `"m"` \| `"l"`                                                               | from Dialog | Injected by Dialog. Set it only when you render DialogTitle outside of a Dialog.                                                                                                                                                                          |
| `classes`  | `{ root?: string; title?: string; subtitle?: string; overline?: string; closeButton?: string }` | `{}`        | Class names for the individual parts of the title block.                                                                                                                                                                                                  |

### DialogActions Props

Props table for the DialogActions component.

| Name             | Type                              | Default     | Description                                                                                                                                   |
| ---------------- | --------------------------------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `buttonPosition` | `"left" \| "right"`               | `"right"`   | Aligns the action buttons in the footer. Order the buttons so the primary action sits on the outside: last for `"right"`, first for `"left"`. |
| `sdsSize`        | `"xs"` \| `"s"` \| `"m"` \| `"l"` | from Dialog | Injected by Dialog. It controls the gap above the button row.                                                                                 |
| `classes`        | `{ root?: string }`               | `{}`        | Class name for the actions row.                                                                                                               |

### DialogContent Props

DialogContent takes the MUI DialogContent props plus a `classes` object with a `root` key. It applies the SDS body type styles and removes the MUI padding; everything else is passed straight through.
