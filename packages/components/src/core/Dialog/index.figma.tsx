import React from "react";
import Dialog from "./index";
import DialogTitle from "./components/DialogTitle";
import DialogContent from "./components/DialogContent";
import DialogActions from "./components/DialogActions";
import Button from "../Button";
import figma from "@figma/code-connect";

/**
 * Dialog composes DialogTitle / DialogContent / DialogActions children — the
 * previous mapping was just `<Dialog open={true}/>`, which showed an empty
 * dialog with no structure.
 *
 * `size` maps 1:1 to `sdsSize`.
 *
 * NOT MAPPED — these Figma properties describe WHICH CHILDREN are composed,
 * which in code is expressed by what you render inside <Dialog>:
 *   - `showButtons?` (whether DialogActions is present)
 *   - `showOverlineText?` / `showSubtitleText?` (DialogTitle content)
 *   - `showArtworkSlot?` / `slotType` / the slot instance-swaps
 *   - `dismissible?`: a close affordance in the design; the code's closest
 *     equivalent is `canClickOutsideClose` (backdrop/escape), which is a
 *     different behaviour, so it is deliberately not mapped.
 */
figma.connect(
  Dialog,
  "https://www.figma.com/design/zedDsBDlmkLrKBTuJ4FAz7/Science-Design-System--v2-?node-id=9166%3A15154",
  {
    props: {
      sdsSize: figma.enum("size", {
        xs: "xs",
        s: "s",
        m: "m",
        l: "l",
      }),
    },
    example: ({ sdsSize }) => (
      <Dialog open sdsSize={sdsSize}>
        {/* PLACEHOLDER CONTENT — replace with your own. Structure is accurate;
            text is illustrative. Omit DialogActions if you don't need buttons. */}
        <DialogTitle title="Dialog title" subtitle="Dialog subtitle" />
        <DialogContent>Dialog content</DialogContent>
        <DialogActions>
          <Button sdsType="primary" sdsStyle="outline">
            Cancel
          </Button>
          <Button sdsType="primary" sdsStyle="solid">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    ),
  }
);
