import { Args } from "@storybook/react-webpack5";
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
    sdsSize,
    ...rest
  } = props;

  const [isOpen, setIsOpen] = useState(propsIsOpen);

  return (
    <>
      <Button
        size="large"
        sdsStyle="minimal"
        sdsType="primary"
        onClick={handleClick}
      >
        Open {sdsSize.toUpperCase()}
      </Button>
      <RawDialog
        onClose={handleClose}
        open={isOpen}
        sdsSize={sdsSize}
        {...rest}
      >
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
          <Button
            size="large"
            sdsStyle="solid"
            sdsType="primary"
            onClick={handleClose}
          >
            Primary Action
          </Button>
          <Button
            size="large"
            sdsStyle="outline"
            sdsType="primary"
            onClick={handleClose}
          >
            Secondary Action
          </Button>
        </>
      );
    }

    return (
      <>
        <Button
          size="large"
          sdsStyle="outline"
          sdsType="primary"
          onClick={handleClose}
        >
          Secondary Action
        </Button>
        <Button
          size="large"
          sdsStyle="solid"
          sdsType="primary"
          onClick={handleClose}
        >
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
