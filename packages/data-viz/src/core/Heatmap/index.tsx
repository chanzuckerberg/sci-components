import React, { forwardRef } from "react";
import { StyledHeatmap } from "./style";

export interface HeatmapProps {
  children: React.ReactNode;
}

const Heatmap = forwardRef<HTMLTableElement, HeatmapProps>(
  (props: HeatmapProps, ref): JSX.Element | null => {
    const { children } = props;

    return (
      <StyledHeatmap ref={ref} {...props}>
        {children}
      </StyledHeatmap>
    );
  }
);

export default Heatmap;
