import { Args } from "@storybook/react";
import { useState } from "react";
import Button from "src/core/Button";
import RawDialog from "src/core/Dialog";
import DialogTitle from "src/core/Dialog/components/DialogTitle";
import DialogContent from "src/core/Dialog/components/DialogContent";
import DialogActions from "src/core/Dialog/components/DialogActions";
import { EXTRA_LONG_LOREM_IPSUM } from "src/common/storybook/loremIpsum";

export const Dialog = (props: Args): JSX.Element => {
  const {
    buttonPosition,
    longContent = false,
    isOpen: propsIsOpen = false,
    titleOnClose,
    ...rest
  } = props;

  const [isOpen, setIsOpen] = useState(propsIsOpen);

  return (
    <>
      <Button sdsStyle="minimal" sdsType="primary" onClick={handleClick}>
        Open {rest.sdsSize}
      </Button>
      <RawDialog onClose={handleClose} open={isOpen} {...rest}>
        <DialogTitle
          title="Title"
          subtitle="Optional Subtitle"
          overline="Optional Overline"
          onClose={titleOnClose ? handleClose : undefined}
          data-testid="dialog-title"
        />
        <DialogContent data-testid="dialog-content">
          {longContent ? EXTRA_LONG_LOREM_IPSUM : "Content Module"}
        </DialogContent>
        <DialogActions
          data-testid="dialog-actions"
          buttonPosition={buttonPosition}
        >
          <Buttons />
        </DialogActions>
      </RawDialog>
    </>
  );

  function Buttons(): JSX.Element {
    if (buttonPosition === "left") {
      return (
        <>
          <Button sdsStyle="square" sdsType="primary" onClick={handleClose}>
            Primary Action
          </Button>
          <Button sdsStyle="square" sdsType="secondary" onClick={handleClose}>
            Secondary Action
          </Button>
        </>
      );
    }

    return (
      <>
        <Button sdsStyle="square" sdsType="secondary" onClick={handleClose}>
          Secondary Action
        </Button>
        <Button sdsStyle="square" sdsType="primary" onClick={handleClose}>
          Primary Action
        </Button>
      </>
    );
  }

  function handleClick() {
    setIsOpen(true);
  }

  function handleClose() {
    setIsOpen(false);
  }
};
