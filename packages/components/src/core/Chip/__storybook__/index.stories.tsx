import { Args, Meta } from "@storybook/react";
import React from "react";
import Button from "../../Button";
import Chip from "../index";
import { BADGE } from "../../../common/storybook/storybookBadges";
import Callout from "src/core/Callout";
import Icon from "src/core/Icon";

const Demo = (props: Args): JSX.Element => {
  const { size, isRounded } = props;
  const [visible, setVisible] = React.useState(false);

  const handleShowChip = () => setVisible(true);
  const handleDismissChip = () => setVisible(false);

  if (size === "medium" && !isRounded) {
    return (
      <>
        <Callout
          intent="negative"
          title="Deprecated!"
          sdsStyle="persistent"
          icon={<Icon sdsIcon="ExclamationMarkCircle" sdsSize="l" />}
          body={
            <>
              The <strong>Chip</strong> component is deprecated!
              <br />
              Please use <strong>Tag</strong> or <strong>TagFilter</strong>{" "}
              component instead.
            </>
          }
        >
          The <strong>Alert</strong> component is deprecated!
        </Callout>
        <Button onClick={handleShowChip} sdsType="secondary" sdsStyle="square">
          Click me!
        </Button>
        {visible && <Chip onDelete={handleDismissChip} {...props} />}
      </>
    );
  }
  return (
    <>
      <Callout
        intent="negative"
        title="Deprecated!"
        sdsStyle="persistent"
        icon={<Icon sdsIcon="ExclamationMarkCircle" sdsSize="l" />}
        body={
          <>
            The <strong>Chip</strong> component is deprecated!
            <br />
            Please use <strong>Tag</strong> or <strong>TagFilter</strong>{" "}
            component instead.
          </>
        }
      >
        The <strong>Alert</strong> component is deprecated!
      </Callout>
      <Chip {...props} />
    </>
  );
};

export default {
  component: Demo,
  parameters: {
    badges: [BADGE.DEPRECATED],
  },
  title: "Deprecated/Chip [deprecated]",
} as Meta;

export const MediumSquareChip = {
  args: {
    isRounded: false,
    label: "Chip",
    size: "medium",
  },
};

export const Success = {
  args: {
    isRounded: true,
    label: "success",
    size: "small",
    status: "success",
  },
};

export const Error = {
  args: {
    isRounded: true,
    label: "error",
    size: "small",
    status: "error",
  },
};

export const Warning = {
  args: {
    isRounded: true,
    label: "warning",
    size: "small",
    status: "warning",
  },
};

export const Info = {
  args: {
    isRounded: true,
    label: "info",
    size: "small",
    status: "info",
  },
};

export const Pending = {
  args: {
    isRounded: true,
    label: "pending",
    size: "small",
    status: "pending",
  },
};

export const Beta = {
  args: {
    isRounded: true,
    label: "beta",
    size: "small",
    status: "beta",
  },
};
