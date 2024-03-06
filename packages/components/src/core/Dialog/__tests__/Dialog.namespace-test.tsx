import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
} from "@czi-sds/components";
import React from "react";
import { noop } from "src/common/utils";

const CellBasicNameSpaceTest = (props: DialogProps) => {
  return (
    <Dialog onClose={noop} open canClickOutsideClose sdsSize="s">
      <DialogTitle
        title="Title"
        subtitle="Optional subtitle"
        onClose={noop}
        data-testid="dialog-title"
      />
      <DialogContent data-testid="dialog-content">Content Module</DialogContent>
      <DialogActions data-testid="dialog-actions" buttonPosition="left">
        <Button sdsStyle="square" sdsType="primary" onClick={noop}>
          Primary Action
        </Button>
        <Button sdsStyle="square" sdsType="secondary" onClick={noop}>
          Secondary Action
        </Button>
      </DialogActions>
    </Dialog>
  );
};
