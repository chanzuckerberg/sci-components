import styled from "@emotion/styled";
import { StatusType } from "../SidebarItem/SidebarItem";

interface StyledLabelProps {
  type: StatusType;
}

const TypeToColor: Record<StatusType, string> = {
  beta: "#703CBE",
  deprecated: "#C61128",
  wip: "#D8921F",
};

const TypeToBorderColor: Record<StatusType, string> = {
  beta: "#7A41CE",
  deprecated: "#DC132C",
  wip: "#F5A623",
};

export const StyledLabel = styled("label")`
  ${(props: StyledLabelProps) => {
    const { type } = props;
    const color = TypeToColor[type];
    const borderColor = TypeToBorderColor[type];

    return `
      margin: 0 16px 0 8px;
      padding: 1px 4px;
      font-size: 10px;
      font-weight: 600;
      color: ${color};
      border: solid 1px ${borderColor};
      border-radius: 2px;
    `;
  }}
`;
