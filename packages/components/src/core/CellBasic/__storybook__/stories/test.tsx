import RawCellBasic from "src/core/CellBasic";
import Icon from "src/core/Icon";

const TableCellStyle = {
  border: "dashed 1px #eee",
  height: 100,
  maxWidth: 160,
  width: 160,
};

export const TestDemo = (): JSX.Element => (
  <table>
    <tbody>
      <tr>
        <RawCellBasic
          data-testid="CellBasicVerticalAlignTest"
          primaryText="Primary Text"
          secondaryText="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          secondaryTextWrapLineCount={2}
          shouldTextWrap
          verticalAlign="bottom"
          shouldShowTooltipOnHover={false}
          style={TableCellStyle as React.CSSProperties}
        />
        <RawCellBasic
          data-testid="CellBasicCenterAlignTest"
          primaryText="Primary Text"
          secondaryText="Secondary Text"
          verticalAlign="center"
          horizontalAlign="center"
          shouldShowTooltipOnHover={false}
          style={TableCellStyle as React.CSSProperties}
        />
        <RawCellBasic
          data-testid="CellBasic"
          primaryText="Primary Text"
          secondaryText="Secondary Text"
          tertiaryText="Tertiary Text"
          horizontalAlign="right"
          tooltipProps={{ sdsStyle: "dark", title: "testTooltipTitle" }}
          style={TableCellStyle as React.CSSProperties}
        />
        <RawCellBasic
          data-testid="CellBasicWithIcon"
          primaryText="Primary Text"
          secondaryText="Secondary Text"
          tertiaryText="Tertiary Text"
          icon={<Icon sdsSize="l" sdsIcon="Bacteria" sdsType="static" />}
          style={TableCellStyle as React.CSSProperties}
        />
      </tr>
    </tbody>
  </table>
);
