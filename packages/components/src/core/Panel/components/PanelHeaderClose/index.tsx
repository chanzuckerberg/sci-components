import Button from "src/core/Button";
import { StyledPanelHeaderClose } from "./style";
import Icon from "src/core/Icon";

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
        <Button
          sdsStyle="minimal"
          sdsType="secondary"
          aria-label="Panel Toggle"
          size="large"
          backgroundOnHover={false}
        >
          <Icon sdsIcon="XMark" sdsSize="l" />
        </Button>
      )}
    </StyledPanelHeaderClose>
  );
};

export default PanelHeaderClose;
