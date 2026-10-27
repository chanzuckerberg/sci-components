import { Args } from "@storybook/react-vite";
import { Fragment } from "react";
import RawChip from "@components/src/core/Chip";
import {
  CHIP_GRID_STYLE,
  CHIP_PSEUDO_STATES,
  CHIP_SDS_STYLES,
} from "../constants";

export const ScreenshotTestDemo = (props: Args): JSX.Element => {
  const { label } = props;

  return (
    <div style={CHIP_GRID_STYLE}>
      <span />
      {CHIP_PSEUDO_STATES.map((state) => (
        <b key={state}>{state}</b>
      ))}
      {CHIP_SDS_STYLES.map((sdsStyle) => (
        <Fragment key={sdsStyle}>
          <b>{sdsStyle}</b>
          {CHIP_PSEUDO_STATES.map((state) => (
            <div key={state}>
              <RawChip
                className={`pseudo-${state}`}
                data-testid="chip"
                label={label}
                onDelete={() => {}}
                sdsStyle={sdsStyle as "solid" | "outline"}
              />
            </div>
          ))}
        </Fragment>
      ))}
    </div>
  );
};
