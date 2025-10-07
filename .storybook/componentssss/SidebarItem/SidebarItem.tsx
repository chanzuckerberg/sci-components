import React from "react";
import { StyledSidebarItem } from "./style";
import StatusTag from "../StatusTag/StatusTag";

export type StatusType = "beta" | "deprecated" | "wip";

interface SidebarItemProps {
  children: React.ReactNode;
  status: StatusType;
}

const SidebarItem = ({ children, status }: SidebarItemProps) => {
  return (
    <StyledSidebarItem>
      <div>{children}</div>
      <StatusTag type={status}>{status}</StatusTag>
    </StyledSidebarItem>
  );
};

export default SidebarItem;
