import Button from "src/core/Button";
import { StyledPanelHeaderClose } from "./style";

export interface PanelHeaderCloseProps {
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  CloseButtonComponent?: React.ReactNode;
}

const PanelHeaderClose = (props: PanelHeaderCloseProps) => {
  const { onClick, CloseButtonComponent } = props;

  return (
    <StyledPanelHeaderClose onClick={onClick}>
      {CloseButtonComponent ? (
        CloseButtonComponent
      ) : (
        <Button sdsStyle="icon" sdsType="tertiary" icon="XMark" />
      )}
    </StyledPanelHeaderClose>
  );
};

export default PanelHeaderClose;
