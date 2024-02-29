/* eslint-disable no-use-before-define */
import styled from "@emotion/styled";
import { RadioGroup } from "@mui/material";
import { Args, Meta } from "@storybook/react";
import CellBasic from "../CellBasic";
import CellComponent from "../CellComponent";
import CellHeader from "../CellHeader";
import Icon from "../Icon";
import InputRadio from "../InputRadio";
import TableHeader from "../TableHeader";
import TableRow from "../TableRow";
import Tag from "../Tag";
import { SdsTagColorType } from "../Tag/style";
import RawTable from "./index";
import { BADGE } from "@geometricpanda/storybook-addon-badges";

const StyledIconCell = styled("div")`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Table = (props: Args): JSX.Element => {
  return (
    <RawTable {...props}>
      <TableHeader>
        <CellHeader horizontalAlign="center" hideSortIcon>
          Category
        </CellHeader>
        <CellHeader active>Active Header</CellHeader>
        <CellHeader>
          A very long table header title to test sort icon positioning
        </CellHeader>
        <CellHeader horizontalAlign="center">Centered</CellHeader>
        <CellHeader hideSortIcon>Component</CellHeader>
        <CellHeader horizontalAlign="right" hideSortIcon>
          Right Aligned and Not sortable
        </CellHeader>
      </TableHeader>
      <tbody>
        <TableRow>
          <CellComponent verticalAlign="center" horizontalAlign="center">
            <StyledIconCell>
              <Icon sdsSize="xl" sdsIcon="Flask" sdsType="static" />
              <Tag
                color="info"
                label="Chemistry"
                sdsStyle="rounded"
                sdsType="secondary"
                hover={false}
              />
            </StyledIconCell>
          </CellComponent>
          <CellBasic
            primaryText="Primary Text"
            secondaryText="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            secondaryTextWrapLineCount={2}
            shouldTextWrap
          />
          <CellBasic
            primaryText="Primary Text"
            secondaryText="Secondary Text"
            tertiaryText="Tertiary Text"
            shouldShowTooltipOnHover={false}
          />
          <CellBasic
            primaryText="Primary Text"
            secondaryText="Secondary Text"
            tertiaryText="Tertiary Text"
            horizontalAlign="center"
            shouldShowTooltipOnHover={false}
          />
          <CellComponent>
            {["info", "notice", "beta", "negative", "positive"].map((item) => (
              <Tag
                key={item}
                color={item as SdsTagColorType}
                label={item as string}
                sdsStyle="rounded"
                sdsType="secondary"
                hover={false}
              />
            ))}
          </CellComponent>
          <CellBasic
            primaryText="356"
            horizontalAlign="right"
            shouldShowTooltipOnHover={false}
          />
        </TableRow>
        <TableRow>
          <CellComponent verticalAlign="center" horizontalAlign="center">
            <StyledIconCell>
              <Icon sdsSize="xl" sdsIcon="Download" sdsType="static" />
              <Tag
                color="info"
                label="Downloadable Content"
                sdsStyle="rounded"
                sdsType="secondary"
                hover={false}
              />
            </StyledIconCell>
          </CellComponent>
          <CellBasic
            primaryText="Primary Text"
            secondaryText="Secondary Text"
            tertiaryText="Tertiary Text"
            shouldShowTooltipOnHover={false}
          />
          <CellBasic
            primaryText="Primary Text"
            secondaryText="Secondary Text"
            shouldShowTooltipOnHover={false}
          />
          <CellBasic
            primaryText="Primary Text"
            secondaryText="Secondary Text"
            horizontalAlign="center"
            shouldShowTooltipOnHover={false}
          />
          <CellComponent>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
              defaultValue="1"
            >
              <InputRadio label="Option I" caption="Caption I" value="1" />
              <InputRadio label="Option II" caption="Caption II" value="2" />
            </RadioGroup>
          </CellComponent>
          <CellBasic
            primaryText="1,234"
            secondaryText="2,344,000"
            tertiaryText="12.5%"
            horizontalAlign="right"
            shouldShowTooltipOnHover={false}
          />
        </TableRow>
        <TableRow
          disabled
          shouldShowTooltipOnHover
          tooltipText="This row is DISABLED!"
          tooltipSubtitle="Tooltip subtitle"
        >
          <CellComponent verticalAlign="center" horizontalAlign="center">
            <StyledIconCell>
              <Icon sdsSize="xl" sdsIcon="Bacteria" sdsType="static" />
              <Tag
                color="negative"
                label="Disease"
                sdsStyle="rounded"
                sdsType="secondary"
                hover={false}
              />
            </StyledIconCell>
          </CellComponent>
          <CellBasic
            primaryText="Primary Text"
            secondaryText="Secondary Text"
            tertiaryText="Tertiary Text"
            shouldShowTooltipOnHover={false}
            verticalAlign="center"
          />
          <CellBasic
            primaryText="Primary Text"
            shouldShowTooltipOnHover={false}
            verticalAlign="center"
          />
          <CellBasic
            primaryText="Primary Text"
            horizontalAlign="center"
            verticalAlign="center"
            shouldShowTooltipOnHover={false}
          />
          <CellComponent verticalAlign="center">
            <Icon sdsSize="l" sdsIcon="Virus" sdsType="static" />
          </CellComponent>
          <CellBasic
            primaryText="0.4"
            horizontalAlign="right"
            verticalAlign="center"
            shouldShowTooltipOnHover={false}
          />
        </TableRow>
      </tbody>
    </RawTable>
  );
};

export default {
  component: Table,
  parameters: {
    badges: [BADGE.STABLE],
  },
  title: "Components/Table/Table",
} as Meta;

export const Default = {
  parameters: {
    axe: {
      disabledRules: [
        // For some reason axe is still checking color contrast of the disabled row. Maybe it only
        // takes that into consideration for form controls?
        "color-contrast",
      ],
    },
  },
};

// Test

const TestDemo = (): JSX.Element => (
  <RawTable data-testid="Table">
    <tbody>
      <TableRow>
        <CellBasic primaryText="Primary 1" shouldShowTooltipOnHover={false} />
        <CellBasic primaryText="Primary 2" shouldShowTooltipOnHover={false} />
        <CellBasic primaryText="Primary 3" shouldShowTooltipOnHover={false} />
        <CellBasic primaryText="Primary 4" shouldShowTooltipOnHover={false} />
      </TableRow>
    </tbody>
  </RawTable>
);

export const Test = {
  parameters: {
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <TestDemo {...args} data-testid="table" />,
};
