import Button from "src/core/Button";
import { StyledPanelHeaderClose } from "./style";

export interface PanelHeaderCloseProps {
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const PanelHeaderClose = (props: PanelHeaderCloseProps) => {
  const { onClick } = props;

  return (
    <StyledPanelHeaderClose onClick={onClick}>
      <Button sdsStyle="icon" sdsType="tertiary" icon="XMark" />
    </StyledPanelHeaderClose>
  );
};

export default PanelHeaderClose;
