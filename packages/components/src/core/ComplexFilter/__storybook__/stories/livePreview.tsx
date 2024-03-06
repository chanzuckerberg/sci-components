import RawComplexFilter from "src/core/ComplexFilter";
import { noop } from "src/common/utils";
import {
  COMPLEX_FILTER_LIVE_PREVIEW_OPTIONS,
  COMPLEX_FILTER_LIVE_PREVIEW_STYLES,
} from "../constants";

export const LivePreviewDemo = (): JSX.Element => {
  return (
    <div style={COMPLEX_FILTER_LIVE_PREVIEW_STYLES as React.CSSProperties}>
      <div>
        <RawComplexFilter
          DropdownMenuProps={{
            PopperBaseProps: {
              sx: { width: 160 },
            },
          }}
          label="Filter Label"
          multiple={false}
          search={false}
          onChange={noop}
          options={COMPLEX_FILTER_LIVE_PREVIEW_OPTIONS}
        />
      </div>
      <div>
        <RawComplexFilter
          DropdownMenuProps={{
            PopperBaseProps: {
              sx: { width: 160 },
            },
          }}
          label="Filter Label"
          multiple
          search={false}
          onChange={noop}
          options={COMPLEX_FILTER_LIVE_PREVIEW_OPTIONS}
        />
      </div>
    </div>
  );
};
