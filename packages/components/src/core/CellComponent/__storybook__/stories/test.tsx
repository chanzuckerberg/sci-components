import { Args } from "@storybook/react-webpack5";
import { CellComponent } from "./default";
import {
  StyledDashedBorder,
  StyledStoryBody,
  StyledStoryHeading,
} from "../style";
import Tag from "src/core/Tag";
import { RadioGroup } from "@mui/material";
import InputRadio from "src/core/InputRadio";
import { CELL_COMPONENT_TEST_PLACEMENT_STYLES } from "../constants";
import { SHORT_LOREM_IPSUM } from "src/common/storybook/loremIpsum";
import Button from "src/core/Button";
import Icon from "src/core/Icon";

export const TestDemo = (props: Args): JSX.Element => {
  return (
    <div style={CELL_COMPONENT_TEST_PLACEMENT_STYLES as React.CSSProperties}>
      <StyledDashedBorder>
        <CellComponent
          data-testid="CellComponentA"
          horizontalAlign="right"
          verticalAlign="bottom"
        >
          <div style={{ display: "block" }}>
            <StyledStoryHeading data-testid="Child">
              Lorem ipsum dolor
            </StyledStoryHeading>
            <StyledStoryBody data-testid="Child">
              {SHORT_LOREM_IPSUM}
            </StyledStoryBody>
            <Tag
              color="neutral"
              data-testid="Child"
              label="Tertiary"
              sdsStyle="rounded"
              sdsType="primary"
              hover={false}
              {...props}
            />
          </div>
        </CellComponent>
      </StyledDashedBorder>

      <StyledDashedBorder>
        <CellComponent
          data-testid="CellComponentB"
          horizontalAlign="left"
          verticalAlign="top"
        >
          <div style={{ display: "block" }}>
            <StyledStoryHeading
              data-testid="Child"
              style={{ paddingBottom: 10 }}
            >
              Lorem ipsum dolor
            </StyledStoryHeading>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              data-testid="Child"
              defaultValue="1"
              name="radio-buttons-group"
              style={{ gap: 8 }}
            >
              <InputRadio label="One" caption="Caption I" value="1" />
              <InputRadio label="Two" caption="Caption II" value="2" />
              <InputRadio label="Three" caption="Caption III" value="3" />
            </RadioGroup>
          </div>
        </CellComponent>
      </StyledDashedBorder>

      <div style={{ display: "flex", gap: "8px", flexDirection: "column" }}>
        <StyledDashedBorder>
          <CellComponent
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
          </CellComponent>
        </StyledDashedBorder>

        <StyledDashedBorder>
          <CellComponent
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
          </CellComponent>
        </StyledDashedBorder>

        <StyledDashedBorder>
          <CellComponent
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
          </CellComponent>
        </StyledDashedBorder>
      </div>
    </div>
  );
};
