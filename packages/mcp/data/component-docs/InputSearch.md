# InputSearch

## Source Code

The component's source code in the SDS codebase can be found [here](https://github.com/chanzuckerberg/sci-components/blob/main/packages/components/src/core/InputSearch/index.tsx).

## Import

**React TypeScript**

```tsx
import { InputSearch } from "@czi-sds/components";
```

## Code examples

### **Default InputSearch**

This example has the minimum props needed for the InputSearch component.

**Example: DefaultInputSearch**

```tsx
import { InputSearch } from "@czi-sds/components";
import { Box } from "@mui/material";

function App() {
  return (
    <div className="app">
      <Box sx={{ width: 300 }}>
        <InputSearch id="search-input" label="search" placeholder="Search" />
      </Box>
    </div>
  );
}

export default App;
```

## SDS vs MUI

SDS's InputSearch is built on MUI's TextField component, with `type="search"`. It also has the SDS "search" icon automatically included, aligned to the right end of the field.

The following props are available to MUI's TextField component, but do not work the same way (or at all) for SDS's InputSearch component:

- `variants`: SDS's InputSearch component is not set up to support values for this prop (aside from `"outlined"`, InputSearch default), and using other values available to MUI (`"filled"`, `"standard"`) may result in unreliable outputs

- `size`: SDS's InputSearch component is not set up to support values for this prop (aside from `"small"`, InputText's default), and using other values available to MUI (`"medium"`, `"large"`) may not have reliable outputs

- `required`: SDS's InputSearch does not render the expected asterisk (\*) following the label when this prop is `true`

- `select`: SDS's InputSearch is not set up to support this boolean prop

- `hiddenLabel`: The label (`"Search"`, by default) for SDS's component is included within the search field, not outside of it, and the MUI `hiddenLabel` prop will not hide the label

The following functionality is available to both MUI's TextField component and SDS's InputText component, but SDS uses different prop names, shown below:

- `intent`: This prop is the way you can set colors for SDS's InputText, based on its error state. It takes default (default, gray), error, or warning as values. The related MUI-color-setting prop, `color`, has no effect for InputText in SDS.

SDS's InputSearch has an additional `sdsStyle` prop to help with setting SDS-specific styles, which takes `"square"` (default) or `"rounded"` as values.

## MUI Documentation

Documentation for the underlying MUI TextField component can be found [here](https://mui.com/material-ui/react-text-field/).

## Props

Any custom SDS props and MUI props required for implementation are found on the table below. See the MUI documentation for additional optional props.

| Name           | Type                                                      | Default                                      | Description                                                                                            |
| -------------- | --------------------------------------------------------- | -------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `disabled`     | `boolean`                                                 | `false`                                      | When set to `true`, the component becomes disabled and cannot be interacted with.                      |
| `handleSubmit` | `func`                                                    | `function(value: string) => void`            | This function is called when the Search icon is clicked, allowing user to handle the search operation. |
| `id`           | `string`                                                  | -                                            | Specifies the unique id for the input element, needed for accessibility.                               |
| `intent`       | `"default"` \| `"negative"` \| `"notice"` \| `"positive"` | `"default"`                                  | Alters the border color and visual intent of the search input.                                         |
| `label`        | `string`                                                  | -                                            | Although hidden, this label is provided for accessibility purposes.                                    |
| `onChange`     | `func`                                                    | `function(event: React.ChangeEvent) => void` | Defines the action to be taken when the input value changes.                                           |
| `placeholder`  | `string`                                                  | `"Search"`                                   | Sets the placeholder text displayed within the input element.                                          |
| `sdsStyle`     | `"rounded"` \| `"square"`                                 | `"square"`                                   | Determines the visual style of the component, with options for rounded or square design.               |
| `value`        | `string`                                                  | -                                            | The value of the `input` element, required for a controlled component.                                 |
