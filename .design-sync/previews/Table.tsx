import * as React from 'react';
import { RadioGroup } from "@mui/material";
import CellBasic from "@components/src/core/CellBasic";
import CellComponent from "@components/src/core/CellComponent";
import CellHeader from "@components/src/core/CellHeader";
import Icon from "@components/src/core/Icon";
import InputRadio from "@components/src/core/InputRadio";
import TableHeader from "@components/src/core/TableHeader";
import TableRow from "@components/src/core/TableRow";
import Tag from "@components/src/core/Tag";
import RawTable from "@components/src/core/Table";

// Owned preview — mirrors packages/components/src/core/Table/__storybook__/stories/default.tsx
//
// Two things from the raw story are reproduced explicitly here:
//   1. StyledIconCell — the story uses @emotion/styled for a pure flex layout
//      wrapper; reproduced inline as a plain flex div (no theme tokens read).
//   2. RadioGroup selection — the story uses `defaultValue="1"`, but the
//      RadioGroup context does not connect to the SDS InputRadio across the
//      source-pass boundary (second MUI instance), so no option ever selects.
//      Option I is marked `checked` directly to reproduce the rendered state.
const StyledIconCell = (props: { children: React.ReactNode }) => (
  <div
    style={{
      alignItems: "center",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      gap: "4px",
    }}
  >
    {props.children}
  </div>
);

export function Default() {
  return (
    <RawTable>
      <TableHeader>
        <CellHeader horizontalAlign="center" hideSortIcon>
          Category
        </CellHeader>
        <CellHeader active hover>
          Active Header
        </CellHeader>
        <CellHeader hover>
          A very long table header title to test sort icon positioning
        </CellHeader>
        <CellHeader hideSortIcon>Component</CellHeader>
        <CellHeader horizontalAlign="right" hideSortIcon>
          Right Aligned and Not sortable
        </CellHeader>
      </TableHeader>
      <tbody>
        <TableRow>
          <CellComponent verticalAlign="center" horizontalAlign="center">
            <StyledIconCell>
              <Icon sdsSize="xl" sdsIcon="Flask" />
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
          <CellComponent>
            <div
              style={{
                display: "flex",
                gap: "4px",
                flexWrap: "wrap",
              }}
            >
              {["info", "notice", "beta", "negative", "positive"].map((item) => (
                <Tag
                  key={item}
                  color={item as any}
                  label={item}
                  sdsStyle="rounded"
                  sdsType="secondary"
                  hover={false}
                />
              ))}
            </div>
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
              <Icon sdsSize="xl" sdsIcon="Download" />
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
          <CellComponent>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
              defaultValue="1"
            >
              <InputRadio checked label="Option I" caption="Caption I" value="1" />
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
              <Icon sdsSize="xl" sdsIcon="Virus" />
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
          <CellComponent verticalAlign="center">
            <Icon sdsSize="l" sdsIcon="Bacteria" />
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
}

// Test — mirrors packages/components/src/core/Table/__storybook__/stories/test.tsx
export function Test() {
  return (
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
}
