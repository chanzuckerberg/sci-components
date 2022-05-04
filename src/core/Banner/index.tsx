import React, { useState } from "react";
import Icon from "../Icon";
import {
  Centered,
  ExtraProps,
  IconWrapper,
  StyledBanner,
  StyledIconButton,
  Text,
} from "./style";

interface Props extends ExtraProps {
  dismissed?: boolean;
  dismissable?: boolean;
  onClose?: (e: React.MouseEvent) => void;
  text: string;
}

const Banner = (props: Props): JSX.Element | null => {
  const { dismissed, dismissable = true, onClose, sdsType, text } = props;

  const [wasDismissed, setWasDismissed] = useState<boolean>(false);

  if (dismissed || wasDismissed) return null;

  const handleClose = (e: React.MouseEvent) => {
    if (dismissed === undefined) {
      // let the component be uncontrolled
      setWasDismissed(true);
    }
    if (onClose) onClose(e);
  };

  return (
    <StyledBanner role="banner" sdsType={sdsType}>
      <Centered>
        <IconWrapper>
          <Icon sdsIcon="infoCircle" sdsSize="l" sdsType="static" />
        </IconWrapper>
        <Text>{text}</Text>
      </Centered>
      {dismissable && (
        <StyledIconButton
          bannerType={sdsType}
          sdsType="tertiary"
          sdsSize="small"
          onClick={handleClose}
        >
          <Icon sdsIcon="xMark" sdsSize="s" sdsType="iconButton" />
        </StyledIconButton>
      )}
    </StyledBanner>
  );
};

export default Banner;
