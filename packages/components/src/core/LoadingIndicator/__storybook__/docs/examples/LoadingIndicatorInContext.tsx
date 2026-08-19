// Mount the indicator when the wait starts and unmount it when the content
// arrives: the status region announces itself on mount. Removing it announces
// nothing, so the content that replaces it carries the news.
//
// The component accepts no className or style, so any layout, centering
// included, belongs on a wrapper around it.

import {
  Button,
  fontBodyS,
  getSemanticColors,
  LoadingIndicator,
  type CommonThemeProps,
} from "@czi-sds/components";
import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react";

const Surface = styled.div<CommonThemeProps>`
  ${fontBodyS}

  ${(props) => {
    const semanticColors = getSemanticColors(props);

    return `
      border: 1px solid ${semanticColors?.base?.divider};
      border-radius: 4px;
      color: ${semanticColors?.base?.textPrimary};
      display: flex;
      align-items: center;
      justify-content: center;
      height: 96px;
      margin-bottom: 12px;
      width: 320px;
    `;
  }}
`;

function App() {
  const [loading, setLoading] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => () => clearTimeout(timeout.current), []);

  const load = () => {
    setLoading(true);
    timeout.current = setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="app">
      <Surface>
        {loading ? (
          <LoadingIndicator sdsStyle="minimal" aria-label="Loading samples" />
        ) : (
          <span>4 samples ready</span>
        )}
      </Surface>

      <Button sdsStyle="outline" sdsType="primary" onClick={load}>
        Reload samples
      </Button>
    </div>
  );
}

export default App;
