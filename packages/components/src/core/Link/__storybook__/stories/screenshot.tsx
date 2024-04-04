import RawLink from "src/core/Link";

export const ScreenshotTestDemo = (): JSX.Element => {
  const FONT_WEIGHTS = ["normal", "bold"];
  const SDS_SIZES = ["xs", "s"];
  const SDS_STYLES = ["default", "dashed"];
  const PSEUDO_STATES = ["default", "hover", "active", "focus"];

  // loop through all SDS_SIZES
  return (
    <>
      {SDS_SIZES.map((sdsSize) => {
        return <LinkSize sdsSize={sdsSize} key={sdsSize} />;
      })}
    </>
  );

  function LinkSize({ sdsSize }: { sdsSize: (typeof SDS_SIZES)[number] }) {
    const STYLE_LEVEL: React.CSSProperties = {
      fontFamily: "sans-serif",
      marginRight: 50,
    };
    const STYLE_LABEL: React.CSSProperties = {
      borderWidth: 2,
      fontSize: "2em",
      marginBottom: 0,
    };
    return (
      <div style={STYLE_LEVEL}>
        <p style={STYLE_LABEL}>
          Size: <b>{sdsSize}</b>
        </p>
        {FONT_WEIGHTS.map((fontWeight) => {
          return (
            <LinkWeight
              fontWeight={fontWeight}
              key={fontWeight}
              sdsSize={sdsSize}
            />
          );
        })}
      </div>
    );
  }

  function LinkWeight({
    fontWeight,
    sdsSize,
  }: {
    fontWeight: (typeof FONT_WEIGHTS)[number];
    sdsSize: (typeof SDS_SIZES)[number];
  }) {
    const STYLE_LEVEL: React.CSSProperties = {
      width: "fit-content",
    };
    const STYLE_LABEL: React.CSSProperties = {
      borderStyle: "solid none none none",
      borderWidth: 2,
      fontSize: "1.17em",
      margin: "20px 0 5px 0",
      paddingTop: "10px",
    };
    return (
      <div style={STYLE_LEVEL}>
        <p style={STYLE_LABEL}>
          Font Weight: <b>{fontWeight}</b>
        </p>
        {SDS_STYLES.map((sdsStyle) => {
          return (
            <LinkStyle
              sdsStyle={sdsStyle}
              sdsSize={sdsSize}
              fontWeight={fontWeight}
              key={sdsStyle}
            />
          );
        })}
      </div>
    );
  }

  // loop through all PSEUDO_STATES + create headers for SDS_STYLES, PSEUDO_STATES
  function LinkStyle({
    fontWeight,
    sdsStyle,
    sdsSize,
  }: {
    fontWeight: (typeof FONT_WEIGHTS)[number];
    sdsStyle: (typeof SDS_STYLES)[number];
    sdsSize: (typeof SDS_SIZES)[number];
  }) {
    const STYLE_LEVEL: React.CSSProperties = {
      columnGap: "20px",
      display: "grid",
      width: "fit-content",
    };
    const STYLE_LABEL: React.CSSProperties = {
      borderStyle: "solid none none none",
      borderWidth: 1,
      fontSize: "0.83em",
      gridColumn: "1 / 5",
      margin: "10px 0 5px 0",
      paddingTop: "10px",
    };
    const PSEUDO_STATE_LABEL: React.CSSProperties = {
      fontSize: "0.67em",
      marginBottom: 15,
    };
    return (
      <div style={STYLE_LEVEL}>
        <p style={STYLE_LABEL}>
          Style: <b>{sdsStyle}</b>
        </p>
        {PSEUDO_STATES.map((state) => {
          return (
            <div key={`div-${state}`}>
              <p style={PSEUDO_STATE_LABEL}>
                State: <b>{state}</b>
              </p>
              <RawLink
                href="/"
                sdsStyle={sdsStyle}
                sdsSize={sdsSize}
                fontWeight={fontWeight}
                className={`pseudo-${state}`}
                key={state}
              >
                Link
              </RawLink>
            </div>
          );
        })}
      </div>
    );
  }
};
