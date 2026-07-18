import * as React from 'react';
import { RadioGroup } from "@mui/material";
import RawCellComponent from "@components/src/core/CellComponent";
import InputToggle from "@components/src/core/InputToggle";
import InputRadio from "@components/src/core/InputRadio";
import Tag from "@components/src/core/Tag";
import Button from "@components/src/core/Button";
import Icon from "@components/src/core/Icon";

// Owned preview — mirrors packages/components/src/core/CellComponent/__storybook__/stories.
//
// The Test story relies on story-local @emotion/styled helpers (StyledDashedBorder,
// StyledStoryHeading, StyledStoryBody) that read the SDS theme. Those live in the
// story module's emotion instance, which has an empty theme across the source-pass
// boundary, so the dashed border / fonts / colors do not resolve. The bundled SDS
// components (CellComponent, InputRadio, Button, Tag, Icon, InputToggle) ARE themed.
// The theme-dependent tokens are inlined here:
//   - divider (base):        #dfdfdf
//   - text-secondary (base): #767676
//   - fontHeaderS (600):     600 14px/20px Inter, 0.08px  (story sets line-height 24px)
//   - fontBodyXxs (400):     400 12px/18px Inter, 0.06px
//   - space-s:               8px
// Also: RadioGroup context does not connect to the SDS InputRadio across the boundary,
// so "One" is marked `checked` directly to reproduce the story's rendered state.

const StyledStoryHeading = (props: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) => (
  <span
    style={{
      font: "600 14px/24px Inter, sans-serif",
      letterSpacing: "0.08px",
      display: "block",
      ...props.style,
    }}
  >
    {props.children}
  </span>
);

const StyledStoryBody = (props: { children: React.ReactNode }) => (
  <span
    style={{
      font: "400 12px/18px Inter, sans-serif",
      letterSpacing: "0.06px",
      display: "block",
      color: "#767676",
      padding: "8px 0",
    }}
  >
    {props.children}
  </span>
);

const StyledDashedBorder = (props: { children: React.ReactNode }) => (
  <div
    style={{
      border: "dashed 1px #dfdfdf",
      width: "max-content",
      maxWidth: "300px",
    }}
  >
    {props.children}
  </div>
);

const SHORT_LOREM_IPSUM =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Imperdiet massa tincidunt nunc pulvinar sapien et ligula ullamcorper.";

// Default — mirrors stories/default.tsx (horizontalAlign left, verticalAlign center)
export function Default() {
  return (
    <table>
      <tbody>
        <tr>
          <RawCellComponent
            horizontalAlign="left"
            verticalAlign="center"
            data-testid="CellComponent"
          >
            <p>This is a Cell Component with a toggle!</p>
            <InputToggle />
          </RawCellComponent>
        </tr>
      </tbody>
    </table>
  );
}

// Test — mirrors stories/test.tsx (TestDemo)
export function Test() {
  return (
    <div style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
      <StyledDashedBorder>
        <RawCellComponent
          data-testid="CellComponentA"
          horizontalAlign="right"
          verticalAlign="bottom"
        >
          <div style={{ display: "block" }}>
            <StyledStoryHeading>Lorem ipsum dolor</StyledStoryHeading>
            <StyledStoryBody>{SHORT_LOREM_IPSUM}</StyledStoryBody>
            <Tag
              color="neutral"
              label="Tertiary"
              sdsStyle="rounded"
              sdsType="primary"
              hover={false}
            />
          </div>
        </RawCellComponent>
      </StyledDashedBorder>

      <StyledDashedBorder>
        <RawCellComponent
          data-testid="CellComponentB"
          horizontalAlign="left"
          verticalAlign="top"
        >
          <div style={{ display: "block" }}>
            <StyledStoryHeading style={{ paddingBottom: 10 }}>
              Lorem ipsum dolor
            </StyledStoryHeading>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="1"
              name="radio-buttons-group"
              style={{ gap: 8 }}
            >
              <InputRadio checked label="One" caption="Caption I" value="1" />
              <InputRadio label="Two" caption="Caption II" value="2" />
              <InputRadio label="Three" caption="Caption III" value="3" />
            </RadioGroup>
          </div>
        </RawCellComponent>
      </StyledDashedBorder>

      <div style={{ display: "flex", gap: "8px", flexDirection: "column" }}>
        <StyledDashedBorder>
          <RawCellComponent
            data-testid="CellComponentC"
            horizontalAlign="left"
            verticalAlign="top"
          >
            <div style={{ display: "flex", gap: "0px" }}>
              <Button sdsStyle="minimal" size="medium">
                <Icon sdsIcon="Sparkles" sdsSize="xs" />
              </Button>
              <Button sdsStyle="minimal" size="medium">
                <Icon sdsIcon="Gear" sdsSize="xs" />
              </Button>
              <Button sdsStyle="minimal" size="medium">
                <Icon sdsIcon="BarChartVertical3" sdsSize="xs" />
              </Button>
              <Button sdsStyle="minimal" size="medium">
                <Icon sdsIcon="Download" sdsSize="xs" />
              </Button>
            </div>
          </RawCellComponent>
        </StyledDashedBorder>

        <StyledDashedBorder>
          <RawCellComponent
            data-testid="CellComponentC"
            horizontalAlign="left"
            verticalAlign="top"
          >
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <Button
                sdsStyle="solid"
                sdsType="primary"
                startIcon={<Icon sdsIcon="Download" sdsSize="xs" />}
              >
                Label
              </Button>
              <Button sdsStyle="solid" size="large">
                <Icon sdsIcon="Sparkles" sdsSize="xs" />
              </Button>
              <Button sdsStyle="solid" size="large">
                <Icon sdsIcon="BarChartVertical3" sdsSize="xs" />
              </Button>
              <Button sdsStyle="solid" size="large">
                <Icon sdsIcon="Download" sdsSize="xs" />
              </Button>
            </div>
          </RawCellComponent>
        </StyledDashedBorder>

        <StyledDashedBorder>
          <RawCellComponent
            data-testid="CellComponentC"
            horizontalAlign="left"
            verticalAlign="top"
          >
            <div style={{ display: "flex", gap: "8px" }}>
              <Button
                sdsStyle="outline"
                sdsType="primary"
                startIcon={<Icon sdsIcon="Sparkle" sdsSize="xs" />}
              >
                Label
              </Button>
              <Button
                sdsStyle="outline"
                sdsType="secondary"
                startIcon={<Icon sdsIcon="Sparkles" sdsSize="xs" />}
              >
                Label
              </Button>
            </div>
          </RawCellComponent>
        </StyledDashedBorder>
      </div>
    </div>
  );
}
