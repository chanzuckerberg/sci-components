import React from "react";
import { StyledDrawer, StyledHeaderComponent } from "./style";
import { DrawerProps } from "@mui/material";
import PanelHeader from "./components/PanelHeader";
import PanelHeaderClose from "./components/PanelHeaderClose";

export interface BasicPanelProps
  extends Omit<DrawerProps, "anchor" | "variant"> {
  sdsType?: "basic"; // Discriminator
  position?: "left" | "right";
  width?: number | string;
}

export interface OverlayPanelProps
  extends Omit<DrawerProps, "anchor" | "variant"> {
  sdsType?: "overlay"; // Discriminator
  position?: "left" | "right" | "bottom";
  width?: number | string;
  headerComponent?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

// Discriminated Union
export type PanelProps = BasicPanelProps | OverlayPanelProps;

// Type guard to narrow the type
function isOverlayPanelProps(props: PanelProps): props is OverlayPanelProps {
  return props.sdsType === "overlay";
}

/**
 * @see https://mui.com/material-ui/react-drawer/
 */

const Panel = React.forwardRef<HTMLDivElement, PanelProps>((props, ref) => {
  const { children, sdsType = "basic", position = "left", onClick } = props;

  const PanelVariant = sdsType === "basic" ? "persistent" : "temporary";

  return (
    <StyledDrawer ref={ref} anchor={position} variant={PanelVariant} {...props}>
      {isOverlayPanelProps(props) && (
        <StyledHeaderComponent>
          {props?.headerComponent && (
            <PanelHeader>{props?.headerComponent}</PanelHeader>
          )}
          {onClick && <PanelHeaderClose onClick={onClick} />}
        </StyledHeaderComponent>
      )}
      {children}
    </StyledDrawer>
  );
});

export default Panel;
