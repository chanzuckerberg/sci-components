import Checkbox from "@material-ui/core/Checkbox";
import RawMenuItem, { MenuItemProps } from "@material-ui/core/MenuItem";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import React, { forwardRef } from "react";
import { ColumnWrapper, ContentWrapper, TextWrapper } from "./style";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

interface Props extends MenuItemProps {
  column?: React.ReactNode;
  selected: boolean;
  text: string;
}

const MenuItem = forwardRef((props: Props, ref) => {
  const { column, selected, text } = props;

  return (
    <RawMenuItem {...props} ref={ref}>
      <Checkbox
        icon={icon}
        checkedIcon={checkedIcon}
        style={{ marginRight: 8 }}
        checked={selected}
        color="primary"
      />
      <ContentWrapper>
        <TextWrapper selected={selected}>{text}</TextWrapper>
        {column && <ColumnWrapper>{column}</ColumnWrapper>}
      </ContentWrapper>
    </RawMenuItem>
  );
});

MenuItem.defaultProps = {
  column: null,
};

export default MenuItem;
