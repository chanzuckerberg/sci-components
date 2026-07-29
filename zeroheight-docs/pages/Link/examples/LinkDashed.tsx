import { Link, getSemanticColors } from "@czi-sds/components";
import { styled, useTheme } from "@mui/material";

function App() {
  const theme = useTheme();
  const semanticColors = getSemanticColors({ theme });

  const StyledParagraph = styled("p")`
    background-color: ${semanticColors?.accent?.surfacePrimary};
    padding: 10px;
  `;

  return (
    <div className="app">
      <StyledParagraph>
        Lorem ipsum{" "}
        <Link href="#" sdsStyle="dashed">
          dolor sit apsidy
        </Link>{" "}
        consectetur, adipisicing elit.
      </StyledParagraph>
    </div>
  );
}

export default App;
