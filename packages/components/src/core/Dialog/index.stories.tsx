import { Args, Meta } from "@storybook/react";
import { useState } from "react";
import Button from "../Button";
import DialogActions from "../DialogActions";
import DialogContent from "../DialogContent";
import DialogTitle from "../DialogTitle";
import RawDialog from "./index";

const LONG_TEXT = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus feugiat turpis vitae odio posuere mattis. Duis tincidunt felis nibh, eget posuere diam sagittis ut. Mauris eleifend neque nec lacinia efficitur. Donec vitae diam ac massa tempus facilisis nec in mauris. Etiam id dignissim odio. Nam risus nibh, tempor ut sem quis, consequat condimentum diam. In risus leo, lacinia eget porttitor eget, viverra vel nulla. Vivamus et nibh sit amet tellus pharetra dictum ut nec ante. Nunc malesuada consequat quam, non fringilla nunc convallis et. Curabitur facilisis tristique est. Curabitur auctor pulvinar diam, ut pretium ante. Etiam a finibus elit. Cras in augue malesuada, cursus turpis posuere, volutpat ex. Sed sagittis suscipit congue. Aliquam et erat nec lacus vulputate mattis. Sed commodo purus ac dignissim sagittis. Donec nisi erat, gravida eget malesuada non, gravida quis nisl. In iaculis ipsum et varius finibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec pulvinar enim a eros condimentum, ac viverra magna volutpat. Proin sed cursus mauris. Curabitur condimentum lobortis placerat. Proin semper mauris id velit elementum, sed pellentesque arcu pulvinar. Curabitur hendrerit enim sit amet ante imperdiet porta. Ut semper neque et faucibus lacinia. Sed auctor ut ex ut ullamcorper. Integer nunc eros, efficitur vitae sapien at, imperdiet dictum magna. Mauris eget bibendum libero, in bibendum sem. Nulla convallis eu eros ac efficitur. Fusce porttitor, ante scelerisque dignissim sollicitudin, tortor lectus volutpat sapien, nec viverra lectus ipsum non libero. Donec aliquet quam sit amet turpis sodales condimentum. Nunc vehicula iaculis nulla. Etiam tempor dui non ullamcorper facilisis. Nam ut fermentum arcu. Etiam porttitor elementum leo a tempus. Sed posuere feugiat est sollicitudin lacinia. Vivamus vel lectus laoreet, rutrum sem sed, blandit libero. Sed pulvinar urna consectetur risus eleifend, in iaculis purus eleifend. Donec quis maximus dui. Suspendisse sit amet ultricies mi. Etiam malesuada odio eget felis posuere pulvinar. Aliquam nec pellentesque risus, in scelerisque sapien. Vivamus vel lobortis mi, id consequat diam. Quisque aliquam dignissim sem.`;

const Dialog = (props: Args): JSX.Element => {
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
          subtitle="Optional subtitle"
          onClose={titleOnClose ? handleClose : undefined}
          data-testid="dialog-title"
        />
        <DialogContent data-testid="dialog-content">
          {longContent ? LONG_TEXT : "Content Module"}
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

export default {
  argTypes: {
    buttonPosition: {
      control: {
        type: "radio",
      },
      options: ["left", "right"],
    },
    canClickOutsideClose: {
      control: {
        type: "boolean",
      },
    },
    longContent: {
      control: {
        type: "boolean",
      },
    },
    sdsSize: {
      control: {
        type: "radio",
      },
      options: ["xs", "s", "m", "l"],
    },
    titleOnClose: {
      control: {
        type: "boolean",
      },
    },
  },
  component: Dialog,
  title: "Dialog",
} as Meta;

// Default

export const Default = {
  args: {
    buttonPosition: "right",
    longContent: true,
    sdsSize: "m",
    titleOnClose: false,
  },
};

// LivePreview

function LivePreviewDemo(props: Args): JSX.Element {
  return (
    <>
      <Dialog sdsSize="xs" {...props} />
      <Dialog sdsSize="s" {...props} />
      <Dialog sdsSize="m" {...props} />
      <Dialog sdsSize="l" {...props} />
    </>
  );
}

export const LivePreview = {
  args: {
    titleOnClose: false,
  },
  parameters: {
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <LivePreviewDemo {...args} />,
};

// Test

function TestDemo(props: Args): JSX.Element {
  const defaultProps = { ...props, isOpen: true, titleOnClose: true };

  return (
    <>
      <Dialog sdsSize="xs" {...defaultProps} />
      <Dialog sdsSize="s" {...defaultProps} />
      <Dialog sdsSize="m" {...defaultProps} />
      <Dialog sdsSize="l" {...defaultProps} />
    </>
  );
}

export const Test = {
  parameters: {
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <TestDemo {...args} />,
};

// Test No Title On Close

function TestNoTitleOnCloseDemo(props: Args): JSX.Element {
  return <Dialog sdsSize="xs" {...props} isOpen />;
}

export const TestNoTitleOnClose = {
  parameters: {
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <TestNoTitleOnCloseDemo {...args} />,
};

// Test Button Position Left

function TestButtonPositionLeftDemo(props: Args): JSX.Element {
  return <Dialog sdsSize="xs" {...props} isOpen buttonPosition="left" />;
}

export const TestButtonPositionLeft = {
  parameters: {
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <TestButtonPositionLeftDemo {...args} />,
};
