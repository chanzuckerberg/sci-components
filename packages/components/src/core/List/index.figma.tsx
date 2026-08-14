import React from "react";
import List from "./index";
import ListItem from "./components/ListItem";
import figma from "@figma/code-connect";

/**
 * List renders ListItem children — the previous mapping had no children, so the
 * snippet showed an empty list.
 *
 * `sdsStyle` maps to the `ordered` boolean (both options mapped explicitly).
 *
 * NOT MAPPED — `size` (fontXxxs…fontL): there is no font-size prop on List.
 * NOTE the trap: `ListExtraProps.marginBottom` uses similar-looking values
 * ("xxxs" | "xxs" | "xs" | "s" | "m" | "l") but controls BOTTOM MARGIN, not
 * font size. Do not map Figma `size` to `marginBottom`.
 */
figma.connect(
  List,
  "https://www.figma.com/design/zedDsBDlmkLrKBTuJ4FAz7/Science-Design-System--v2-?node-id=3395%3A61013",
  {
    props: {
      ordered: figma.enum("sdsStyle", {
        ordered: true,
        unordered: false,
      }),
    },
    example: ({ ordered }) => (
      <List ordered={ordered}>
        {/* PLACEHOLDER CONTENT — replace with your own list items. */}
        <ListItem>List item 1</ListItem>
        <ListItem>List item 2</ListItem>
        <ListItem>List item 3</ListItem>
      </List>
    ),
  }
);
