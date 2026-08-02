# Accordion

## SDS Source Code

The component's source code in the SDS codebase can be found [here](https://github.com/chanzuckerberg/sci-components/tree/main/packages/components/src/core/Accordion).

## SDS vs MUI

The SDS Accordion component introduces a couple new props that aren't part of the MUI version, that make it easier to implement options that may be needed in CZI products:

- `useDivider`: this boolean prop adds a horizontal line below the accordion, which can help to visually separate it from other accordions if they are stacked

- `togglePosition`: takes `"right"` (default) or `"left"` as values, and specifies where the baked-in Chevron icon that acts as a visual toggle sits

Additionally, there are a couple of MUI props that are not currently supported by the SDS Accordion component:

- `defaultExpanded`: this boolean prop has no effect when used

- `expanded`: this boolean prop is not recommended to be used with the SDS Accordion component, because it forces the accordion to remain open even when the user clicks it as though to close it

- `disableGutters`: this boolean prop is not needed with the SDS accordion design, and has no effect

## MUI Documentation

Documentation for the underlying MUI component can be found [here](https://mui.com/material-ui/react-accordion/).

## Props

Any custom SDS props and MUI props required for implementation are found on the table below. See the MUI documentation for additional optional props.

| Name              | Type                  | Default   | Description                                                                                                                         |
| ----------------- | --------------------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `id`              | `string`              | -         | Required. A unique id for each accordion item, also used to derive the ids that link the header and its content for screen readers. |
| `defaultExpanded` | `bool`                | `false`   | Render the accordion already expanded on first paint.                                                                               |
| `disabled`        | `bool`                | `false`   | The `disabled` prop, when set to `true`, prevents user interaction with the Accordion component, keeping it in a static state.      |
| `togglePosition`  | `"right"` \| `"left"` | `"right"` | Position of the toggle chevron icon.                                                                                                |
| `useDivider`      | `bool`                | `false`   | Display a divider line between accordion items.                                                                                     |
| `subtitle`        | `string`              | -         | Set on AccordionHeader. A text that will be displayed as a subtitle beneath the accordion title.                                    |
| `chevronSize`     | `"xs"` \| `"s"`       | `"xs"`    | Set on AccordionHeader. Size of the toggle chevron icon.                                                                            |

There are more props that can be used with the Accordion component, via those available to [MUI's Accordion component](https://mui.com/material-ui/api/accordion/#props).

## Code examples

### Default Accordion

This example has the minimum props needed for the Accordion component.

**Example: DefaultAccordion**

```tsx
// Most minimal Accordion (just has the basic requirements)

import {
  Accordion,
  AccordionHeader,
  AccordionDetails,
} from "@czi-sds/components";

function App() {
  return (
    <div className="app">
      <Accordion id="accordion-1">
        <AccordionHeader>Accordion Header</AccordionHeader>
        <AccordionDetails>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default App;
```

### Accordion with subtitles

This example show a group of Accordions, each with its own subtitle and dividing line.

**Example: AccordionWithSubtitles**

```tsx
// A group of Accordions, each with a subtitle and a dividing line

import {
  Accordion,
  AccordionHeader,
  AccordionDetails,
} from "@czi-sds/components";

function App() {
  return (
    <div className="app">
      <Accordion id="accordion-1" useDivider>
        <AccordionHeader subtitle="Explore the functionalities of our amazing product">
          Product Features
        </AccordionHeader>
        <AccordionDetails>
          Unveil the multitude of features that make our product stand out. From
          seamless integration with your existing workflow to advanced
          customization options, each feature has been meticulously crafted to
          empower you. Navigate through this section to discover how our product
          can revolutionize the way you work.
        </AccordionDetails>
      </Accordion>
      <Accordion id="accordion-2" useDivider>
        <AccordionHeader subtitle="Answers to commonly asked questions about our service">
          FAQ Section
        </AccordionHeader>
        <AccordionDetails>
          Delve into a comprehensive compilation of frequently asked questions
          and their detailed answers. This section is your go-to resource for
          clarifying any doubts you might have about our service. Whether it's
          about pricing, compatibility, or functionality, we've got you covered
          with clear and concise explanations, ensuring a smooth and informed
          experience.
        </AccordionDetails>
      </Accordion>
      <Accordion id="accordion-3">
        <AccordionHeader subtitle="Enhance your skills with our collection of educational materials">
          Learning Resources
        </AccordionHeader>
        <AccordionDetails>
          Embark on a journey of continuous improvement with our treasure trove
          of learning materials. This section hosts an array of tutorials,
          guides, and insightful articles designed to enhance your skills and
          deepen your understanding. Whether you're a beginner or an expert,
          these resources offer valuable insights to help you grow and excel in
          your endeavors.
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default App;
```

### Accordion with disabled item

This example shows a group of multiple Accordions, one of which is disabled and cannot be opened.

**Example: AccordionWithDisabledItem**

```tsx
// A group of Accordions where the second one cannot be opened

import {
  Accordion,
  AccordionHeader,
  AccordionDetails,
} from "@czi-sds/components";

function App() {
  return (
    <div className="app">
      <Accordion id="accordion-1" useDivider>
        <AccordionHeader subtitle="Explore the functionalities of our amazing product">
          Product Features
        </AccordionHeader>
        <AccordionDetails>
          Unveil the multitude of features that make our product stand out. From
          seamless integration with your existing workflow to advanced
          customization options, each feature has been meticulously crafted to
          empower you. Navigate through this section to discover how our product
          can revolutionize the way you work.
        </AccordionDetails>
      </Accordion>
      <Accordion id="accordion-2" useDivider disabled>
        <AccordionHeader subtitle="Answers to commonly asked questions about our service">
          FAQ Section
        </AccordionHeader>
        <AccordionDetails>
          Delve into a comprehensive compilation of frequently asked questions
          and their detailed answers. This section is your go-to resource for
          clarifying any doubts you might have about our service. Whether it's
          about pricing, compatibility, or functionality, we've got you covered
          with clear and concise explanations, ensuring a smooth and informed
          experience.
        </AccordionDetails>
      </Accordion>
      <Accordion id="accordion-3">
        <AccordionHeader subtitle="Enhance your skills with our collection of educational materials">
          Learning Resources
        </AccordionHeader>
        <AccordionDetails>
          Embark on a journey of continuous improvement with our treasure trove
          of learning materials. This section hosts an array of tutorials,
          guides, and insightful articles designed to enhance your skills and
          deepen your understanding. Whether you're a beginner or an expert,
          these resources offer valuable insights to help you grow and excel in
          your endeavors.
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default App;
```

### Accordion with left toggle

This example moves the toggle chevron before the header text, which reads better in a wide container.

**Example: AccordionWithLeftToggle**

```tsx
// The toggle chevron rendered before the header text instead of after it

import {
  Accordion,
  AccordionHeader,
  AccordionDetails,
} from "@czi-sds/components";

function App() {
  return (
    <div className="app">
      <Accordion id="accordion-1" togglePosition="left" useDivider>
        <AccordionHeader subtitle="Explore the functionalities of our amazing product">
          Product Features
        </AccordionHeader>
        <AccordionDetails>
          Unveil the multitude of features that make our product stand out. From
          seamless integration with your existing workflow to advanced
          customization options, each feature has been meticulously crafted to
          empower you.
        </AccordionDetails>
      </Accordion>
      <Accordion id="accordion-2" togglePosition="left">
        <AccordionHeader subtitle="Answers to commonly asked questions about our service">
          FAQ Section
        </AccordionHeader>
        <AccordionDetails>
          Delve into a comprehensive compilation of frequently asked questions
          and their detailed answers. This section is your go-to resource for
          clarifying any doubts you might have about our service.
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default App;
```

### Accordion expanded by default

This example opens on first render and uses the larger of the two chevron sizes.

**Example: AccordionExpandedByDefault**

```tsx
// An Accordion that is already open on first render

import {
  Accordion,
  AccordionHeader,
  AccordionDetails,
} from "@czi-sds/components";

function App() {
  return (
    <div className="app">
      <Accordion id="accordion-1" defaultExpanded>
        <AccordionHeader chevronSize="xs">Accordion Header</AccordionHeader>
        <AccordionDetails>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default App;
```
