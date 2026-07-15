import * as React from 'react';
import RawCellBasic from "@components/src/core/CellBasic";
import Icon from "@components/src/core/Icon";
import Tag from "@components/src/core/Tag";
import Button from "@components/src/core/Button";

// Owned preview — mirrors packages/components/src/core/CellBasic/__storybook__/stories.
//
// The Test story wraps every cell in a story-local @emotion/styled `StyledCellBasic`
// (dashed border + fixed 300px/70px) and uses story-local `ButtonIconsGroupRight`
// (border-left divider). Those styled helpers live in the story module's emotion
// instance, which has an empty theme across the source-pass boundary, so the borders
// and fixed widths never resolve. Theme tokens are inlined here:
//   - divider (base): #dfdfdf
//   - space-xs:       6px
// The bundled RawCellBasic forwards `style` to its root <td>, so the border/width are
// applied via inline style to reproduce StyledCellBasic.

const CELL_STYLE: React.CSSProperties = {
  border: "dashed 1px #dfdfdf",
  height: "70px",
  maxWidth: "300px",
  width: "300px",
};

const SHORT_LOREM_IPSUM =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Imperdiet massa tincidunt nunc pulvinar sapien et ligula ullamcorper.";

const IconGroupRight = (props: { children: React.ReactNode }) => (
  <div
    style={{
      alignItems: "center",
      display: "inline-flex",
      height: "100%",
      borderLeft: "solid 1px #dfdfdf",
      paddingLeft: "6px",
    }}
  >
    {props.children}
  </div>
);

const SlotRightIconGroup = (
  <IconGroupRight>
    <Button aria-label="Bar Chart Vertical 4" size="large" sdsType="primary" sdsStyle="minimal">
      <Icon sdsIcon="BarChartVertical4" sdsSize="s" />
    </Button>
    <Button aria-label="Copy" sdsType="primary" sdsStyle="minimal" size="large">
      <Icon sdsIcon="Copy" sdsSize="s" />
    </Button>
    <Button aria-label="Search Lines Horizontal 3" size="large" sdsType="primary" sdsStyle="minimal">
      <Icon sdsIcon="SearchLinesHorizontal3" sdsSize="s" />
    </Button>
    <Button aria-label="Download" size="large" sdsType="primary" sdsStyle="minimal">
      <Icon sdsIcon="Download" sdsSize="s" />
    </Button>
  </IconGroupRight>
);

const SlotBottomTagGroup = (
  <div style={{ display: "flex", gap: "4px" }}>
    <Tag label="lorem ipsum" hover={false} sdsStyle="rounded" sdsType="secondary" />
    <Tag label="dollor" hover={false} sdsStyle="rounded" sdsType="secondary" />
    <Tag label="sit amet" hover={false} sdsStyle="rounded" sdsType="secondary" />
  </div>
);

const SlotBottomIconGroup = (
  <div style={{ display: "flex", gap: "4px" }}>
    <Button aria-label="Bar Chart Vertical 4" size="large" sdsType="secondary" sdsStyle="minimal" backgroundOnHover={false}>
      <Icon sdsIcon="BarChartVertical4" sdsSize="s" />
    </Button>
    <Button aria-label="Copy" size="large" sdsType="secondary" sdsStyle="minimal" backgroundOnHover={false}>
      <Icon sdsIcon="Copy" sdsSize="s" />
    </Button>
    <Button aria-label="Search Lines Horizontal 3" size="large" sdsType="secondary" sdsStyle="minimal" backgroundOnHover={false}>
      <Icon sdsIcon="SearchLinesHorizontal3" sdsSize="s" />
    </Button>
    <Button aria-label="Tree Horizontal" size="large" sdsType="secondary" sdsStyle="minimal" backgroundOnHover={false}>
      <Icon sdsIcon="TreeHorizontal" sdsSize="s" />
    </Button>
    <Button aria-label="Download" size="large" sdsType="secondary" sdsStyle="minimal" backgroundOnHover={false}>
      <Icon sdsIcon="Download" sdsSize="s" />
    </Button>
  </div>
);

// Default — mirrors stories/default.tsx + Default args
export function Default() {
  return (
    <table>
      <tbody>
        <tr>
          <RawCellBasic
            data-testid="CellBasic"
            primaryText="Primary Text"
            primaryTextWrapLineCount={3}
            secondaryText="Secondary Text"
            secondaryTextWrapLineCount={1}
            tertiaryText="Tertiary Text"
            tertiaryTextWrapLineCount={1}
            shouldShowTooltipOnHover
            shouldShowUnderlineOnHover={false}
            shouldTextWrap
            tabularNums={false}
            tooltipProps={{ sdsStyle: "dark" }}
            width="300px"
          />
        </tr>
      </tbody>
    </table>
  );
}

// Test — mirrors stories/test.tsx (TestDemo)
export function Test() {
  return (
    <table>
      <tbody>
        <tr>
          <RawCellBasic
            data-testid="CellBasicVerticalAlignTest"
            primaryText="Primary Text"
            secondaryText={SHORT_LOREM_IPSUM}
            secondaryTextWrapLineCount={2}
            verticalAlign="bottom"
            shouldTextWrap
            shouldShowTooltipOnHover={false}
            style={CELL_STYLE}
          />
          <RawCellBasic
            primaryText="Primary Text"
            secondaryText="Secondary Text"
            horizontalAlign="left"
            shouldShowTooltipOnHover={false}
            style={CELL_STYLE}
          />
          <RawCellBasic
            data-testid="CellBasic"
            primaryText="Primary Text"
            secondaryText="Secondary Text"
            tertiaryText="Tertiary Text"
            horizontalAlign="right"
            tooltipProps={{ sdsStyle: "dark", title: "testTooltipTitle" }}
            style={CELL_STYLE}
          />
        </tr>
        <tr>
          <RawCellBasic
            data-testid="CellBasicWithIcon"
            primaryText="Primary Text"
            secondaryText="Secondary Text"
            tertiaryText="Tertiary Text"
            shouldShowTooltipOnHover={false}
            icon={<Icon sdsSize="l" sdsIcon="Bacteria" />}
            style={CELL_STYLE}
          />
          <RawCellBasic
            primaryText="Primary Text"
            primaryTextComponentSlotRight={
              <Tag label="lorem ipsum" hover={false} sdsStyle="rounded" sdsType="secondary" style={{ margin: 0 }} />
            }
            secondaryText="Secondary Text"
            tertiaryText="Tertiary Text"
            shouldShowTooltipOnHover={false}
            style={CELL_STYLE}
          />
          <RawCellBasic
            primaryText="Primary Text"
            primaryTextComponentSlotRight={SlotRightIconGroup}
            shouldShowTooltipOnHover={false}
            secondaryText="Secondary Text"
            tertiaryText="Tertiary Text"
            style={CELL_STYLE}
          />
        </tr>
        <tr>
          <RawCellBasic
            primaryText="Primary Text"
            primaryTextComponentSlotBottom={SlotBottomTagGroup}
            shouldShowTooltipOnHover={false}
            style={CELL_STYLE}
          />
          <RawCellBasic
            primaryText="Primary Text"
            primaryTextComponentSlotBottom={SlotBottomIconGroup}
            shouldShowTooltipOnHover={false}
            style={CELL_STYLE}
          />
          <RawCellBasic
            primaryText="Primary Text"
            primaryTextComponentSlotBottom={SlotBottomTagGroup}
            primaryTextComponentSlotRight={SlotRightIconGroup}
            shouldShowTooltipOnHover={false}
            style={CELL_STYLE}
          />
        </tr>
      </tbody>
    </table>
  );
}
