import Button from "src/core/Button";
import { StyledPanelHeaderClose } from "./style";

export interface PanelHeaderCloseProps {
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  closeButtonComponent?: React.ReactNode;
}

const PanelHeaderClose = (props: PanelHeaderCloseProps) => {
  const { onClick, closeButtonComponent } = props;

  return (
    <StyledPanelHeaderClose onClick={onClick}>
      {closeButtonComponent ? (
        closeButtonComponent
      ) : (
        <Button
          sdsStyle="icon"
          sdsType="tertiary"
          icon="XMark"
          aria-label="Panel Toggle"
        />
      )}
    </StyledPanelHeaderClose>
  );
};

export default PanelHeaderClose;
