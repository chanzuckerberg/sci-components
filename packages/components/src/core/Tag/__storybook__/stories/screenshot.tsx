import { SparkleIcon } from "@phosphor-icons/react";
import { CSSProperties, Fragment } from "react";
import RawTag from "@components/src/core/Tag";
import { SdsTagColorType, SdsTagStyle } from "@components/src/core/Tag/style";
import {
  TAG_CUSTOM_COLORS,
  TAG_INTENTS,
  TAG_PSEUDO_STATES,
  TAG_SANS_SERIF_STYLE,
  TAG_SDS_STYLES,
  TAG_SIZES,
} from "../constants";

const STATES = [...TAG_PSEUDO_STATES, "disabled"];

const COLORS: { color: SdsTagColorType; name: string }[] = [
  ...TAG_INTENTS.map((intent) => ({ color: intent, name: intent })),
  { color: TAG_CUSTOM_COLORS, name: "custom" },
];

const VARIANTS = [
  { name: "text", props: {} },
  {
    name: "text + icon + link",
    props: { icon: <SparkleIcon />, showLinkIcon: true },
  },
  { name: "icon only", props: { icon: <SparkleIcon />, iconOnly: true } },
];

const PAGE_STYLE: CSSProperties = {
  ...TAG_SANS_SERIF_STYLE,
  display: "flex",
  flexDirection: "column",
  gap: 40,
};

const GRID_STYLE: CSSProperties = {
  alignItems: "center",
  columnGap: 32,
  display: "grid",
  gridTemplateColumns: `max-content repeat(${STATES.length}, max-content)`,
  rowGap: 16,
};

const CELL_STYLE: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 8,
};

const ROW_STYLE: CSSProperties = {
  alignItems: "center",
  display: "flex",
  gap: 8,
};

export const ScreenshotTestDemo = (): JSX.Element => {
  return (
    <div style={PAGE_STYLE}>
      {TAG_SDS_STYLES.map((sdsStyle) => (
        <section key={sdsStyle}>
          <h2>
            sdsStyle: <b>{sdsStyle}</b>
          </h2>
          <div style={GRID_STYLE}>
            <span />
            {STATES.map((state) => (
              <b key={state}>{state}</b>
            ))}
            {COLORS.map(({ color, name }) => (
              <Fragment key={name}>
                <b>{name}</b>
                {STATES.map((state) => (
                  <TagCell
                    color={color}
                    key={state}
                    sdsStyle={sdsStyle}
                    state={state}
                  />
                ))}
              </Fragment>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

function TagCell({
  color,
  sdsStyle,
  state,
}: {
  color: SdsTagColorType;
  sdsStyle: SdsTagStyle;
  state: string;
}): JSX.Element {
  const isDisabled = state === "disabled";

  return (
    <div style={CELL_STYLE}>
      {TAG_SIZES.map((size) => (
        <div key={size} style={ROW_STYLE}>
          {VARIANTS.map(({ name, props }) => (
            <RawTag
              {...props}
              className={isDisabled ? undefined : `pseudo-${state}`}
              color={color}
              data-testid="tag"
              disabled={isDisabled}
              key={name}
              label="Tag Label"
              onClick={() => {}}
              sdsStyle={sdsStyle}
              size={size}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
