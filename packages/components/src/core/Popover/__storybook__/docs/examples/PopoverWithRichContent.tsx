// A popover is only a surface, so anything React can render can go on it: a
// heading, body copy, and the buttons that act on what it describes.
//
// Two things have to be decided for content this size. The width, because a
// popover is otherwise as wide as its content: slotProps.paper is the way in, and
// sx works there because SDS sets no width of its own. And the room around it,
// which the content adds — the paper's 6px and 12px come from a selector on the
// popover's root that outranks an sx on the paper, so they are there to build on
// rather than to replace.
//
// Focus is trapped while the popover is open, so the two buttons are reachable by
// keyboard and Escape closes the whole thing.

import { useState } from "react";
import {
  Button,
  Popover,
  fontBodyS,
  fontHeaderS,
  getSemanticColors,
  getSpaces,
  type CommonThemeProps,
} from "@czi-sds/components";
import styled from "@emotion/styled";

const Content = styled.div<CommonThemeProps>`
  ${(props) => {
    const spaces = getSpaces(props);

    return `
      display: flex;
      flex-direction: column;
      gap: ${spaces?.s}px;
      padding: ${spaces?.xs}px 0;
    `;
  }}
`;

const Title = styled.p`
  ${fontHeaderS}
  margin: 0;
`;

const Body = styled.p<CommonThemeProps>`
  ${fontBodyS}

  ${(props) => `
    color: ${getSemanticColors(props)?.base?.textSecondary};
    margin: 0;
  `}
`;

const Actions = styled.div<CommonThemeProps>`
  ${(props) => `
    display: flex;
    gap: ${getSpaces(props)?.s}px;
  `}
`;

function App() {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);
  const close = () => setAnchorEl(null);

  return (
    <div className="app">
      <Button
        aria-describedby={open ? "rich-popover" : undefined}
        onClick={(event) => setAnchorEl(event.currentTarget)}
        sdsStyle="outline"
        sdsType="primary"
      >
        Discard run
      </Button>

      <Popover
        anchorEl={anchorEl}
        id="rich-popover"
        onClose={close}
        open={open}
        slotProps={{ paper: { sx: { maxWidth: 320 } } }}
      >
        <Content>
          <Title>Discard this run?</Title>
          <Body>
            The 240 samples queued behind it will be released, and the results
            already written will be kept.
          </Body>
          <Actions>
            <Button onClick={close} sdsStyle="solid" sdsType="destructive">
              Discard
            </Button>
            <Button onClick={close} sdsStyle="minimal" sdsType="secondary">
              Cancel
            </Button>
          </Actions>
        </Content>
      </Popover>
    </div>
  );
}

export default App;
