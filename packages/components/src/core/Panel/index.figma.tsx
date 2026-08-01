import React from "react";
import Panel from "./index";
import figma from "@figma/code-connect";

figma.connect(
  Panel,
  "https://www.figma.com/design/zedDsBDlmkLrKBTuJ4FAz7/Science-Design-System--v2-?node-id=14517%3A10035",
  {
    props: {
      // Discriminator of the PanelProps union (basic | overlay).
      sdsType: figma.enum("sdsType", {
        basic: "basic",
        overlay: "overlay",
      }),
      // position: basic allows left/right; overlay also allows bottom.
      // (On basic, code coerces bottom->left at runtime, but the snippet should
      // reflect the value shown in the design.)
      position: figma.enum("position", {
        left: "left",
        right: "right",
        bottom: "bottom",
      }),
      // Panel body -> children (panelContent slot).
      children: figma.instance("panelContent"),
      // HeaderComponent is overlay-only (never on basic), so union-gate it:
      // resolves to undefined on basic and drops from the snippet.
      HeaderComponent: figma.enum("sdsType", {
        overlay: figma.instance("headerContent"),
      }),
      // Intentionally unmapped:
      // - close button (closeButtonOnClick / CloseButtonComponent): handlers /
      //   nodes with no design-authorable equivalent. Panel renders a default
      //   close button (PanelHeaderClose) automatically in overlay mode.
    },
    example: ({ sdsType, position, children, HeaderComponent }) => (
      <Panel
        sdsType={sdsType}
        position={position}
        HeaderComponent={HeaderComponent}
      >
        {children}
      </Panel>
    ),
  }
);
