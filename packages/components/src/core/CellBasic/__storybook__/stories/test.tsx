import { SHORT_LOREM_IPSUM } from "src/common/storybook/loremIpsum";
import RawCellBasic from "src/core/CellBasic";
import Icon from "src/core/Icon";
import {
  CELL_BASIC_PRIMARY_TEXT_COMPONENT_SLOT_BOTTOM_OPTIONS,
  CELL_BASIC_PRIMARY_TEXT_COMPONENT_SLOT_RIGHT_OPTIONS,
  CELL_BASIC_TEST_TABLE_CELL_STYLE,
} from "../constants";

export const TestDemo = (): JSX.Element => (
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
          style={CELL_BASIC_TEST_TABLE_CELL_STYLE as React.CSSProperties}
        />
        <RawCellBasic
          primaryText="Primary Text"
          secondaryText="Secondary Text"
          horizontalAlign="left"
          shouldShowTooltipOnHover={false}
          style={CELL_BASIC_TEST_TABLE_CELL_STYLE as React.CSSProperties}
        />
        <RawCellBasic
          data-testid="CellBasic"
          primaryText="Primary Text"
          secondaryText="Secondary Text"
          tertiaryText="Tertiary Text"
          horizontalAlign="right"
          tooltipProps={{ sdsStyle: "dark", title: "testTooltipTitle" }}
          style={CELL_BASIC_TEST_TABLE_CELL_STYLE as React.CSSProperties}
        />
      </tr>
      <tr>
        <RawCellBasic
          data-testid="CellBasicWithIcon"
          primaryText="Primary Text"
          secondaryText="Secondary Text"
          tertiaryText="Tertiary Text"
          shouldShowTooltipOnHover={false}
          icon={<Icon sdsSize="l" sdsIcon="Bacteria" sdsType="static" />}
          style={CELL_BASIC_TEST_TABLE_CELL_STYLE as React.CSSProperties}
        />
        <RawCellBasic
          primaryText="Primary Text"
          primaryTextComponentSlotRight={
            CELL_BASIC_PRIMARY_TEXT_COMPONENT_SLOT_RIGHT_OPTIONS[2]
          }
          secondaryText="Secondary Text"
          tertiaryText="Tertiary Text"
          shouldShowTooltipOnHover={false}
          style={CELL_BASIC_TEST_TABLE_CELL_STYLE as React.CSSProperties}
        />
        <RawCellBasic
          primaryText="Primary Text"
          primaryTextComponentSlotRight={
            CELL_BASIC_PRIMARY_TEXT_COMPONENT_SLOT_RIGHT_OPTIONS[3]
          }
          shouldShowTooltipOnHover={false}
          secondaryText="Secondary Text"
          tertiaryText="Tertiary Text"
          style={CELL_BASIC_TEST_TABLE_CELL_STYLE as React.CSSProperties}
        />
      </tr>
      <tr>
        <RawCellBasic
          primaryText="Primary Text"
          primaryTextComponentSlotBottom={
            CELL_BASIC_PRIMARY_TEXT_COMPONENT_SLOT_BOTTOM_OPTIONS[2]
          }
          shouldShowTooltipOnHover={false}
          style={CELL_BASIC_TEST_TABLE_CELL_STYLE as React.CSSProperties}
        />
        <RawCellBasic
          primaryText="Primary Text"
          primaryTextComponentSlotBottom={
            CELL_BASIC_PRIMARY_TEXT_COMPONENT_SLOT_BOTTOM_OPTIONS[3]
          }
          shouldShowTooltipOnHover={false}
          style={CELL_BASIC_TEST_TABLE_CELL_STYLE as React.CSSProperties}
        />
        <RawCellBasic
          primaryText="Primary Text"
          primaryTextComponentSlotBottom={
            CELL_BASIC_PRIMARY_TEXT_COMPONENT_SLOT_BOTTOM_OPTIONS[2]
          }
          primaryTextComponentSlotRight={
            CELL_BASIC_PRIMARY_TEXT_COMPONENT_SLOT_RIGHT_OPTIONS[3]
          }
          shouldShowTooltipOnHover={false}
          style={CELL_BASIC_TEST_TABLE_CELL_STYLE as React.CSSProperties}
        />
      </tr>
    </tbody>
  </table>
);
