import { styled } from "@mui/material/styles";
import { Banner } from "@czi-sds/components";

const StyledBanner = styled(Banner)`
  background-color: Crimson;
`;

function App() {
  return (
    <div className="app">
      <StyledBanner sdsType="primary">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </StyledBanner>
    </div>
  );
}

export default App;
