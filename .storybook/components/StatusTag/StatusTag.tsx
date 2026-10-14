import React, { FC } from "react";
import { StyledLabel } from "./style";
import { StatusType } from "../SidebarItem/SidebarItem";

interface StatusTagProps {
  children: React.ReactNode;
  type: StatusType;
}

const TypeToLabel: Record<StatusType, string> = {
  beta: "Beta",
  deprecated: "Deprecated",
  wip: "Work in Progress",
};

const StatusTag: FC<StatusTagProps> = ({ type }) => {
  const label = TypeToLabel[type];

  return <StyledLabel type={type}>{label}</StyledLabel>;
};

export default StatusTag;
