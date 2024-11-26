import { SHORT_LOREM_IPSUM } from "src/common/storybook/loremIpsum";
import Icon from "src/core/Icon";
import {
  CELL_BASIC_PRIMARY_TEXT_COMPONENT_SLOT_BOTTOM_OPTIONS,
  CELL_BASIC_PRIMARY_TEXT_COMPONENT_SLOT_RIGHT_OPTIONS,
} from "../constants";
import { StyledCellBasic } from "../style";

export const TestDemo = (): JSX.Element => (
  <table>
    <tbody>
      <tr>
        <StyledCellBasic
          data-testid="CellBasicVerticalAlignTest"
          primaryText="Primary Text"
          secondaryText={SHORT_LOREM_IPSUM}
          secondaryTextWrapLineCount={2}
          verticalAlign="bottom"
          shouldTextWrap
          shouldShowTooltipOnHover={false}
        />
        <StyledCellBasic
          primaryText="Primary Text"
          secondaryText="Secondary Text"
          horizontalAlign="left"
          shouldShowTooltipOnHover={false}
        />
        <StyledCellBasic
          data-testid="CellBasic"
          primaryText="Primary Text"
          secondaryText="Secondary Text"
          tertiaryText="Tertiary Text"
          horizontalAlign="right"
          tooltipProps={{ sdsStyle: "dark", title: "testTooltipTitle" }}
        />
      </tr>
      <tr>
        <StyledCellBasic
          data-testid="CellBasicWithIcon"
          primaryText="Primary Text"
          secondaryText="Secondary Text"
          tertiaryText="Tertiary Text"
          shouldShowTooltipOnHover={false}
          icon={<Icon sdsSize="l" sdsIcon="Bacteria" />}
        />
        <StyledCellBasic
          primaryText="Primary Text"
          primaryTextComponentSlotRight={
            CELL_BASIC_PRIMARY_TEXT_COMPONENT_SLOT_RIGHT_OPTIONS[2]
          }
          secondaryText="Secondary Text"
          tertiaryText="Tertiary Text"
          shouldShowTooltipOnHover={false}
        />
        <StyledCellBasic
          primaryText="Primary Text"
          primaryTextComponentSlotRight={
            CELL_BASIC_PRIMARY_TEXT_COMPONENT_SLOT_RIGHT_OPTIONS[3]
          }
          shouldShowTooltipOnHover={false}
          secondaryText="Secondary Text"
          tertiaryText="Tertiary Text"
        />
      </tr>
      <tr>
        <StyledCellBasic
          primaryText="Primary Text"
          primaryTextComponentSlotBottom={
            CELL_BASIC_PRIMARY_TEXT_COMPONENT_SLOT_BOTTOM_OPTIONS[2]
          }
          shouldShowTooltipOnHover={false}
        />
        <StyledCellBasic
          primaryText="Primary Text"
          primaryTextComponentSlotBottom={
            CELL_BASIC_PRIMARY_TEXT_COMPONENT_SLOT_BOTTOM_OPTIONS[3]
          }
          shouldShowTooltipOnHover={false}
        />
        <StyledCellBasic
          primaryText="Primary Text"
          primaryTextComponentSlotBottom={
            CELL_BASIC_PRIMARY_TEXT_COMPONENT_SLOT_BOTTOM_OPTIONS[2]
          }
          primaryTextComponentSlotRight={
            CELL_BASIC_PRIMARY_TEXT_COMPONENT_SLOT_RIGHT_OPTIONS[3]
          }
          shouldShowTooltipOnHover={false}
        />
      </tr>
    </tbody>
  </table>
);
