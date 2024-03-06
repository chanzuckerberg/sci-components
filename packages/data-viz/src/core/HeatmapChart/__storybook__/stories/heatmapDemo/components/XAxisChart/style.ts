import styled from "@emotion/styled";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { X_ITEM_COUNT, ECHART_AXIS_LABEL_COLOR_HEX } from "../utils";

interface XAxisWrapperProps {
  height: number;
  width: number;
  left: number;
}

export const XAxisWrapper = styled.div<XAxisWrapperProps>`
  ${xAxisWidthAndOffset}
  background-color: white;
  height: ${(props) => props.height}px;
  position: absolute;
  overflow: hidden;
  z-index: 2;
  top: 1px;
  border-bottom: solid 1px #666;
`;

interface XAxisContainerProps {
  height: number;
  width: number;
}

export const XAxisContainer = styled.div<XAxisContainerProps>`
  ${xAxisWidth}
  background-color: white;
  height: ${(props) => props.height}px;
  top: 0px;
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const XAxisLabel = styled.div`
  ${() => {
    const heatmapCanvasSize = useSelector(
      (state: RootState) => state.dataReducer.heatmapCanvasSize
    );
    return `
      height: 100%;
      width: ${heatmapCanvasSize.width / X_ITEM_COUNT}px;
      writing-mode: vertical-lr;
      color: ${ECHART_AXIS_LABEL_COLOR_HEX};
      display: flex;
      justify-content: end;
      align-items: center;
      padding-bottom: 25px;
      &::before {
          content: "";
          position: absolute;
          width: 1px;
          height: 5px;
          background-color: #666;
          margin-left: -25px;
          bottom: 0;
      }
    `;
  }}
`;

export const XAxisGeneName = styled.span`
  transform: scale(-1, -1);
  ${selectedStyle}
`;

export const InfoButtonWrapper = styled.div`
  transform: scale(1, 1);
  cursor: pointer;
  display: flex;
  margin-bottom: 4px;
  margin-top: 4px;
  justify-content: center;
  font-size: 10px;
`;

interface GeneButtonProps {
  active?: boolean;
}

export const GeneButtonStyle = styled.div<GeneButtonProps>`
  ${(props) => {
    return `
        background-color: white;
        border: none;
        z-index: 2;
        display: inline-flex;
        justify-content: space-between;
        white-space: nowrap;
        flex-direction: column;
        align-items: center;

        &:hover {
            ${activeStyle()}
        }

        ${props.active ? activeStyle() : null}
    `;
  }}
`;

export const HoverContainer = styled.div`
  display: flex;
  flex-direction: column;
  opacity: 0.2;
  position: absolute;
  bottom: 0;
  z-index: 3;
`;

function xAxisWidthAndOffset({ width, left }: { width: number; left: number }) {
  return `
    width: ${width}px;
    left: ${left}px;
  `;
}

function xAxisWidth({ width }: { width: number }) {
  return `
    width: ${width}px;
  `;
}

function selectedStyle({ font }: { font: string }) {
  return `
      font: ${font};
      background-color: "white";
    `;
}

function activeStyle() {
  return `
    cursor: pointer;
    #gene-hover-container {
      visibility: visible;
    }
    background-color: #f3f3f3;
    .gene-label-container span {
        color: black;
        font-weight: 600;
    }
    .x-axis-hover-container {
      opacity: 1;
    }`;
}
