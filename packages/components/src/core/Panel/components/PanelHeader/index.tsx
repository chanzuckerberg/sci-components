import { StyledPanelHeader } from "./style";

export interface PanelHeaderProps {
  children?: React.ReactNode;
}

const PanelHeader = (props: PanelHeaderProps) => {
  const { children } = props;

  return <StyledPanelHeader>{children}</StyledPanelHeader>;
};

export default PanelHeader;
