import React from "react";
import CellComponent from "./index";
import figma from "@figma/code-connect";

figma.connect(
  CellComponent,
  "https://www.figma.com/design/zedDsBDlmkLrKBTuJ4FAz7/Science-Design-System--v2-?node-id=5579%3A12367",
  {
    props: {
      horizontalAlign: figma.enum("horizontalAlignment", {
        left: "left",
        center: "center",
        right: "right",
      }),
      verticalAlign: figma.enum("verticalAlignment", {
        top: "top",
        center: "center",
        bottom: "bottom",
      }),
      // The whole point of CellComponent: render the slotted content as children.
      // slotContent instance swap -> children.
      children: figma.instance("slotContent"),
    },
    example: ({ horizontalAlign, verticalAlign, children }) => (
      <CellComponent
        horizontalAlign={horizontalAlign}
        verticalAlign={verticalAlign}
      >
        {children}
      </CellComponent>
    ),
  }
);
