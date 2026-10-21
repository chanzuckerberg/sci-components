// Solid is the stronger of the two styles: the tag is filled with the intent
// color. Outline is quieter: a tinted fill, with the label, icons and a thin
// border in the intent color.

import {
  Tag,
  fontBodyXs,
  getSemanticColors,
  getSpaces,
  type CommonThemeProps,
  type SdsTagStyle,
} from "@czi-sds/components";
import styled from "@emotion/styled";
import { SparkleIcon } from "@phosphor-icons/react";

const STYLES: SdsTagStyle[] = ["solid", "outline"];

const Stack = styled.div<CommonThemeProps>`
  ${(props) => {
    const spaces = getSpaces(props);

    return `
      display: flex;
      flex-direction: column;
      gap: ${spaces?.l}px;
    `;
  }}
`;

const Row = styled.div<CommonThemeProps>`
  ${(props) => {
    const spaces = getSpaces(props);

    return `
      align-items: center;
      display: flex;
      flex-wrap: wrap;
      gap: ${spaces?.m}px;
    `;
  }}
`;

const Caption = styled.p<CommonThemeProps>`
  ${fontBodyXs}

  ${(props) => {
    const semanticColors = getSemanticColors(props);

    return `
      color: ${semanticColors?.base?.textSecondary};
      margin: 0;
      min-width: 64px;
    `;
  }}
`;

function App() {
  return (
    <div className="app">
      <Stack>
        {STYLES.map((sdsStyle) => (
          <Row key={sdsStyle}>
            <Caption>{sdsStyle}</Caption>
            <Tag color="accent" label="Tag Label" sdsStyle={sdsStyle} />
            <Tag
              color="accent"
              icon={<SparkleIcon />}
              label="Tag Label"
              sdsStyle={sdsStyle}
            />
            <Tag
              color="accent"
              href="https://sds.czi.design"
              icon={<SparkleIcon />}
              label="Tag Label"
              sdsStyle={sdsStyle}
              showLinkIcon
              target="_blank"
            />
            <Tag
              color="accent"
              icon={<SparkleIcon />}
              iconOnly
              label="Tag Label"
              sdsStyle={sdsStyle}
            />
          </Row>
        ))}
      </Stack>
    </div>
  );
}

export default App;
