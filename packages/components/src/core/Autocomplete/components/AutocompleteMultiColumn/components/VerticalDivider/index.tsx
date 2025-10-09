import { ReactNode } from "react";
import { StyledColumnIcon, StyledVerticalDivider } from "./style";

interface VerticalDividerProps {
  icon?: ReactNode;
}

export const VerticalDivider = ({ icon }: VerticalDividerProps) => {
  return (
    <StyledVerticalDivider>
      {icon && <StyledColumnIcon>{icon}</StyledColumnIcon>}
    </StyledVerticalDivider>
  );
};
