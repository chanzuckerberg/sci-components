import{i as e}from"./preload-helper-xPQekRTU.js";var t;e((()=>{t=`import {
  CellBasic,
  CellComponent,
  CellHeader,
  Icon,
  InputRadio,
  Tag,
  Table,
  TableRow,
  TableHeader,
  SdsTagColorType,
} from "@czi-sds/components";
import { styled, RadioGroup } from "@mui/material";

function App() {
  const StyledIconCell = styled("div")\`
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
  \`;

  return (
    <div className="app">
      <Table>
        <TableHeader>
          <CellHeader horizontalAlign="center" hideSortIcon>
            Category
          </CellHeader>
          {/* hover is what puts the sort chevron in the DOM; without it a header
              is inert and shows no sorting affordance at all. */}
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
              {["info", "notice", "beta", "negative", "positive"].map(
                (item) => (
                  <Tag
                    key={item}
                    color={item as SdsTagColorType}
                    label={item as string}
                    sdsStyle="rounded"
                    sdsType="secondary"
                  />
                )
              )}
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
                <Icon sdsSize="xl" sdsIcon="Bacteria" />
                <Tag
                  color="negative"
                  label="Disease"
                  sdsStyle="rounded"
                  sdsType="secondary"
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
              <Icon sdsSize="l" sdsIcon="Virus" />
            </CellComponent>
            <CellBasic
              primaryText="0.4"
              horizontalAlign="right"
              verticalAlign="center"
              shouldShowTooltipOnHover={false}
            />
          </TableRow>
        </tbody>
      </Table>
    </div>
  );
}

export default App;
`}))();export{t as default};