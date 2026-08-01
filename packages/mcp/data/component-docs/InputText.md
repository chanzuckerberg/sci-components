# InputText

## Source Code

The component's source code in the SDS codebase can be found [here](https://github.com/chanzuckerberg/sci-components/blob/main/packages/components/src/core/InputText/index.tsx).

## SDS vs MUI

Like SDS's InputSearch (which is also built upon the same MUI component), the following props and options do not work the same way (or at all) for SDS's InputText component even though they are available to MUI's TextField component.

- **variants** **:** SDS's InputText component is not set up to support values for this prop (aside from outlined, InputText's default), and using other values available to MUI (filled, standard) may result in unreliable outputs

- **size** **:** SDS's InputText component is not set up to support values for this prop (aside from small, InputText's default), and using other values available to MUI (medium, large) may not have reliable outputs

- **required** **:** SDS's InputText does not render the expected asterisk (\*) following the label when this prop is true

- **select** **:** SDS's InputText is not set up to support this boolean prop

The following functionality is available to both MUI's TextField component and SDS's InputText component, but SDS uses different prop names, shown below:

- **sdsType** **:** This is the SDS-equivalent of MUI's boolean multiline prop, and takes textField (default) or textArea as values

- **hideLabel** **:** This is the SDS-equivalent of the hiddenLabel prop used in MUI; both are boolean with the default not including them (value of false)

- **intent** **:** This prop is the way you can set colors for SDS's InputText, based on its error state. It takes default (default, gray), error, or warning as values. The related MUI-color-setting prop, color, has no effect for InputText in SDS.

## MUI Documentation

Documentation for the underlying MUI TextFieldcomponent can be found [here](https://mui.com/material-ui/react-text-field/).

## Props

Any custom SDS props and MUI props required for implementation are found on the table below. See the MUI documentation for additional optional props.

| Name        | Type                                              | Default     | Description                                                                          |
| ----------- | ------------------------------------------------- | ----------- | ------------------------------------------------------------------------------------ |
| disabled    | boolean                                           | false       | When set to true, the component becomes disabled and cannot be interacted with.      |
| hideLabel   | boolean                                           | false       | If true, the label is hidden.                                                        |
| id          | string                                            | -           | Specifies the unique id for the input element, needed for accessibility.             |
| intent      | "default" \| "negative" \| "notice" \| "positive" | "default"   | Alters the border color and visual intent of the search input.                       |
| label       | string                                            | -           | The label for the input element.                                                     |
| placeholder | string                                            | -           | Sets the placeholder text displayed within the input element.                        |
| sdsType     | "textField" \| "textArea"                         | "textField" | Defines the type of component to render, with options for a text input or text area. |

## Code examples

### **InputText – Text Field**

This component represents the text field variant of the InputText component.

**Example: InputTextTextField**

```tsx
import { InputText } from "@czi-sds/components";
import { Box } from "@mui/material";

function App() {
  return (
    <div className="app">
      <Box sx={{ width: 300 }}>
        <InputText
          id="search-input"
          label="Label"
          placeholder="Enter your text"
          hideLabel
        />
      </Box>
    </div>
  );
}

export default App;
```

### InputText – Text Area

This component represents the text area variant of the InputText component.

**Example: InputTextTextArea**

```tsx
import { InputText } from "@czi-sds/components";
import { Box } from "@mui/material";

function App() {
  return (
    <div className="app">
      <Box sx={{ width: 300 }}>
        <InputText
          id="search-input"
          label="Description"
          placeholder="Enter your text"
          sdsType="textArea"
        />
      </Box>
    </div>
  );
}

export default App;
```
