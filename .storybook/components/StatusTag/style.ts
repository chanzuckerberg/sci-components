import { styled } from "@mui/material";
import { StatusType } from "../SidebarItem/SidebarItem";

interface StyledLabelProps {
  type: StatusType;
}

const TypeToColor: Record<StatusType, string> = {
  beta: "#703CBE",
  deprecated: "#C61128",
  wip: "#D8921F",
};

const TypeToBackGroundColor: Record<StatusType, string> = {
  beta: "#F4F0F9",
  deprecated: "#FEF2F2",
  wip: "#FCF6EC",
};

export const StyledLabel = styled("label")`
  ${(props: StyledLabelProps) => {
    const { type } = props;
    const color = TypeToColor[type];

    return `
            margin: 0 16px 0 8px;
            padding: 1px 4px;
            font-size: 10px;
            font-weight: 600;
            color: ${color};
            border: solid 1px transparent;
            background-color: ${TypeToBackGroundColor[type]};
            border-radius: 2px;
        `;
  }}
`;
