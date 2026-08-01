# Deprecated: the Link component

**Do not use this in new code.** The **Link** component still ships, and its story sits under **Deprecated** in this Storybook. It is documented here only so that existing usages can be migrated.

It wrapped MUI's Link, offered two sizes and a bold weight, and underlined only on hover in its default style. Its source is [here](https://github.com/chanzuckerberg/sci-components/tree/main/packages/components/src/core/Link) and the underlying [MUI documentation](https://mui.com/material-ui/react-link/) still applies to the props it passed through.

## Migrating away from it

| Old prop           | Replace with                                                                                                                                                              |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| sdsSize="s"        | fontLinkS                                                                                                                                                                 |
| sdsSize="xs"       | fontLinkXs                                                                                                                                                                |
| fontWeight="bold"  | The semibold mixin for the size, such as fontLinkSemiboldS. The component's "bold" was 600, which SDS calls semibold.                                                     |
| sdsStyle="default" | The link type style plus the accent text action colors. Note the difference: the component only underlined on hover, whereas the type style is underlined in every state. |
| sdsStyle="dashed"  | color: inherit with text-decoration: underline dashed, going solid on hover, as in the last example above.                                                                |

## Props

| Name       | Type                  | Default   | Description                                                                                                           |
| ---------- | --------------------- | --------- | --------------------------------------------------------------------------------------------------------------------- |
| sdsStyle   | "default" \| "dashed" | "default" | "default" underlines on hover, focus, and press only; "dashed" is underlined dashed at rest and solid on interaction. |
| sdsSize    | "xs" \| "s"           | "s"       | The font size, taken from the body scale rather than the link one.                                                    |
| fontWeight | "normal" \| "bold"    | "normal"  | Maps to font-weight 400 and 600.                                                                                      |
