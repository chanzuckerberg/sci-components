import{i as e}from"./preload-helper-xPQekRTU.js";var t;e((()=>{t=`import { useLayoutEffect, useState } from "react";
import { styled } from "@mui/material";

const StyledDiv = styled("div")\`
  \${(props) => {
    return \`
      width: 100%;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: yellow;
      
      \${props?.theme?.breakpoints.down("lg")} {
        background-color: skyblue;
      }
      
      \${props?.theme?.breakpoints.down("md")} {
        background-color: pink;
      }
      
      \${props?.theme?.breakpoints.down("sm")} {
        background-color: green;
      }
    \`;
  }}
\`;

function App() {
  const [width, setWidth] = useState(0);

  const handleWidth = () => {
    setWidth(window.innerWidth);
  };

  useLayoutEffect(() => {
    handleWidth();

    window.addEventListener("resize", () => handleWidth());

    return () => {
      window.removeEventListener("resize", () => handleWidth());
    };
  }, []);

  return <StyledDiv>Current width is: {width}</StyledDiv>;
}

export default App;
`}))();export{t as default};