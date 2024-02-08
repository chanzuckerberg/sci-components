import { useSelector } from "react-redux";
import {
  HeaderLeft,
  HeaderRight,
  StyledButtonIcon,
  StyledHeader,
} from "./style";
import { RootState } from "../../store";
import { Button, Icon, Tag, Tooltip } from "@czi-sds/components";
import { useAppContext } from "../../store/useAppContext";

const TooltipTag = ({ label }: { label: string }) => {
  return (
    <Tag
      label={label}
      hover={false}
      color="gray"
      sdsType="secondary"
      style={{ margin: "-2px 4px 0 0" }}
    />
  );
};

const Header = () => {
  const renderer = useSelector(
    (state: RootState) => state.dataReducer.renderer
  );
  const { chartInstance } = useAppContext();

  return (
    <StyledHeader>
      <HeaderLeft>
        <Icon sdsIcon="grid" sdsType="static" sdsSize="xl" color="gray" />
        <h3 style={{ marginLeft: 10 }}>
          Heatmap ({renderer === "svg" ? "SVG version" : "Canvas version"})
        </h3>
      </HeaderLeft>

      <HeaderRight>
        <Button
          sdsType="primary"
          sdsStyle="rounded"
          endIcon={<Icon sdsIcon="download" sdsSize="l" sdsType="button" />}
          onClick={() => saveAsImage("sds-heatmap")}
        >
          Download as {renderer === "svg" ? ".svg" : ".png"}
        </Button>

        <Tooltip
          title={
            <div>
              To modify the renderer for the heatmap, navigate to the control
              Within the control panel, you have the option to toggle between
              renderers: <TooltipTag label="SVG" />
              and <TooltipTag label="Canvas" />. If you opt for the SVG
              renderer, you can download the heatmap in{" "}
              <TooltipTag label="SVG" />
              format. Alternatively, selecting the canvas renderer provides the
              option to export the heatmap in <TooltipTag label="PNG" />
              format.
            </div>
          }
          sdsStyle="light"
          placement="bottom-end"
          arrow
        >
          <StyledButtonIcon
            aria-label="Download Info"
            icon="infoCircle"
            sdsSize="large"
            sdsType="secondary"
          />
        </Tooltip>
      </HeaderRight>
    </StyledHeader>
  );

  function saveAsImage(title: string) {
    const isSvg = renderer === "svg";
    const type = isSvg ? "svg" : "png";
    const url = chartInstance?.getConnectedDataURL({
      backgroundColor: "transparent",
      excludeComponents: ["toolbox"],
      pixelRatio: 1,
      type: type,
    });

    if (url) {
      const $a = document.createElement("a");
      $a.download = title + "." + type;
      $a.target = "_blank";
      $a.href = url;
      const evt = new MouseEvent("click", {
        bubbles: true,
        cancelable: false,
        view: document.defaultView,
      });
      $a.dispatchEvent(evt);
    }
  }
};

export default Header;
