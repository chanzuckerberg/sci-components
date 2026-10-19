// An icon goes on the leading edge of a tag. The tag draws it at its own size,
// 12px in a medium tag and 10px in a small one, and in its own color, so pass a
// bare icon: one from Phosphor, or one from @czi-sds/icons for the icons SDS
// draws itself.
//
// iconOnly hides the label and squares the tag off. The label still names the
// tag for screen readers, but sighted users only see the icon, so an icon-only
// tag belongs in a Tooltip that shows the label.

import {
  Tag,
  Tooltip,
  getSpaces,
  type CommonThemeProps,
} from "@czi-sds/components";
import { SparklesIcon } from "@czi-sds/icons";
import { CheckCircleIcon } from "@phosphor-icons/react";
import styled from "@emotion/styled";

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

function App() {
  return (
    <div className="app">
      <Row>
        <Tag color="accent" icon={<SparklesIcon />} label="Generated" />

        <Tag
          color="positive"
          icon={<CheckCircleIcon />}
          label="Verified"
          sdsStyle="outline"
        />

        <Tooltip placement="top" title="Generated">
          <Tag
            color="accent"
            icon={<SparklesIcon />}
            iconOnly
            label="Generated"
          />
        </Tooltip>
      </Row>
    </div>
  );
}

export default App;
