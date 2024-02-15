import { useDispatch, useSelector } from "react-redux";
import {
  Callout,
  DefaultAutocompleteOption,
  Dropdown,
  SDSAutocompleteValue,
  Tag,
} from "@czi-sds/components";
import { StyledControlPanelWrapper, StyledForm } from "./style";
import {
  DataState,
  setCamera,
  setColor,
  setEmphasis,
  setRenderer,
  setSize,
  setSymbol,
  setType,
} from "../../store/dataReducer";
import { RootState } from "../../store";
import { toPascalCase } from "../utils";

type DropdownOption = DefaultAutocompleteOption & {
  value: string | number | boolean;
};

const OPTIONS = [
  {
    name: "Spectral",
    section: "Categorical",
    value: "Spectral",
  },
  {
    name: "Rainbow",
    section: "Categorical",
    value: "Rainbow",
  },
  {
    name: "Virdis",
    section: "Categorical",
    value: "Virdis",
  },
  {
    name: "Plasma",
    section: "Categorical",
    value: "Plasma",
  },
  {
    name: "Magma",
    section: "Sequential",
    value: "Magma",
  },
  {
    name: "YlOrRd",
    section: "Sequential",
    value: "YlOrRd",
  },
];

const SIZES = [
  { details: "50 x 50", name: "2,500", value: 50 },
  { details: "100 x 100", name: "10,000", value: 100 },
  { details: "250 x 250", name: "62,500", value: 250 },
  { details: "500 x 500", name: "250,000", value: 500 },
  { details: "750 x 750", name: "562,500", value: 750 },
  { details: "1000 x 1000", name: "1,000,000", value: 1000 },
  { details: "1250 x 1250", name: "1,562,500", value: 1250 },
  { details: "1500 x 1500", name: "2,250,000", value: 1500 },
  { details: "1650 x 1650", name: "2,722,500", value: 1650 },
];

const TYPES = [
  {
    details: "Applies gradient-like colors for a smooth transition.",
    name: "Sequential",
    value: "sequential",
  },
  {
    details: "Utilizes randomized colors for a diverse visual representation.",
    name: "Random",
    value: "random",
  },
  {
    details:
      "Incorporates Perlin noise for a structured yet natural appearance.",
    name: "Perlin",
    value: "perlin",
  },
];

const SYMBOLS = [
  {
    details:
      "Represents data points as circular shapes with varying sizes and colors based on their values.",
    name: "Circle",
    value: "circle",
  },
  {
    details:
      "Represents data points as rectangular shapes with different colors based on their values.",
    name: "Rect",
    value: "rect",
  },
  {
    details:
      "Represents data points as rounded-edged rectangular shapes with different colors based on their values.",
    name: "RoundRect",
    value: "roundRect",
  },
];

const EMPHASIS = [
  {
    details: "Highlights only the specific item.",
    name: "Item",
    value: "item",
  },
  {
    details: "Highlights the entire row containing the item.",
    name: "Row",
    value: "row",
  },
  {
    details: "Highlights the entire column containing the item.",
    name: "Column",
    value: "column",
  },
  {
    details: "Highlights both the row and column containing the item.",
    name: "Cross",
    value: "cross",
  },
];

const CAMERA_EFFECT = [
  {
    details:
      "Renders only the visible part of the heatmap, rendering the rest upon scrolling. Recommended for large heatmaps to optimize performance.",
    name: "On",
    value: true,
  },
  {
    details:
      "Renders the entire heatmap on the screen. Suitable for smaller heatmaps where the camera effect can be disabled for better display.",
    name: "Off",
    value: false,
  },
];

const RENDERER = [
  {
    details: "Renders the heatmap in SVG format.",
    name: "svg",
    value: "svg",
  },
  {
    details: "Renders the heatmap using HTML canvas.",
    name: "canvas",
    value: "canvas",
  },
];

