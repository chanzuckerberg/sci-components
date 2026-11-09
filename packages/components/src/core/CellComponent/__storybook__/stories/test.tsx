import { Args } from "@storybook/react-vite";
import { CellComponent } from "./default";
import {
  StyledDashedBorder,
  StyledStoryBody,
  StyledStoryHeading,
} from "../style";
import Tag from "@components/src/core/Tag";
import { RadioGroup } from "@mui/material";
import InputRadio from "@components/src/core/InputRadio";
import { CELL_COMPONENT_TEST_PLACEMENT_STYLES } from "../constants";
import { SHORT_LOREM_IPSUM } from "@components/src/common/storybook/loremIpsum";
import Button from "@components/src/core/Button";
import { SparkleIcon, SparklesIcon } from "@czi-sds/icons";
import {
  ChartBarIcon,
  DownloadSimpleIcon,
  GearIcon,
} from "@phosphor-icons/react";

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
                <SparklesIcon weight="bold" />
              </Button>
              <Button sdsStyle="minimal" size="medium">
                <GearIcon weight="bold" />
              </Button>
              <Button sdsStyle="minimal" size="medium">
                <ChartBarIcon weight="bold" />
              </Button>
              <Button sdsStyle="minimal" size="medium">
                <DownloadSimpleIcon weight="bold" />
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
                startIcon={<DownloadSimpleIcon weight="bold" />}
              >
                Label
              </Button>
              <Button sdsStyle="solid" size="large">
                <SparklesIcon weight="bold" />
              </Button>
              <Button sdsStyle="solid" size="large">
                <ChartBarIcon weight="bold" />
              </Button>
              <Button sdsStyle="solid" size="large">
                <DownloadSimpleIcon weight="bold" />
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
                startIcon={<SparkleIcon weight="bold" />}
              >
                Label
              </Button>
              <Button
                sdsStyle="outline"
                sdsType="secondary"
                startIcon={<SparklesIcon weight="bold" />}
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
