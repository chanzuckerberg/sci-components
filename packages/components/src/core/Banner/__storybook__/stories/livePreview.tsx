import { styled } from "@mui/material/styles";
import RawBanner from "src/core/Banner";
import { BANNER_TEXT } from "../constants";

const StyledBanner = styled(RawBanner)`
  background-color: Crimson;
`;

export const LivePreviewDemo = (): JSX.Element => {
  return (
    <div style={{ padding: "24px", width: "600px" }}>
      <RawBanner dismissible sdsType="primary">
        {BANNER_TEXT}
      </RawBanner>
      <div style={{ height: "24px" }} />
      <RawBanner dismissible sdsType="secondary">
        {BANNER_TEXT}
      </RawBanner>
      <div style={{ height: "24px" }} />
      <StyledBanner sdsType="primary">
        Stylable. Should have Crimson background color
      </StyledBanner>
    </div>
  );
};
