import { XIcon } from "@phosphor-icons/react";
import { INTERNAL_ICON_PROPS } from "@components/src/common/utils";
import Button from "@components/src/core/Button";
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
        <Button
          sdsStyle="minimal"
          sdsType="secondary"
          aria-label="Panel Toggle"
          size="large"
          backgroundOnHover={false}
        >
          <XIcon {...INTERNAL_ICON_PROPS} size={24} />
        </Button>
      )}
    </StyledPanelHeaderClose>
  );
};

export default PanelHeaderClose;
