import React from "react";
import ButtonGroup from "./index";
import Button from "../Button";
import figma from "@figma/code-connect";

/**
 * ButtonGroup takes real <Button> elements as children (the code clones them to
 * inject size). In Figma the nested items are ButtonGroup-SPECIFIC subcomponents,
 * NOT instances of the Button component — so figma.children can't compose them
 * into <Button> snippets. Instead the example hardcodes representative Buttons,
 * which faithfully shows the intended usage.
 *
 * NOT MAPPED:
 *   - `button #` (2–5): a Figma authoring count with no code prop; the button
 *     count is expressed by how many <Button> children you pass.
 *   - `screenWidth`: responsive preview, no code prop.
 *   - `sdsStyle`: no Figma variant; the code defaults it to "outline".
 */
figma.connect(
  ButtonGroup,
  "https://www.figma.com/design/zedDsBDlmkLrKBTuJ4FAz7/Science-Design-System--v2-?node-id=20287-36419",
  {
    props: {
      sdsType: figma.enum("sdsType", {
        primary: "primary",
        secondary: "secondary",
      }),
      backgroundAppearance: figma.enum("backgroundAppearance", {
        matchBackground: "matchBackground",
        dark: "dark",
      }),
      size: figma.enum("size", {
        s: "small",
        m: "medium",
        l: "large",
      }),
      orientation: figma.enum("orientation", {
        horizontal: "horizontal",
        vertical: "vertical",
      }),
    },
    example: ({ sdsType, backgroundAppearance, size, orientation }) => (
      <ButtonGroup
        sdsType={sdsType}
        backgroundAppearance={backgroundAppearance}
        size={size}
        orientation={orientation}
      >
        <Button sdsType={sdsType} sdsStyle="outline">
          Button 1
        </Button>
        <Button sdsType={sdsType} sdsStyle="outline">
          Button 2
        </Button>
      </ButtonGroup>
    ),
  }
);
