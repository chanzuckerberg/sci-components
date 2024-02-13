import React from "react";
import { StyledSidebarItem } from "./style";
import StatusTag from "../StatusTag/StatusTag";

export type StatusType = "beta" | "deprecated" | "wip";

interface SidebarItemProps {
  children: React.ReactNode;
  status: StatusType;
}

const SidebarItem = (props: SidebarItemProps) => {
  return (
    <StyledSidebarItem>
      <div>{props.children}</div>
      <StatusTag type={props.status}>{props.status}</StatusTag>
    </StyledSidebarItem>
  );
};

export default SidebarItem;
