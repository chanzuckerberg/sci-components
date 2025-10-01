import { Args } from "@storybook/types";
import { CellComponent } from "./default";
import { StyledStoryBody, StyledStoryHeading } from "../style";
import Tag from "src/core/Tag";
import { RadioGroup } from "@mui/material";
import InputRadio from "src/core/InputRadio";
import { CELL_COMPONENT_TEST_PLACEMENT_STYLES } from "../constants";
import { SHORT_LOREM_IPSUM } from "src/common/storybook/loremIpsum";

export const TestDemo = (props: Args): JSX.Element => {
  return (
    <div style={CELL_COMPONENT_TEST_PLACEMENT_STYLES as React.CSSProperties}>
      <div>
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
      </div>
      <div>
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
            >
              <InputRadio label="One" caption="Caption I" value="1" />
              <InputRadio label="Two" caption="Caption II" value="2" />
              <InputRadio label="Three" caption="Caption III" value="3" />
            </RadioGroup>
          </div>
        </CellComponent>
      </div>
    </div>
  );
};
