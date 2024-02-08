import { styled } from "@mui/material";

export const Container = styled("div")`
  font-family: "Open Sans", sans-serif;
  display: grid;
  grid-template-columns: 250px 1fr;
  grid-template-rows: 70px 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  position: relative;

  h3 {
    font-size: 20px;
    font-weight: 600;
    margin: 0 0 15px 0;
  }
`;

export const Sidebar = styled("div")`
  grid-area: 2 / 1 / 6 / 2;
  border-right: solid 1px #eee;
  padding: 20px 15px;
  height: calc(100vh - 110px);
  position: sticky;
  top: 70px;
  left: 0;
  z-index: 100;
  background-color: white;
`;

export const Main = styled("div")`
  grid-area: 2 / 2 / 6 / 6;
  padding: 20px;

  .echarts-for-react {
    height: unset !important;
  }
`;