const ControlPanel = () => {
  const dispatch = useDispatch();

  const size = useSelector((state: RootState) => state.dataReducer.size);
  const color = useSelector((state: RootState) => state.dataReducer.color);
  const type = useSelector((state: RootState) => state.dataReducer.type);
  const renderer = useSelector(
    (state: RootState) => state.dataReducer.renderer
  );
  const camera = useSelector((state: RootState) => state.dataReducer.camera);
  const symbol = useSelector((state: RootState) => state.dataReducer.symbol);
  const emphasis = useSelector(
    (state: RootState) => state.dataReducer.emphasis
  );

  return (
    <StyledControlPanelWrapper>
      <StyledForm>
        <Dropdown<DropdownOption, false, false, false>
          label={color}
          options={OPTIONS}
          onChange={changeInterpolator}
          search
          InputDropdownProps={{
            label: "Heatmap Color",
            sdsStyle: "minimal",
            sdsType: "label",
            style: {
              marginBottom: 5,
            },
            value: color,
          }}
          DropdownMenuProps={{
            groupBy: (option: DropdownOption) => option.section as string,
            width: 220,
          }}
        />

        <Dropdown<DropdownOption, false, false, false>
          label={`${size} x ${size}`}
          options={SIZES}
          onChange={changeHeatmapSize}
          InputDropdownProps={{
            label: "Heatmap Size",
            sdsStyle: "minimal",
            sdsType: "label",
            style: {
              marginBottom: 5,
            },
            value: `${size} x ${size}`,
          }}
          DropdownMenuProps={{
            width: 220,
          }}
        />

        <Dropdown<DropdownOption, false, false, false>
          label={camera ? "on" : "off"}
          options={CAMERA_EFFECT}
          onChange={changeHeatmapCamera}
          InputDropdownProps={{
            label: "Camera Effect",
            sdsStyle: "minimal",
            sdsType: "label",
            style: {
              marginBottom: 5,
            },
            value: camera ? "On" : "Off",
          }}
          DropdownMenuProps={{
            width: 220,
          }}
        />

        <Dropdown<DropdownOption, false, false, false>
          label={toPascalCase(renderer)}
          options={RENDERER}
          onChange={changeHeatmapRenderer}
          InputDropdownProps={{
            label: "Renderer",
            sdsStyle: "minimal",
            sdsType: "label",
            style: {
              marginBottom: 5,
            },
            value: toPascalCase(renderer),
          }}
          DropdownMenuProps={{
            width: 220,
          }}
        />

        <Dropdown<DropdownOption, false, false, false>
          label={type}
          options={TYPES}
          onChange={changeHeatmapType}
          InputDropdownProps={{
            label: "Heatmap Type",
            sdsStyle: "minimal",
            sdsType: "label",
            style: {
              marginBottom: 5,
            },
            value: toPascalCase(type),
          }}
          DropdownMenuProps={{
            width: 220,
          }}
        />

        <Dropdown<DropdownOption, false, false, false>
          label={symbol}
          options={SYMBOLS}
          onChange={changeHeatmapSymbol}
          InputDropdownProps={{
            label: "Symbol Type",
            sdsStyle: "minimal",
            sdsType: "label",
            style: {
              marginBottom: 5,
            },
            value: toPascalCase(symbol),
          }}
          DropdownMenuProps={{
            width: 220,
          }}
        />

        <Dropdown<DropdownOption, false, false, false>
          label={emphasis}
          options={EMPHASIS}
          onChange={changeHeatmapEmphasis}
          InputDropdownProps={{
            label: "Emphasis Type",
            sdsStyle: "minimal",
            sdsType: "label",
            style: {
              marginBottom: 5,
            },
            value: toPascalCase(emphasis),
          }}
          DropdownMenuProps={{
            width: 220,
          }}
        />
      </StyledForm>

      <Callout
        autoDismiss={false}
        intent="info"
        dismissed={false}
        style={{
          margin: 0,
          width: "unset",
        }}
      >
        To scroll horizontally, hold down the{" "}
        <Tag
          color="gray"
          label="SHIFT"
          sdsStyle="square"
          sdsType="secondary"
          hover={false}
          style={{ marginTop: 5 }}
        />{" "}
        key!
      </Callout>
    </StyledControlPanelWrapper>
  );

  function changeInterpolator(
    _event: React.SyntheticEvent,
    interpolator: SDSAutocompleteValue<DropdownOption, false, false, false>
  ) {
    if (interpolator)
      dispatch(setColor(interpolator.value as DataState["color"]));
  }

  function changeHeatmapSize(
    _event: React.SyntheticEvent,
    heatmapSize: SDSAutocompleteValue<DropdownOption, false, false, false>
  ) {
    if (heatmapSize) dispatch(setSize(heatmapSize.value as DataState["size"]));
  }

  function changeHeatmapType(
    _event: React.SyntheticEvent,
    heatmapType: SDSAutocompleteValue<DropdownOption, false, false, false>
  ) {
    if (heatmapType) dispatch(setType(heatmapType.value as DataState["type"]));
  }

  function changeHeatmapRenderer(
    _event: React.SyntheticEvent,
    heatmapRenderer: SDSAutocompleteValue<DropdownOption, false, false, false>
  ) {
    if (heatmapRenderer)
      dispatch(setRenderer(heatmapRenderer.value as DataState["renderer"]));
  }

  function changeHeatmapCamera(
    _event: React.SyntheticEvent,
    heatmapCamera: SDSAutocompleteValue<DropdownOption, false, false, false>
  ) {
    if (heatmapCamera)
      dispatch(setCamera(heatmapCamera.value as DataState["camera"]));
  }

  function changeHeatmapSymbol(
    _event: React.SyntheticEvent,
    heatmapSymbol: SDSAutocompleteValue<DropdownOption, false, false, false>
  ) {
    if (heatmapSymbol)
      dispatch(setSymbol(heatmapSymbol.value as DataState["symbol"]));
  }

  function changeHeatmapEmphasis(
    _event: React.SyntheticEvent,
    heatmapEmphasis: SDSAutocompleteValue<DropdownOption, false, false, false>
  ) {
    if (heatmapEmphasis)
      dispatch(setEmphasis(heatmapEmphasis.value as DataState["emphasis"]));
  }
};

export default ControlPanel;
